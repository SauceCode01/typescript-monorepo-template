import { createRoute, createRoutes } from "@/types/contract.types.js";
import { walletRoutes } from "./wallets.contract.js";
import { streakRoutes } from "./streaks.contract.js";

export const leaderboardSystemRoutes = createRoutes({
  wallets: createRoute({
    path: "/wallets",
    routes: walletRoutes,
  }),
  streaks: createRoute({
    path: "/streaks",
    routes: streakRoutes,
  }),
});
