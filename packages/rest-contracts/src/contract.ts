
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. 
// RUN "pnpm contract-gen -i ./src/routes -o ./src/contract.ts" TO SYNC CHANGES.

import {z} from "zod";

import { query as archives_GET_query } from "./routes/archives/GET";
import { response as archives_GET_response } from "./routes/archives/GET";
import { body as archives_POST_body } from "./routes/archives/POST";
import { response as archives_POST_response } from "./routes/archives/POST";
import { response as archives_archiveId_DELETE_response } from "./routes/archives/[archiveId]/DELETE";
import { response as archives_archiveId_GET_response } from "./routes/archives/[archiveId]/GET";
import { response as archives_archiveId_logs_logId_GET_response } from "./routes/archives/[archiveId]/logs/[logId]/GET";
import { body as archives_archiveId_PATCH_body } from "./routes/archives/[archiveId]/PATCH";
import { response as archives_archiveId_PATCH_response } from "./routes/archives/[archiveId]/PATCH";
import { response as GET_response } from "./routes//GET";
import { query as users_userId_GET_query } from "./routes/users/[userId]/GET";
import { response as users_userId_GET_response } from "./routes/users/[userId]/GET";

export const EndpointSchemas = {
  "archives_GET": {
    "request": {
      "params": z.object({}),
      "query": archives_GET_query
    },
    "response": archives_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/archives",
      "signature": "archives_GET"
    }
  },
  "archives_POST": {
    "request": {
      "params": z.object({}),
      "body": archives_POST_body
    },
    "response": archives_POST_response,
    "metadata": {
      "method": "POST",
      "path": "/archives",
      "signature": "archives_POST"
    }
  },
  "archives_archiveId_DELETE": {
    "request": {
      "params": z.object({archiveId: z.string()})
    },
    "response": archives_archiveId_DELETE_response,
    "metadata": {
      "method": "DELETE",
      "path": "/archives/[archiveId]",
      "signature": "archives_archiveId_DELETE"
    }
  },
  "archives_archiveId_GET": {
    "request": {
      "params": z.object({archiveId: z.string()})
    },
    "response": archives_archiveId_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/archives/[archiveId]",
      "signature": "archives_archiveId_GET"
    }
  },
  "archives_archiveId_logs_logId_GET": {
    "request": {
      "params": z.object({archiveId: z.string(),logId: z.string()})
    },
    "response": archives_archiveId_logs_logId_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/archives/[archiveId]/logs/[logId]",
      "signature": "archives_archiveId_logs_logId_GET"
    }
  },
  "archives_archiveId_PATCH": {
    "request": {
      "params": z.object({archiveId: z.string()}),
      "body": archives_archiveId_PATCH_body
    },
    "response": archives_archiveId_PATCH_response,
    "metadata": {
      "method": "PATCH",
      "path": "/archives/[archiveId]",
      "signature": "archives_archiveId_PATCH"
    }
  },
  "GET": {
    "request": {
      "params": z.object({})
    },
    "response": GET_response,
    "metadata": {
      "method": "GET",
      "path": "/",
      "signature": "GET"
    }
  },
  "users_userId_GET": {
    "request": {
      "params": z.object({userId: z.string()}),
      "query": users_userId_GET_query
    },
    "response": users_userId_GET_response,
    "metadata": {
      "method": "GET",
      "path": "/users/[userId]",
      "signature": "users_userId_GET"
    }
  }
}

export const RouteTree = {
  "archives": {
    "GET": {
      "request": {
        "params": z.object({}),
        "query": archives_GET_query
      },
      "response": archives_GET_response,
      "metadata": {
        "method": "GET",
        "path": "/archives",
        "signature": "archives_GET"
      }
    },
    "POST": {
      "request": {
        "params": z.object({}),
        "body": archives_POST_body
      },
      "response": archives_POST_response,
      "metadata": {
        "method": "POST",
        "path": "/archives",
        "signature": "archives_POST"
      }
    },
    "archiveId": {
      "DELETE": {
        "request": {
          "params": z.object({archiveId: z.string()})
        },
        "response": archives_archiveId_DELETE_response,
        "metadata": {
          "method": "DELETE",
          "path": "/archives/[archiveId]",
          "signature": "archives_archiveId_DELETE"
        }
      },
      "GET": {
        "request": {
          "params": z.object({archiveId: z.string()})
        },
        "response": archives_archiveId_GET_response,
        "metadata": {
          "method": "GET",
          "path": "/archives/[archiveId]",
          "signature": "archives_archiveId_GET"
        }
      },
      "logs": {
        "logId": {
          "GET": {
            "request": {
              "params": z.object({archiveId: z.string(),logId: z.string()})
            },
            "response": archives_archiveId_logs_logId_GET_response,
            "metadata": {
              "method": "GET",
              "path": "/archives/[archiveId]/logs/[logId]",
              "signature": "archives_archiveId_logs_logId_GET"
            }
          }
        }
      },
      "PATCH": {
        "request": {
          "params": z.object({archiveId: z.string()}),
          "body": archives_archiveId_PATCH_body
        },
        "response": archives_archiveId_PATCH_response,
        "metadata": {
          "method": "PATCH",
          "path": "/archives/[archiveId]",
          "signature": "archives_archiveId_PATCH"
        }
      }
    }
  },
  "GET": {
    "request": {
      "params": z.object({})
    },
    "response": GET_response,
    "metadata": {
      "method": "GET",
      "path": "/",
      "signature": "GET"
    }
  },
  "users": {
    "userId": {
      "GET": {
        "request": {
          "params": z.object({userId: z.string()}),
          "query": users_userId_GET_query
        },
        "response": users_userId_GET_response,
        "metadata": {
          "method": "GET",
          "path": "/users/[userId]",
          "signature": "users_userId_GET"
        }
      }
    }
  }
}

export type ResponseTypes = {
  archives_GET : { [K in keyof typeof archives_GET_response]: z.infer<typeof archives_GET_response[K]> },
  archives_POST : { [K in keyof typeof archives_POST_response]: z.infer<typeof archives_POST_response[K]> },
  archives_archiveId_DELETE : { [K in keyof typeof archives_archiveId_DELETE_response]: z.infer<typeof archives_archiveId_DELETE_response[K]> },
  archives_archiveId_GET : { [K in keyof typeof archives_archiveId_GET_response]: z.infer<typeof archives_archiveId_GET_response[K]> },
  archives_archiveId_logs_logId_GET : { [K in keyof typeof archives_archiveId_logs_logId_GET_response]: z.infer<typeof archives_archiveId_logs_logId_GET_response[K]> },
  archives_archiveId_PATCH : { [K in keyof typeof archives_archiveId_PATCH_response]: z.infer<typeof archives_archiveId_PATCH_response[K]> },
  GET : { [K in keyof typeof GET_response]: z.infer<typeof GET_response[K]> },
  users_userId_GET : { [K in keyof typeof users_userId_GET_response]: z.infer<typeof users_userId_GET_response[K]> }
}
  
export type RequestTypes = {
  archives_GET : { [K in keyof typeof EndpointSchemas[ "archives_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_GET" ]["request"][K]> },
  archives_POST : { [K in keyof typeof EndpointSchemas[ "archives_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_POST" ]["request"][K]> },
  archives_archiveId_DELETE : { [K in keyof typeof EndpointSchemas[ "archives_archiveId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_DELETE" ]["request"][K]> },
  archives_archiveId_GET : { [K in keyof typeof EndpointSchemas[ "archives_archiveId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_GET" ]["request"][K]> },
  archives_archiveId_logs_logId_GET : { [K in keyof typeof EndpointSchemas[ "archives_archiveId_logs_logId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_logs_logId_GET" ]["request"][K]> },
  archives_archiveId_PATCH : { [K in keyof typeof EndpointSchemas[ "archives_archiveId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_PATCH" ]["request"][K]> },
  GET : { [K in keyof typeof EndpointSchemas[ "GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "GET" ]["request"][K]> },
  users_userId_GET : { [K in keyof typeof EndpointSchemas[ "users_userId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "users_userId_GET" ]["request"][K]> }
}

export type EndpointTypes = {
    "archives_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_GET" ]["request"][K]> };
        response: { [K in keyof typeof archives_GET_response]: z.infer<typeof archives_GET_response[K]> };
       },
    "archives_POST": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_POST" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_POST" ]["request"][K]> };
        response: { [K in keyof typeof archives_POST_response]: z.infer<typeof archives_POST_response[K]> };
       },
    "archives_archiveId_DELETE": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_archiveId_DELETE" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_DELETE" ]["request"][K]> };
        response: { [K in keyof typeof archives_archiveId_DELETE_response]: z.infer<typeof archives_archiveId_DELETE_response[K]> };
       },
    "archives_archiveId_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_archiveId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_GET" ]["request"][K]> };
        response: { [K in keyof typeof archives_archiveId_GET_response]: z.infer<typeof archives_archiveId_GET_response[K]> };
       },
    "archives_archiveId_logs_logId_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_archiveId_logs_logId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_logs_logId_GET" ]["request"][K]> };
        response: { [K in keyof typeof archives_archiveId_logs_logId_GET_response]: z.infer<typeof archives_archiveId_logs_logId_GET_response[K]> };
       },
    "archives_archiveId_PATCH": {
          request: { [K in keyof typeof EndpointSchemas[ "archives_archiveId_PATCH" ]["request"]]: z.infer<typeof EndpointSchemas[ "archives_archiveId_PATCH" ]["request"][K]> };
        response: { [K in keyof typeof archives_archiveId_PATCH_response]: z.infer<typeof archives_archiveId_PATCH_response[K]> };
       },
    "GET": {
          request: { [K in keyof typeof EndpointSchemas[ "GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "GET" ]["request"][K]> };
        response: { [K in keyof typeof GET_response]: z.infer<typeof GET_response[K]> };
       },
    "users_userId_GET": {
          request: { [K in keyof typeof EndpointSchemas[ "users_userId_GET" ]["request"]]: z.infer<typeof EndpointSchemas[ "users_userId_GET" ]["request"][K]> };
        response: { [K in keyof typeof users_userId_GET_response]: z.infer<typeof users_userId_GET_response[K]> };
       }
}
  
export type Response<T extends keyof ResponseTypes> = ResponseTypes[T];
export type Request<T extends keyof RequestTypes> = RequestTypes[T];
export type Endpoint<T extends keyof EndpointTypes> = EndpointTypes[T];

