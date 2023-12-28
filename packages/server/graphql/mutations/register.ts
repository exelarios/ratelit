import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

import * as validate from "@ratelit/shared/validate";
import { User } from "@/server/graphql/types";
import { createGraphQLError } from "graphql-yoga";
import { generateTokens } from "@/server/utils/auth";

builder.relayMutationField("register", {
  inputFields: (t) => ({
    firstName: t.string(),
    lastName: t.string(),
    email: t.string(),
    password: t.string()
  }),
}, {
  resolve: async (parent, args, context) => {
    const credentials = validate.register.parse(args.input);

    const account = await prisma.user.findFirst({
      where: {
        email: credentials.email
      }
    });

    if (account != null) {
      throw createGraphQLError("This email has already been registered. Please try to login or forget password.", {
        extensions: {
          code: "REGISTER_EMAIL_TAKEN"
        }
      });
    }

    const password = await Bun.password.hash(credentials.password, {
      algorithm: "bcrypt",
      cost: 4
    });

    const user = await prisma.user.create({
      select: {
        id: true,
        avatar: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        password: true
      },
      data: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: password,
        avatar: "",
      }
    });

    const payload = {
      email: credentials.email,
      id: user.id
    }

    const tokens = generateTokens(payload);

    return {
      user,
      ...tokens
    }
  }
}, {
  outputFields: (t) => ({
    access: t.string({
      resolve: (result) => result.access
    }),
    refresh: t.string({
      resolve: (result) => result.access
    }),
    user: t.field({
      type: User,
      resolve: (result) => result.user
    })
  })
});


