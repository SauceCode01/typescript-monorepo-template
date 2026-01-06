import { useCreateQuestionMutation } from "@/features/question/question.mutation";
import { useRef } from "react";

export const CreateQuestionWidget = () => {
  const createQuestionMutation = useCreateQuestionMutation();

  const questionRef = useRef<HTMLInputElement>(null);
  const optionARef = useRef<HTMLInputElement>(null);
  const optionBRef = useRef<HTMLInputElement>(null);
  const optionCRef = useRef<HTMLInputElement>(null);
  const optionDRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const scheduleRef = useRef<HTMLInputElement>(null);

  const handleCreateQuestion = () => {
    const scheduleValue = scheduleRef.current?.value
      ? new Date(scheduleRef.current.value).toISOString()
      : new Date().toISOString();

    createQuestionMutation.mutate({
      dto: {
        question: questionRef.current?.value ?? "",
        option_a: optionARef.current?.value ?? "",
        option_b: optionBRef.current?.value ?? "",
        option_c: optionCRef.current?.value ?? "",
        option_d: optionDRef.current?.value ?? "",
        answer: Number(answerRef.current?.value ?? 0),
        value: Number(valueRef.current?.value ?? 0),
        schedule: scheduleValue,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Create question</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleCreateQuestion}
      >
        create question
      </div>
      <input
        ref={questionRef}
        type="text"
        placeholder="question"
        className="p-2 border rounded-md"
      />
      <input
        ref={optionARef}
        type="text"
        placeholder="option A"
        className="p-2 border rounded-md"
      />
      <input
        ref={optionBRef}
        type="text"
        placeholder="option B"
        className="p-2 border rounded-md"
      />
      <input
        ref={optionCRef}
        type="text"
        placeholder="option C"
        className="p-2 border rounded-md"
      />
      <input
        ref={optionDRef}
        type="text"
        placeholder="option D"
        className="p-2 border rounded-md"
      />
      <input
        ref={answerRef}
        type="number"
        placeholder="answer index"
        className="p-2 border rounded-md"
      />
      <input
        ref={valueRef}
        type="number"
        placeholder="value"
        className="p-2 border rounded-md"
      />
      <input
        ref={scheduleRef}
        type="datetime-local"
        placeholder="schedule"
        className="p-2 border rounded-md"
      />
      {createQuestionMutation.isPending ? (
        <div>Loading...</div>
      ) : createQuestionMutation.isError ? (
        <div>Error...</div>
      ) : (
        <pre className="">idle</pre>
      )}
    </div>
  );
};
