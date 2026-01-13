import { ApiTypes, createContract, createRoute } from "@libs/api-typing";

import { articleSystem } from "./article-system/route.js";
import { health } from "./health/route.js";
export const root = createRoute({
  path: "/api",
  routes: {
    articleSystem,
    health: health
  },
});

export default root;
