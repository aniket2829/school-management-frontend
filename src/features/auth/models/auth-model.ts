import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Must be a valid email"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255, { message: "Invalid password" }),
});


export const signUpSchema = signInSchema.extend({
  full_name: z.string().min(1, { message: "Full name is required" }),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;


export const SignInResponseSchema = z.object({
  meta: z.object({}),
  data: z.object({
    access_token: z.string(),
    user: z.object({
      id: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      full_name: z.string(),
      email: z.string(),
      password_hash: z.string()
    })
  })
})

export const SignUpResponseSchema = z.object({
  meta: z.object({}),
  data: z.object({
      id: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      full_name: z.string(),
      email: z.string(),
      password_hash: z.string()
  })
});

export type SignInResponse = z.infer<typeof SignInResponseSchema>;
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;
export type User = SignInResponse["data"]["user"];


