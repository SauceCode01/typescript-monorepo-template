import { publicUserProfileRowSchema } from "@/schemas/supabase.schema.js";
import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import { userRoutes } from "./user.routes.js";

export const userSystemRoutes = createRoutes({
  user: createRoute({
    path: "/:userId",
    routes: userRoutes,
  }),
});
 