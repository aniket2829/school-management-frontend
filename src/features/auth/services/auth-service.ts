import { ApiResponse, HttpClient, HttpClientV2 } from "@/common/utils/http-client";
import { SignIn, SignInResponse, SignUp, SignUpResponse } from "../models/auth-model";

const SIGN_IN_URL = "/v1/auth/token";
const SIGN_UP_URL = "/v1/auth/register";

export async function signIn(SignIn: SignIn): Promise<SignInResponse> {
  const defaultHeaders = {
    mode: "cors" as RequestMode,
    "Content-Type": "application/json",
  };

  const apiClient = new HttpClient(
    process.env.NEXT_PUBLIC_BASE_URL!,
    defaultHeaders
  );
  const body = SignIn;

  try {
    const data = await apiClient.post<SignInResponse>(SIGN_IN_URL, body);

    localStorage.setItem("access_token", data.data.access_token);
    localStorage.setItem("user_data", JSON.stringify(data.data.user));

    return data;
  } catch (error: any) {
    console.error("Sign in error:", error.message);
    throw new Error(
      error.message || "An unexpected error occurred during sign in"
    );
  }
}

export async function signUp(SignIn: SignUp): Promise<ApiResponse<SignUpResponse>> {
  const defaultHeaders = {
    mode: "cors" as RequestMode,
    "Content-Type": "application/json",
  };

  const apiClient = new HttpClientV2(
    process.env.NEXT_PUBLIC_BASE_URL!,
    defaultHeaders
  );

  const result = await apiClient.post<SignUpResponse>(SIGN_UP_URL, SignIn);
  return result;
}