import { supabase } from "@/lib/supabase.js"; 
import { publicQuestionInsertSchema, publicQuestionUpdateSchema, Tables, TablesInsert, TablesUpdate } from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class QuestionModel {
  constructor(private supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }

  async listQuestionsByPage(pageNumber: number, pageSize: number) {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("question")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question">[] };
  }

  async countQuestions() {
    const { count, error } = await this.supabaseClient
      .from("question")
      .select("*", { count: "exact", head: true });

    if (error) {
      return { error };
    }

    return { data: count || 0 };
  }

  async createQuestion(createDTO: TablesInsert<"question">) {
    const parseResult = publicQuestionInsertSchema.safeParse(createDTO);

    if (!parseResult.success) {
      return { error: parseResult.error };
    }

    const { data, error } = await this.supabaseClient
      .from("question")
      .insert(createDTO)
      .select("*")
      .single();

    if (error) return { error };

    return { data: data as Tables<"question"> };
  }

  async getQuestionById(id: string) {
    const { data, error } = await this.supabaseClient
      .from("question")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question"> };
  }

  async updateQuestion(id: string, updateDTO: TablesUpdate<"question">) {

    const parseRes = publicQuestionUpdateSchema.safeParse(updateDTO);

    if (!parseRes.success) {
      return { error: parseRes.error };
    }


    const { data, error } = await this.supabaseClient
      .from("question")
      .update(updateDTO)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question"> };
  }

  async deleteQuestion(id: string) {
    const { error } = await this.supabaseClient
      .from("question")
      .delete()
      .eq("id", id);

    if (error) {
      return { error };
    }

    return { data: null };
  }
}

export const questionModel = new QuestionModel(supabase);
