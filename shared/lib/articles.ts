import { cache } from "react";
import prisma from "./prisma";
import { sanitizeHtmlContent } from "./security";

export type ArticleSummary = {
  id: number;
  title: string;
  slug: string;
  headline: string | null;
  category: string;
  publishedAt: Date;
  imageUrl: string | null;
};

export type ArticleDetail = ArticleSummary & {
  content: string;
  tags: string[];
  author: {
    name: string;
  };
};

// Seleção compartilhada para evitar repetir campos nas consultas de listagem.
const articleSummarySelect = {
  id: true,
  title: true,
  slug: true,
  headline: true,
  category: true,
  publishedAt: true,
  imageUrl: true,
} as const;

export const getLatestArticles = cache(
  async (take = 12): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    return prisma.article.findMany({
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });
  },
);

export const getArticleById = cache(
  async (id: number): Promise<ArticleDetail | null> => {
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        ...articleSummarySelect,
        content: true,
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!article) {
      return null;
    }

    return {
      ...article,
      content: sanitizeHtmlContent(article.content),
    };
  },
);

export const getArticleBySlug = cache(
  async (slug: string): Promise<ArticleDetail | null> => {
    const article = await prisma.article.findUnique({
      where: { slug },
      select: {
        ...articleSummarySelect,
        content: true,
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!article) {
      return null;
    }

    return {
      ...article,
      content: sanitizeHtmlContent(article.content),
    };
  },
);

export const getArticleCategories = cache(async (): Promise<string[]> => {
  const categories = await prisma.article.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return categories.map((article) => article.category);
});

export const getArticlesByCategory = cache(
  async (category: string, take = 30): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    return prisma.article.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });
  },
);

export const getArticlesByAuthor = cache(
  async (authorId: number, take = 30): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    return prisma.article.findMany({
      where: {
        authorId,
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });
  },
);

export const searchArticles = cache(
  async (query: string, take = 30): Promise<ArticleSummary[]> => {
    const safeQuery = query.trim();
    const safeTake = Math.min(Math.max(take, 1), 50);

    if (!safeQuery) {
      return getLatestArticles(safeTake);
    }

    return prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: safeQuery, mode: "insensitive" } },
          { headline: { contains: safeQuery, mode: "insensitive" } },
          { category: { contains: safeQuery, mode: "insensitive" } },
        ],
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });
  },
);

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
