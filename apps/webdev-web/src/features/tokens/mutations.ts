import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTokenDTO, Token } from "./types";
import { claimToken, createToken, voidToken } from "./endpoints";
import { UserStats } from "../userStats/UserStats";

export function useCreateTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: {
      createTokenDTO: CreateTokenDTO;
      authToken: string;
    }): Promise<Token> => {
      const newToken = await createToken(param.authToken, param.createTokenDTO);
      return newToken;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
      queryClient.invalidateQueries({
        queryKey: ["tokens" ],
      });
    },
  });
}

export function useVoidTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: {
      authToken: string;
      tokenId: string;
    }): Promise<Token> => {
      const updatedToken = await voidToken(param.authToken, param.tokenId);
      return updatedToken;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tokens", variables.tokenId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });
    },
  });
}

export function useClaimTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: {
      authToken: string;
      tokenId: string;
    }): Promise<{ updatedUserStats: UserStats; updatedToken: Token }> => {
      const response = await claimToken(param.authToken, param.tokenId);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tokens", "userStats", variables.tokenId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });
    },
  });
}
