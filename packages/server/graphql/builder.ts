import SchemaBuilder from "@pothos/core";
import { DateTimeISOResolver,  } from "graphql-scalars";

import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import prisma from "@/server/prisma";
// import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import type PrismaTypes from "@pothos/plugin-prisma/generated";
// import type { FileUpload } from "graphql-upload/Upload.mjs";

interface Upload {
  encoding: string;
  type: string;
}

export type User = {
  email: string;
  id: string;
}

type Builder = {
  Scalars: {
    Upload: {
      Input: Upload,
      Output: never
    },
    Date: {
      Input: Date,
      Output: Date
    }
  }
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

builder.addScalarType("Date", DateTimeISOResolver);

builder.scalarType("Upload", {
  serialize: (n) => n
});
// builder.addScalarType("Upload", GraphQLUpload);

builder.queryType({});
builder.mutationType({});

export default builder;