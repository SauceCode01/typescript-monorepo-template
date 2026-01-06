/**
 * Announcement Actions
 * Exports one-to-one mapping of announcement api endpoints as functions
 */

import { fetchApiParsed } from "@/utils/apiUtils";
import {
  createAnnouncementRequestBodyType,
  createAnnouncementResponseType,
  deleteAnnouncementResponseType,
  getAnnouncementResponseType,
  listAnnouncementsResponseType,
  updateAnnouncementRequestBodyType,
} from "@packages/api-types";

export const listAnnouncements = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<listAnnouncementsResponseType> => {
  return fetchApiParsed(
    `/announcements?page[size]=${pageSize}&page[number]=${pageNumber}`
  ) as Promise<listAnnouncementsResponseType>;
};

export const createAnnouncement = async (
  dto: createAnnouncementRequestBodyType
): Promise<createAnnouncementResponseType> => {
  return fetchApiParsed("/announcements", {
    method: "POST",
    body: JSON.stringify(dto),
  }) as Promise<createAnnouncementResponseType>;
};

export const getAnnouncement = async (
  announcementId: string
): Promise<getAnnouncementResponseType> => {
  return fetchApiParsed(
    `/announcements/${announcementId}`
  ) as Promise<getAnnouncementResponseType>;
};

export const deleteAnnouncement = async (
  announcementId: string
): Promise<deleteAnnouncementResponseType> => {
  return fetchApiParsed(`/announcements/${announcementId}`, {
    method: "DELETE",
  }) as Promise<deleteAnnouncementResponseType>;
};

export const updateAnnouncement = async (
  announcementId: string,
  dto: updateAnnouncementRequestBodyType
) => {
  return fetchApiParsed(`/announcements/${announcementId}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  }) as Promise<createAnnouncementResponseType>;
};
