import express from "express";
import { vi } from "vitest";
import { studyJamSystemRouter } from "../../studyJamSystem.route.js";
import { studyJamModel } from "../../studyJam.model.js";

vi.mock("@/modules/studyJam/studyJam.model.js");

export const resetStudyJamMocks = (count = 25) => {
  vi.clearAllMocks();
  (studyJamModel as any).__resetMockData(count);
};

export const createTestApp = (userRole = "user") => {
  const app = express();
  app.use(express.json());

  app.use((req, _res, next) => {
    if (userRole !== "unauthenticated") {
      (req as any).user = { id: "user-1" };
      (req as any).role = userRole;
      (req as any).customClaims = { role: userRole };
    }
    next();
  });

  app.use("/api/study-jams", studyJamSystemRouter);
  return app;
};
