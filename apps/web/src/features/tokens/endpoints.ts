import { ApiResponse } from "@/types/ApiInterface";
import { UserStats } from "../userStats/UserStats";
import { CreateTokenDTO, Token } from "./types";

export const createToken = async (
  authToken: string,
  createTokenDTO: CreateTokenDTO
): Promise<Token> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      payload: createTokenDTO,
    }),
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<Token>;

  const newToken = resultPayload.data as Token;

  return newToken;
};

export const voidToken = async (
  authToken: string,
  tokenId: string
): Promise<Token> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/tokens/${tokenId}/void`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<Token>;

  const token = resultPayload.data as Token;

  return token;
};

export const claimToken = async (
  authToken: string,
  tokenId: string
): Promise<{ updatedUserStats: UserStats; updatedToken: Token }> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(`${base_url}/api/tokens/${tokenId}/claim`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<{
    updatedUserStats: UserStats;
    updatedToken: Token;
  }>;

  const data = resultPayload.data!;
  return data;
};

export const getToken = async (
  tokenId: string,
  authToken: string
): Promise<Token> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const route = `${base_url}/api/tokens/${tokenId}`;
  const result = await fetch(route, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<Token>;

  const token = resultPayload.data as Token;
  return token;
};

export const listTokens = async (
  authToken: string,
  sortDirection: "asc" | "desc" = "asc",
  limit: number = 10,
  lastPageToken: string | undefined
): Promise<{
  result: Token[];
  lastPageToken: string;
}> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(
    `${base_url}/api/tokens?sortDirection=${sortDirection}&limit=${limit}${
      lastPageToken ? `&lastPageToken=${lastPageToken}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!result.ok) {
    const errorPayload = await result.json().catch(() => ({}));
    throw new Error(errorPayload.message || "Failed to fetch blogs");
  }

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<{
    result: Token[];
    lastPageToken: string;
  }>;

  const data = resultPayload.data!;
  return data;
};
