import {
  publicStudyJamInsertSchema,
  publicStudyJamRowSchema,
} from "@/schemas/supabase.schema.js";
import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import { SchemaFactory } from "../../utils/base.schemas.js";
import { studyJamRoutes } from "./studyJam.route.js";

export const studyJamSystemRoutes = createRoutes({
  studyJams: createRoute({
    path: "/study-jams",
    routes: studyJamRoutes,
  }),
});
