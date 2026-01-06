import {
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { UserClaims } from "./types";
import { getUserClaims, getUserRecord } from "./endpoints";
import { User } from "firebase/auth";

export function useUserClaimsQuery(
  uid?: string
): UseQueryResult<UserClaims, Error> {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUserClaims(uid!);
      return response;
    },
    enabled: !!uid,
  });
}

export function useUserRecordQuery(uid?: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUserRecord(uid!);
      return response;
    },
    enabled: !!uid,
  });
}
