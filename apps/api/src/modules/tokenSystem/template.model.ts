import { supabase as defaultSupabaseClient } from "@/lib/supabase.js";
import {
  publicTokenTemplateInsertSchema,
  publicTokenTemplateUpdateSchema,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class TokenTemplateModel {
  constructor(private supabaseClient: SupabaseClient = defaultSupabaseClient) {}

  async create({ dto }: { dto: TablesInsert<"token_template"> }) {
    const parseRes = publicTokenTemplateInsertSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("token_template")
      .insert(parseRes.data)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"token_template"> };
  }

  async list({
    pageNumber,
    pageSize,
  }: {
    pageNumber: number;
    pageSize: number;
  }) {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get tokenTemplates from the database
    const { data, error } = await this.supabaseClient
      .from("token_template")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    const { count, error: countError } = await this.supabaseClient
      .from("token_template")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return { error: countError };
    }

    if (error) {
      return { error };
    }

    return {
      data: {
        list: data as Tables<"token_template">[],
        count: count || 0,
      },
    };
  }

  async get({ id }: { id: string }) {
    const { data, error } = (await this.supabaseClient
      .from("token_template")
      .select("*")
      .eq("id", id)
      .single()) as { data: Tables<"token_template">; error: any };

    if (error) {
      return { error };
    }

    return { data: data as Tables<"token_template"> };
  }

  async update({
    id,
    dto,
  }: {
    id: string;
    dto: TablesUpdate<"token_template">;
  }) {
    const parseRes = publicTokenTemplateUpdateSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("token_template")
      .update(parseRes.data)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data: data as Tables<"token_template"> };
  }
}

export const tokenTemplateModel = new TokenTemplateModel();
