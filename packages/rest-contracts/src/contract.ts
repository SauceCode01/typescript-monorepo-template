
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. 
// RUN "pnpm contract-gen -i ./src/routes -o ./src/contract.ts" TO SYNC CHANGES.

import {z} from "zod";

import { query as archives_GET_request_query } from "./routes/archives/GET";
import { response as archives_GET_response } from "./routes/archives/GET";
import { user as archives_GET_request_user } from "./routes/archives/GET";
import { body as archives_POST_request_body } from "./routes/archives/POST";
import { response as archives_POST_response } from "./routes/archives/POST";
import { response as archives_archiveId_DELETE_response } from "./routes/archives/[archiveId]/DELETE";
import { response as archives_archiveId_GET_response } from "./routes/archives/[archiveId]/GET";
import { response as archives_archiveId_logs_logId_GET_response } from "./routes/archives/[archiveId]/logs/[logId]/GET";
import { body as archives_archiveId_PATCH_request_body } from "./routes/archives/[archiveId]/PATCH";
import { response as archives_archiveId_PATCH_response } from "./routes/archives/[archiveId]/PATCH";
import { response as GET_response } from "./routes//GET";
import { query as users_userId_GET_request_query } from "./routes/users/[userId]/GET";
import { response as users_userId_GET_response } from "./routes/users/[userId]/GET";

export const api_shape = {
  "route_archives": {
    "__segment": "archives",
    "GET": {
      "request": {
        "query": archives_GET_request_query,
        "user": archives_GET_request_user
      },
      "response": archives_GET_response,
      "__fullPath": "/archives",
      "__method": "GET"
    },
    "POST": {
      "request": {
        "body": archives_POST_request_body
      },
      "response": archives_POST_response,
      "__fullPath": "/archives",
      "__method": "POST"
    },
    "route_param_archiveId": {
      "__segment": "[archiveId]",
      "__paramName": "archiveId",
      "DELETE": {
        "request": {
          "params": z.object({archiveId: z.string()})
        },
        "response": archives_archiveId_DELETE_response,
        "__fullPath": "/archives/[archiveId]",
        "__method": "DELETE"
      },
      "GET": {
        "request": {
          "params": z.object({archiveId: z.string()})
        },
        "response": archives_archiveId_GET_response,
        "__fullPath": "/archives/[archiveId]",
        "__method": "GET"
      },
      "route_logs": {
        "__segment": "logs",
        "route_param_logId": {
          "__segment": "[logId]",
          "__paramName": "logId",
          "GET": {
            "request": {
              "params": z.object({archiveId: z.string(),logId: z.string()})
            },
            "response": archives_archiveId_logs_logId_GET_response,
            "__fullPath": "/archives/[archiveId]/logs/[logId]",
            "__method": "GET"
          }
        }
      },
      "PATCH": {
        "request": {
          "params": z.object({archiveId: z.string()}),
          "body": archives_archiveId_PATCH_request_body
        },
        "response": archives_archiveId_PATCH_response,
        "__fullPath": "/archives/[archiveId]",
        "__method": "PATCH"
      }
    }
  },
  "GET": {
    "request": {},
    "response": GET_response,
    "__fullPath": "/",
    "__method": "GET"
  },
  "route_users": {
    "__segment": "users",
    "route_param_userId": {
      "__segment": "[userId]",
      "__paramName": "userId",
      "GET": {
        "request": {
          "params": z.object({userId: z.string()}),
          "query": users_userId_GET_request_query
        },
        "response": users_userId_GET_response,
        "__fullPath": "/users/[userId]",
        "__method": "GET"
      }
    }
  }
};

export interface AllTypes {
  archives_GET_request_query : z.infer<typeof archives_GET_request_query>,
  archives_GET_response : {  [K in keyof typeof archives_GET_response]: z.infer<typeof archives_GET_response[K]> },
  archives_GET_request_user : z.infer<typeof archives_GET_request_user>,
  archives_POST_request_body : z.infer<typeof archives_POST_request_body>,
  archives_POST_response : {  [K in keyof typeof archives_POST_response]: z.infer<typeof archives_POST_response[K]> },
  archives_archiveId_DELETE_response : {  [K in keyof typeof archives_archiveId_DELETE_response]: z.infer<typeof archives_archiveId_DELETE_response[K]> },
  archives_archiveId_GET_response : {  [K in keyof typeof archives_archiveId_GET_response]: z.infer<typeof archives_archiveId_GET_response[K]> },
  archives_archiveId_logs_logId_GET_response : {  [K in keyof typeof archives_archiveId_logs_logId_GET_response]: z.infer<typeof archives_archiveId_logs_logId_GET_response[K]> },
  archives_archiveId_PATCH_request_body : z.infer<typeof archives_archiveId_PATCH_request_body>,
  archives_archiveId_PATCH_response : {  [K in keyof typeof archives_archiveId_PATCH_response]: z.infer<typeof archives_archiveId_PATCH_response[K]> },
  GET_response : {  [K in keyof typeof GET_response]: z.infer<typeof GET_response[K]> },
  users_userId_GET_request_query : z.infer<typeof users_userId_GET_request_query>,
  users_userId_GET_response : {  [K in keyof typeof users_userId_GET_response]: z.infer<typeof users_userId_GET_response[K]> }
}
export type Type<T extends keyof AllTypes > = 
  AllTypes[T] ;

