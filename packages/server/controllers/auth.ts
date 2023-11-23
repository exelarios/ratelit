import { RequestHandler } from "express";
import { z } from "zod";

import prisma from "@/server/utils/prisma";
import { generateTokens, parseToken, verifyRefreshToken } from "@/server/utils/auth";
import { NotBeforeError, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import * as validate from "@ratelit/shared/validate";

export const login: RequestHandler = async (request, response) => {
  try {
    const credentials = validate.login.parse(request.body);

    const user = await prisma.user.findUniqueOrThrow({
      select: {
        id: true
      },
      where: {
        email: credentials.email
      }
    });

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
      "success": true,
      "message": "logged in",
      "payload": {
        "accessToken": tokens.access,
        "refreshToken": tokens.refresh
      },
    });

  } catch(_error) {
    const error = _error as Error;
    response.status(400).send({
      "success": false,
      "message": error instanceof z.ZodError ? error.issues : error.message
    });
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
        "success": true,
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
      "success": true,
      "message": "User has been sucessfully created.",
      "payload": {
        "accessToken": tokens.access,
        "refreshToken": tokens.refresh
      },
    });

  } catch(_error) {
    const error = _error as Error;
    console.log(error);
    response.status(400);
    response.send({
      "success": false,
      "message": error instanceof z.ZodError ? error.issues : error.message
    });
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
      "accessToken": tokens.access,
      "refreshToken": tokens.refresh
    });

  } catch(error) {
    if (error instanceof NotBeforeError) {
      response.status(403).send({
        "success": false,
        "message": "Access token associated with the access token hasn't expired."
      });
    }

    if (error instanceof TokenExpiredError) {
      response.status(403).send({
        "success": false,
        "message": "The session has expired. Please relog in."
      });
    }

    if (error instanceof JsonWebTokenError) {
      console.log(error);
      response.status(403).send({
        "success": false,
        "message": "The token is either invalid or malformed."
      });
    }

    if (error instanceof Error) {
      response.status(403).send({
        "success": false,
        "message": error.message
      });
    }
  }
}