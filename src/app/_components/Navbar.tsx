import Link from "next/link";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav
      className={`max-container padding-container z-40  flex w-full items-center justify-between overflow-hidden ${
        session ? "bg-blue-500" : "fixed top-0 bg-transparent"
      } py-3`}
    >
      <Link href={"/"} className="text-xl font-semibold md:text-[32px]">
        UniFees
      </Link>
      <ul className="hidden gap-5 lg:flex ">
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
            <div className="flex items-center gap-3">
              <Link href={"/userreports"}>
                <Button size={"sm"} className="flex gap-2">
                  <GoPlus size={15} />
                  Buat Ulasan
                </Button>
              </Link>
              <HiMiniBell size={25} className="text-primary-100" />

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
                <DropdownMenuContent className="mr-5  w-52 ">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  >
                    <DropdownMenuItem className="flex cursor-pointer items-center justify-start">
                      <IoLogOut size={20} />

                      {session ? "Sign out" : "Masuk"}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
