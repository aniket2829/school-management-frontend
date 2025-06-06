"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "../services/auth-service";
import { type SignUp, signUpSchema } from "../models/auth-model";
import { useAuth } from "../contexts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const { dispatch } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUp>({
    email: "dev@example.com",
    password: "Hello@123",
    full_name: "John Doe",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof SignUp, string[]>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const schemaResult = signUpSchema.safeParse(formData);

    if (!schemaResult.success) {
      const errors = schemaResult.error.flatten().fieldErrors;
      setFormErrors(errors);
      return;
    }
    const result = await signUp(formData);
    console.log(result);
    if (!result.success) {
      if (result.error && result.error.detail) {
        toast.error(result.error.detail);
        setFormErrors((prev) => ({
          ...prev,
          password: [result.error?.detail || "Sign in failed"],
        }));
      }
      return;
    }
    if (result.success) {
      toast.success("Sign up successful");
      router.push("/signin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="font-bold text-2xl text-center">
          <span className="text-blue-600">Sign up to create an account</span>
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
            <label className="text-sm font-medium" htmlFor="full_name">
              Full Name
            </label>
            <input
              className="shadow text-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline focus:border-gray-400"
              id="full_name"
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              name="full_name"
              onChange={handleChange}
            />
            {formErrors.full_name && (
              <p className="text-sm text-red-500 font-semibold">
                {formErrors.full_name[0]}
              </p>
            )}
          </div>
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
              <p className="text-sm text-red-500 font-semibold">
                {formErrors.email[0]}
              </p>
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
              <p className="text-sm text-red-500 font-semibold">
                {formErrors.password[0]}
              </p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer transition duration-300 ease-in-out"
            type="submit"
          >
            Sign up
          </button>
        </form>

          <p className="text-center text-md text-gray-800">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
