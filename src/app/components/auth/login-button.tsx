"use client";

import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

type LoginButtonProps = {
  children: React.ReactNode;
};

export const LoginButton = ({ children }: LoginButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <span onClick={() => setIsClicked(true)} className="cursor-pointer">
      {isClicked ? (
        <Button
          size="default"
          className="transation-all gap-2 font-semibold duration-200 ease-in-out"
        >
          <span className=" animate-spin">
            <CgSpinner />
          </span>
          Please wait..
        </Button>
      ) : (
        <div>{children}</div>
      )}
    </span>
  );
};
