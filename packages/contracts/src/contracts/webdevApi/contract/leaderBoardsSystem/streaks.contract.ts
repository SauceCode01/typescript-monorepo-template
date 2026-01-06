import { publicQuestionStreakRowSchema } from "src/schemas/supabase.schema.js";
import { SchemaFactory } from "../../utils/base.schemas.js";
import { createEndpoint, createRoutes } from "@/types/contract.types.js";

export const streakRoutes = createRoutes({
  list: createEndpoint({
    method: "GET",
    request: {},
    response: {
      200: SchemaFactory.Response.paginated(publicQuestionStreakRowSchema),
      500: SchemaFactory.Response.error(),
      400: SchemaFactory.Response.error(),
    },
  }),
});
