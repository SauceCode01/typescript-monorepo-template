import { supabase } from "@/lib/supabase.js";
import { Tables } from "@packages/api-types"; 
import { SupabaseClient } from "@supabase/supabase-js";

export class StreakModel {
  constructor(private supabaseClient: SupabaseClient = supabase) {}

  /**
   * GET BY USER
   * - get streak record of a user using its user id
   */
  getByUser = async ({ userId }: { userId: string }) => {
    const { data, error } = await this.supabaseClient
      .from("streak")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question_streak"> };
  };

  /**
   * LIST STREAKS
   * - list streak records with pagination
   * - sorted by the streak value
   */
  list = async ({
    pageNumber,
    pageSize,
  }: {
    pageNumber: number;
    pageSize: number;
  }) => {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("streak")
      .select("*")
      .order("streak", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }

    const { count, error: countError } = await this.supabaseClient
      .from("streak")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return { error: countError };
    }

    return {
      data: {
        list: data as Tables<"question_streak">[],
        count: count || 0,
      },
    };
  };

  /**
   * SET STREAK VALUE
   * - set or update the streak value of a user
   */
  setStreakValue = async ({
    userId,
    value,
  }: {
    userId: string;
    value: number;
  }) => {
    const { data, error } = await this.supabaseClient
      .from("streak")
      .upsert({ user_id: userId, streak: value }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question_streak"> };
  };
}

export const streakModel = new StreakModel();
