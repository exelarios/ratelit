import {
	MutationConfig,
	MutationParameters,
	CacheConfig,
} from "relay-runtime";

import {
	GraphQLError,
	ErrorCode
} from "@ratelit/shared/types";

import {
	GraphQLError
} from "graphql"

declare module 'babel-plugin-relay/macro' {
	export { graphql as default } from 'react-relay'
}

declare module "react-relay" {
	interface CacheConfig {
		metadata: {
			token: boolean;
			[key: string]: unknown;
		}
	}

	interface UseMutationConfig<TMutation extends MutationParameters> {
		cacheConfig?: CacheConfig | undefined;
	}
}

declare global {
	interface Error {
		source: {
			errors: GraphQLError[]
		}
	}
}