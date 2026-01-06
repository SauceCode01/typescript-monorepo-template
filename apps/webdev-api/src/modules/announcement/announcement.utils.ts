
import { buildPaginationLinks } from "@/utils/responseUtils.js";
import { Tables } from "@packages/api-types";

export const createAnnouncementResourceObject = (
  announcement: Tables<"announcement">
) => {
  return {
    type: "announcement",
    id: String(announcement.id),
    attributes: {
      title: announcement.title,
      content: announcement.content,
      created_at: announcement.created_at,
      banner_url: announcement.banner_url,
    },
    relationships: {
      creator: {
        data: {
          type: "user",
          id: announcement.creator_id,
        },
      },
    },
  };
};

export const createAnnouncementResourceObjects = (
  announcements: Tables<"announcement">[]
) => {
  return announcements.map(createAnnouncementResourceObject);
};

export const buildListAnnouncementResponseObject = (
  listData: Tables<"announcement">[],
  count: number,
  pageNumber: number,
  pageSize: number,
  baseUrl: string
) => {
  const announcements = createAnnouncementResourceObjects(listData ?? []);

  const paginationLinks = buildPaginationLinks(
    baseUrl,
    pageNumber,
    pageSize,
    count || 0
  );

  return {
    meta: {
      success: true,
      message: `Fetched ${announcements.length} announcements.`,
      totalRecords: count || 0,
    },
    links: paginationLinks,
    data: announcements,
  };
};

