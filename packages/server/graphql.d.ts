import { ErrorCode } from "@ratelit/shared/types";

declare module "@graphql-tools" {
  interface GraphQLErrorOptions {
    extensions?: {
      code: ErrorCode
    }
  }
}