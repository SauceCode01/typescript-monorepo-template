import { Router } from "express";
import {
  HealthController,
  healthControllerInstance,
} from "./health.controller.js";

export class HealthRouter {
  constructor(
    private healthController: HealthController = healthControllerInstance
  ) {}

  public getRouter() {
    const router = Router();

    router.get("/", this.healthController.health);

    return router;
  }
}

export const healthRouterInstance = new HealthRouter();