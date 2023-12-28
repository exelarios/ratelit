import SchemaBuilder from "@pothos/core";

import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import prisma from "@/server/prisma";

import { User as UserType } from "@/server/graphql/types";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

type Builder = {
  PrismaTypes: PrismaTypes,
  Context: {
    user: typeof UserType.$inferType,
    isAuthenticated: boolean;
  }
}

const builder = new SchemaBuilder<Builder>({
  plugins: [PrismaPlugin, RelayPlugin, PrismaUtils],
  prisma: {
    client: prisma,
    filterConnectionTotalCount: true,
    exposeDescriptions: true,
    onUnusedQuery: "warn"
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "ID"
  }
});

builder.queryType({});
builder.mutationType({});

export default builder;