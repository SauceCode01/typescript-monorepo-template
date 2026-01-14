import { Express, RequestHandler } from "express";
import { articleRouterInstance } from "@/modules/articleSystem/articleSystem.route.js";
import { healthRouterInstance } from "@/modules/health/health.route.js";

export const routesLoader = (app: Express) => {
  app.use("/api/health", healthRouterInstance.getRouter());
  app.use("/api/article-system", articleRouterInstance.getRotuer());
};
