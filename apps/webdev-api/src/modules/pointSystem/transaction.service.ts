import { TablesInsert } from "@packages/api-types";
import {
  walletTransactionModel as defaultWalletTransactionModel,
  WalletTransactionModel,
} from "./transaction.model.js"; 
import { walletService } from "./wallet.service.js";

export class WalletTransactionService {
  constructor(
    private walletTransactionModel: WalletTransactionModel = defaultWalletTransactionModel
  ) {}

  listByUser = async (pageNumber: number, pageSize: number, userId: string) => {
    // get wallet id of user using wallet service 
    const {data: wallet, error: walletError} = await walletService.getWalletByUser(userId);
    if (walletError || !wallet) {
      return { error: walletError || new Error("Wallet not found.") };
    }
    const walletId = wallet.id;

    const { data: listData, error: listError } =
      await this.walletTransactionModel.listByWallet(
        pageNumber,
        pageSize,
        walletId
      );
    if (listError) return { error: listError };

    const { data: countData, error: countError } =
      await this.walletTransactionModel.countWalletTransactions();
    if (countError) return { error: countError };

    return {
      data: {
        list: listData || [],
        count: countData || 0,
      },
    };
  };

  list = async (pageNumber: number, pageSize: number ) => { 

    const { data: listData, error: listError } =
      await this.walletTransactionModel.list(
        pageNumber,
        pageSize, 
      );
    if (listError) return { error: listError };

    const { data: countData, error: countError } =
      await this.walletTransactionModel.countWalletTransactions();
    if (countError) return { error: countError };

    return {
      data: {
        list: listData || [],
        count: countData || 0,
      },
    };
  };

  create = async (dto: TablesInsert<"wallet_transaction">) => {
    const { data, error } =
      await this.walletTransactionModel.createTransaction(dto);
    if (error || !data) {
      return { error: error || new Error("Failed to create transaction.") };
    }

    return { data };
  };
}

export const walletTransactionService = new WalletTransactionService();
