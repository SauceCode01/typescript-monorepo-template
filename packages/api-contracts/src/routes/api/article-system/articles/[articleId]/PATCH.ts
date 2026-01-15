import { articleRow, articleUpdateDTO } from "#models/article.js";
import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { z } from "zod";

export const params = z.object({
  articleId: z.string(),
});

export const body = SchemaFactory.Request.withPayload(articleUpdateDTO);

export const response = {
  200: SchemaFactory.Response.single(articleRow),
  ...SchemaFactory.Response.standardErrors(),
};
