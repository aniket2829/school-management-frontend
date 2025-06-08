import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../app/globals.css";

const satoshi = localFont({
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/satoshi.ttf",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "School Managemenet",
  description: "School Managemenet",
};

export default function AuthLayout({
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
          {children}
      </body>
    </html>
  );
}
