import SchemaBuilder from "@pothos/core";

import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";

import prisma from "@/server/prisma";

import type PrismaTypes from "@pothos/plugin-prisma/generated";

type Builder = {
  PrismaTypes: PrismaTypes,
}

const builder = new SchemaBuilder<Builder>({
  plugins: [PrismaPlugin, RelayPlugin],
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