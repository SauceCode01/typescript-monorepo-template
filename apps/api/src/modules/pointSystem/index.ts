import { Router } from "express";
import { walletRouter as defaultWalletRouter } from "./wallet.route.js";
import { walletTransactionRouter as defaultWalletTransactionRouter } from "./transaction.route.js";

export const getWalletApiRouter = (
  walletRouter: Router = defaultWalletRouter,
  walletTransactionRouter: Router = defaultWalletTransactionRouter
) => {
  const router = Router();

  router.use("/", walletRouter);
  router.use("/transactions", walletTransactionRouter);

  return router;
};
