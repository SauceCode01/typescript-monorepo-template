import { supabase as defaultSupabaseClient } from "@/lib/supabase.js";
import {
  publicWalletRowSchema,
  Tables,
  TablesInsert,
} from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class WalletModel {
  constructor(private supabaseClient: SupabaseClient = defaultSupabaseClient) {}

  getWalletByUser = async (userId: string) => {
    // validate parameters
    const parseRes = publicWalletRowSchema
      .pick({ user_id: true })
      .safeParse({ user_id: userId });
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    // query database
    const { data, error } = (await this.supabaseClient
      .from("wallet")
      .select("*")
      .eq("user_id", parseRes.data.user_id)
      .maybeSingle()) as {
      data: Tables<"wallet"> | null;
      error: Error | null;
    };

    if (error) return { error };

    return { data };
  };

  listWalletsByPage = async (pageNumber: number, pageSize: number) => {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get wallets from the database
    const { data, error } = (await this.supabaseClient
      .from("wallet")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to)) as {
      data: Tables<"wallet">[] | null;
      error: Error | null;
    };

    if (error) {
      return { error };
    }

    return { data };
  };

  countWallets = async () => {
    const { count, error } = (await this.supabaseClient
      .from("wallet")
      .select("*", { count: "exact", head: true })) as {
      count: number | null;
      error: Error | null;
    };

    if (error) {
      return { error };
    }

    return { data: count };
  };

  updateWalletBalance = async (userId: string, newBalance: number) => {
    const { data, error } = await this.supabaseClient
      .from("wallet")
      .update({ balance: newBalance })
      .eq("user_id", userId)
      .select("*")
      .single();

    if (error) return { error };

    return { data };
  };
}


export const walletModel = new WalletModel ();