import { createRoute } from "@packages/api-typing";
import z from "zod";
import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { Models } from "#models/index.js";

export const article = createRoute({
  path: "/:articleId",
  routes: {
    get: {
   
    },
    patch: {
      method: "PATCH",
     
    },
    delete: {
      method: "DELETE",
     
    },
  },
});

export default article;
