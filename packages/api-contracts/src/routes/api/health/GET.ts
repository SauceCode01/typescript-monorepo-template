import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { z } from "zod";

export const response = {
  200: SchemaFactory.Response.single(
    z.object({
      data: z.string(),
    })
  ),
  ...SchemaFactory.Response.standardErrors(),
};
