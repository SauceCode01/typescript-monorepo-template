"use client";
import React from "react";
import { Navbar } from "./_components/Navbar";
import { UserStatsSidebar } from "./_components/UserStatsSidebar";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-row p-4 gap-4">
        <div className="w-full flex flex-col flex-1">{children}</div>
        <div className="w-full flex flex-1 max-w-sm">
          <UserStatsSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
