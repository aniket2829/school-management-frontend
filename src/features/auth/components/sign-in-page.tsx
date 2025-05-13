"use client";
import Link from "next/link";
import Button from "@/features/commons/ui/button";

import FacebookIcon from "@/assets/images/FacebookIcon.svg";
import GoogleIcon from "@/assets/images/GoogleIcon.svg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/features/commons/ui/toast/context/useToast";

export default function SignIn() {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    showToast("Hello world!", "success");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="font-bold text-2xl text-center">
          Sign in to your account
        </h2>
        <form className="flex flex-col gap-6 p-6 sm:p-10 bg-white shadow-sm rounded-xl w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email address
            </label>
            <input
              className="shadow text-sm border rounded w-full py-2 px-3 border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline focus:border focus:border-gray-400"
              id="email"
              type="email"
              placeholder="Email address"
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
