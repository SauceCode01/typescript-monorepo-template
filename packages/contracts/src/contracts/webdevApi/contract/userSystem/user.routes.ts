import {
  publicUserProfileRowSchema,
  publicWalletRowSchema,
  publicWalletTransactionRowSchema,
} from "@/schemas/supabase.schema.js";
import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import z from "zod";
import { SchemaFactory } from "../../utils/base.schemas.js";
import { walletRoutes } from "./wallet.routes.js";

export const userRoutes = createRoutes({
  get: createEndpoint({
    method: "GET",
    request: {
      params: z.object({
        userId: z.string(),
      }),
    },
    response: {
      200: z.object({
        status: z.string(),
        message: z.string(),
        data: publicUserProfileRowSchema,
      }),
      500: SchemaFactory.Response.error(),
    },
  }),
  wallet: walletRoutes,
});
