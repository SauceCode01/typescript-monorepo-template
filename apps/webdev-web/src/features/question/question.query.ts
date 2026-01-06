"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQuestion, getQuestion, listQuestions } from "./question.action";
import { useState } from "react";

type paginatedQuestionQueryProps = {
  pageSize?: number;
  pageNumber?: number;
};

export const usePaginatedQuestionQuery = (
  props: paginatedQuestionQueryProps
) => {
  const [pageNumber, setPageNumber] = useState(props.pageNumber || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);

  const query = useQuery({
    queryKey: ["questions", pageSize, pageNumber],
    queryFn: async () => {
      return await listQuestions({
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

export const useQuestionQuery = (questionId?: string) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      return await getQuestion(questionId!);
    },
    enabled: !!questionId,
  });
};
