import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import secrets from "@/server/utils/secrets";
import { generateTokens } from "@/server/utils/auth";

import jsonwebtoken from "@/server/utils/jwt";

const ACCESS_TOKEN_SECRET = secrets.accessToken();
const REFRESH_TOKEN_SECRET = secrets.refreshToken();

/**
 * A middleware callback check if client is authenticated via access token.
 * There are two places the function checks for the access token.
 * 1. Authorization via bearer token.
 * 2. Cookies
 * 
 * If either one of these exists a valid token, the client will be authenticated.
 */
const isAuthenticated: RequestHandler = async (request, response, next) => {
  const headers = request.headers;
  const cookies = request.cookies;

  try {
    // Check if the token is passed through cookies or authorization.
    let token: string | null = null;
    if (headers.authorization) {
      console.log("Authenicate with bearer");
      let value = headers.authorization;
      // Takes the second element and ignore the "bearer" prefix.
      const [_, accessToken] = value.split(" ");
      token = accessToken;
    } else if (cookies?.accessToken) {
      console.log("Authenicate with cookies");
      token = cookies.accessToken;
    }

    if (token == null) {
      throw new Error("No access token has been provided. Please log in");
    }

    try {
      // If there aren't any errors thrown, we move onto the next middleware.
      await jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET);
    } catch(error) {
      if (error instanceof TokenExpiredError) {
        // Check if refresh token cookie exists, we throw an error if it doesn't exist.
        // If the access token was passed via header's Authorization
        // use `api/auth/refresh` to regain a new access token.
        const refreshToken: string = cookies.refreshToken;
        if (!refreshToken) {
          throw new JsonWebTokenError("Failed to find refresh token in cookies.");
        }

        console.log("@token verifying");
        const refresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.RefreshTokenPayload;
        // todo: once verified, invalidate refresh token.
        const accessTokenPayload = {
          id: refresh.id,
        }

        console.log("@token generate toksn");
        const tokens = generateTokens(accessTokenPayload);

        response.cookie("accessToken", tokens.access, {
          "httpOnly": true,
          "sameSite": true
        });

        response.cookie("refreshToken", tokens.refresh, {
          "httpOnly": true,
          "sameSite": true
        });

      }
    }

    next();
  } catch(error) {
    if (error instanceof TokenExpiredError) {
      response.status(403);
      return response.send({
        "success": false,
        "message": "The session has expired. Please relog in."
      });
    }

    if (error instanceof JsonWebTokenError) {
      return response.status(403).send({
        "success": false,
        "message": "The access token is either invalid or expired. Please relog in."
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

export default isAuthenticated;