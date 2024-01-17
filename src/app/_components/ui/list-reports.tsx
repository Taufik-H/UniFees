import { api } from "@/trpc/server";
import { Card, CardContent } from "./card";
import { MdVerifiedUser } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

const ListReports = async () => {
  const getReports = await api.userReport.getAll.query();

  // ubah ke currency indonesia
  function Idn(value: number | null) {
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(value));
    // hapus 2 nol ganggu dibelakang
    return formattedValue.replace(/,00$/, "");
  }
  return (
    <div>
      <div className=" my-5 grid bg-rose-500 grid-cols-1 gap-3 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        {getReports.map((report, index) => (
          <Card className=" rounded-2xl" key={report.id + index}>
            <CardContent className="p-5">
              <div className="">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-xs font-bold capitalize">kota</p>
                    <p className="text-2xl font-bold">{report.location}</p>
                    <div className="flex gap-2">
                      <p className="text-xs text-slate-700">
                        {report.latitude}
                      </p>
                      <p className="text-xs text-slate-700">
                        {report.longitude}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-[82px] w-[94px] flex-col items-center justify-center gap-2 rounded-xl bg-rose-200 p-3 text-red-500">
                    <BsGraphUpArrow size={25} className=" font-black" />
                    <p className="text-sm">High Cost</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/makan.svg"
                      width={40}
                      height={40}
                      alt="high cost icon"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-medium">Makanan</p>
                      <div className="text-md flex gap-1 font-medium">
                        <span>{Idn(report.foodPrizeFrom)}</span>
                        <span>s/d</span>
                        <span>{Idn(report.foodPrizeTo)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/transportasi.svg"
                      width={40}
                      height={40}
                      alt="high cost icon"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-medium">Transportasi Umum</p>
                      <div className="text-md flex gap-1 font-medium">
                        <span>{Idn(report.transportationPrizeFrom)}</span>
                        <span>s/d</span>
                        <span>{Idn(report.transportationPrizeTo)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/cost.svg"
                      width={40}
                      height={40}
                      alt="high cost icon"
                    />
                    <div className="flex flex-col">
                      <p className="text-xs font-medium">Kos</p>
                      <div className="text-md flex gap-1 font-medium">
                        <span>{Idn(report.costPrizeFrom)}</span>
                        <span>s/d</span>
                        <span>{Idn(report.costPrizeTo)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* button bookmark & lihat selengkapnya */}
              <div className="my-5 ml-3 flex items-center gap-5 text-slate-300">
                <MdVerifiedUser />
                <p className="italic">belum ada yang menyetujui data</p>
              </div>
              <div className="flex items-center justify-start gap-3">
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="rounded-lg border border-slate-200"
                >
                  <BsBookmark />
                  {/* jika di klik */}
                  {/* <BsBookmarkCheckFill /> */}
                </Button>
                <Link href={"#"}>
                  <Button variant={"outline"}>Lihat Selengkapnya</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListReports;
