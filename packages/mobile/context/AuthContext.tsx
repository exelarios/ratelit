import { createContext, useContext, useMemo, useEffect, useReducer, useCallback } from "react";
import { router } from "expo-router";
import { graphql, useMutation } from "react-relay";

import { useToast } from "@/mobile/context/ToastContext";
import tokens from "@/mobile/utils/token";

import type {
  AuthContextValidateSessionMutation,
  AuthContextValidateSessionMutation$data
} from "./__generated__/AuthContextValidateSessionMutation.graphql"; 

type User = Partial<AuthContextValidateSessionMutation$data["verifyToken"]>;

interface State {
  user?: User;
  isLoading: boolean;
  isLoggedIn: boolean;
}

type SessionPayload = {
  user: User
}

type Action = 
  | { type: "LOGIN", payload: SessionPayload }
  | { type: "RESUME_SESSION", payload: SessionPayload }
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


// Don't put any side-effects functions that causes re-render while
// the reducer action is taking effect. For instance, changing router
// inside of the reducer. e.g router.replace("/home");
function reducer(state: State, action: Action): State {
  console.log(`INVOKED ${action.type}`);
  const type = action.type;
  try {
    if (type === "LOGIN") {
      const { user } = action.payload;
      return {
        ...state,
        user,
        isLoading: false,
        isLoggedIn: true
      }
    } else if (type === "RESUME_SESSION") {
      const { user } = action.payload;

      return {
        ...state,
        user,
        isLoading: false,
        isLoggedIn: true
      } 
    } else if (type === "LOADED") {
      return {
        ...state,
        isLoading: false
      }
    } else if (type === "CLEAR_SESSION") {
      tokens.clear();

      return {
        ...state,
        user: null,
        isLoading: false,
        isLoggedIn: false
      }
    } else {
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
  isLoading: true,
  isLoggedIn: false
}

const AuthContextValidateSessionMutation = graphql`
  mutation AuthContextValidateSessionMutation {
    verifyToken {
      firstName
      avatar
      email
      id
      name
      firstName
      createdAt
      lastName
    }
  }
`;

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();

  const [validateTokenMutation] = useMutation<AuthContextValidateSessionMutation>(AuthContextValidateSessionMutation);

  const value = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state]);

  const checkForTokens = useCallback(async () => {
    // If our current session context ins't be initialized.
    if (!state.isLoggedIn) {
      const access = await tokens.getAccess();
      // If the tokens aren't found in device's store.
      // we will redirect user to login in.
      if (!access) {
        console.log("no session active");
        return dispatch({
          type: "LOADED",
        });
      }

      validateTokenMutation({
        variables: {},
        onCompleted: async (data) => {
          const user = data.verifyToken;

          dispatch({
            type: "RESUME_SESSION",
            payload: {
              user
            }
          });

          router.replace("/Home");
        },
        onError(error) {
          console.error(error);
        }
      })
    }
  }, [state]);

  useEffect(() => {
    // The function gets invoke as AuthContext gets initialized.
    // Checks whether the client is authenticated via tokens.
    // The token is check through the server to ensure it's legitmate.
    checkForTokens();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}