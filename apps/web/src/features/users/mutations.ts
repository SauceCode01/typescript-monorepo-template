import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nullifyUserClaims } from "./endpoints";

export function useNullifyUserClaimsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: {
      authToken: string;
      uid: string;
    }): Promise<void> => {
      await nullifyUserClaims(param.authToken, param.uid);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
