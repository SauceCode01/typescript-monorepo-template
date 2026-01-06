import { useUpdateQuestionMutation } from "@/features/question/question.mutation";
import { useRef } from "react";

export const UpdateQuestionWidget = () => {
  const updateQuestionMutation = useUpdateQuestionMutation();

  const idRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLInputElement>(null);
  const optionARef = useRef<HTMLInputElement>(null);
  const optionBRef = useRef<HTMLInputElement>(null);
  const optionCRef = useRef<HTMLInputElement>(null);
  const optionDRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const scheduleRef = useRef<HTMLInputElement>(null);

  const handleUpdateQuestion = () => {
    const scheduleValue = scheduleRef.current?.value
      ? new Date(scheduleRef.current.value).toISOString()
      : undefined;

    const dto = {
      ...(questionRef.current?.value
        ? { question: questionRef.current.value }
        : {}),
      ...(optionARef.current?.value
        ? { option_a: optionARef.current.value }
        : {}),
      ...(optionBRef.current?.value
        ? { option_b: optionBRef.current.value }
        : {}),
      ...(optionCRef.current?.value
        ? { option_c: optionCRef.current.value }
        : {}),
      ...(optionDRef.current?.value
        ? { option_d: optionDRef.current.value }
        : {}),
      ...(answerRef.current?.value
        ? { answer: Number(answerRef.current.value) }
        : {}),
      ...(valueRef.current?.value
        ? { value: Number(valueRef.current.value) }
        : {}),
      ...(scheduleValue ? { schedule: scheduleValue } : {}),
    };

    updateQuestionMutation.mutate({
      id: idRef.current?.value ?? "",
      dto,
    });
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Update question</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleUpdateQuestion}
      >
        update question
      </div>
      <input
        ref={idRef}
        type="text"
        placeholder="id"
        className="p-2 border rounded-md"
      />
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
      {updateQuestionMutation.isPending ? (
        <div>Loading...</div>
      ) : updateQuestionMutation.isError ? (
        <div>Error...</div>
      ) : (
        <pre className="">idle</pre>
      )}
    </div>
  );
};