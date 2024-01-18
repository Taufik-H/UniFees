import { getServerAuthSession } from "@/server/auth";
import Hero from "./_components/Hero";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="">
      <Hero />
    </main>
  );
}
