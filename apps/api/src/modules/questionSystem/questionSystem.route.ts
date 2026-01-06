import { Router } from "express";
import {
  questionSystemController,
  QuestionSystemController,
} from "./questionSystem.controller.js";
import {
  AuthMiddleware,
  authMiddleware,
} from "@/middlewares/auth.middleware.js";

export class QuestionSystemRouter {
  constructor(
    private controller: QuestionSystemController = questionSystemController,
    private auth: AuthMiddleware = authMiddleware
  ) {}

  getRouter = () => {
    const router = Router();

    router.get("questions/", this.controller.list);
    router.get("questions/:questionId", this.controller.get);
    router.post("questions/", this.auth.requireAuth, this.controller.create);
    router.put("questions/:questionId", this.controller.update);
    router.delete("questions/:questionId", this.controller.delete);

    router.post("questions/:questionId/answers", this.controller.submitAnswer);
    router.get("questions/:questionId/answers", this.controller.listAnswers);

    return router;
  };
}

export const questionSystemRouter = new QuestionSystemRouter();
