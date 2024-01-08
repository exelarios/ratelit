import { FetchFunction } from "relay-runtime";
import { ENDPOINT } from "@/mobile/utils/constants";
import { GraphQLError } from "@ratelit/shared/types";

import store from "@/mobile/utils/token";

type Headers = {
  "Accept": string;
  "Content-Type": string;
  "Authorization"?: string;
}

type Tokens = {
  access: string;
  refresh: string;
}

async function refreshTokens() {
  console.log("initialzing refresh token");
  try {
    const refresh = await store.getRefresh();

    if (!refresh) {
      throw new Error("Refresh token was not provided.");
    }

    const query = `
      mutation fetchRefreshTokenMutation($token: String!) {
        refreshToken(token: $token) {
          access
          refresh
        }
      }
    `;

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        query: query,
        variables: {
          token: refresh
        }
      })
    });

    const payload = await response.json();
    const errors = payload?.errors as GraphQLError[];
    if (payload?.error) {
      const output = [];
      for (const error of errors) {
        console.error(error.message);
        output.push(error.message);
      }
      throw new Error(output.join("\n"));
    }

    const tokens = payload.data.refreshToken as Tokens;

    await store.setAccess(tokens.access);
    await store.setRefresh(tokens.refresh);

    return tokens;
  } catch(error) {
    console.error("refreshToken", error);
  }
}

const fetchFn: FetchFunction = async (request, variables, cacheConfig) => {
  let headers: Headers = {
    "Accept": "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
    "Content-Type": "application/json"
  }

  // By default, we will asssume the request requires authorization token.
  // If not required, the request can explicitly declare it doesn't use authorization.
  const useAuthorization = 
    cacheConfig.metadata?.token === undefined 
    || cacheConfig.metadata?.token === true;

  if (useAuthorization) {
    const token = await store.getAccess();
    console.log(token);
    console.log("using authourzation");
    headers = {
      ...headers,
      "Authorization": `bearer ${token}`
    }
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  const data = await response.json();
  if (data?.errors) {
    const errors = data.errors as GraphQLError[];
    for (const error of errors) {
      if (useAuthorization) {
        const extensions = error.extensions;
        if (extensions?.code === "EXPIRED_ACCESS_TOKEN") {
          await refreshTokens();
          return await fetchFn(request, variables, cacheConfig);
        }

        if (extensions?.code === "INVALID_AUTH_TOKEN") {
          await store.clear();
          throw new Error("The authorization tokens were malformed. Please restart app.");
        }
      } else {
        throw new Error(error.message, {
          cause: error
        });
      }
    }
  }

  return data;
}

export default fetchFn;