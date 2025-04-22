import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import AuthStatus from "./components/auth/AuthStatus";
import Providers from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevJobs",
  description: "Browse developer jobs by stack and location",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-3xl mx-auto p-6 space-y-6`}>
        <Providers>
        <header className="flex gap-2 items-center text-blue-500 group h-10">
              <SearchIcon className="size-8 group-hover:size-10 transition-all duration-75" />
              <Link href="/" className="text-3xl font-bold">
                MyJob Hunt
              </Link>
            </header>
            <AuthStatus />
            {children}
        </Providers>
      </body>
    </html>
  );
}
