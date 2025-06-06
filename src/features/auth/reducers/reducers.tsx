import { stat } from "fs";
import { AuthState, AuthAction, AuthStatus } from "../contexts/types";

export const initialState: AuthState = {
    status: AuthStatus.CHECKING,
    user: null,
    access_token: null,
    isLoading: false,
    error: null,
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        status: AuthStatus.AUTHENTICATED,
        user: action.payload.user,
        access_token: action.payload.access_token,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        status: AuthStatus.UNAUTHENTICATED,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        status: AuthStatus.UNAUTHENTICATED,
        user: null,
        access_token: null,
        isLoading: false,
        error: null,
      };
    case "AUTH_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
