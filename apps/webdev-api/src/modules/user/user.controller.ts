import { createExpressController, Schemas } from "@packages/api-types";
import { RequestHandler } from "express";
import {
  WalletService,
  walletService as defaultWalletService,
} from "../pointSystem/wallet.service.js";
import {
  walletTransactionService,
  WalletTransactionService,
} from "../pointSystem/transaction.service.js";


export class UserController {
  constructor(
    private walletService: WalletService = defaultWalletService,
    private transactionService: WalletTransactionService = walletTransactionService
  ) {}

  getUserWallet: RequestHandler = createExpressController(
    Schemas.users.wallet.get,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.walletService.getWalletByUser(
        input.params.userId
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch wallet.",
        });
      }

      if (!data) {
        return output(404, {
          status: "error",
          message: "Wallet not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data,
      });
    }
  );

  getUserWalletTransactions: RequestHandler = createExpressController(
    Schemas.users.wallet.transactions.list,
    async ({ input, output, res, req }) => {
      input.query;
      const { data, error } = await this.transactionService.listByUser(
        input.query.page.number,
        input.query.page.size,
        input.params.userId
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch wallet transactions.",
        });
      }

      if (!data) {
        return output(404, {
          status: "error",
          message: "Wallet transactions not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data.list,
        meta: {
          totalRecords: data.count,
          pageSize: input.query.page.size,
          currentPage: input.query.page.number,
          totalPages: Math.ceil(data.count / input.query.page.size),
        },
      });
    }
  );

  getUserStreak: RequestHandler = async (req, res) => {
    res.json({
      meta: { success: true, message: "this route is not yet implemented." },
    });
  };

  getUserProfile: RequestHandler = async (req, res) => {
    res.json({
      meta: { success: true, message: "this route is not yet implemented." },
    });
  };
}

export const userController = new UserController();
