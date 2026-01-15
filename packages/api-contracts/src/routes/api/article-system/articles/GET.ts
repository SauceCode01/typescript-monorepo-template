import { articleRow } from "#models/article.js";
import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import z from "zod";

export const query = SchemaFactory.Request.Paginated.query();

export const response = {
  200: SchemaFactory.Response.paginated(articleRow),
  ...SchemaFactory.Response.standardErrors(),
};
