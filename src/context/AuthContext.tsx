import { PropsWithChildren, createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user:
    localStorage.getItem("user") || ""
      ? JSON.parse(localStorage.getItem("user") || "")
      : null,
  loading: false,
  error: "",
  dispatch: (action: authActions) => {},
};

interface authState {
  user: any;
  loading: boolean;
  error: any;
}

type loginStart = { type: "LOGIN_START" };
type loginSuccess = { type: "LOGIN_SUCCESS"; payload: {} };
type loginError = { type: "LOGIN_ERROR"; payload: String };
type logOut = { type: "LOGOUT" };

type authActions = loginStart | loginSuccess | loginError | logOut;

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state: authState, action: authActions) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
