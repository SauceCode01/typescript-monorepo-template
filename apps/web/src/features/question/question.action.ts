/**
 * Question Actions
 * Exports one-to-one mapping of question api endpoints as functions
 */

import { fetchApiParsed } from "@/utils/apiUtils";
import {
  createQuestionRequestBodyType,
  createQuestionResponseType,
  deleteQuestionResponseType,
  getQuestionResponseType,
  listQuestionsResponseType,
  updateQuestionRequestBodyType,
  updateQuestionResponseType,
} from "@packages/api-types";

export const listQuestions = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<listQuestionsResponseType> => {
  return fetchApiParsed(
    `/questions?page[size]=${pageSize}&page[number]=${pageNumber}`
  ) as Promise<listQuestionsResponseType>;
};

export const createQuestion = async (
  dto: createQuestionRequestBodyType
): Promise<createQuestionResponseType> => {
  return fetchApiParsed("/questions", {
    method: "POST",
    body: JSON.stringify(dto),
  }) as Promise<createQuestionResponseType>;
};

export const getQuestion = async (
  questionId: string
): Promise<getQuestionResponseType> => {
  return fetchApiParsed(
    `/questions/${questionId}`
  ) as Promise<getQuestionResponseType>;
};

export const deleteQuestion = async (
  questionId: string
): Promise<deleteQuestionResponseType> => {
  return fetchApiParsed(`/questions/${questionId}`, {
    method: "DELETE",
  }) as Promise<deleteQuestionResponseType>;
};

export const updateQuestion = async (
  questionId: string,
  dto: updateQuestionRequestBodyType
): Promise<updateQuestionResponseType> => {
  return fetchApiParsed(`/questions/${questionId}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  }) as Promise<updateQuestionResponseType>;
};
