import { HttpClient } from "@/common/utils/http-client";
interface SignInResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
const SIGN_IN_URL = "/v1/auth/token"

export async function signIn(username: string, password: string): Promise<SignInResponse> {
  const defaultHeaders = {
    mode: "cors" as RequestMode,
    'Content-Type': 'application/json',
  };

  const apiClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL!, defaultHeaders);
  const body = { username, password };

  try {
    const data = await apiClient.post<SignInResponse>(SIGN_IN_URL, body);

    /* localStorage.setItem("token", data.token); */

    return data;
  } catch (error: any) {
    console.error('Sign in error:', error.message);
    throw new Error(error.message || 'An unexpected error occurred during sign in');
  }
}