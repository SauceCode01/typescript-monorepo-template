import { z } from "zod";
import { UserSchema } from "../../../models/user";

export const query = z.object({
  includeProfile: z.boolean().optional(),
});

export const response = {
  200: z.object({
    user: UserSchema,
  }),
  400: z.object({
    message: z.string(),
  }),
  500: z.object({
    message: z.string(),
  }),
};

// "params" will be auto-injected by the builder based on [userId]
