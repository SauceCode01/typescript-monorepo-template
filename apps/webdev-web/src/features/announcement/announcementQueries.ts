"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncement,
  getAnnouncement,
  listAnnouncements,
} from "./announcementActions";
import { useState } from "react";

export const usePaginatedAnnouncementQuery = (props: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);

  const query = useQuery({
    queryKey: ["announcements", pageSize, pageNumber],
    queryFn: async () => {
      return await listAnnouncements({
        pageSize: pageSize,
        pageNumber: pageNumber,
      });
    },
  });

  const nextPage = () => setPageNumber((prev) => prev + 1);
  const prevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  return {
    ...query,
    pageNumber,
    pageSize,
    nextPage,
    prevPage,
    setPageNumber,
    setPageSize,
  };
};

export const useAnnouncementQuery = (announcementId?: string) => {
  return useQuery({
    queryKey: ["announcement", announcementId],
    queryFn: async () => {
      return await getAnnouncement(announcementId!);
    },
    enabled: !!announcementId,
  });
};
