import { Express } from "express";
import { globalErrorHandler } from "../middlewares/error.middleware";
export const errorHandlerLoader = (app: Express) => {
  app.use(globalErrorHandler);
};
