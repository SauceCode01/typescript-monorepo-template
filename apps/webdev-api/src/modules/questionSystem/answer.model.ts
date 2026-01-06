import { supabase } from "@/lib/supabase.js";
import {
  publicQuestionAnswerInsertSchema,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class AnswerModel {
  constructor(private supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }

  create = async (dto: TablesInsert<"question_answer">) => {
    const parseRes = publicQuestionAnswerInsertSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("question_answer")
      .insert(dto)
      .select("*")
      .single();

    if (error) return { error };

    return { data };
  };

  get = async ({ answerId }: { answerId: string }) => {
    const { data, error } = await this.supabaseClient
      .from("question_answer")
      .select("*")
      .eq("id", answerId)
      .single();

    if (error) {
      return { error };
    }

    return { data };
  };

  listByQuestion = async ({
    questionId,
    pageNumber,
    pageSize,
  }: {
    questionId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("question_answer")
      .select("*")
      .eq("question_id", questionId)
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) {
      return { error };
    } 

    const { count, error: countError } = await this.supabaseClient
      .from("question_answer")
      .select("*", { count: "exact", head: true })
      .eq("question_id", questionId);

    if (countError) {
      return { error: countError };
    } 

    return {
      data: {
        list: data,
        count: count || 0,
      },
    };
  };

  listByUser = async ({
    userId,
    pageNumber,
    pageSize,
  }: {
    userId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("question_answer")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }
 

    const { count, error: countError } = await this.supabaseClient
      .from("question_answer")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      return { error: countError };
    } 

    return {
      data: {
        list: data,
        count: count || 0,
      },
    };
  };

  listByUserAndQuestion = async ({
    userId,
    questionId,
    pageNumber,
    pageSize,
  }: {
    userId: string;
    questionId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("question_answer")
      .select("*")
      .eq("question_id", questionId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    } 

    const { count, error: countError } = await this.supabaseClient
      .from("question_answer")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("question_id", questionId);

    if (countError) {
      return { error: countError };
    } 

    return {
      data: {
        list: data as Tables<"question_answer">[],
        count: count || 0,
      },
    };
  };
}

export const answerModel = new AnswerModel(supabase);
