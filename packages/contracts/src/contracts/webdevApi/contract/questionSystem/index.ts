import {
  createRoutes,
  RoutesType,
} from "src/types/contract.types.js";
import { questionRoutes } from "./question.routes.js";

export const questionSystemRoutes = createRoutes({
  questions: {
    path: "/questions",
    routes: questionRoutes,
  },
});

