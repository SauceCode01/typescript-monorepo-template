import z from "zod";
export const articleRow = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
});

// --- Insert DTO ---
export const articleInsertDTO = z.object({
  content: z.string(),
  title: z.string(),
  description: z.string(),
});

// --- Update DTO ---
export const articleUpdateDTO = z.object({
  content: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});
