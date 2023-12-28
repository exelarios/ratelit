import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import { createGraphQLError } from "graphql-yoga";

builder.queryField("verifyToken", (t) => t.prismaField({
  type: "User",
  resolve: async (query, parent, args, context) => {
    if (!context.isAuthenticated) {
      throw createGraphQLError("No access token has been provided. Please log in."); 
    }

    const user = await prisma.user.findFirst({
      ...query,
      where: {
        id: context.user.id
      }
    });

    if (!user) {
      throw createGraphQLError(`User associated is the provided token isn't found`, {
        extensions: {
          code: "USER_NOT_FOUND"
        }
      });
    }

    return user;
  }
}));