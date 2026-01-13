import { createExpressController } from "@libs/api-typing";
import { Contract, ContractTypes, Models } from "@packages/api-contracts";

export class ArticleRepository {
  public list = (
    pageNumber: number,
    pageSize: number
  ): Promise<Models.articleSystem.article.row[]> => {
    const action = async () => {
      return Array.from({ length: pageSize }, (_, i) => ({
        id: `${i}`,
        title: `title ${i}`,
        description: `description ${i}`,
        content: `content ${i}`,
      }));
    };
    return action();
  };

  public create = (
    data: Models.articleSystem.article.insertDTO
  ): Promise<Models.articleSystem.article.row> => {
    const action = async () => {
      return {
        id: "1",
        ...data,
      };
    };
    return action();
  };

  public getById = (id: string): Promise<Models.articleSystem.article.row> => {
    const action = async () => {
      return {
        id: id,
        title: "Sample Title",
        description: "Sample Description",
        content: "Sample Content",
      };
    };
    return action();
  };

  public updateById = (
    id: string,
    data: Models.articleSystem.article.updateDTO
  ): Promise<Models.articleSystem.article.row> => {
    const action = async () => {
      return {
        id: id,
        title: "Sample Title",
        description: "Sample Description",
        content: "Sample Content",
        ...data,
      };
    };
    return action();
  };

  public deleteById = (id: string): Promise<void> => {
    const action = async () => {
      return;
    };
    return action();
  };
}

export const articleRepositoryInstance = new ArticleRepository();
