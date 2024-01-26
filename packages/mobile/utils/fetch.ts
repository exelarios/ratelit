import { FetchFunction } from "relay-runtime";
import { ENDPOINT } from "@/mobile/utils/constants";
import { GraphQLError } from "@ratelit/shared/types";

import store from "@/mobile/utils/token";

type Tokens = {
  access: string;
  refresh: string;
}

async function refreshTokens() {
  console.log("refreshing tokens");
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
      for (const error of errors) {
        const extension = error?.extensions;
        switch(extension.code) {
          case "EXPIRED_REFRESH_TOKEN":
            await store.clear();
          default:
            throw error;
        }
      }
    }

    const tokens = payload.data.refreshToken as Tokens;

    await store.setAccess(tokens.access);
    await store.setRefresh(tokens.refresh);

    return tokens;
  } catch(error) {
    console.error("refreshToken", error);
  }
}

const fetchFn: FetchFunction = async (request, variables, cacheConfig, uploadables) => {

  const options: RequestInit = {
    method: "POST",
    headers: {}
  }

  // By default, we will asssume the request requires authorization token.
  // If not required, the request can explicitly declare it doesn't use authorization.
  const useAuthorization = 
    cacheConfig.metadata?.token === undefined 
    || cacheConfig.metadata?.token === true;

  if (useAuthorization) {
    const token = await store.getAccess();
    options.headers = {
      ...options.headers,
      "Authorization": `bearer ${token}`
    }
  }

  if (uploadables) {
    console.log("use multipart/form-data");
    options.headers = {
      ...options.headers,
      "Content-Type": "multipart/form-data"
    }

    const form = new FormData();
    form.append("operations", JSON.stringify({
      query: request.text,
      variables: variables
    }));

    const mapping: {
      [key: string]: string[]
    } = {};

    Object.keys(uploadables).forEach(async (key) => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        mapping[key] = [`variables.${key}`]
      }
    });

    form.append("map", JSON.stringify(mapping));

    Object.keys(uploadables).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        form.append(key, uploadables[key])
      }
    });

    options.body = form;
  } else {
    options.headers = {
      ...options.headers,
      "Accept": "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json"
    }

    options.body = JSON.stringify({
      query: request.text,
      variables: variables
    });
  }

  const response = await fetch(ENDPOINT, options);

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
        console.error(error);
        throw Error(error.message);
      }
    }
  }

  return data;
}

export default fetchFn;