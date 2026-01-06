import { questionResourceObjectType } from "@packages/api-types";

export const QuestionCard = ({
  question,
}: {
  question: questionResourceObjectType;
}) => {
  return (
    <div key={question.id} className="border p-2 rounded-md w-full">
      <div className="font-bold text-lg">
        question: {question.attributes.question}
      </div>
      <div>answer: {question.attributes.answer}</div>
      <div>option a: {question.attributes.option_a}</div>
      <div>option b: {question.attributes.option_b}</div>
      <div>option c: {question.attributes.option_c}</div>
      <div>option d: {question.attributes.option_d}</div>
      <div>value: {question.attributes.value}</div>
      <div>schedule: {question.attributes.schedule}</div>
      <div>created at: {question.attributes.created_at}</div>
      <div>id: {question.id}</div>
      <div>type: {question.type}</div>
      <div>Creator: {question.relationships.creator.data.id}</div>
    </div>
  );
};
