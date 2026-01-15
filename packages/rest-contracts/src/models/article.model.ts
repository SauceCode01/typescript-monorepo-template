import z from "zod";
export declare namespace ArticleModels {
    const row: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        content: z.ZodString;
    }, z.core.$strip>;
    type row = z.infer<typeof row>;
    const insertDTO: z.ZodObject<{
        content: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
    type insertDTO = z.infer<typeof insertDTO>;
    const updateDTO: z.ZodObject<{
        content: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type updateDTO = z.infer<typeof updateDTO>;
}
//# sourceMappingURL=article.model.d.ts.map