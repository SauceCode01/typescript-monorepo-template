"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "./announcementActions";
import { updateAnnouncementRequestBodyType } from "@packages/api-types";

export function useCreateAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { dto: { title: string; content: string } }) => {
      return await createAnnouncement(param.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error) => {
      console.error("Failed to create announcement:", error);
    },
  });
}

export function useDeleteAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { announcementId: string }) => {
      return await deleteAnnouncement(param.announcementId);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error) => {
      console.error("Failed to delete announcement:", error);
    },
  });
}

export function useUpdateAnnouncementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      dto: updateAnnouncementRequestBodyType;
    }) => {
      return await updateAnnouncement(params.id, params.dto);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error) => {
      console.error("Failed to update announcement:", error);
    },
  });
}
