import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import prisma from "@/server/utils/prisma";
import { generateTokens } from "@/server/utils/auth";

export const login: RequestHandler = async (request, response) => {
  try {
    const body = z.object({
      email: z.string().email({
        message: "Please provide a valid email address."
      }),
      password: z.string().min(4, "Password field must have a minimum of 4 characters.")
    });

    const credentials = body.parse(request.body);

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

interface RefreshTokenPayload extends jwt.JwtPayload {
  accessExpiration: number;
}

export const refresh: RequestHandler = (request, response) => {
  try {
    const headers = request.headers;
    let authorization = headers.authorization;

    if (!authorization) {
      throw new Error("Authorization wasn't provided.");
    }

    // Get the second element since the first element is the prefix `bearer`.
    authorization = authorization?.split(" ")[1];

  } catch(error) {

  }
}