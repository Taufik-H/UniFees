import Image from "next/image";
import { Button } from "../_components/ui/button";
import ListReports from "../_components/ui/list-reports";
import { Suspense, useState } from "react";
import LoadReports from "../_components/loading";
import SearchReport from "../_components/ui/searchreport";

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="max-container">
      <div className="repative flex  flex-col items-center justify-center">
        <Image
          src={"/assets/dashboardimage.webp"}
          width={1440}
          height={480}
          alt="dashboard image"
          className="min-h-[480px] w-full object-cover object-center "
        />
        <div className="absolute flex  flex-col gap-3 text-center ">
          <h1 className="max-w-[431px] text-center text-[48px] font-bold capitalize leading-[50px] text-white">
            Jelajahi Biaya hidup dikotamu
          </h1>
          {/* <h1 className="text-center text-[48px] font-bold capitalize"></h1> */}
          <p className="text-xs text-white md:text-sm">
            Optimalkan pengeluaran sehari-hari dengan mudah dan efisien
          </p>
          <SearchReport />
          <p className="text-start text-xs text-white">
            Contoh : Bandung,Purwokerto,Jakarta, dsb
          </p>
        </div>
      </div>
      <div className=" padding-container my-10">
        <div className="flex justify-center gap-2 font-medium">
          <Button>For You</Button>
          <Button variant="secondary">Saved Location</Button>
          <Button variant="secondary">History</Button>
        </div>
        <Suspense key={query + currentPage} fallback={<LoadReports />}>
          <ListReports query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
