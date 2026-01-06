import { Router } from "express";

export const createUserApiRouter = () => {
  const router = Router();
  return router;
};

export const userApiRouter = createUserApiRouter();
