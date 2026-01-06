"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudyJam, getStudyJam, listStudyJams } from "./studyJam.action";
import { useState } from "react";

type paginatedStudyJamQueryProps = {
  pageSize?: number;
  pageNumber?: number;
};

export const usePaginatedStudyJamQuery = (
  props: paginatedStudyJamQueryProps
) => {
  const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);

  const query = useQuery({
    queryKey: ["studyJams", pageSize, pageNumber],
    queryFn: async () => {
      return await listStudyJams({
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


export const useStudyJamQuery = (studyJamId?: string) => {
  return useQuery({
    queryKey: ["studyJam", studyJamId],
    queryFn: async () => {
      return await getStudyJam(studyJamId!);
    },
    enabled: !!studyJamId,
  });
};