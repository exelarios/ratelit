import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import secrets from "@/server/utils/secrets";

const JWT_SECRET = secrets.JWT();

/**
 * A middleware callback check if client is authenticated via access token.
 */
const isAuthenticated: RequestHandler = (request, response, next) => {
  try {
    const { accessToken } = request.cookies;
    console.log("@token", accessToken);

    if (accessToken == undefined) {
      return response.status(403).send({
        "success": false,
        "message": "No access token has been provided. Please log in"
      });
    }

    const isValidToken = jwt.verify(accessToken, JWT_SECRET);
    if (!isValidToken) {
      return response.status(403).send({
        "success": false,
        "message": "The access token it either invalid or expired. Please relogin."
      });
    }

    next();
  } catch(_error) {
    const error = _error as Error;
    response.status(403).send({
      "success": false,
      "message": error.message
    })
  }
}

export default isAuthenticated;