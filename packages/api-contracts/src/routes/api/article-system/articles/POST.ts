import { articleInsertDTO, articleRow } from "#models/article.js";
import { SchemaFactory } from "#utils/schemaFactory.utils.js"; 
export const body = SchemaFactory.Request.withPayload(articleInsertDTO);

export const response = {
  200: SchemaFactory.Response.single(articleRow),
  ...SchemaFactory.Response.standardErrors(),
};
