import Link from "next/link";
import React, { useState } from "react";
import { NAVBAR_ITEMS } from "../constant";
import { Button } from "./ui/button";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

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
      <div className="flex items-center gap-3">
        <div className="">
          {session && (
            <span>
              <Image
                src={`${session.user?.image}`}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-lg"
              />{" "}
            </span>
          )}
        </div>
        <Button variant={`${session ? "default" : "outline"}`}>
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "Sign out" : "Masuk"}
          </Link>
        </Button>

        {!session && (
          <>
            <Button>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Daftar"}
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
