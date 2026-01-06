/**
 * StudyJam Actions
 * Exports one-to-one mapping of studyJam api endpoints as functions
 */

import { fetchApiParsed } from "@/utils/apiUtils";
import {
  createStudyJamRequestBodyType,
  createStudyJamResponseType,
  deleteStudyJamResponseType,
  getStudyJamResponseType,
  listStudyJamsResponseType,
  updateStudyJamRequestBodyType,
  updateStudyJamResponseType,
} from "@packages/api-types";

export const listStudyJams = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<listStudyJamsResponseType> => {
  return fetchApiParsed(
    `/study-jams?page[size]=${pageSize}&page[number]=${pageNumber}`
  ) as Promise<listStudyJamsResponseType>;
};

export const createStudyJam = async (
  dto: createStudyJamRequestBodyType
): Promise<createStudyJamResponseType> => {
  return fetchApiParsed("/study-jams", {
    method: "POST",
    body: JSON.stringify(dto),
  }) as Promise<createStudyJamResponseType>;
};

export const getStudyJam = async (
  studyJamId: string
): Promise<getStudyJamResponseType> => {
  return fetchApiParsed(
    `/study-jams/${studyJamId}`
  ) as Promise<getStudyJamResponseType>;
};

export const deleteStudyJam = async (
  studyJamId: string
): Promise<deleteStudyJamResponseType> => {
  return fetchApiParsed(`/study-jams/${studyJamId}`, {
    method: "DELETE",
  }) as Promise<deleteStudyJamResponseType>;
};

export const updateStudyJam = async (
  studyJamId: string,
  dto: updateStudyJamRequestBodyType
): Promise<updateStudyJamResponseType> => {
  return fetchApiParsed(`/study-jams/${studyJamId}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  }) as Promise<updateStudyJamResponseType>;
};
