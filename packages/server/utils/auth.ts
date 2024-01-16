import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import prisma from "@/server/prisma";
import secrets from "@/server/utils/secrets";

import { Token } from "@/shared/types";

const ACCESS_TOKEN_SECRET = secrets.accessToken();
const REFRESH_TOKEN_SECRET = secrets.refreshToken();

const ACCESS_TOKEN_DURATION = "10m";
const REFRESH_TOKEN_DURATION = "1y"

/**
 * verify jsonwebtoken asynchronously.
 */
const verify = <T extends JwtPayload>(token: string, secretOrPublicKey: string) => {
  return new Promise<T>((resolve, reject) => {
    try {
      jwt.verify(token, secretOrPublicKey, (error, payload) => {
        if (error) {
          throw error;
        }

        resolve(payload as T);
      });
    } catch(error) {
      reject(error);
    }
  });
}

export function generateTokens(payload: Token) {
  const access = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    "expiresIn": ACCESS_TOKEN_DURATION,
  });

  // Using decode method is fine, since we just signed the token.
  const decode = jwt.decode(access, { json: true });

  if (!decode) {
    // This should never happen, but just in case and to quiet ts lint.
    throw new JsonWebTokenError("Failed to decode generated access token.");
  }

  const refresh = jwt.sign({
    "id": payload.id,
    "refresh": true,
    "accessExpiration": decode.exp 
  }, 
    REFRESH_TOKEN_SECRET, {
    "expiresIn": REFRESH_TOKEN_DURATION,
    "notBefore": ACCESS_TOKEN_DURATION
  });

  return {
    "access": access,
    "refresh": refresh
  }
}

export function parseToken(authorization: string) {
  let [prefix, token] = authorization.split(" ");
  prefix = prefix.toLowerCase();
  if (prefix !== "bearer") {
    throw new Error("Not prefixed as an bearer token");
  }

  return token;
}

export async function verifyAccessToken(token: string) {
  return await verify<Token>(token, ACCESS_TOKEN_SECRET);
}

export async function verifyRefreshToken(token: string) {
  return await verify<Token>(token, REFRESH_TOKEN_SECRET);
}

export async function getUser(token: string) {
  const { id } = await verifyAccessToken(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id
    }
  });

  return user;
}