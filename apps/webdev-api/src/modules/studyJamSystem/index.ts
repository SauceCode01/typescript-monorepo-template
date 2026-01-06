import { Router } from "express";
import { studyJamSystemRouter } from "./studyJamSystem.route.js";

export const createStudyJamApiRouter = (studyJamRouter: Router) => {
  const router = Router();
  router.use("/", studyJamRouter);
  return router;
};

export const studyJamApiRouter =
  createStudyJamApiRouter(studyJamSystemRouter);
