import { ApiResponse } from "@/types/ApiInterface";  
import { UserClaims } from "./types";
import { User } from "firebase/auth";
 
export const nullifyUserClaims = async (
  authToken: string,
  uid: string
): Promise<void> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/users/${uid}/custom-claims/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }
};
 

export const getUserClaims = async (
  uid: string
): Promise<UserClaims> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/users/${uid}/custom-claims/`, {
    method: "GET", 
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<UserClaims>;

  const claims = resultPayload.data as UserClaims;
  return claims;
};


export const getUserRecord = async (
  uid: string
): Promise<User> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/users/${uid}/`, {
    method: "GET", 
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<User>;

  const user = resultPayload.data as User;
  return user;
};
