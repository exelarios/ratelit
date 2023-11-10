import jwt, { JsonWebTokenError } from "jsonwebtoken";

import secrets from "@/server/utils/secrets";

const ACCESS_TOKEN_SECRET = secrets.accessToken();
const REFRESH_TOKEN_SECRET = secrets.refreshToken();

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