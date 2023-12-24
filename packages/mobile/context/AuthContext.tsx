import { createContext, useContext, useMemo, useEffect, useReducer, useCallback } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { TokensResponse, VerifyResponse } from "@ratelit/shared/types";
import ClientError from "@ratelit/shared/ClientError";
import { useToast } from "@/mobile/context/ToastContext";
import { User } from "@ratelit/shared/types";
import { ENDPOINT } from "../utils/constants";

interface State {
  user?: User;
  tokens: {
    access: string,
    refresh: string
  };
  isLoading: boolean;
  isLoggedIn: boolean;
}

type Action = 
  | { type: "SET_TOKENS", payload: State["tokens"] }
  | { type: "SET_USER", payload: any }
  | { type: "LOADED" }
  | { type: "CLEAR_SESSION" }

interface AuthContext {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContext.Provider");
  }

  return context;
}

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

function reducer(state: State, action: Action) {
  console.log(`INVOKED ${action.type}`);
  try {
    switch(action.type) {
      case "SET_TOKENS":
        const { access, refresh } = action.payload;
        if (access) {
          SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
        }

        if (refresh) {
          SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
        }

        return {
          ...state,
          tokens: {
            access: access,
            refresh: refresh
          },
          isLoading: true
        }
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          isLoggedIn: true
        }
      case "CLEAR_SESSION": {

        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

        return {
          ...state,
          user: null,
          isLoading: false,
          isLoggedIn: false
        }
      }
      case "LOADED":
        return {
          ...state,
          isLoading: false
        }
      default:
        throw new Error("Invalid action via AuthContext");
    }
  } catch(error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
}

const initialState = {
  user: null,
  tokens: {
    access: null,
    refresh: null
  },
  isLoading: true,
  isLoggedIn: false
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();

  const value = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state]);

  const valdiateRefreshToken = useCallback(async () => {
    try {
      const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      const response = await fetch(`${ENDPOINT}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refresh}`
        }
      });

      const payload = await response.json() as TokensResponse;
      if (payload.success === false) {
        switch(payload.code) {
          case "EXPIRED_REFRESH_TOKEN":
            throw new ClientError(payload.message);
          default:
            throw new Error("Something went wrong.");
        }
      }

      const tokens = payload.data;

      dispatch({
        type: "SET_TOKENS",
        payload: {
          access: tokens.accessToken,
          refresh: tokens.refreshToken
        }
      });
    } catch(error) {
      console.log("valdiateRefreshToken", error);
      if (error instanceof ClientError) {
        toast.add({
          type: "warning",
          message: error.message,
        });
      }
    }
  }, []);

  const validateAccessToken = useCallback(async () => {
    try {
      const authorization = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const response = await fetch(`${ENDPOINT}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authorization}`
        }
      });

      const result = await response.json() as VerifyResponse;
      if (result.success == false) {
        switch(result.code) {
          case "EXPIRED_ACCESS_TOKEN":
            await valdiateRefreshToken();
            return;
          default:
            throw new Error(result.message);
        }
      }

      dispatch({
        type: "SET_USER",
        payload: result.data.user
      });

      router.replace("/home");
    } catch(error) {
      if (error instanceof ClientError) {
        toast.add({
          type: "warning",
          message: error.message,
        });
      }

      dispatch({
        type: "LOADED"
      });
    }
  }, []);

  const checkForTokens = useCallback(async () => {
    if (!state.tokens.access && !state.tokens.refresh) {
      const access = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      dispatch({
        type: "SET_TOKENS",
        payload: {
          access,
          refresh
        }
      });
    }
  }, []);

  useEffect(() => {
    checkForTokens();
  }, []);

  useEffect(() => {
    // todo: check secure store if tokens exist.
    validateAccessToken();
  }, [state?.tokens]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}