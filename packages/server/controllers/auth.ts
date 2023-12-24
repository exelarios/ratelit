import { RequestHandler } from "express";
import { ZodError, z } from "zod";

import prisma from "@/server/prisma";
import { generateTokens, parseToken, verifyAccessToken, verifyRefreshToken } from "@/server/utils/auth";
import { NotBeforeError, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import * as validate from "@ratelit/shared/validate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const login: RequestHandler = async (request, response) => {
  try {
    const credentials = validate.login.parse(request.body);

    const user = await prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        password: true
      },
      where: {
        email: credentials.email
      }
    });

    const isCorrectPassword = await Bun.password.verify(credentials.password, user.password);

    if (!isCorrectPassword) {
      throw new Error("Incorrect password");
    }

    const payload = {
      email: credentials.email,
      id: user.id
    }

    const tokens = generateTokens(payload);

    response.cookie("accessToken", tokens.access, {
      httpOnly: true,
      sameSite: true
    });

    response.cookie("refreshToken", tokens.refresh, {
      httpOnly: true,
      sameSite: true
    });

    // todo: store the refresh token inside a NoSQL to track refresh tokens, thus we can invalidate them if necessary.

    response.send({
      "status": "success",
      "message": "logged in",
      "data": {
        "accessToken": tokens.access,
        "refreshToken": tokens.refresh
      },
    });

  } catch(error) {
    if (error instanceof ZodError) {
      response.status(400).send({
        "status": "fail",
        "code": "INVALID_PAYLOAD",
        "message": error.issues
      });
    } else if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025")
      response.status(404).send({
        "status": "fail",
        "message": "The credentials provided doesn't exist. Try creating an account."
      });
    } else if (error instanceof ClientError) {
      response.status(404).send({
        "status": "error",
        "message": error.message,
        "code": error.code
      });
    } else {
      console.error(error);
      response.status(400).send({
        "status": "error",
        "message": "Something went wrong."
      });
    }
  }
}

export const signup: RequestHandler = async (request, response) => {
  try {
    const body = z.object({
      firstName: z.string().min(1, "First name must not be empty.").max(20, "First name should not exceed 20 characters."),
      lastName: z.string().min(1, "Last name must not be empty.").max(20, "Last name should not exceed 20 characters."),
      email: z.string().email({
        message: "Please provide a valid email address."
      }),
      password: z.string().min(4, "Password field must have a minimum of 4 characters.")
    });

    const credentials = body.parse(request.body);

    const doesEmailExist = await prisma.user.findFirst({
      where: {
        email: credentials.email
      }
    });

    if (doesEmailExist) {
      response.status(400).send({
        "status": "success",
        "message": "This email has already been registered. Please try to login or forget password."
      });
    }

    const password = await Bun.password.hash(credentials.password, {
      algorithm: "bcrypt",
      cost: 4
    });

    const query = await prisma.user.create({
      data: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: password,
        avatar: "",
      }
    });

    const payload = {
      email: credentials.email,
      id: query.id
    }

    const tokens = generateTokens(payload);

    response.cookie("accessToken", tokens.access, {
      httpOnly: true,
      sameSite: true
    });

    response.cookie("refreshToken", tokens.refresh, {
      httpOnly: true,
      sameSite: true
    });

    response.send({
      "status": "success",
      "message": "User has been sucessfully created.",
      "data": {
        "accessToken": tokens.access,
        "refreshToken": tokens.refresh
      },
    });

  } catch(error) {
    if (error instanceof z.ZodError) {
      response.status(400).send({
        "status": "failed",
        "message": error.issues
      });
    } else if (error instanceof Error) {
      console.log("api/signup", error);
      response.status(400).send({
        "status": "error",
        "message": error.message
      });
    }
  }
}

export const verify: RequestHandler = async (request, response) => {
  const headers = request.headers;
  try {
    const authorization = headers.authorization;
    
    if (!authorization) {
      throw new Error("No authorization provided in request.");
    }

    const token = parseToken(authorization);
    const session = await verifyAccessToken(token);

    const user = await prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        email: true,
        createdAt: true
      },
      where: {
        id: session.id
      }
    });

    response.send({
      success: true,
      data: {
        user,
        token: session
      }
    });

  } catch(error) {
    console.error("@verify", error);
    if (error instanceof TokenExpiredError) {
      response.status(401).send({
        "status": "fail",
        "code": "EXPIRED_ACCESS_TOKEN",
        "message": "Use refresh token to generate new token.",
      });
    }

    if (error instanceof JsonWebTokenError) {
      response.status(403).send({
        "status": "error",
        "message": error.message
      });
    }

    if (error instanceof Error) {
      response.status(403).send({
        "status": "error",
        "message": error.message
      });
    }
  }
}

export const refresh: RequestHandler = async (request, response) => {
  const headers = request.headers;
  try {
    let authorization = headers.authorization;

    if (!authorization) {
      throw new Error("Authorization wasn't provided.");
    }

    // Get the second element since the first element is the prefix `bearer`.
    const refreshToken = parseToken(authorization);

    const result = await verifyRefreshToken(refreshToken);

    const tokenPayload = {
      id: result.id
    }

    const tokens = generateTokens(tokenPayload);

    response.send({
      success: true,
      data: {
        "accessToken": tokens.access,
        "refreshToken": tokens.refresh
      },
      message: "Tokens has been generated."
    });

  } catch(error) {
    if (error instanceof NotBeforeError) {
      response.status(403).send({
        "status": "fail",
        "message": "Access token associated with the access token hasn't expired."
      });
    }

    if (error instanceof TokenExpiredError) {
      response.status(403).send({
        "status": "fail",
        "code": "EXPIRED_REFRESH_TOKEN",
        "message": "The session has expired. Please relog in."
      });
    }

    if (error instanceof JsonWebTokenError) {
      console.log(error);
      response.status(403).send({
        "status": "error",
        "message": "The token is either invalid or malformed."
      });
    }

    if (error instanceof Error) {
      response.status(403).send({
        "status": "error",
        "message": error.message
      });
    }
  }
}
