import { Glob } from "bun";

import builder from "@/server/graphql/builder";

const ROOT = "@/server";

// types
import "@/server/graphql/types";

const mutations = new Glob("./graphql/mutations/*");
const queries = new Glob("./graphql/queries/*");

for await (const path of queries.scan("./")) {
  const current = path.slice(2);
  require(`${ROOT}/${current}`);
}

for await (const path of mutations.scan("./")) {
  const current = path.slice(2);
  require(`${ROOT}/${current}`);
}

export default builder.toSchema();