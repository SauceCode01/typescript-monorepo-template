import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { use, useMemo } from "react";
import { Token } from "./types";
import { getToken, listTokens } from "./endpoints";
import { useAuthStore } from "@/stores/authStore";

type InfiniteTokenQueryProps = Omit<
  UseInfiniteQueryResult<
    InfiniteData<
      {
        result: Token[];
        lastPageToken: string;
      },
      unknown
    >,
    Error
  >,
  "data"
> & {
  data: Token[];
};

export function useInfiniteTokenQuery(limit = 10): InfiniteTokenQueryProps {
  const { token: authToken } = useAuthStore();
  const { data, ...rest } = useInfiniteQuery<
    {
      result: Token[];
      lastPageToken: string;
    },
    Error
  >({
    queryKey: ["tokens", authToken],
    queryFn: async ({ pageParam }) =>
      listTokens(authToken!, "desc", limit, pageParam as string | undefined),
    initialPageParam: null,
    getNextPageParam: (lastPage): string | undefined => {
      if (lastPage.lastPageToken) return undefined;
      return lastPage.lastPageToken;
    },
    enabled: !!authToken,
  });

  const tokens = useMemo(() => {
    return data?.pages.flatMap((page) => page.result) ?? [];
  }, [data]);

  return { data: tokens, ...rest };
}

export function useTokenQuery(tokenId?: string): UseQueryResult<Token, Error> {
  const { token: authToken } = useAuthStore();
  return useQuery({
    queryKey: ["tokens", authToken, tokenId],
    queryFn: async () => {
      const response = await getToken(tokenId!, authToken!);
      return response;
    },
    enabled: !!tokenId && !!authToken,
  });
}
