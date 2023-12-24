import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import { GraphQLError } from "graphql";

builder.queryField("User", (t) =>
  t.prismaField({
    type: "User",
    description: "Query a user based on the user's email.",
    args: {
      email: t.arg({
        type: "String",
        required: true,
      })
    },
    resolve: async (query, root, args, ctx, info) => {
      try {
        return prisma.user.findFirstOrThrow({
          ...query,
          where: {
            email: args.email
          }
        }).catch(error => {
          return Promise.reject(new GraphQLError(error.message))
        });
      } catch(error) {
        return Promise.reject(new Error("Oops! Something went wrong."));
      }
    },
  })
);