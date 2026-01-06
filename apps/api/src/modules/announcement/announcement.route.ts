import { Router } from "express";
import {
  AnnouncementController,
  announcementController,
} from "./announcement.controller.js";
import {
  authMiddleware,
  AuthMiddleware,
} from "@/middlewares/auth.middleware.js";

export const createAnnouncementRouter = (
  controller: AnnouncementController,
  authMiddleware: AuthMiddleware
) => {
  const router = Router();

  router.get("/", authMiddleware.requireAuth, controller.listAnnouncements);

  router.post(
    "/",
    authMiddleware.requireAuth,
    authMiddleware.requireAdminRole,
    controller.createAnnouncement
  );

  router.get("/:id", authMiddleware.requireAuth, controller.getAnnouncement);

  router.put(
    "/:id",
    authMiddleware.requireAuth,
    authMiddleware.requireAdminRole,
    controller.updateAnnouncement
  );

  router.delete(
    "/:id",
    authMiddleware.requireAuth,
    authMiddleware.requireAdminRole,
    controller.deleteAnnouncement
  );

  return router;
};

export const announcementRouter = createAnnouncementRouter(
  announcementController,
  authMiddleware
);
