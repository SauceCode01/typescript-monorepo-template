import { useDeleteQuestionMutation } from "@/features/question/question.mutation";
import { useRef } from "react";

export const DeleteQuestionWidget = () => {
  const deleeteQuestionMutation = useDeleteQuestionMutation();

  const idRef = useRef<HTMLInputElement>(null);

  const handleDeleteQuestion = () => {
    if (!idRef.current?.value) return;
    deleeteQuestionMutation.mutate({
      questionId: idRef.current?.value,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
        <div>Delete question</div>
        <div
          className="p-2 border bg-blue-200 rounded-md"
          onClick={handleDeleteQuestion}
        >
          delete question
        </div>
        <input
          ref={idRef}
          type="text"
          placeholder="id"
          className="p-2 border rounded-md"
        />
        {deleeteQuestionMutation.isPending ? (
          <div>Loading...</div>
        ) : deleeteQuestionMutation.isError ? (
          <div>Error...</div>
        ) : (
          // display announcemenet cards
          <div>Idle...</div>
        )}
      </div>
    </>
  );
};
