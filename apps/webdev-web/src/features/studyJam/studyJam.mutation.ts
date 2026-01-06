"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createStudyJam,
  deleteStudyJam,
  updateStudyJam,
} from "./studyJam.action";
import {
  createStudyJamRequestBodyType,
  updateStudyJamRequestBodyType,
} from "@packages/api-types";

export function useCreateStudyJamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { dto: createStudyJamRequestBodyType }) => {
      return await createStudyJam(param.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studyJams"] });
    },
    onError: (error) => {
      console.error("Failed to create studyJam:", error);
    },
  });
}

export function useDeleteStudyJamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { studyJamId: string }) => {
      return await deleteStudyJam(param.studyJamId);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studyJams"] });
    },
    onError: (error) => {
      console.error("Failed to delete studyJam:", error);
    },
  });
}

export function useUpdateStudyJamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      dto: updateStudyJamRequestBodyType;
    }) => {
      return await updateStudyJam(params.id, params.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["studyJams"] });
    },
    onError: (error) => {
      console.error("Failed to update studyJam:", error);
    },
  });
}
