import jsonwebtoken, { AccessTokenPayload, RefreshTokenPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface AccessTokenPayload extends jsonwebtoken.JwtPayload {
    id: string;
    email: string;
  }

  export interface RefreshTokenPayload extends jsonwebtoken.JwtPayload {
    id: string;
    accessExpiration: number;
  }

}

/**
 * verify jsonwebtoken asynchronously.
 */
const verify = (token: string, secretOrPublicKey: string) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secretOrPublicKey, (error, payload) => {
      if (error != null) {
        reject(error);
      }

      resolve(payload);
    });
  });
}

const jwt = {
  verify
}

export default jwt;