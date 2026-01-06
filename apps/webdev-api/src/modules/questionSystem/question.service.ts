import { questionModel, QuestionModel } from "./question.model.js";
import { database } from "firebase-admin";
import { Tables, TablesInsert, TablesUpdate, Types } from "@packages/api-types";
import { CreateDTO } from "./question.types.js";

export class QuestionService {
  constructor(private questionModel: QuestionModel) {
    this.questionModel = questionModel;
  }

  /**
   * =================================
   * CREATE
   * =================================
   */
  create = async (dto: TablesInsert<"question">)   => {
    const { data, error } = await this.questionModel.createQuestion(dto);

    if (error) {
      return { error };
    }

    return { data };
  };

  /**
   * =================================
   * LIST
   * =================================
   */
  list = async (pageNumber: number, pageSize: number) => {
    const { data: listData, error: listError } =
      await this.questionModel.listQuestionsByPage(pageNumber, pageSize);

    if (listError) {
      return { error: listError };
    }

    const { data: count, error: countError } =
      await this.questionModel.countQuestions();

    if (countError) {
      return { error: countError };
    }

    return { data: { listData: listData, count: count } };
  };

  /**
   * =================================
   * GET
   * =================================
   */
  get = async (id: string) => {
    const { data, error } = await this.questionModel.getQuestionById(id);

    if (error) {
      return { error };
    }

    return { data };
  };

  /**
   * =================================
   * UPDATE
   * =================================
   */
  update = async (id: string, updateDTO: TablesUpdate<"question">) => {
    const { data, error } = await this.questionModel.updateQuestion(
      id,
      updateDTO
    );

    if (error) {
      return { error };
    }

    return { data };
  };

  /**
   * =================================
   * DELETE
   * =================================
   */
  delete = async (id: string) => {
    const { data, error } = await this.questionModel.deleteQuestion(id);
    if (error) {
      return { error };
    }

    return { data };
  };
}

export const questionService = new QuestionService(questionModel);
