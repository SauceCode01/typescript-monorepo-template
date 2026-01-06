// export const controller = EnforceSchemas(
//   Schemas.question.create,
//   async ({ input, output, req, res }) => {
//     // input.
//     // input.
//     return output(200, {
//       status: "success",
//       message: "Question created successfully",
//       data: {
//         id: "question_123",
//         title: "Sample Question",
//         content: "This is a sample question content.",
//       },
//     });
//     // input.body
//   }
// );

import { announcements } from "./schemas/announcements.schema.js";
import { leaderboards } from "./schemas/leaderboards.schema.js";
import { questions } from "./schemas/question.schema.js"; 
import { studyJams } from "./schemas/studyJams.schema.js"; 
import { tokenSystem } from "./schemas/tokenSystem.schema.js"; 
import { users } from "./schemas/users.schema.js";
import { DeepInfer, EnforceSchemas } from "./utils/utils.js";

export * from "./schemas/supabase.schema.js";
export * from "./types/supabase.types.js";

export const Schemas = {
  users,
  leaderboards,
  questions,
  tokenSystem, 
  studyJams,
  announcements,
};

export type Types = DeepInfer<typeof Schemas>;

export const createTypedController = EnforceSchemas;

export const createExpressController = EnforceSchemas;