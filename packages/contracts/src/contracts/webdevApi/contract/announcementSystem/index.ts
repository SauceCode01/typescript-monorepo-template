import {
  publicAnnouncementInsertSchema,
  publicAnnouncementRowSchema,
} from "@/schemas/supabase.schema.js";
import {
  createEndpoint,
  createRoute,
  createRoutes,
} from "@/types/contract.types.js";
import { SchemaFactory } from "../../utils/base.schemas.js";
import { announcementRoutes } from "./announcement.route.js";

export const announcementSystemRoutes = createRoutes({
  announcements: createRoute({
    path: "/study-jams",
    routes: announcementRoutes,
  }),
});
