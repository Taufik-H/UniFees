import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "UniFees",
  description: "Cost of living for university students in Indonesia",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <header className="bg-primary-20">
            <Navbar />
            <Hero />
          </header>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
