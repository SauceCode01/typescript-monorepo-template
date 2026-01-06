import {
  publicQuestionStreakRowSchema,
  publicWalletRowSchema,
} from "src/schemas/supabase.schema.js";
import z from "zod";
import { SchemaFactory } from "../../utils/base.schemas.js";
import { createEndpoint, createRoutes } from "@/types/contract.types.js";

export const walletRoutes = createRoutes({
  list: createEndpoint({
    method: "GET",
    request: {},
    response: {
      200: SchemaFactory.Response.paginated(publicWalletRowSchema),
      500: SchemaFactory.Response.error(),
      400: SchemaFactory.Response.error(),
    },
  }),
});
