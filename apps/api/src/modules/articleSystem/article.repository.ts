import { Article, ArticleInsertDTO, ArticleUpdateDTO } from "./article.type";

export class ArticleRepository {
  public list = async (
    pageNumber: number,
    pageSize: number
  ): Promise<Article[]> => {
    const action = async () => {
      return Array.from({ length: pageSize }, (_, i) => ({
        id: `${i}`,
        title: `title ${pageNumber} ${pageSize} ${i}`,
        description: `description ${i}`,
        content: `content ${i}`,
      }));
    };
    return action();
  };

  public create = (data: ArticleInsertDTO): Promise<Article> => {
    const action = async () => {
      return {
        id: "1",
        ...data,
      };
    };
    return action();
  };

  public getById = (id: string): Promise<Article> => {
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
    data: ArticleUpdateDTO
  ): Promise<Article> => {
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
