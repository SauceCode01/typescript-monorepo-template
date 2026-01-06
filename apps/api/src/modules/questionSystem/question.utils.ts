import { Tables } from "@packages/api-types";

export const createQuestionResourceObject = (row: Tables<"question">) => ({
  type: "questions",
  id: row.id,
  attributes: {
    answer: row.answer,
    category: row.category,
    created_at: row.created_at,
    creator_id: row.creator_id,
    explanation: row.explanation,
    id: row.id,
    option_a: row.option_a,
    option_b: row.option_b,
    option_c: row.option_c,
    option_d: row.option_d,
    question: row.question,
    schedule: row.schedule,
    value: row.value, 
  },
  relationships: {
    creator: {
      data: {
        type: "users",
        id: row.creator_id,
      },
    },
  },
});

export const createQuestionResourceObjects = (
  rows: Tables<"question">[] | null
) => (rows ?? []).map(createQuestionResourceObject);
