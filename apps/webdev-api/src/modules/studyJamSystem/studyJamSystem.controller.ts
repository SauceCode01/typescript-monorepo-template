import { RequestHandler } from "express";
import {
  studyJamService as studyJamServiceImport,
  StudyJamService,
} from "./studyJam.service.js";
import { createExpressController, Schemas } from "@packages/api-types";

/**
 * CONTROLLER LAYER WORKFLOW:
    // parse request parameters and body 
    // validate request parameters and body
    // call service 
    // validate service response
    // build response
 */

export class StudyJamController {
  constructor(
    private studyJamService: StudyJamService = studyJamServiceImport
  ) {}

  create: RequestHandler = createExpressController(
    Schemas.studyJams.post,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.studyJamService.createStudyJam({
        dto: input.body,
        creator_id: req.user!.id,
      });
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to create study jam.",
        });
      }

      return output(201, {
        status: "success",
        message: "Created study jam.",
        data: data,
      });
    }
  );

  list: RequestHandler = createExpressController(
    Schemas.studyJams.list,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.studyJamService.listStudyJamsByPage(
        input.query.page.number,
        input.query.page.size
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch study jams.",
        });
      }

      return output(200, {
        status: "success",
        message: "Fetched study jams.",
        data: data.listData,
        meta: {
          totalRecords: data.count || 0,
          currentPage: input.query.page.number,
          pageSize: input.query.page.size,
          totalPages: Math.ceil((data.count || 0) / input.query.page.size),
        },
      });
    }
  );

  get: RequestHandler = createExpressController(
    Schemas.studyJams.get,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.studyJamService.getStudyJam(
        input.params.studyJamId
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch study jam.",
        });
      }

      return output(200, {
        status: "success",
        message: "Fetched study jam.",
        data: data,
      });
    }
  );

  update: RequestHandler = createExpressController(
    Schemas.studyJams.put,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.studyJamService.updateStudyJam(
        input.params.studyJamId,
        input.body
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to update study jam.",
        });
      }

      return output(200, {
        status: "success",
        message: "Updated study jam.",
        data: data,
      });
    }
  );

  delete: RequestHandler = createExpressController(
    Schemas.studyJams.delete,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.studyJamService.deleteStudyJam(
        input.params.studyJamId
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to delete study jam.",
        });
      }

      return output(200, {
        status: "success",
        message: "Deleted study jam.", 
      });
    }
  );
}

export const studyJamController = new StudyJamController();
