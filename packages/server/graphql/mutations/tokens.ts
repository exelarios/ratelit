import builder from "@/server/graphql/builder";
import { createGraphQLError } from "graphql-yoga";
import { Tokens } from "@/server/graphql/types";
import { generateTokens, verifyRefreshToken } from "@/server/utils/auth";
import jwt from "jsonwebtoken";
import prisma from "@/server/prisma";

builder.mutationField("verifyToken", t => t.prismaField({
  type: "User",
  authScopes: {
    isLoggedIn: true
  },
  resolve: async (query, parent, args, context) => {
    return prisma.user.findFirstOrThrow({
      ...query,
      where: {
        id: context.user?.id
      }
    });
  }
}));

builder.mutationField("refreshToken", t => t.field({
  type: Tokens,
  args: {
    token: t.arg({
      type: "String",
      description: "refresh token",
      required: true
    })
  },
  resolve: async (parent, args, context, info) => {
    let output = {
      access: "",
      refresh: ""
    };

    try {
      const { id, email } = await verifyRefreshToken(args.token);

      const tokens = generateTokens({
        id,
        email
      });

      output = tokens;
    } catch(error) {
      if (error instanceof jwt.NotBeforeError) {
        throw createGraphQLError("Refresh token associated with the access token hasn't expired.", {
          originalError: error,
          extensions: {
            code: "REFRESH_TOKEN_BEFORE_EXPIRED"
          }
        });
      } else if (error instanceof jwt.TokenExpiredError) {
        throw createGraphQLError("The session has expired. Please relog in.", {
          originalError: error,
          extensions: {
            code: "EXPIRED_REFRESH_TOKEN"
          }
        });
      } else if (error instanceof Error) {
        throw createGraphQLError(error.message);
      }
    }

    return output;
  }
}));