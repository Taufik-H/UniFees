"use client";
import { LuMapPin } from "react-icons/lu";
import { Input } from "./input";
import { Button } from "./button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

export default function SearchReport() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string>("");
  const [debounceValue] = useDebounce<string>(value, 300);

  const handleSearch = (query: string) => {
    setValue(query);
  };

  useEffect(() => {
    replace(`${pathname}?query=${debounceValue}`);
  }, [debounceValue]);
  return (
    <>
      <div className="mx-auto flex  w-10/12 items-center justify-center rounded-xl bg-white p-2 focus-within:text-rose-500 md:w-full md:p-3">
        <LuMapPin
          size={30}
          className="transition-all duration-200 ease-in-out"
        />

        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Tulis lokasimu"
          className="focus-visible:ring-none text-medium text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 focus:text-slate-900  focus:ring-transparent"
        />
        <Button>Cari</Button>
      </div>
    </>
  );
}
