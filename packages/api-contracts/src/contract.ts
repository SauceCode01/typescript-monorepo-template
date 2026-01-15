
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. 
// RUN "pnpm contract-gen -i ./src/routes -o ./src/contract.ts" TO SYNC CHANGES.

import {z} from "zod";

import { query as api_article_system_articles_GET_query } from "./routes/api/article-system/articles/GET";
import { response as api_article_system_articles_GET_response } from "./routes/api/article-system/articles/GET";
import { body as api_article_system_articles_POST_body } from "./routes/api/article-system/articles/POST";
import { response as api_article_system_articles_POST_response } from "./routes/api/article-system/articles/POST";
import { params as api_article_system_articles_articleId_DELETE_params } from "./routes/api/article-system/articles/[articleId]/DELETE";
import { response as api_article_system_articles_articleId_DELETE_response } from "./routes/api/article-system/articles/[articleId]/DELETE";
import { params as api_article_system_articles_articleId_GET_params } from "./routes/api/article-system/articles/[articleId]/GET";
import { response as api_article_system_articles_articleId_GET_response } from "./routes/api/article-system/articles/[articleId]/GET";
import { params as api_article_system_articles_articleId_PATCH_params } from "./routes/api/article-system/articles/[articleId]/PATCH";
import { body as api_article_system_articles_articleId_PATCH_body } from "./routes/api/article-system/articles/[articleId]/PATCH";
import { response as api_article_system_articles_articleId_PATCH_response } from "./routes/api/article-system/articles/[articleId]/PATCH";
import { response as api_health_GET_response } from "./routes/api/health/GET";
import { articleRow as model_article_articleRow } from "./models//article";
import { articleInsertDTO as model_article_articleInsertDTO } from "./models//article";
import { articleUpdateDTO as model_article_articleUpdateDTO } from "./models//article";

export const EndpointSchemas = {
  "api_article_system_articles_GET": {
    "request": {
      "query": api_article_system_articles_GET_query
    },
    "response": api_article_system_articles_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/api/article-system/articles",
      "signature": "api_article_system_articles_GET"
    }
  },
  "api_article_system_articles_POST": {
    "request": {
      "body": api_article_system_articles_POST_body
    },
    "response": api_article_system_articles_POST_response,
    "metadata": {
      "method": "POST",
      "path": "/api/article-system/articles",
      "signature": "api_article_system_articles_POST"
    }
  },
  "api_article_system_articles_articleId_DELETE": {
    "request": {
      "params": api_article_system_articles_articleId_DELETE_params
    },
    "response": api_article_system_articles_articleId_DELETE_response,
    "metadata": {
      "method": "DELETE",
      "path": "/api/article-system/articles/[articleId]",
      "signature": "api_article_system_articles_articleId_DELETE"
    }
  },
  "api_article_system_articles_articleId_GET": {
    "request": {
      "params": api_article_system_articles_articleId_GET_params
    },
    "response": api_article_system_articles_articleId_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/api/article-system/articles/[articleId]",
      "signature": "api_article_system_articles_articleId_GET"
    }
  },
  "api_article_system_articles_articleId_PATCH": {
    "request": {
      "params": api_article_system_articles_articleId_PATCH_params,
      "body": api_article_system_articles_articleId_PATCH_body
    },
    "response": api_article_system_articles_articleId_PATCH_response,
    "metadata": {
      "method": "PATCH",
      "path": "/api/article-system/articles/[articleId]",
      "signature": "api_article_system_articles_articleId_PATCH"
    }
  },
  "api_health_GET": {
    "request": {},
    "response": api_health_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/api/health",
      "signature": "api_health_GET"
    }
  }
}

export const contract = {
  "api": {
    "article_system": {
      "articles": {
        "GET": {
          "request": {
            "query": api_article_system_articles_GET_query
          },
          "response": api_article_system_articles_GET_response,
          "metadata": {
            "method": "GET",
            "path": "/api/article-system/articles",
            "signature": "api_article_system_articles_GET"
          }
        },
        "POST": {
          "request": {
            "body": api_article_system_articles_POST_body
          },
          "response": api_article_system_articles_POST_response,
          "metadata": {
            "method": "POST",
            "path": "/api/article-system/articles",
            "signature": "api_article_system_articles_POST"
          }
        },
        "articleId": {
          "DELETE": {
            "request": {
              "params": api_article_system_articles_articleId_DELETE_params
            },
            "response": api_article_system_articles_articleId_DELETE_response,
            "metadata": {
              "method": "DELETE",
              "path": "/api/article-system/articles/[articleId]",
              "signature": "api_article_system_articles_articleId_DELETE"
            }
          },
          "GET": {
            "request": {
              "params": api_article_system_articles_articleId_GET_params
            },
            "response": api_article_system_articles_articleId_GET_response,
            "metadata": {
              "method": "GET",
              "path": "/api/article-system/articles/[articleId]",
              "signature": "api_article_system_articles_articleId_GET"
            }
          },
          "PATCH": {
            "request": {
              "params": api_article_system_articles_articleId_PATCH_params,
              "body": api_article_system_articles_articleId_PATCH_body
            },
            "response": api_article_system_articles_articleId_PATCH_response,
            "metadata": {
              "method": "PATCH",
              "path": "/api/article-system/articles/[articleId]",
              "signature": "api_article_system_articles_articleId_PATCH"
            }
          }
        }
      }
    },
    "health": {
      "GET": {
        "request": {},
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

export const models = {
  "article_model": model_article_articleUpdateDTO
}

export type ResponseTypes = {
  api_article_system_articles_GET : { [K in keyof typeof api_article_system_articles_GET_response]: z.infer<typeof api_article_system_articles_GET_response[K]> },
  api_article_system_articles_POST : { [K in keyof typeof api_article_system_articles_POST_response]: z.infer<typeof api_article_system_articles_POST_response[K]> },
  api_article_system_articles_articleId_DELETE : { [K in keyof typeof api_article_system_articles_articleId_DELETE_response]: z.infer<typeof api_article_system_articles_articleId_DELETE_response[K]> },
  api_article_system_articles_articleId_GET : { [K in keyof typeof api_article_system_articles_articleId_GET_response]: z.infer<typeof api_article_system_articles_articleId_GET_response[K]> },
  api_article_system_articles_articleId_PATCH : { [K in keyof typeof api_article_system_articles_articleId_PATCH_response]: z.infer<typeof api_article_system_articles_articleId_PATCH_response[K]> },
  api_health_GET : { [K in keyof typeof api_health_GET_response]: z.infer<typeof api_health_GET_response[K]> }
}
  
export type RequestTypes = {
  api_article_system_articles_GET : { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_GET" ]["request"][K]> },
  api_article_system_articles_POST : { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_POST" ]["request"][K]> },
  api_article_system_articles_articleId_DELETE : { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_DELETE" ]["request"][K]> },
  api_article_system_articles_articleId_GET : { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_GET" ]["request"][K]> },
  api_article_system_articles_articleId_PATCH : { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_PATCH" ]["request"][K]> },
  api_health_GET : { [K in keyof typeof EndpointSchemas[ "api_health_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_health_GET" ]["request"][K]> }
}

export type EndpointTypes = {
    "api_article_system_articles_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_article_system_articles_GET_response]: z.infer<typeof api_article_system_articles_GET_response[K]> };
       },
    "api_article_system_articles_POST": {
          request: { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_POST" ]["request"][K]> };
        response: { [K in keyof typeof api_article_system_articles_POST_response]: z.infer<typeof api_article_system_articles_POST_response[K]> };
       },
    "api_article_system_articles_articleId_DELETE": {
          request: { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_DELETE" ]["request"][K]> };
        response: { [K in keyof typeof api_article_system_articles_articleId_DELETE_response]: z.infer<typeof api_article_system_articles_articleId_DELETE_response[K]> };
       },
    "api_article_system_articles_articleId_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_article_system_articles_articleId_GET_response]: z.infer<typeof api_article_system_articles_articleId_GET_response[K]> };
       },
    "api_article_system_articles_articleId_PATCH": {
          request: { [K in keyof typeof EndpointSchemas[ "api_article_system_articles_articleId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_article_system_articles_articleId_PATCH" ]["request"][K]> };
        response: { [K in keyof typeof api_article_system_articles_articleId_PATCH_response]: z.infer<typeof api_article_system_articles_articleId_PATCH_response[K]> };
       },
    "api_health_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "api_health_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "api_health_GET" ]["request"][K]> };
        response: { [K in keyof typeof api_health_GET_response]: z.infer<typeof api_health_GET_response[K]> };
       }
}
  
export type Responses<T extends keyof ResponseTypes> = ResponseTypes[T];
export type Requests<T extends keyof RequestTypes> = RequestTypes[T];
export type Endpoints<T extends keyof EndpointTypes> = EndpointTypes[T];

