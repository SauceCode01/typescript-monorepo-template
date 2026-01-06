"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "./question.action";
import {
  createQuestionRequestBodyType,
  updateQuestionRequestBodyType,
} from "@packages/api-types";

export function useCreateQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { dto: createQuestionRequestBodyType }) => {
      return await createQuestion(param.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to create question:", error);
    },
  });
}

export function useDeleteQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { questionId: string }) => {
      return await deleteQuestion(param.questionId);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to delete question:", error);
    },
  });
}

export function useUpdateQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      dto: updateQuestionRequestBodyType;
    }) => {
      return await updateQuestion(params.id, params.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error) => {
      console.error("Failed to update question:", error);
    },
  });
}
