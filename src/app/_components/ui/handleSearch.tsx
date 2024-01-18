"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function handleSearch(query: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  query ? params.set("query", query) : params.delete("query");
  const rp = replace(`${pathname}?${params.toString()}`);
}
