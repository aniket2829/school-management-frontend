import SignIn from "@/features/auth/components/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | School Managemenet",
  description: "Sign In School Managemenet",
};

export default function page(){
  return (
    <>
    <SignIn />
    </>
  )
}