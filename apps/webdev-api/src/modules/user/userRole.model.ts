import { supabase } from "@/lib/supabase.js";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserRoleModel {
  constructor(private supabaseClient: SupabaseClient) {}

  async getUserRoleById(userId: string) {
    const { data, error } = await this.supabaseClient
      .from("user_role")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data.role;
  }
}

export const userRoleModel = new UserRoleModel(supabase);
