import { supabase as defaultSupabaseClient } from "@/lib/supabase.js";
import { publicWalletTransactionInsertSchema, Tables, TablesInsert } from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class WalletTransactionModel {
  constructor(private supabaseClient: SupabaseClient = defaultSupabaseClient) {}

  listByWallet = async (pageNumber: number, pageSize: number, walletId: string) => {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get walletTransactions from the database
    const { data, error } = (await this.supabaseClient
      .from("wallet_transaction")
      .select("*")
      .eq("wallet_id", walletId)
      .order("created_at", { ascending: false })
      .range(from, to)) as {
      data: Tables<"wallet_transaction">[] | null;
      error: Error | null;
    };

    if (error) {
      return { error };
    }

    return { data };
  };

  list = async (
    pageNumber: number,
    pageSize: number
  ) => {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get walletTransactions from the database
    const { data, error } = (await this.supabaseClient
      .from("wallet_transaction")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to)) as {
      data: Tables<"wallet_transaction">[] | null;
      error: Error | null;
    };

    if (error) {
      return { error };
    }

    return { data };
  };

  countWalletTransactions = async () => {
    const { count, error } = (await this.supabaseClient
      .from("wallet_transaction")
      .select("*", { count: "exact", head: true })) as {
      count: number | null;
      error: Error | null;
    };

    if (error) {
      return { error };
    }

    return { data: count };
  };

  createTransaction = async (dto: TablesInsert<"wallet_transaction">) => {
    // validate dto 
    const parseRes = publicWalletTransactionInsertSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: new Error("Invalid transaction data.") };
    }

    // insert transaction into database 
    const { data, error } = await this.supabaseClient
      .from("wallet_transaction")
      .insert(dto)
      .select("*")
      .single();

    if (error) return { error };

    return { data };
  };
}

export const walletTransactionModel = new WalletTransactionModel();
