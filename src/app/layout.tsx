import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "../../context/auth/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PantryPal",
  description: "An AI based pantry-tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Analytics/>
      <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthProvider>
    
  );
}
