import { Router } from "express";
import { testingController } from "../todo.controller.js";
import { userController as defaultUserController, UserController } from "./user.controller.js";

export class UserRouter {
  constructor(private userController: UserController = defaultUserController) {}

  getRouter = () => {
    const router = Router();

    router.get("/:userId/wallet", this.userController.getUserWallet);
    router.get(
      "/:userId/wallet/transactions",
      this.userController.getUserWalletTransactions
    );
    router.get("/:userId/streak", this.userController.getUserStreak);
    router.get("/:userId/profile", this.userController.getUserProfile);

    return router;
  };
}

export const userRouter = new UserRouter();
