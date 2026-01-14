import { z } from "zod";

export const response = {
  200: z.object({
    status: z.string().describe("API status message"),
    message: z.string().describe("API message"),
    data: z.object({
      something: z.string().describe("Some data field"),
    }),
  }),
  500: z.object({
    message: z.string().describe("Error message"),
  }),
};
