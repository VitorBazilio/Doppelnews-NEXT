export type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedAt: Date;
  category: string;
  authorId: number;
  headline?: string | null;
  imageUrl?: string | null;
};
