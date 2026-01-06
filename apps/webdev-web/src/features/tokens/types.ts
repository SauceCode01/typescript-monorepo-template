import { Metatype } from "@/types/Metatype"; 
import { z } from "zod";

export type TokenCore = {
  value: number;
  maxUses: number;
  expirationDate?: number;

  // core metadata
  createdBy: string;
  isValid: boolean;
  code: string;
  claimHistory: {
    uid: string;
    date: number;
  }[];
};

export type Token = Metatype & TokenCore;

export type CreateTokenDTO = Omit<
  TokenCore,
  keyof Metatype | "code" | "createdBy" | "claimHistory" | "isValid"
>;

export const createTokenSchema = z.object({
  value: z.number().min(1, "Value must be at least 1"),
  maxUses: z.number().min(1, "Max uses must be at least 1"),
  expirationDate: z.number().optional(),
});
