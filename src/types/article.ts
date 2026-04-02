export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
