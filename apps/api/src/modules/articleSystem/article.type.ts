export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export type ArticleInsertDTO = Omit<Article, "id">;
export type ArticleUpdateDTO = Partial<Omit<Article, "id">>;
