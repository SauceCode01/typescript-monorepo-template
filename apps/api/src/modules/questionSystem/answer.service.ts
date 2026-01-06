import { answerModel, AnswerModel } from "./answer.model.js"; 
import { 
  Tables, 
  Types,
} from "@packages/api-types";

export class AnswerService {
  constructor(private answerModel: AnswerModel) {
    this.answerModel = answerModel;
  }

  /**
   * =================================
   * CREATE
   * =================================
   */
  create = async ({
    dto,
    userId,
  }: {
    dto: Types["questions"]["answers"]["post"]["request"]["body"];
    userId: string;
  }) => {
    /**
     * TODO:
     * - validate if user already answered the question
     * - check if the answer is correct
     * - if answer is correct, debit user points
     * - update streak of the user
     */

    const answerDTO = {
      ...dto,
      user_id: userId,
      is_correct: false,
    };

    const { data, error } = await this.answerModel.create(answerDTO);

    if (error) {
      return { error };
    }

    return { data };
  };

  get = async ({ answerId }: { answerId: string }) => {
    const { data, error } = await this.answerModel.get({ answerId });

    if (error) {
      return { error };
    }

    return { data: data as Tables<"question_answer"> };
  };

  listByQuestion = async ({
    questionId,
    pageNumber = 1,
    pageSize = 10,
  }: {
    questionId: string;
    pageNumber?: number;
    pageSize?: number;
  }) => {
    const { data, error } = await this.answerModel.listByQuestion({
      questionId,
      pageNumber,
      pageSize,
    });
    if (error) {
      return { error };
    }
    return { data };
  };

  listByUser = async ({
    userId,
    pageNumber = 1,
    pageSize = 10,
  }: {
    userId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const { data, error } = await this.answerModel.listByUser({
      userId,
      pageNumber,
      pageSize,
    });
    if (error) {
      return { error };
    }
    return { data };
  };

  listByUserAndQuestion = async ({
    userId,
    questionId,
    pageNumber = 1,
    pageSize = 10,
  }: {
    userId: string;
    questionId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const { data, error } = await this.answerModel.listByUserAndQuestion({
      userId,
      questionId,
      pageNumber,
      pageSize,
    });
    if (error) {
      return { error };
    }
    return { data };
  };
}

export const answerService = new AnswerService(answerModel);
