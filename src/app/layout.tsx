import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/Navbar";

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
      <body className={`w-fit bg-gray-500 font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <header className="w-full">
            <Navbar />
          </header>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
