import { LuMapPin } from "react-icons/lu";
import Image from "next/image";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import ListReports from "../_components/ui/list-reports";
import { Suspense } from "react";
import LoadReports from "../_components/loading";

const Dashboard = async () => {
  return (
    <div className="max-container bg-teal-500 ">
      <div className="relative flex  flex-col items-center justify-center">
        <Image
          src={"/assets/dashboardimage.webp"}
          width={1440}
          height={480}
          alt="dashboard image"
          className="min-h-[480px] w-full object-cover object-center "
        />
        <div className="absolute flex  flex-col gap-3 text-center ">
          <h1 className="w-[431px] text-center text-[48px] font-bold capitalize leading-[50px] text-white">
            Jelajahi Biaya hidup dikotamu
          </h1>
          {/* <h1 className="text-center text-[48px] font-bold capitalize"></h1> */}
          <p className="text-xs text-white md:text-sm">
            Optimalkan pengeluaran sehari-hari dengan mudah dan efisien
          </p>
          <div className="mx-auto flex  items-center justify-center rounded-xl bg-white p-2 focus-within:text-rose-500 md:w-full md:p-3">
            <LuMapPin
              size={30}
              className="transition-all duration-200 ease-in-out"
            />

            <Input
              placeholder="Tulis lokasimu"
              className="focus-visible:ring-none text-md border-none bg-transparent text-slate-900 outline-0 placeholder:text-slate-900 focus:text-slate-900  focus:ring-transparent"
            />
            <Button className="font-semibold">Cari</Button>
          </div>
        </div>
      </div>
      <div className=" padding-container my-10 bg-green-500">
        <div className="flex justify-center gap-2 font-medium">
          <Button>For You</Button>
          <Button variant="secondary">Saved Location</Button>
          <Button variant="secondary">History</Button>
        </div>
        <Suspense fallback={<LoadReports />}>
          <ListReports />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
