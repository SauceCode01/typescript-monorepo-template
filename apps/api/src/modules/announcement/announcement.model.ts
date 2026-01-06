import { supabase } from "@/lib/supabase.js";  
import { publicAnnouncementInsertSchema, publicAnnouncementUpdateSchema, TablesInsert, TablesUpdate } from "@packages/api-types";
import { SupabaseClient } from "@supabase/supabase-js";

export class AnnouncementModel {
  constructor(private supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }

  async listAnnouncementsByPage(pageNumber: number, pageSize: number) {
    // Pagination
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get announcements from the database
    const { data, error } = await this.supabaseClient
      .from("announcement")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      return { error };
    }

    return { data };
  }

  async countAnnouncements() {
    const { count, error } = await this.supabaseClient
      .from("announcement")
      .select("*", { count: "exact", head: true });

    if (error) {
      return { error };
    }

    return { data: count };
  }

  async createAnnouncement(dto: TablesInsert<"announcement">) {
    const parseRes = publicAnnouncementInsertSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("announcement")
      .insert(parseRes.data)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data };
  }

  async getAnnouncementById(id: string) {
    const { data, error } = await this.supabaseClient
      .from("announcement")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { error };
    }

    return { data };
  }

  async updateAnnouncement(id: string, dto: TablesUpdate<"announcement">) {
    const parseRes = publicAnnouncementUpdateSchema.safeParse(dto);
    if (!parseRes.success) {
      return { error: parseRes.error };
    }

    const { data, error } = await this.supabaseClient
      .from("announcement")
      .update(parseRes.data)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data };
  }

  async deleteAnnouncement(id: string) {
    const { error } = await this.supabaseClient
      .from("announcement")
      .delete()
      .eq("id", id)
      .select("id")
      .single();
 

    if (error) {
      return {error}
    }

    return {data: null};
  }
}

export const announcementModel = new AnnouncementModel(supabase);
