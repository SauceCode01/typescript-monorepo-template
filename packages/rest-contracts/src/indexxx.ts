
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import { z } from 'zod';

import * as api_archives_GET from "./routes/archives/GET";
import * as api_archives_POST from "./routes/archives/POST";
import * as api_archives_archiveId_DELETE from "./routes/archives/[archiveId]/DELETE";
import * as api_archives_archiveId_GET from "./routes/archives/[archiveId]/GET";
import * as api_archives_archiveId_PATCH from "./routes/archives/[archiveId]/PATCH";
import * as api__GET from "./routes//GET";
import * as api_users_userId_GET from "./routes/users/[userId]/GET";

export const contract = {
  "archives": {
    "GET": api_archives_GET,
    "GET_params": [],
    "POST": api_archives_POST,
    "POST_params": [],
    "sw_param_archiveId": {
      "__paramName": "archiveId",
      "DELETE": api_archives_archiveId_DELETE,
      "DELETE_params": [
        "archiveId"
      ],
      "GET": api_archives_archiveId_GET,
      "GET_params": [
        "archiveId"
      ],
      "PATCH": api_archives_archiveId_PATCH,
      "PATCH_params": [
        "archiveId"
      ]
    }
  },
  "GET": api__GET,
  "GET_params": [],
  "users": {
    "sw_param_userId": {
      "__paramName": "userId",
      "GET": api_users_userId_GET,
      "GET_params": [
        "userId"
      ]
    }
  }
} as const;
