"use client";

import { auth } from "@/lib/firebase/firebase"; 
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect } from "react";

export const page = () => {
  const { user, token, state, error, loginWithGoogle, logout, role } =
    useAuthStore();

  useEffect(() => {
    const stuff = async () => {
      const claim = await auth.currentUser?.getIdTokenResult();
      console.log("claim", claim);
    };
    stuff();
  }, [state]);

  return (
    <>
      <div className="w-full flex flex-col gap-2 p-2 max-w-sm">
        <div className="border-2 p-2">authState: {state}</div>
        <div
          className="border-2 p-2"
          onClick={() => {
            // copy token
            navigator.clipboard.writeText(token || "");
            console.log("token copied");
          }}
        >
          token: {token} 
        </div>
        <div className="border-2 p-2">
          role: {role ? role : "null"}
        </div>
        <div className="border-2 p-2">
          user: {user ? JSON.stringify(user, null, 2) : "null"}
        </div>
        <div className="border-2 p-2">error: {error}</div>
      </div>

      {state === "unauthenticated" && (
        <>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </>
      )}
      {state === "authenticated" && (
        <>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
};

export default page;
