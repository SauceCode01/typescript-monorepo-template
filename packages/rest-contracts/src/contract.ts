
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. 
// RUN "pnpm contract-gen -i ./src/routes -o ./src/contract.ts" TO SYNC CHANGES.

import {z} from "zod";

import { params as api_articlesystem_articles_articleId_DELETE_params } from "./routes/api/articlesystem/articles/[articleId]/DELETE";
import { response as api_articlesystem_articles_articleId_DELETE_response } from "./routes/api/articlesystem/articles/[articleId]/DELETE";
import { response as api_health_GET_response } from "./routes/api/health/GET";

export const EndpointSchemas = {
  "api_articlesystem_articles_GET": {
    "request": {
      "params": z.object({})
    },
    "response": {},
    "metadata": {
      "method": "GET",
      "path": "/api/articlesystem/articles",
      "signature": "api_articlesystem_articles_GET"
    }
  },
  "api_articlesystem_articles_POST": {
    "request": {
      "params": z.object({})
    },
    "response": {},
    "metadata": {
      "method": "POST",
      "path": "/api/articlesystem/articles",
      "signature": "api_articlesystem_articles_POST"
    }
  },
  "api_articlesystem_articles_articleId_DELETE": {
    "request": {
      "params": api_articlesystem_articles_articleId_DELETE_params
    },
    "response": api_articlesystem_articles_articleId_DELETE_response,
    "metadata": {
      "method": "DELETE",
      "path": "/api/articlesystem/articles/[articleId]",
      "signature": "api_articlesystem_articles_articleId_DELETE"
    }
  },
  "api_articlesystem_articles_articleId_GET": {
    "request": {
      "params": z.object({articleId: z.string()})
    },
    "response": {},
    "metadata": {
      "method": "GET",
      "path": "/api/articlesystem/articles/[articleId]",
      "signature": "api_articlesystem_articles_articleId_GET"
    }
  },
  "api_articlesystem_articles_articleId_PATCH": {
    "request": {
      "params": z.object({articleId: z.string()})
    },
    "response": {},
    "metadata": {
      "method": "PATCH",
      "path": "/api/articlesystem/articles/[articleId]",
      "signature": "api_articlesystem_articles_articleId_PATCH"
    }
  },
  "api_articlesystem_articles_articleId_route": {
    "request": {
      "params": z.object({articleId: z.string()})
    },
    "response": {},
    "metadata": {
      "method": "route",
      "path": "/api/articlesystem/articles/[articleId]",
      "signature": "api_articlesystem_articles_articleId_route"
    }
  },
  "api_health_GET": {
    "request": {
      "params": z.object({})
    },
    "response": api_health_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/api/health",
      "signature": "api_health_GET"
    }
  }
}

export const RouteTree = {
  "api": {
    "articlesystem": {
      "articles": {
        "GET": {
          "request": {
            "params": z.object({})
          },
          "response": {},
          "metadata": {
            "method": "GET",
            "path": "/api/articlesystem/articles",
            "signature": "api_articlesystem_articles_GET"
          }
        },
        "POST": {
          "request": {
            "params": z.object({})
          },
          "response": {},
          "metadata": {
            "method": "POST",
            "path": "/api/articlesystem/articles",
            "signature": "api_articlesystem_articles_POST"
          }
        },
        "articleId": {
          "DELETE": {
            "request": {
              "params": api_articlesystem_articles_articleId_DELETE_params
            },
            "response": api_articlesystem_articles_articleId_DELETE_response,
            "metadata": {
              "method": "DELETE",
              "path": "/api/articlesystem/articles/[articleId]",
              "signature": "api_articlesystem_articles_articleId_DELETE"
            }
          },
          "GET": {
            "request": {
              "params": z.object({articleId: z.string()})
            },
            "response": {},
            "metadata": {
              "method": "GET",
              "path": "/api/articlesystem/articles/[articleId]",
              "signature": "api_articlesystem_articles_articleId_GET"
            }
          },
          "PATCH": {
            "request": {
              "params": z.object({articleId: z.string()})
            },
            "response": {},
            "metadata": {
              "method": "PATCH",
              "path": "/api/articlesystem/articles/[articleId]",
              "signature": "api_articlesystem_articles_articleId_PATCH"
            }
          },
          "route": {
            "request": {
              "params": z.object({articleId: z.string()})
            },
            "response": {},
            "metadata": {
              "method": "route",
              "path": "/api/articlesystem/articles/[articleId]",
              "signature": "api_articlesystem_articles_articleId_route"
            }
          }
        }
      }
    },
    "health": {
      "GET": {
        "request": {
          "params": z.object({})
        },
        "response": api_health_GET_response,
        "metadata": {
          "method": "GET",
          "path": "/api/health",
          "signature": "api_health_GET"
        }
      }
    }
  }
}

export type ResponseTypes = {
  api_articlesystem_articles_GET : { [K in keyof typeof api_articlesystem_articles_GET_response]: z.infer<typeof api_articlesystem_articles_GET_response[K]> },
  api_articlesystem_articles_POST : { [K in keyof typeof api_articlesystem_articles_POST_response]: z.infer<typeof api_articlesystem_articles_POST_response[K]> },
  api_articlesystem_articles_articleId_DELETE : { [K in keyof typeof api_articlesystem_articles_articleId_DELETE_response]: z.infer<typeof api_articlesystem_articles_articleId_DELETE_response[K]> },
  api_articlesystem_articles_articleId_GET : { [K in keyof typeof api_articlesystem_articles_articleId_GET_response]: z.infer<typeof api_articlesystem_articles_articleId_GET_response[K]> },
  api_articlesystem_articles_articleId_PATCH : { [K in keyof typeof api_articlesystem_articles_articleId_PATCH_response]: z.infer<typeof api_articlesystem_articles_articleId_PATCH_response[K]> },
  api_articlesystem_articles_articleId_route : { [K in keyof typeof api_articlesystem_articles_articleId_route_response]: z.infer<typeof api_articlesystem_articles_articleId_route_response[K]> },
  api_health_GET : { [K in keyof typeof api_health_GET_response]: z.infer<typeof api_health_GET_response[K]> }
}
  
export type RequestTypes = {
  api_articlesystem_articles_GET : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_GET" ]["request"][K]> },
  api_articlesystem_articles_POST : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_POST" ]["request"][K]> },
  api_articlesystem_articles_articleId_DELETE : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_DELETE" ]["request"][K]> },
  api_articlesystem_articles_articleId_GET : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_GET" ]["request"][K]> },
  api_articlesystem_articles_articleId_PATCH : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_PATCH" ]["request"][K]> },
  api_articlesystem_articles_articleId_route : { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_route" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_route" ]["request"][K]> },
  api_health_GET : { [K in keyof typeof EndpointSchemas[ "api_health_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_health_GET" ]["request"][K]> }
}

export type EndpointTypes = {
    "api_articlesystem_articles_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_GET_response]: z.infer<typeof api_articlesystem_articles_GET_response[K]> };
       },
    "api_articlesystem_articles_POST": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_POST" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_POST_response]: z.infer<typeof api_articlesystem_articles_POST_response[K]> };
       },
    "api_articlesystem_articles_articleId_DELETE": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_DELETE" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_articleId_DELETE_response]: z.infer<typeof api_articlesystem_articles_articleId_DELETE_response[K]> };
       },
    "api_articlesystem_articles_articleId_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_articleId_GET_response]: z.infer<typeof api_articlesystem_articles_articleId_GET_response[K]> };
       },
    "api_articlesystem_articles_articleId_PATCH": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_PATCH" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_articleId_PATCH_response]: z.infer<typeof api_articlesystem_articles_articleId_PATCH_response[K]> };
       },
    "api_articlesystem_articles_articleId_route": {
          request: { [K in keyof typeof EndpointSchemas[ "api_articlesystem_articles_articleId_route" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_articlesystem_articles_articleId_route" ]["request"][K]> };
        response: { [K in keyof typeof api_articlesystem_articles_articleId_route_response]: z.infer<typeof api_articlesystem_articles_articleId_route_response[K]> };
       },
    "api_health_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_health_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_health_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_health_GET_response]: z.infer<typeof api_health_GET_response[K]> };
       }
}
  
export type Response<T extends keyof ResponseTypes> = ResponseTypes[T];
export type Request<T extends keyof RequestTypes> = RequestTypes[T];
export type Endpoint<T extends keyof EndpointTypes> = EndpointTypes[T];

