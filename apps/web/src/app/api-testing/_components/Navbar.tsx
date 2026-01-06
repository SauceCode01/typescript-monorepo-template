"use client";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect } from "react";

export const Navbar = () => {
  const { user, token, state, error, loginWithGoogle, logout, role } =
    useAuthStore();
  return (
    <>
      <nav className="w-full p-4 flex flex-row gap-4 items-center justify-start shadow-md bg-white sticky top-0">
        <div className=" ">authState: {state}</div>
        <div className=" ">role: {role}</div>
        <div
          className="border-2 p-2"
          onClick={() => {
            console.log(JSON.stringify(token, null, 2));
          }}
        >
          printToken
        </div>
        <div
          className="border-2 p-2"
          onClick={() => {
            console.log(JSON.stringify(user, null, 2));
          }}
        >
          printUser
        </div>

        {state === "unauthenticated" && (
          <>
            <button className="border-2 p-2" onClick={loginWithGoogle}>
              Login with Google
            </button>
          </>
        )}
        {state === "authenticated" && (
          <>
            <button className="border-2 p-2" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </>
  );
};
