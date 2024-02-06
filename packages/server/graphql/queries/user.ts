import builder from "@/server/graphql/builder";
import storage from "@/server/lib/storage";
import prisma from "@/server/prisma";
import { createGraphQLError } from "graphql-yoga";

builder.queryField("User", (t) => t.prismaField({
  type: "User",
  description: "Query a user based on the user's email.",
  args: {
    email: t.arg({
      type: "String",
      required: true,
    }),
  },
  authScopes: {
    isLoggedIn: true
  },
  resolve: async (query, root, args, context, info) => {
    const user = await prisma.user.findFirst({
      ...query,
      where: {
        email: args.email
      }
    });

    if (!user) {
      throw createGraphQLError(`User associated with email '${args.email}' isn't found`, {
        extensions: {
          code: "USER_NOT_FOUND"
        }
      });
    }

    return user;
  },
}));