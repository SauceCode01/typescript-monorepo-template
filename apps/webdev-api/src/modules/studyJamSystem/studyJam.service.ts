import { studyJamModel, StudyJamModel } from "./studyJam.model.js";
import { database } from "firebase-admin";
import { TablesInsert, TablesUpdate, Types } from "@packages/api-types"; 

export class StudyJamService {
  constructor(private studyJamModel: StudyJamModel) {
    this.studyJamModel = studyJamModel;
  }

  async listStudyJamsByPage(pageNumber: number, pageSize: number) {
    const { data: listData, error: listError } =
      await this.studyJamModel.listStudyJamsByPage(pageNumber, pageSize);

    if (listError) {
      return { error: listError };
    }

    const { data: count, error: countError } =
      await this.studyJamModel.countStudyJams();

    if (countError) {
      return { error: countError };
    }

    return { data: { listData: listData, count: count } };
  }

  async createStudyJam({dto, creator_id} : 
    {
      dto: Types["studyJams"]["post"]["request"]["body"];
      creator_id: string;
    }
  ) {
    const { data, error } = await this.studyJamModel.createStudyJam({
      ...dto, 
      creator_id: creator_id,
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  async getStudyJam(id: string) {
    const {data, error} = await this.studyJamModel.getStudyJamById(id);

    if (error) {
      return { error };
    }

    return {data};
  }

  async updateStudyJam(id: string, updateDTO: TablesUpdate<"study_jam">) {

    const { data, error } = await this.studyJamModel.updateStudyJam(
      id,
      updateDTO
    );

    if (error) {
      return { error };
    }

    return { data };
  }

  async deleteStudyJam(id: string) {
    const { data, error } = await this.studyJamModel.deleteStudyJam(id);
    if (error) {
      return { error };
    }

    return { data };
  }
}

export const studyJamService = new StudyJamService(studyJamModel);
