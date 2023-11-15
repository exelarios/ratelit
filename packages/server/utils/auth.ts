import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import prisma from "@/server/utils/prisma";
import secrets from "@/server/utils/secrets";

const ACCESS_TOKEN_SECRET = secrets.accessToken();
const REFRESH_TOKEN_SECRET = secrets.refreshToken();

interface AccessToken extends JwtPayload {
  id: string;
  email: string;
}

interface RefreshToken extends JwtPayload {
  id: string;
  accessExpiration: number;
}

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

interface TokenPayload {
  id: string;
}

export function generateTokens(payload: TokenPayload) {
  const access = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    "expiresIn": "1m",
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
    "expiresIn": "5m",
    "notBefore": "1m"
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
  return await verify<AccessToken>(token, ACCESS_TOKEN_SECRET);
}

export async function verifyRefreshToken(token: string) {
  return await verify<RefreshToken>(token, REFRESH_TOKEN_SECRET);
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