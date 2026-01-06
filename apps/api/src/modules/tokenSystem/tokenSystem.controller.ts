import { RequestHandler } from "express";
import { templateService, TemplateService } from "./template.service.js";
import {
  TokenService,
  tokenService as tokenServiceImport,
} from "./token.service.js";
import { createExpressController, Schemas } from "@packages/api-types";

export class TokenSystemController {
  constructor(
    private service: TemplateService = templateService,
    private tokenService: TokenService = tokenServiceImport
  ) {}

  getTemplate: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.get,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.service.get({
        id: input.params.templateId,
      });
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to get token template.",
        });
      }

      if (!data) {
        return output(404, {
          status: "error",
          message: "Token template not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "Token template fetched successfully.",
        data: data,
      });
    }
  );

  createTemplate: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.post,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.service.create({
        dto: input.body,
        userId: req.user!.id,
      });
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to create token template.",
        });
      }
      return output(201, {
        status: "success",
        message: "Token template created successfully.",
        data: data,
      });
    }
  );

  listTemplates: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.list,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.service.list({
        pageNumber: input.query.page.number,
        pageSize: input.query.page.size,
      });

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to list token templates.",
        });
      }

      return output(200, {
        status: "success",
        message: "Token templates fetched successfully.",
        data: data.list,
        meta: {
          totalRecords: data.count,
          currentPage: input.query.page.number,
          pageSize: input.query.page.size,
          totalPages: Math.ceil(data.count / input.query.page.size),
        },
      });
    }
  );

  updateTemplate: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.put,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.service.update({
        id: input.params.templateId,
        dto: input.body,
      });
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to update token template.",
        });
      }

      if (!data) {
        return output(404, {
          status: "error",
          message: "Token template not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "Token template updated successfully.",
        data: data,
      });
    }
  );

  deleteTemplate: RequestHandler = async (req, res) => {};

  createToken: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.tokens.post,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.tokenService.createToken(
        input.body,
        req.user!.id
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to create token.",
        });
      }
      return output(201, {
        status: "success",
        message: "Token created successfully.",
        data: data,
      });
    }
  );

  listTokens: RequestHandler = createExpressController(
    Schemas.tokenSystem.templates.tokens.list,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.tokenService.listTokensByPage(
        input.query.page.number,
        input.query.page.size
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch tokens.",
        });
      }
      return output(200, {
        status: "success",
        message: "Tokens fetched successfully.",
        data: data.listData,
        meta: {
          totalRecords: data.count,
          currentPage: input.query.page.number,
          pageSize: input.query.page.size,
          totalPages: Math.ceil(data.count / input.query.page.size),
        },
      });
    }
  );

  deleteToken: RequestHandler = async (req, res) => {};

  redeemToken: RequestHandler = createExpressController(
    Schemas.tokenSystem.redeem.put,
    async ({ input, output, req, res }) => {
      const { data, error } = await this.tokenService.claimTokenByCode(
        input.body.code,
        req.user!.id
      );
      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to redeem token.",
        });
      }
      return output(200, {
        status: "success",
        message: "Token redeemed successfully.",
        data: data,
      });
    }
  );
}

export const tokenSystemController = new TokenSystemController();
