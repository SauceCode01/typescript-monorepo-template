import { Router } from "express";
import {
  ArticleController,
  articleControllerInstance,
} from "./articleSystem.controller.js";

export class ArticleSystemRouter {
  constructor(
    private articleController: ArticleController = articleControllerInstance
  ) {}

  getRotuer() {
    const router = Router();

    router.get("/articles", this.articleController.list);

    router.post("/articles", this.articleController.create);

    router.delete("/articles/:articleId", this.articleController.delete);

    router.get("/articles/:articleId", this.articleController.getOne);

    router.patch("/articles/:articleId", this.articleController.update);

    return router;
  }
}

export const articleRouterInstance = new ArticleSystemRouter();
