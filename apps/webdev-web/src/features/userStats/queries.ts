import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import {
  StreakDuplicate,
  UserStats,
  UserStatsDuplicate,
  WalletDuplicate,
} from "./UserStats";
import {
  getUserStats,
  listUsersStats,
  listUsersStreaks,
  listUsersWallets,
} from "./endpoints";

export function useUserStatsQuery(
  uid?: string
): UseQueryResult<UserStats, Error> {
  const { token: authToken } = useAuthStore();
  return useQuery({
    queryKey: ["stats", authToken],
    queryFn: async () => {
      const response = await getUserStats(authToken!, uid! );
      return response;
    },
    enabled: !!uid && !!authToken,
  });
}

export function useAllUserStatsQuery(
  sortDirection: "asc" | "desc" = "desc"
): UseQueryResult<UserStatsDuplicate[], Error> {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await listUsersStats(sortDirection);
      return response;
    },
  });
}

export function useAllUserWalletsQuery(
  sortDirection: "asc" | "desc" = "desc"
): UseQueryResult<WalletDuplicate[], Error> {
  return useQuery({
    queryKey: ["wallets", "stats"],
    queryFn: async () => {
      const response = await listUsersWallets(sortDirection);
      return response;
    },
  });
}

export function useAllUserStreaksQuery(
  sortDirection: "asc" | "desc" = "desc"
): UseQueryResult<StreakDuplicate[], Error> {
  return useQuery({
    queryKey: ["streaks", "stats"],
    queryFn: async () => {
      const response = await listUsersStreaks(sortDirection);
      return response;
    },
  });
}
