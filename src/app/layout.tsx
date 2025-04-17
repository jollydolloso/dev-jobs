import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "./utils/ReactClientQueryProvider";
import Link from "next/link";

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
        <ReactQueryClientProvider>
          <header>
            <Link href="/" className="text-3xl font-bold">
              MyJob Hunt
            </Link>
          </header>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
