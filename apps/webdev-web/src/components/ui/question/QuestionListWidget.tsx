import { usePaginatedQuestionQuery } from "@/features/question/question.query";
import { QuestionCard } from "./QuestionCard";
import { useState } from "react";
import { FlexRowWrapContainer } from "../widgets/FlexRowWrapContainer";

export const QuestionListWidget = () => {
  const {
    data,
    isLoading,
    isError,
    pageNumber,
    nextPage,
    prevPage,
    setPageSize,
    setPageNumber,
    pageSize,
  } = usePaginatedQuestionQuery({
    pageNumber: 1,
    pageSize: 2,
  });

  const handlePrintData = () => {
    console.log("data", data);
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>List questions</div>
      <FlexRowWrapContainer>
        {" "}
        <div
          className="p-2 border bg-blue-200 rounded-md"
          onClick={handlePrintData}
        >
          log data
        </div>
        <div className="p-2 border bg-blue-200 rounded-md" onClick={nextPage}>
          next page
        </div>
        <div className="p-2 border bg-blue-200 rounded-md" onClick={prevPage}>
          previous page
        </div>
        <div className="p-2 border bg-green-200 rounded-md">
          Page Number: {pageNumber}
        </div>
        <div className="p-2 border bg-green-200 rounded-md">
          Page Size: {pageSize}
        </div>
      </FlexRowWrapContainer>
      <input
        type="number"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="p-2 border rounded-md"
      />
      <div>Current Page: {pageNumber}</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        // display announcemenet cards
        <>
          {data?.data?.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          ))}
        </>
      )}
    </div>
  );
};
