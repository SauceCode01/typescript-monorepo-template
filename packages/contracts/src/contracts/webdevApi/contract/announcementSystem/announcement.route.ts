import { publicAnnouncementInsertSchema, publicAnnouncementRowSchema } from "@/schemas/supabase.schema.js";
import { createEndpoint, createRoute, createRoutes } from "@/types/contract.types.js";
import { SchemaFactory } from "../../utils/base.schemas.js";
import z from "zod";

export const announcementRoutes = createRoutes({
      post: createEndpoint({
        method: "POST",
        request: {
          body: publicAnnouncementInsertSchema.omit({
            creator_id: true,
            id: true,
          }),
        },
        response: {
          201: SchemaFactory.Response.single(publicAnnouncementRowSchema),
          500: SchemaFactory.Response.error(),
          400: SchemaFactory.Response.error(),
        },
      }),

      list: createEndpoint({
        method: "GET",
        request: {
          query: SchemaFactory.Request.Paginated.query(),
        },
        response: {
          200: SchemaFactory.Response.paginated(publicAnnouncementRowSchema),
          500: SchemaFactory.Response.error(),
          400: SchemaFactory.Response.error(),
        },
      }),

      announcement: createRoute({
        path: "/:announcementId",
        routes: createRoutes({
          get: createEndpoint({
            method: "GET",
            request: {
              params: z.object({
                announcementId: z.string(),
              }),
            },
            response: {
              200: SchemaFactory.Response.single(publicAnnouncementRowSchema),
              500: SchemaFactory.Response.error(),
              400: SchemaFactory.Response.error(),
              404: SchemaFactory.Response.error(),
            },
          }),
          put: createEndpoint({
            method: "PUT",
            request: {
              params: z.object({
                announcementId: z.string(),
              }),
              body: publicAnnouncementInsertSchema.omit({
                creator_id: true,
                id: true,
              }),
            },
            response: {
              200: SchemaFactory.Response.single(publicAnnouncementRowSchema),
              500: SchemaFactory.Response.error(),
              400: SchemaFactory.Response.error(),
              404: SchemaFactory.Response.error(),
            },
          }),
          delete: createEndpoint({
            method: "DELETE",
            request: {
              params: z.object({
                announcementId: z.string(),
              }),
            },
            response: {
              200: SchemaFactory.Response.empty(),
              500: SchemaFactory.Response.error(),
              400: SchemaFactory.Response.error(),
              404: SchemaFactory.Response.error(),
            },
          }),
        }),
      }),
    })