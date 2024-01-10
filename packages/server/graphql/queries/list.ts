import { createGraphQLError } from "graphql-yoga";

import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

builder.queryField("Feed", (t) => t.prismaConnection({
  type: "List",
  cursor: "id",
  authScopes: {
    isLoggedIn: true
  },
  resolve(query, parent, args, context, info) {
    return prisma.list.findMany({
      ...query
    });
  },
}));

builder.queryField("List", (t) => t.prismaField({
  type: "List",
  args: {
    id: t.arg({
      type: "String",
      description: "The list assoicated to this id.",
      required: true
    })
  },
  authScopes: {
    isLoggedIn: true
  },
  resolve: async (query, root, args, context, info) => {
    return prisma.list.findFirstOrThrow({
      ...query,
      where: { 
        id: args.id
      }
    });
  }
}));