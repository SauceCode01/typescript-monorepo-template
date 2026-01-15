import {
  ArticleRepository,
  articleRepositoryInstance,
} from "./article.repository.js";
import { Article, ArticleInsertDTO, ArticleUpdateDTO } from "./article.type.js";

export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository = articleRepositoryInstance
  ) {}

  public list = (pageNumber: number, pageSize: number) => {
    return this.articleRepository.list(pageNumber, pageSize);
  };

  public create = (data: ArticleInsertDTO) => {
    return this.articleRepository.create(data);
  };

  public getById = (id: string)     => {
    return this.articleRepository.getById(id);
  };

  public updateById = (
    id: string,
    data: ArticleUpdateDTO
  ) => {
    return this.articleRepository.updateById(id, data);
  };

  public deleteById = (id: string) => {
    return this.articleRepository.deleteById(id);
  };
}

export const articleServiceInstance = new ArticleService();
