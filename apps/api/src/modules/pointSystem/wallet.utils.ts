import { buildPaginationLinks } from "@/utils/responseUtils.js";
import { Tables } from "@packages/api-types";

export const createTokenResourceObject = (row: Tables<"token">) => ({
  type: "tokens",
  id: row.id,
  attributes: row,
  relationships: {
    creator: {
      data: {
        type: "users",
        id: row.creator_id,
      },
    },
  },
});

export const createTokenResourceObjects = (
  rows: Tables<"token">[] | null
) => (rows ?? []).map(createTokenResourceObject);


export const buildListTokenResponseObject = (
  listData: Tables<"token">[],
  count: number,
  pageNumber: number,
  pageSize: number,
  baseUrl: string
) => {
  const tokens = createTokenResourceObjects(listData ?? []);

  const paginationLinks = buildPaginationLinks(
    baseUrl,
    pageNumber,
    pageSize,
    count || 0
  );

  return {
    meta: {
      success: true,
      message: `Fetched ${tokens.length} tokens.`,
      totalRecords: count || 0,
    },
    links: paginationLinks,
    data: tokens,
  };
};

