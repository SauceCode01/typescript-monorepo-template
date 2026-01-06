import { TablesInsert, TablesUpdate, Types } from "@packages/api-types";
import {
  tokenTemplateModel as defaultTokenTemplateModel,
  TokenTemplateModel,
} from "./template.model.js";

export class TemplateService {
  // dependencies
  constructor(
    private tokenTemplateModel: TokenTemplateModel = defaultTokenTemplateModel
  ) {}

  create = async ({
    dto,
    userId,
  }: {
    dto: Types["tokenSystem"]["templates"]["post"]["request"]["body"];
    userId: string;
  }) => {
    const { data, error } = await this.tokenTemplateModel.create({
      dto: {
        ...dto,
        creator_id: userId,
      },
    });

    if (error) return { error };

    return { data };
  };

  list = async ({
    pageNumber,
    pageSize,
  }: {
    pageNumber: number;
    pageSize: number;
  }) => {
    const { data, error } = await this.tokenTemplateModel.list({
      pageNumber,
      pageSize,
    });

    if (error) return { error };

    return { data };
  };

  get = async ({ id }: { id: string }) => {
    const { data, error } = await this.tokenTemplateModel.get({ id });

    if (error) return { error };

    return { data };
  };

  update = async ({
    id,
    dto,
  }: {
    id: string;
    dto: Types["tokenSystem"]["templates"]["put"]["request"]["body"];
  }) => {
    const { data, error } = await this.tokenTemplateModel.update({
      id,
      dto,
    });

    if (error) return { error };

    return { data };
  };
}

export const templateService = new TemplateService();
