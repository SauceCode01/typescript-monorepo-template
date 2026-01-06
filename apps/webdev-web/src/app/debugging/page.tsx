"use client";

import { useAuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const page = () => { 

  return (
    <>
      <div className="flex flex-col gap-2 items-start">
        <div> Debugging Page</div>
      </div>
    </>
  );
};

export default page;
