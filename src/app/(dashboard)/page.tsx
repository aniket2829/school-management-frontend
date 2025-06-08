"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/contexts";
import { AuthStatus } from "@/features/auth/contexts/types";
import Loader from "../loading";

export default function Home() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.status === AuthStatus.UNAUTHENTICATED) {
      router.push("/signin");
    }
  }, [state.status,router]);

  switch (state.status) {
    case AuthStatus.CHECKING:
      return <Loader />;

    case AuthStatus.UNAUTHENTICATED:
      return null;

    case AuthStatus.AUTHENTICATED:
      return (
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {state.user?.email ?? "Guest"}
          </h1>
          <p className="mt-4 text-gray-600">
            You are successfully authenticated!
          </p>
        </div>
      );

    default:
      return null;
  }
}