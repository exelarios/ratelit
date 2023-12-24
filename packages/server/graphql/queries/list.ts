import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

builder.queryField("List", (t) => 
  t.prismaField({
    type: "List",
    args: {
      word: t.arg({
        type: "String",
        description: "word",
        required: true
      }),
      id: t.arg({
        type: "String",
        description: "The list assoicated to this id.",
        required: true
      })
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.list.findFirstOrThrow({
        ...query,
        where: { id: args.id }
      })
    }
  })
);