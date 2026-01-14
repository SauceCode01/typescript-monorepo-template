import {z} from "zod";

export const archiveSchema = z.object({
  id: z.string().uuid().describe("Unique identifier for the archive"),
  name: z.string().min(1).describe("Name of the archive"),
  description: z
    .string()
    .optional()
    .describe("Optional description of the archive"),
  tags: z.array(z.string()).describe("Tags associated with the archive"),
  isPublic: z.boolean().describe("Visibility status of the archive"),
});
