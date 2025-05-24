"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/common/ui/toast";
import { signIn } from "../services/auth-service";

interface FormData {
  username: string;
  password: string;
  remember_me: boolean;
}

export default function SignIn() {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    remember_me: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    const username = formData.username.trim();
    const password = formData.password.trim();

    if (!username) {
      errors.push("username is required");
    }

    if (!password) {
      errors.push("Password is required");
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain an uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("Password must contain a lowercase letter");
      }
      if (!/[0-9]/.test(password)) {
        errors.push("Password must contain a number");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateForm();

    if (!isValid) {
      for (const error of errors) {
        showToast(error, "error");
      }
    } else {
      /* const result = await signIn(formData?.username, formData?.password);
      console.log("Result: ",result); */

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="font-bold text-2xl text-center">
          Sign in to your account
        </h2>
        <form className="flex flex-col gap-6 p-6 sm:p-10 bg-white shadow-sm rounded-xl w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="shadow text-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline focus:border focus:border-gray-400"
              id="username"
              type="email"
              placeholder="Username"
              value={formData?.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="shadow text-sm border border-gray-300 rounded w-full py-2 px-3 pr-10 text-gray-700 focus:outline-none focus:shadow-outline focus:border focus:border-gray-400"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData?.password}
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
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <input
                className="focus:ring-0"
                type="checkbox"
                id="remember-me"
                checked={formData?.remember_me}
                name="remember_me"
                onChange={handleChange}
              />
              <label className="text-sm font-medium" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <Link
              href="/login"
              className="text-sm font-medium text-blue-500 hover:text-blue-800 text-left"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer transition duration-300 ease-in-out"
            type="button"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
