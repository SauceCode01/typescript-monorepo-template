import {
  walletModel as defaultWalletModel,
  WalletModel,
} from "./wallet.model.js";
import {
  walletTransactionService as defaultWalletTransactionService,
  WalletTransactionService,
} from "./transaction.service.js";

export class WalletService {
  constructor(
    private walletModel: WalletModel = defaultWalletModel,
    private walletTransactionService: WalletTransactionService = defaultWalletTransactionService
  ) {}

  getWalletByUser = async (userId: string) => {
    const { data, error } = await this.walletModel.getWalletByUser(userId);

    if (error) return { error };

    return { data };
  };

  list = async (pageNumber: number, pageSize: number) => {
    const { data: listData, error: listError } =
      await this.walletModel.listWalletsByPage(pageNumber, pageSize);
    if (listError) return { error: listError };

    const { data: countData, error: countError } =
      await this.walletModel.countWallets();
    if (countError) return { error: countError };

    return {
      data: {
        listData: listData || [],
        count: countData || 0,
      },
    };
  }; 

  incrementPoints = async (userId: string, amount: number) => {
    // get wallet of the user
    const { data: wallet, error: walletFetchError } =
      await this.walletModel.getWalletByUser(userId);
    if (walletFetchError || !wallet) {
      return { error: walletFetchError || new Error("Wallet not found.") };
    }

    // calculate new balance
    const newBalance = wallet.balance + amount;

    // create new transaction to increment points
    const { data, error } =
      await this.walletTransactionService.create({
        wallet_id: wallet.id,
        amount: amount,
        source_type: "test_increment",
        source_id: "test_increment_001",
      });
    if (error || !data) {
      return { error: error || new Error("Failed to create transaction.") };
    }

    // update wallet balance
    const { error: updateError } = await this.walletModel.updateWalletBalance(
      userId,
      newBalance
    );
    if (updateError) {
      return { error: updateError };
    }

    // build response

    return { data: { transaction: data, newBalance } };
  };

  decrementPoints = async (userId: string, amount: number) => {
    // get wallet of the user
    const { data: wallet, error: walletFetchError } =
      await this.walletModel.getWalletByUser(userId);
    if (walletFetchError || !wallet) {
      return { error: walletFetchError || new Error("Wallet not found.") };
    }

    // create new transaction to decrement points by 1
    const { data, error } =
      await this.walletTransactionService.create({
        wallet_id: wallet.id,
        amount: -amount,
        source_type: "test_decrement",
        source_id: "test_decrement_001",
      });
    if (error || !data) {
      return { error: error || new Error("Failed to create transaction.") };
    }

    // calculate new balance
    const newBalance = wallet.balance - amount;

    // update wallet balance
    const { error: updateError } = await this.walletModel.updateWalletBalance(
      userId,
      newBalance
    );
    if (updateError) {
      return { error: updateError };
    }

    // build response

    return { data: { transaction: data, newBalance } };
  };
}

export const walletService = new WalletService();
