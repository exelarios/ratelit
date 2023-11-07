import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import secrets from "@/server/utils/secrets";
import prisma from "@/server/utils/prisma";

const Router = express.Router();

const JWT_SECRET = secrets.JWT();

Router.post("/login", async (request, response) => {
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

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h"
    });

    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: true
    });

    response.send({
      "success": true,
      "message": "logged in"
    });

  } catch(_error) {
    const error = _error as Error;
    response.status(400).send({
      "success": false,
      "message": error instanceof z.ZodError ? error.issues : error.message
    });
  }

});

Router.post("/signup", async (request, response) => {
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

    if (doesEmailExist !== undefined) {
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

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h"
    });

    response.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: true,
    });

    response.send({
      "success": true,
      "message": "User has been sucessfully created."
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
});

Router.post("/forgot", (request, response) => {

});

Router.post("/google", (request, response) => {

});

export default Router;