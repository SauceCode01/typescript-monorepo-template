import { supabase as defaultSupabaseClient } from "@/lib/supabase.js";
import {
  publicTokenInsertSchema, 
  Tables,
  TablesInsert, 
} from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class TokenModel {
  constructor(private supabaseClient: SupabaseClient = defaultSupabaseClient) {}

  async listTokensByPage(pageNumber: number, pageSize: number) {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get tokens from the database
    const { data, error } = await this.supabaseClient
      .from("token")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }

    return { data };
  }

  async countTokens() {
    const { count, error } = await this.supabaseClient
      .from("token")
      .select("*", { count: "exact", head: true });

    if (error) {
      return { error };
    }

    return { data: count };
  }

  async createToken(dto: TablesInsert<"token">) {
    const parseRes = publicTokenInsertSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("token")
      .insert(parseRes.data)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data };
  }

  async getTokenById(id: string) {
    const { data, error } = (await this.supabaseClient
      .from("token")
      .select("*")
      .eq("id", id)
      .single()) as { data: Tables<"token">; error: unknown };

    if (error) {
      return { error };
    }

    return { data };
  }

  async getTokenByCode(code: string) {
    const { data, error } = (await this.supabaseClient
      .from("token")
      .select("*")
      .eq("code", code)
      .single()) as { data: Tables<"token">; error: unknown };

    if (error) {
      return { error };
    }

    return { data };
  }

  async tokenWithCodeExists(code: string) {
    const { data, error } = await this.supabaseClient
      .from("token")
      .select("id")
      .eq("code", code)
      .maybeSingle();

    if (error) {
      return { error };
    }

    if (!data) {
      return { data: false };
    }

    return { data: true };
  }

  async markTokenAsClaimed(token_id: string, user_id: string) {
    const { data, error } = await this.supabaseClient
      .from("token")
      .update({
        is_claimed: true,
        claimed_at: new Date().toISOString(),
        claimed_by_id: user_id,
      })
      .eq("id", token_id)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data };
  }
}

export const tokenModel = new TokenModel();
