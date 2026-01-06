 
import { RequestHandler } from "express";
import {
  questionService as defaultQuestionService,
  QuestionService,
} from "./question.service.js";
import {
  AnswerService,
  answerService as defaultAnswerService,
} from "./answer.service.js";
import { createExpressController } from "@packages/api-typing";
import { webdevApiContract } from "@packages/webdev-api-contracts";

export class QuestionSystemController {
  constructor(
    private questionService: QuestionService = defaultQuestionService,
    private answerService: AnswerService = defaultAnswerService
  ) {}

  create: RequestHandler = createExpressController(
    Schemas.questions.post,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.questionService.create({
        ...input.body,
        creator_id: req.user!.id,
      });

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to create question.",
        });
      }

      return output(201, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data,
      });
    }
  );

  list: RequestHandler = createExpressController(
    Schemas.questions.list,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.questionService.list(
        input.query.page.number,
        input.query.page.size
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch questions.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data.listData,
        meta: {
          totalRecords: data.count,
          pageSize: input.query.page.size,
          currentPage: input.query.page.number,
          totalPages: Math.ceil(data.count / input.query.page.size),
        },
      });
    }
  );

  get: RequestHandler = createExpressController(
    Schemas.questions.get,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.questionService.get(
        input.params.questionId
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to fetch question.",
        });
      }

      if (!data) {
        return output(404, {
          status: "error",
          message: "Question not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data,
      });
    }
  );

  update: RequestHandler = createExpressController(
    Schemas.questions.put,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.questionService.update(
        input.params.questionId,
        input.body
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to update question.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data,
      });
    }
  );

  delete: RequestHandler = createExpressController(
    Schemas.questions.delete,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.questionService.delete(
        input.params.questionId
      );

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to delete question.",
        });
      }

      return output(204, {
        status: "success",
        message: "this route is not yet implemented.",
      });
    }
  );

  submitAnswer: RequestHandler = createExpressController(
    Schemas.questions.answers.post,
    async ({ input, output, res, req }) => {
      const { data, error } = await this.answerService.create({
        dto: input.body,
        userId: req.user!.id,
      });

      if (error) {
        return output(500, {
          status: "error",
          message: "Failed to submit answer.",
        });
      }

      return output(201, {
        status: "success",
        message: "this route is not yet implemented.",
        data: data,
      });
    }
  );

  listAnswers: RequestHandler = createExpressController(
    Schemas.questions.answers.list,
    async ({ input, output, res, req }) => {
      const questionId = input.params.questionId;
      const userId = input.query.filters?.userId;

      let finaldata:
        | { list: Tables<"question_answer">[]; count: number }
        | undefined;
      let finalerror: Error | null | undefined;

      if (questionId !== "-" && userId) {
        const { data, error } = await this.answerService.listByUserAndQuestion({
          questionId,
          userId,
          pageNumber: input.query.page.number,
          pageSize: input.query.page.size,
        });
        finaldata = data;
        finalerror = error;
      } else if (questionId !== "-") {
        const { data, error } = await this.answerService.listByQuestion({
          questionId: input.params.questionId,
          pageNumber: input.query.page.number,
          pageSize: input.query.page.size,
        });
        finaldata = data;
        finalerror = error;
      } else {
        return output(400, {
          status: "error",
          message: "Invalid query parameters.",
        });
      }

      if (finalerror) {
        return output(500, {
          status: "error",
          message: "Failed to fetch answers.",
        });
      }

      if (!finaldata) {
        return output(404, {
          status: "error",
          message: "Answers not found.",
        });
      }

      return output(200, {
        status: "success",
        message: "this route is not yet implemented.",
        data: finaldata.list,
        meta: {
          totalRecords: finaldata.count,
          pageSize: input.query.page.size,
          currentPage: input.query.page.number,
          totalPages: Math.ceil(finaldata.count / input.query.page.size),
        },
      });
    }
  );
}

export const questionSystemController = new QuestionSystemController();
