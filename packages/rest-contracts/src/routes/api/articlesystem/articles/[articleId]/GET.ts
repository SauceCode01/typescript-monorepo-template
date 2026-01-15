import { ArticleModels } from "#models/article.model.js";
import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { z } from "zod";

export const params = z.object({
  articleId: z.string(),
});

export const response = {
  200: SchemaFactory.Response.single(ArticleModels.row),
  ...SchemaFactory.Response.standardErrors(),
};
