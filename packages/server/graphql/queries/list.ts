import { createGraphQLError } from "graphql-yoga";

import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

builder.queryField("List", (t) => t.prismaField({
  type: "List",
  args: {
    id: t.arg({
      type: "String",
      description: "The list assoicated to this id.",
      required: true
    })
  },
  resolve: async (query, root, args, context, info) => {
    if (!context.isAuthenticated) {
      throw createGraphQLError("No access token has been provided. Please log in.");
    }

    return prisma.list.findFirstOrThrow({
      ...query,
      where: { 
        id: args.id
      }
    });
  }
}));