import { supabase } from "@/lib/supabase.js";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserProfileModel {
  constructor(private supabaseClient: SupabaseClient) {}

  async getUserProfileById(userId: string) {
    const { data, error } = await this.supabaseClient
      .from("user_profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}

export const userProfileModel = new UserProfileModel(supabase);
