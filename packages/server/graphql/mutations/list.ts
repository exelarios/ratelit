import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

import { Visibility } from "@/server/graphql/types";
import { createGraphQLError } from "graphql-yoga";
import { decodeGlobalID } from "@pothos/plugin-relay";

const ListCreateInput = builder.inputType("ListCreateInput", {
  fields: (t) => ({
    title: t.string({
      required: true
    }),
    thumbnail: t.string(),
    category: t.string(),
    visibility: t.field({
      type: Visibility,
      required: true
    }),
    description: t.string(),
  })
});

builder.mutationField("createList", (t) => t.prismaField({
  type: "List",
  args: {
    data: t.arg({
      type: ListCreateInput,
      required: true
    })
  },
  resolve: async (query, parent, args, context) => {
    return prisma.list.create({
      ...query,
      data: {
        title: args.data.title,
        thumbnail: args.data.thumbnail,
        visibility: args.data.visibility,
        category: args.data.category,
        description: args.data.description,
        members: {
          create: {
            role: "OWNER",
            userId: context.user!.id
          }
        },
      }
    });

    // return {
    //   ...list,
    //   id: decodeGlobalID(list.id).id
    // }
  }
}));