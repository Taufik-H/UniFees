"use client";
import { LuMapPin } from "react-icons/lu";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import handleSearch from "./handleSearch";
import toast from "react-hot-toast";

export default function SearchReport() {
  const [value, setValue] = useState<string>("");

  handleSearch(value);

  return (
    <>
      <div className="mx-auto flex  w-10/12 items-center justify-center rounded-xl bg-white p-2 focus-within:text-rose-500 md:w-full md:p-3">
        <LuMapPin
          size={30}
          className="transition-all duration-200 ease-in-out"
        />

        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tulis lokasimu"
          className="focus-visible:ring-none text-medium text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 focus:text-slate-900  focus:ring-transparent"
        />
        <Button>Cari</Button>
      </div>
    </>
  );
}
