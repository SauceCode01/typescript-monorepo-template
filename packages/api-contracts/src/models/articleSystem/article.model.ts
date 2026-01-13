import z from "zod";

export namespace ArticleModels {
  export const row = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
  });
  export type row = z.infer<typeof row>;

  export const insertDTO = row.omit({ id: true });
  export type insertDTO = z.infer<typeof insertDTO>;

  export const updateDTO = row.partial().omit({ id: true });
  export type updateDTO = z.infer<typeof updateDTO>;
}
