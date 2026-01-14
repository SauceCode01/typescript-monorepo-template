import { SchemaFactory } from "#utils/schemaFactory.utils.js";
import { createEndpoint, createRoute } from "@packages/api-typing";
import { z } from "zod";

export const health = createRoute({
  path: "/health",
  routes: {
    get: createEndpoint({
      method: "GET",
      request: {},
      response: {
        200: SchemaFactory.Response.single(
          z.object({
            data: z.string(),
          })
        ),
        ...SchemaFactory.Response.standardErrors(),
      },
    }),
  },
});
