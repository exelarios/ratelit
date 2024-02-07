import { createGraphQLError, createYoga } from "graphql-yoga";
import { initContextCache } from "@pothos/core";
import jwt from "jsonwebtoken";

import schema from "@/server/graphql/schema";
import type { User } from "@/server/graphql/builder";
import secrets from "@/server/utils/secrets";
import { encodeGlobalID } from "@pothos/plugin-relay";
import prisma from "@/server/prisma";

const PORT = Bun.env.PORT || 3000;
const IS_PRODUCTION = process.env.PRODUCTION === "PRODUCTION";
const ACCESS_TOKEN_SECRET = secrets.accessToken();

type AccessToken = User & jwt.JwtPayload;

async function getContextByCredentials(email: string, password: string) {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      password: true
    },
    where: {
      email: email
    }
  });

  if (!user) {
    return null;
  }

  const isCorrectPassword = await Bun.password.verify(password, user.password);

  if (isCorrectPassword) {
    return {
      email,
      id: user.id
    }
  }

  return null;
}

async function getContextByAuthorization(authorization: string) {
  const [bearer, token] = authorization.split(" ");

  if (bearer.toLowerCase() !== "bearer") {
    throw createGraphQLError("Failed to parse authorization.");
  }

  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessToken | null;

  if (payload?.email == undefined && payload?.id == undefined) {
    return null;
  }

  return {
    id: payload.id,
    email: payload.email
  }
}

interface Credentials {
  email: string;
  password: string;
}

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
      let payload = null;

      const authorization = request.headers.get("authorization");
      const credentials = params?.variables as Credentials;

      if (authorization) {
        payload = await getContextByAuthorization(authorization);
      } else if (credentials?.email != undefined && credentials?.password != undefined) {
        payload = await getContextByCredentials(credentials.email, credentials.password);
      }

      if (payload) {
        return {
          ...output,
          user: {
            email: payload?.email,
            id: payload?.id ? encodeGlobalID("User", payload.id) : undefined
          }
        }
      }

      return output;
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
      console.error(error);
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