import { useQuestionQuery } from "@/features/question/question.query";
import { useRef, useState } from "react";
import { QuestionCard } from "./QuestionCard";

export const GetQuestionWidget = () => {
  const [id, setId] = useState<string | undefined>(undefined);
  const idRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useQuestionQuery(id);

  const handleGetQuestion = () => {
    setId(idRef.current?.value);
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Get question</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleGetQuestion}
      >
        get question
      </div>
      <input
        ref={idRef}
        type="text"
        placeholder="id"
        className="p-2 border rounded-md"
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        // display announcemenet cards
        <>
          {data?.data &&
            [data?.data].map((question: any) => (
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