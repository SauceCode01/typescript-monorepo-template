import { supabase } from "@/lib/supabase.js"; 
import { publicStudyJamInsertSchema, publicStudyJamUpdateSchema, Tables, TablesInsert, TablesUpdate } from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class StudyJamModel {
  constructor(private supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }

  async listStudyJamsByPage(pageNumber: number, pageSize: number) {
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await this.supabaseClient
      .from("study_jam")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }

    return { data: data as Tables<"study_jam">[] };
  }

  async countStudyJams() {
    const { count, error } = await this.supabaseClient
      .from("study_jam")
      .select("*", { count: "exact", head: true });

    if (error) {
      return { error };
    }

    return { data: count || 0 };
  }

  async createStudyJam(createDTO: TablesInsert<"study_jam">) {
    const parseResult = publicStudyJamInsertSchema.safeParse(createDTO);

    if (!parseResult.success) {
      return { error: parseResult.error };
    }

    const { data, error } = await this.supabaseClient
      .from("study_jam")
      .insert(createDTO)
      .select("*")
      .single();

    if (error) return { error };

    return { data: data as Tables<"study_jam"> };
  }

  async getStudyJamById(id: string) {
    const { data, error } = await this.supabaseClient
      .from("study_jam")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"study_jam"> };
  }

  async updateStudyJam(id: string, updateDTO: TablesUpdate<"study_jam">) {

    const parseRes = publicStudyJamUpdateSchema.safeParse(updateDTO);

    if (!parseRes.success) {
      return { error: parseRes.error };
    }


    const { data, error } = await this.supabaseClient
      .from("study_jam")
      .update(updateDTO)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"study_jam"> };
  }

  async deleteStudyJam(id: string) {
    const { error } = await this.supabaseClient
      .from("study_jam")
      .delete()
      .eq("id", id);

    if (error) {
      return { error };
    }

    return { data: null };
  }
}

export const studyJamModel = new StudyJamModel(supabase);
