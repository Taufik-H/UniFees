import Link from "next/link";
import React from "react";
import { NAVBAR_ITEMS } from "../constant";
import { Button } from "./ui/button";
import { getServerAuthSession } from "@/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="max-container padding-container flex items-center justify-between py-3">
      <Link href={"/"} className="text-[32px] font-semibold">
        UniFees
      </Link>
      <ul className="flex gap-5">
        {NAVBAR_ITEMS.map((item) => (
          <li key={item.key}>
            <Link
              href={item.link}
              className="capitalize text-neutral-600 transition-all duration-200 hover:font-medium hover:text-neutral-900"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="rounded-lg border-slate-700 bg-transparent font-semibold"
        >
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "Sign out" : "Sign in"}
          </Link>
        </Button>
        <Button variant="default" className="rounded-lg font-semibold">
          Daftar
        </Button>
      </div>
    </nav>
  );
}
