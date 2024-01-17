import { api } from "@/trpc/server";
import { LuMapPin } from "react-icons/lu";

import Image from "next/image";
import React from "react";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
const Dashboard = async () => {
  const getReports = await api.userReport.getAll.query();

  return (
    <div className="max-container ">
      <div className="relative flex flex-col items-center justify-center">
        <Image
          src={"/assets/dashboardimage.webp"}
          width={1440}
          height={480}
          alt="dashboard image"
          className=""
        />
        <div className="absolute flex  flex-col gap-3 text-center ">
          <h1 className="w-[431px] text-center text-[48px] font-bold capitalize leading-[50px] text-white">
            Jelajahi Biaya hidup dikotamu
          </h1>
          {/* <h1 className="text-center text-[48px] font-bold capitalize"></h1> */}
          <p className="text-sm text-white">
            Optimalkan pengeluaran sehari-hari dengan mudah dan efisien
          </p>
          <div className="flex items-center rounded-xl  bg-white p-3">
            <LuMapPin size={30} />

            <Input
              placeholder="Tulis lokasimu"
              className="focus-visible:ring-none text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900  focus:ring-transparent"
            />
            <Button className="font-semibold">Cari</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
