import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
});

const satoshi = localFont({
  display: "swap",
  src: [
    {
      path: "../../public/fonts/satoshi.ttf",
    },
  ],
  variable: "--font-satoshi",
});

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
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${satoshi.variable} font-satoshi antialiased`}
      >
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
