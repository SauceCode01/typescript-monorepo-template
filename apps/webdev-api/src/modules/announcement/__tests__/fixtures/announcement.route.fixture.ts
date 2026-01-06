import express from "express";
import { vi } from "vitest";
import { announcementModel } from "../../announcement.model.js";
import { announcementRouter } from "../../announcement.route.js";

// 1. Centralize Mocking
vi.mock("@/modules/announcement/announcement.model.js");

// 2. Helper to reset data
export const resetAnnouncementMocks = (count = 25) => {
  vi.clearAllMocks();
  (announcementModel as any).__resetMockData(count);
};

// 3. Helper to create the app with custom auth contexts
export const createTestApp = (userRole = "user") => {
  const app = express();
  app.use(express.json());

  // Inject Auth Middleware Mock
  app.use((req, _res, next) => {
    if (userRole !== "unauthenticated") {
      (req as any).user = { id: "user-1" };
      (req as any).role = userRole;
    }
    next();
  });

  app.use("/api/announcements", announcementRouter);
  return app;
};

// 4. Data Builder (Factory)
export const createPayload = (overrides = {}) => ({
  title: "Default Title",
  content: "Default Content",
  bannerUrl: null,
  ...overrides,
});
