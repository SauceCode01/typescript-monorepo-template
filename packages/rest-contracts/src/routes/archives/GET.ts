import { archiveSchema } from "#models/archive.js";
import { z } from "zod";

export const user = z.object({
  id: z.string().uuid().describe("Unique identifier for the user"),
  name: z.string().describe("Name of the user"),
  email: z.string().email().describe("Email address of the user"),
});

export const query = z.object({
  page: z
    .object({
      number: z
        .number()
        .min(1)
        .default(1)
        .describe("Page number for pagination"),
      size: z
        .number()
        .min(1)
        .max(100)
        .default(10)
        .describe("Number of items per page"),
    })
    .optional(),
});

export const response = {
  200: z.object({
    status: z.string().describe("API status message"),
    message: z.string().describe("API message"),
    data: archiveSchema.array().describe("List of archives"),
  }),
  400: z.object({
    message: z.string().describe("Error message"),
  }),
  500: z.object({
    message: z.string().describe("Error message"),
  }),
};
