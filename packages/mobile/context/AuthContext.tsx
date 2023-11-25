import { createContext, useContext, useMemo, useEffect, useReducer } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

interface State {
  user: any;
  tokens: {
    access: string,
    refresh: string
  };
  isLoading: boolean;
}

type Action = 
  | { type: "SET_TOKENS", payload: { access: string, refresh: string } }
  | { type: "SESSION", payload: any }
  | { type: "LOADED" }

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
      case "SESSION":
        if (state.tokens.access) {
          SecureStore.setItemAsync(ACCESS_TOKEN_KEY, state.tokens.access);
        }

        if (state.tokens.refresh) {
          SecureStore.setItemAsync(REFRESH_TOKEN_KEY, state.tokens.refresh);
        }

        return {
          ...state,
          user: action.payload,
          isLoading: false
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
      console.log(error.message);
    }
  }
}

const initialState = {
  user: null,
  tokens: {
    access: null,
    refresh: null
  },
  isLoading: true
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state]);

  const handleVerifyToken = async () => {
    try {
      const authorization = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const response = await fetch("http://localhost:3000/api/auth/verify", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authorization}`
        }
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      dispatch({
        type: "SESSION",
        payload: result.payload.user
      });

      router.replace("/");
    } catch(error) {
      if (error instanceof Error) {
        // ask for refresh token, if token has expired
        console.log(error);
        dispatch({
          type: "LOADED"
        });
      }
    }
  };

  useEffect(() => {
    // todo: check secure store if tokens exist.
    handleVerifyToken();
  }, [state?.tokens]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}