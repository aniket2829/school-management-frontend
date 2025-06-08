import Register from "@/features/auth/components/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | School Managemenet",
  description: "Sign Up School Managemenet",
};


export default function page(){
  return (
    <>
    <Register />
    </>
  )
}