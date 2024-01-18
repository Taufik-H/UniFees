"use client";
import { LuMapPin } from "react-icons/lu";
import { Input } from "./input";
import { Button } from "./button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SearchReport = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : "",
    );
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="mx-auto flex  w-10/12 items-center justify-center rounded-xl bg-white p-2 focus-within:text-rose-500 md:w-full md:p-3">
        <LuMapPin
          size={30}
          className="transition-all duration-200 ease-in-out"
        />

        <Input
          onChange={(e) => setInputValue(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Tulis lokasimu"
          className="focus-visible:ring-none text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 focus:text-slate-900  focus:ring-transparent"
        />
        <Button onClick={() => handleSearch(inputValue)}>Cari</Button>
      </div>
    </>
  );
};

export default SearchReport;
