import { publicWalletRowSchema } from "@/schemas/supabase.schema.js";
import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import z from "zod";
import { SchemaFactory } from "../../utils/base.schemas.js";

export const redeemRoutes = createRoutes({
  put: createEndpoint({
    method: "POST",
    request: {
      body: z.object({
        code: z.string(),
      }),
    },
    response: {
      200: SchemaFactory.Response.single(publicWalletRowSchema),
      500: SchemaFactory.Response.error(),
      400: SchemaFactory.Response.error(),
      404: SchemaFactory.Response.error(),
    },
  }),
});
