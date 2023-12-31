import SchemaBuilder from "@pothos/core";

import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import prisma from "@/server/prisma";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

export type User = {
  email: string;
  id: string;
}

type Builder = {
  PrismaTypes: PrismaTypes;
  Context: {
    user: User | null;
  };
  AuthScopes: {
    isLoggedIn: boolean;
  }
}

const builder = new SchemaBuilder<Builder>({
  plugins: [RelayPlugin, PrismaPlugin, ScopeAuthPlugin],
  prisma: {
    client: prisma,
    filterConnectionTotalCount: true,
    exposeDescriptions: true,
    onUnusedQuery: "warn"
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID"
  },
  authScopes: async (context) => ({
    isLoggedIn(param) {
      return context.user !== null;
    },
  })
});

builder.queryType({});
builder.mutationType({});

export default builder;