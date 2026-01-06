import {
  publicQuestionStreakRowSchema,
  publicWalletRowSchema,
} from "src/schemas/supabase.schema.js";
import z from "zod";
import { SchemaFactory } from "../utils/base.schemas.js";
import {
  ApiContract,
  ApiTypes,
  createContract,
  createRoute,
  createRoutes,
} from "src/types/contract.types.js";
import { questionSystemRoutes } from "./questionSystem/index.js";
import { leaderboardSystemRoutes } from "./leaderBoardsSystem/index.js";
import { announcementSystemRoutes } from "./announcementSystem/index.js";
import { studyJamSystemRoutes } from "./studyJamSystem/index.js";
import { tokenSystemRoutes } from "./tokenSystem/index.js";
import { userSystemRoutes } from "./userSystem/index.js";

export const webdevApiRoutes = createRoute({
  path: "/",
  routes: createRoutes({
    announcementSystem: createRoute({
      path: "/announcement-system",
      routes: announcementSystemRoutes,
    }),
    leaderboardSystem: createRoute({
      path: "/leaderboard-system",
      routes: leaderboardSystemRoutes,
    }),
    questionSystem: createRoute({
      path: "/question-system",
      routes: questionSystemRoutes,
    }),
    studyJamSystem: createRoute({
      path: "/study-jam-system",
      routes: studyJamSystemRoutes,
    }),
    tokenSystem: createRoute({
      path: "/token-system",
      routes: tokenSystemRoutes,
    }),
    userSystem: createRoute({
      path: "/user-system",
      routes: userSystemRoutes,
    }),
  }),
});

export const webdevApiContract = createContract(webdevApiRoutes);
export type WebdevApiTypes = ApiTypes<typeof webdevApiRoutes>;
