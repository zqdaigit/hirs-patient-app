import api from './api';
import { Article } from '../types';

export interface GetArticlesParams {
  category?: string;
  page?: number;
  pageSize?: number;
}

export const knowledgeService = {
  async getArticles(params?: GetArticlesParams) {
    const response = await api.get('/articles', { params });
    return response.data.data;
  },
  async getArticleDetail(articleId: string): Promise<Article> {
    const response = await api.get(`/articles/${articleId}`);
    return response.data.data;
  },
};
