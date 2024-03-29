import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "./_components/Navbar";
import { cn } from "@/lib/utils";

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
    <html lang="en" className="scroll-smooth">
      <script
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDaNiN-jv_uekKLWWmBNR4TNkAcJQiRak8&callback=console.debug&libraries=maps,marker&v=beta"
      ></script>
      <body className={cn("scroll-smooth bg-white", inter.className)}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <header className="w-full">
            <Navbar />
          </header>
          {children}
        </TRPCReactProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
