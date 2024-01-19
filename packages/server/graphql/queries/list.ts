import { createGraphQLError } from "graphql-yoga";

import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import { decodeGlobalID } from "@pothos/plugin-relay";

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
    const { id } = decodeGlobalID(args.id);
    return prisma.list.findFirstOrThrow({
      ...query,
      where: { 
        id: id
      }
    });
  }
}));