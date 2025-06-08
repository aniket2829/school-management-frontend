"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "../services/auth-service";
import { type SignIn, signInSchema } from "../models/auth-model";
import { useAuth } from "../contexts";
import { toast } from "sonner";
import  { useRouter} from "next/navigation";

export default function SignIn() {
  const { dispatch } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignIn>({
    email: "dev@example.com",
    password: "Hello@123",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof SignIn, string[]>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field when user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async () => {
    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors(errors);
      return;
    }

    try {
      const result = await signIn(formData);
      console.log(result)
      dispatch({ type: "LOGIN_SUCCESS", payload: { access_token: result.data.access_token, user: result.data.user } });
      toast.success("Sign in successful");
      router.push("/");
      // Handle success...
    } catch (err: any) {
      toast.error(err.message || "Sign in failed");

      dispatch({ type: "LOGIN_FAILED", payload: err.message });
      
      setFormErrors((prev) => ({
        ...prev,
        password: [err.message || "Sign in failed"],
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="font-bold text-2xl text-center">
          Sign in to your account
        </h2>
        <form
          className="flex flex-col gap-6 p-6 sm:p-10 bg-white shadow-sm rounded-xl w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="shadow text-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-400"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="text-sm text-red-500 font-semibold">{formErrors.email[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="shadow text-sm border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-400"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[39px] text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formErrors.password && (
              <p className="text-sm text-red-500 font-semibold">{formErrors.password[0]}</p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer transition duration-300 ease-in-out"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-md text-gray-800">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
