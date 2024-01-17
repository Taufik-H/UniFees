import Link from "next/link";
import React, { useState } from "react";
import { NAVBAR_ITEMS } from "../constant";
import { Button } from "./ui/button";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { IoLogOut } from "react-icons/io5";
import { HiMiniBell } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="max-container padding-container flex items-center justify-between bg-transparent py-3">
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
        <Link href={"/userreports"}>
          <Button className="flex gap-2">
            <GoPlus />
            Buat Ulasan
          </Button>
        </Link>
        <HiMiniBell size={25} className="text-primary-100" />
        <div className="">
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={`${session.user?.image}`}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="cursor-pointer rounded-xl"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10 w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-start">
                  <IoLogOut size={20} />
                  <Button size="sm" variant="ghost">
                    <Link
                      href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    >
                      {session ? "Sign out" : "Masuk"}
                    </Link>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {!session && (
          <>
            <Button variant={"outline"}>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Keluar" : "Masuk"}
              </Link>
            </Button>
            <Button>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Keluar" : "Daftar"}
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
