import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { ArticleModels } from "#models/article.model.js";

export const body = SchemaFactory.Request.withPayload(ArticleModels.insertDTO);

export const response = {
  200: SchemaFactory.Response.single(ArticleModels.row),
  ...SchemaFactory.Response.standardErrors(),
};
