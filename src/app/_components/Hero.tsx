import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-primary-20 max-container padding-container  flex items-center justify-between overflow-hidden pt-20">
      <div className="">
        <h1 className="text-primary-100 w-[486px] text-[72px] font-black ">
          Informasi Biaya Hidup Mahasiswa
        </h1>
        <p className="text-md mb-5 w-[442px]">
          Kenali biaya hidup di kota rantau untuk perencanaan keuangan yang
          lebih matang.
        </p>
        <Link
          href={"/api/auth/signin"}
          className={`w-[200px] rounded-lg ${buttonVariants()}`}
        >
          Daftar Sekarang
          <span>
            <GoArrowUpRight />
          </span>
        </Link>
      </div>
      <div className="relative">
        <Image
          className="absolute  bottom-0 right-0 top-10"
          src={"/heroimage.svg"}
          alt="heroimage"
          width={588}
          height={460}
          priority
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
