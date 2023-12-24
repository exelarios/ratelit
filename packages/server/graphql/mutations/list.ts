import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

import { Visibility } from "@/server/graphql/types";

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
})

builder.mutationField("createList", (t) => 
  t.prismaField({
    type: "List",
    args: {
      data: t.arg({
        type: ListCreateInput,
        required: true
      })
    },
    resolve: async (query, parent, args) => {
      return prisma.list.create({
        ...query,
        data: {
          title: args.data.title,
          thumbnail: args.data.thumbnail,
          visibility: args.data.visibility,
          category: args.data.category,
          description: args.data.description,
          editors: {
            create: {
              role: "OWNER",
              // hardcoded value until context is implemented.
              userId: "b53da41d-9945-460d-8986-9b10e64ec82d"
            }
          },
        }
      })
    }
  })
);