import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import { GraphQLError } from "graphql";

import { generateTokens } from "@/server/utils/auth";
import { createGraphQLError } from "graphql-yoga";

import { User } from "@/server/graphql/types";

builder.relayMutationField("login", {
  inputFields: (t) => ({
    email: t.string({
      required: true
    }),
    password: t.string({
      required: true
    })
  })
}, {
  resolve: async (parent, args, context) => {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        avatar: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        password: true
      },
      where: {
        email: args.input.email.toLowerCase(),
      }
    });

    if (!user) {
      throw createGraphQLError("User doesn't exist.", {
        extensions: {
          code: "USER_NOT_FOUND"
        }
      });
    }

    const isCorrectPassword = await Bun.password.verify(args.input.password, user.password);

    if (!isCorrectPassword) {
      throw createGraphQLError("Incorrect password.", {
        extensions: {
          code: "USER_INCORRECT_PASSWORD"
        }
      });
    }

    const payload = {
      email: user.email,
      id: user.id
    };

    const tokens = generateTokens(payload);

    return {
      ...tokens,
      user
    }
  }
}, {
  outputFields: (t) => ({
    access: t.string({
      resolve: (result) => result.access
    }),
    refresh: t.string({
      resolve: (result) => result.refresh
    }),
    user: t.field({
      type: User,
      resolve: (result) => result.user
    })
  })
});