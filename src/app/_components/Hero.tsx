import React from "react";
import { Button } from "./ui/button";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-container padding-container flex items-center justify-between overflow-hidden py-10">
      <div className="">
        <h1 className="text-primary-100 w-[486px] text-[72px] font-black ">
          Informasi Biaya Hidup Mahasiswa
        </h1>
        <p className="mb-5 w-[442px] text-xl">
          Kenali biaya hidup di kota rantau untuk perencanaan keuangan yang
          lebih matang.
        </p>
        <Button size="lg" className="flex gap-3 rounded-lg font-semibold">
          Daftar Sekarang
          <span>
            <GoArrowUpRight />
          </span>
        </Button>
      </div>
      <div className="relative">
        <Image
          className="absolute  bottom-0 right-0 top-10"
          src={"/heroimage.svg"}
          alt="heroimage"
          width={588}
          height={460}
        />
        <Image
          src={"/pattern.svg"}
          className="ml-60"
          alt="heroimage"
          width={708}
          height={577.96}
        />
      </div>
    </div>
  );
};

export default Hero;
