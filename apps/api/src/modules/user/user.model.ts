import { supabase } from "@/lib/supabase.js";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserModel {
  constructor(private supabaseCLient: SupabaseClient) {}

  async getUserBySupabaseAccessToken(supabaseAccessToken: string) {
    const { data, error } =
      await this.supabaseCLient.auth.getUser(supabaseAccessToken);

    // if (error) {
    //   throw error;
    // }

    return data.user;
  }
}

export const userModel = new UserModel(supabase);
