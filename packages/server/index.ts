import { createGraphQLError, createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";

import schema from "@/server/graphql/schema";
import prisma from "./prisma";
import jwt from "jsonwebtoken";
import secrets from "@/server/utils/secrets";

export interface AccessToken extends jwt.JwtPayload {
  id: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = secrets.accessToken();

const PORT = Bun.env.PORT || 3000;
const IS_PRODUCTION = process.env.PRODUCTION === "PRODUCTION";

const yoga = createYoga({
  schema,
  multipart: true,
  landingPage: false,
  maskedErrors: IS_PRODUCTION,
  logging: true,
  context: async (props) => {
    try {
      const { request, params } = props;
      const authorization = request.headers.get("authorization");
    
      if (!authorization) return;
    
      const [bearer, token] = authorization.split(" ");
      if (bearer.toLowerCase() !== "bearer") {
        throw createGraphQLError("Failed to parse authorization.");
      }
  
      const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessToken | null;
  
      const user = await prisma.user.findUniqueOrThrow({
        select: {
          email: true,
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
          createdAt: true
        },
        where: {
          id: payload?.id
        }
      });

      return {
        ...initContextCache(),
        isAuthenticated: true,
        user: user,
      }
    } catch(error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw createGraphQLError("The session has expired.", {
          originalError: error,
          extensions: {
            code: "EXPIRED_ACCESS_TOKEN"
          }
        });
      } else if (error instanceof Error) {
        console.error(error);
        throw createGraphQLError(error.message);
      }
    }

    return {
      ...initContextCache(),
      isAuthenticated: false,
      user: null,
    }
  }
});

const server = Bun.serve({
  fetch: yoga,
  port: PORT,
});

console.info(`Server is running on ${
  new URL(yoga.graphqlEndpoint,
  `http://${server.hostname}:${server.port}`)}
`);