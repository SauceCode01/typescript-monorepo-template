import { ApiResponse } from "@/types/ApiInterface";
import {
  StreakDuplicate,
  UserStats,
  UserStatsDuplicate,
  WalletDuplicate,
} from "../userStats/UserStats";

export const getUserStats = async (
  authToken: string,
  uid: string
): Promise<UserStats> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const route = `${base_url}/api/stats/${uid}`;
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

  const resultPayload = (await result.json()) as ApiResponse<UserStats>;

  const stats = resultPayload.data as UserStats;
  return stats;
};

export const listUsersStats = async (
  sortDirection: "asc" | "desc" = "asc"
): Promise<UserStatsDuplicate[]> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(
    `${base_url}/api/stats?sortDirection=${sortDirection}`,
    {
      method: "GET",
    }
  );

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<
    UserStatsDuplicate[]
  >;

  const data = resultPayload.data!;
  return data;
};

export const listUsersWallets = async (
  sortDirection: "asc" | "desc" = "asc"
): Promise<WalletDuplicate[]> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(
    `${base_url}/api/stats/all/wallets?sortDirection=${sortDirection}`,
    {
      method: "GET",
    }
  );

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<WalletDuplicate[]>;

  const data = resultPayload.data!;
  return data;
};

export const listUsersStreaks = async (
  sortDirection: "asc" | "desc" = "asc"
): Promise<StreakDuplicate[]> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const result = await fetch(
    `${base_url}/api/stats/all/streaks?sortDirection=${sortDirection}`,
    {
      method: "GET",
    }
  );

  if (!result.ok) {
    const resultPayload = (await result.json()) as ApiResponse;
    throw new Error(resultPayload.message);
  }

  const resultPayload = (await result.json()) as ApiResponse<StreakDuplicate[]>;

  const data = resultPayload.data!;
  return data;
};
