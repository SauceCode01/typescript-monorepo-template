import { archiveSchema } from "#models/archive.js";
import z from "zod";

export const body = z.object({
  data: archiveSchema,
});

export const response = {
  200: z.object({
    message: z.string().describe("Success message"),
    archiveId: z.string().uuid().describe("ID of the created archive"),
  }),
  400: z.object({
    message: z.string().describe("Error message"),
  }),
  500: z.object({
    message: z.string().describe("Error message"),
  }),
};
