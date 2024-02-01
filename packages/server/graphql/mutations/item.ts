import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

const ItemCreateInout = builder.inputType("ItemCreateInput", {
  fields: (t) => ({
    name: t.string({
      required: true
    }),
    rank: t.int({
      required: true
    }),
    description: t.string(),
    thumbnail: t.field({
      type: "Upload",
      description: "accepts only base64 encoding"
    }),
  })
});

builder.mutationField("createItem", (t) => t.prismaField({
  type: "Item",
  args: {
    listId: t.arg({
      type: "String",
      required: true
    }),
    data: t.arg({
      type: ItemCreateInout,
      required: true
    })
  },
  authScopes: {
    isLoggedIn: true
  },
  resolve: async (query, parent, args, context, info) => {
    return prisma.item.create({
      ...query,
      data: {
        rank: args.data.rank,
        listId: args.listId,
        name: args.data.name,
        ownerId: context.user?.id!,
        rating: -1,
      }
    });
  }
}))