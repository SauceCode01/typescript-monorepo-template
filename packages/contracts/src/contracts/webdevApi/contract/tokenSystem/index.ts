import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import { redeemRoutes } from "./redeem.route.js";
import {
  publicTokenInsertSchema,
  publicTokenRowSchema,
  publicTokenTemplateInsertSchema,
  publicTokenTemplateRowSchema,
  publicTokenTemplateUpdateSchema,
} from "@/schemas/supabase.schema.js";
import { SchemaFactory } from "../../utils/base.schemas.js";
import z from "zod";
import { templateRoutes } from "./template.route.js";

export const tokenSystemRoutes = createRoutes({
  templates: createRoute({
    path: "/templates",
    routes: templateRoutes,
  }),
  redeem: createRoute({
    path: "/redeem",
    routes: redeemRoutes,
  }),
});
