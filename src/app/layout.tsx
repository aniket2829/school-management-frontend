import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/common/ui/toast";

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "300", "400", "600", "700"]
})


export const metadata: Metadata = {
  title: "School Managemenet",
  description: "School Managemenet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
