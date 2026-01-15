import { createExpressController } from "@packages/contract-gen";
import { ArticleService, articleServiceInstance } from "./article.service.js";
import { contract } from "@packages/api-contracts";

export class ArticleController {
  constructor(
    private articleService: ArticleService = articleServiceInstance
  ) {}

  public list = createExpressController(
    contract.api.article_system.articles.GET,
    async ({ input, output, ctx }) => {
      const articles = await this.articleService.list(
        input.query.page.number,
        input.query.page.size
      );
      return output(200, {
        status: "success",
        message: "Articles fetched successfully",
        data: articles,
        meta: {
          totalRecords: articles.length,
          currentPage: input.query.page.number,
          pageSize: input.query.page.size,
          totalPages: Math.ceil(articles.length / input.query.page.size),
        },
      });
    }
  );

  public create = createExpressController(
    contract.api.article_system.articles.POST,
    async ({ input, output, ctx }) => {
      const newArticle = await this.articleService.create(input.body.data);
      return output(200, {
        status: "success",
        message: "Article created successfully",
        data: newArticle,
      });
    }
  );

  public update = createExpressController(
    contract.api.article_system.articles.articleId.PATCH,
    async ({ input, output, ctx }) => {
      const updatedArticle = await this.articleService.updateById(
        input.params.articleId,
        input.body.data
      );
      return output(200, {
        status: "success",
        message: "Article updated successfully",
        data: updatedArticle,
      });
    }
  );

  public delete = createExpressController(
    contract.api.article_system.articles.articleId.DELETE,
    async ({ input, output, ctx }) => {
      await this.articleService.deleteById(input.params.articleId);
      return output(200, {
        status: "success",
        message: "Article deleted successfully",
      });
    }
  );

  public getOne = createExpressController(
    contract.api.article_system.articles.articleId.GET,
    async ({ input, output, ctx }) => {
      const article = await this.articleService.getById(input.params.articleId);
      return output(200, {
        status: "success",
        message: "Article fetched successfully",
        data: article,
      });
    }
  );
}

export const articleControllerInstance = new ArticleController();
