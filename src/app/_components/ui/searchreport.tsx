"use client";
import { LuMapPin } from "react-icons/lu";
import { Input } from "./input";
import { Button } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchReport() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [type, setType] = useState("");
  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (value) {
      newParams.set("query", value);
    } else {
      newParams.delete("query");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <>
      <div className="mx-auto flex  w-10/12 items-center justify-center rounded-xl bg-white p-2 focus-within:text-rose-500 md:w-full md:p-3">
        <LuMapPin
          size={30}
          className="transition-all duration-200 ease-in-out"
        />

        <Input
          onChange={(e) => setType(e.target.value)}
          placeholder="Tulis lokasimu"
          className="focus-visible:ring-none text-medium text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 focus:text-slate-900  focus:ring-transparent"
        />
        <Button onClick={() => handleSearch(type)}>Cari</Button>
      </div>
      <div className="flex items-center justify-center">
        <p className="w-10/12 text-start text-xs text-white">
          Contoh : Bandung,Purwokerto,Jakarta, dsb
        </p>
      </div>
    </>
  );
}
