import { createGraphQLError, createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";
import jwt from "jsonwebtoken";

import schema from "@/server/graphql/schema";
import type { User } from "@/server/graphql/builder";
import secrets from "@/server/utils/secrets";

const PORT = Bun.env.PORT || 3000;
const IS_PRODUCTION = process.env.PRODUCTION === "PRODUCTION";
const ACCESS_TOKEN_SECRET = secrets.accessToken();

type AccessToken = User & jwt.JwtPayload;

const yoga = createYoga({
  schema,
  multipart: true,
  landingPage: false,
  maskedErrors: IS_PRODUCTION,
  logging: true,
  context: async ({ request, params }) => {
    const output = {
      ...initContextCache(),
      user: null
    }

    try {
      const authorization = request.headers.get("authorization");
      if (!authorization) {
        return output;
      }

      const [bearer, token] = authorization.split(" ");
      if (bearer.toLowerCase() !== "bearer") {
        throw createGraphQLError("Failed to parse authorization.");
      }

      const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessToken | null;

      return {
        ...output,
        user: {
          email: payload?.email,
          id: payload?.id
        }
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw createGraphQLError("The session has expired.", {
          originalError: error,
          extensions: {
            code: "EXPIRED_ACCESS_TOKEN"
          }
        });
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw createGraphQLError("There was something wrong with the provided token.", {
          originalError: error,
          extensions: {
            code: "INVALID_AUTH_TOKEN"
          }
        });
      } else {
        if (error instanceof Error) {
          throw createGraphQLError(error.message);
        }
      }
    }

    return output;
  },
});

const server = Bun.serve({
  fetch: yoga,
  port: PORT,
});

console.info(`Server is running on ${
  new URL(yoga.graphqlEndpoint,
  `http://${server.hostname}:${server.port}`)}
`);