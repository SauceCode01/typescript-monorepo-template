import { z } from "zod";

export const userModel = z.object({
  id: z.string(),
  name: z.string(),
});
