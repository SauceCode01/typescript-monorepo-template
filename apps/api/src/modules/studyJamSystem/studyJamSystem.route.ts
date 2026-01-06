import { Router } from "express";
import {
  StudyJamController,
  studyJamController,
} from "./studyJamSystem.controller.js";
import {
  AuthMiddleware,
  authMiddleware,
} from "@/middlewares/auth.middleware.js";

export class StudyJamSystemRouter {
  constructor(
    private controller: StudyJamController = studyJamController,
    private auth: AuthMiddleware = authMiddleware
  ) {}

  getRouter = () => {
    const router = Router();

    router.post("/", this.controller.create);
    router.get("/", this.controller.list);
    router.get("/:id", this.controller.get);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

export const studyJamSystemRouter = new StudyJamSystemRouter();
