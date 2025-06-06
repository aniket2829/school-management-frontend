"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextType } from "./types";
import { initialState, authReducer } from "../reducers";


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data") as string)
      : null;

    if (accessToken) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: user, access_token: accessToken },
      });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
