import { Tables } from "@packages/api-types";

export const createStudyJamResourceObject = (row: Tables<"study_jam">) => ({
  type: "study_jams",
  id: row.id,
  attributes: {
    title: row.title,
    description: row.description,
    pre_jam_kit_url: row.pre_jam_kit_url,
    post_jam_kit_url: row.post_jam_kit_url,
    post_jam_activity_url: row.post_jam_activity_url,
    created_at: row.created_at,
  },
  relationships: {
    creator: {
      data: {
        type: "users",
        id: row.creator_id,
      },
    },
  },
});

export const createStudyJamResourceObjects = (
  rows: Tables<"study_jam">[] | null
) => (rows ?? []).map(createStudyJamResourceObject);
