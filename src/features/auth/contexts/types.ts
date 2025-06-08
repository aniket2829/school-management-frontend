import { User, SignIn, SignInResponse } from "../models/auth-model";

export enum AuthStatus {
  CHECKING = 'checking',
  AUTHENTICATED = 'authenticated', 
  UNAUTHENTICATED = 'unauthenticated'
}


export interface AuthState {
  status: AuthStatus;
  user: User | null;
  access_token: string | null;
  isLoading: boolean;
  error:string | null
}

export type AuthAction =
  | { type: "LOGIN_START"}
  | { type: "LOGIN_SUCCESS"; payload: { user: User; access_token: string } }
  | { type: 'LOGIN_FAILED'; payload: string }
  | { type: "LOGOUT" }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: "SET_LOADING"; payload: boolean };

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}
