import { cache } from "react";
import prisma from "./prisma";
import { sanitizeHtmlContent } from "./security";

type ArticleSummaryRecord = {
  id: number;
  title: string;
  slug: string;
  headline: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  imageUrl: string | null;
  categories: {
    category: {
      name: string;
    };
  }[];
};

type ArticleDetailRecord = ArticleSummaryRecord & {
  content: string;
  tags: {
    tag: {
      name: string;
    };
  }[];
  author: {
    name: string;
  };
};

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
  publishedAt: true,
  createdAt: true,
  imageUrl: true,
  categories: {
    select: {
      category: {
        select: {
          name: true,
        },
      },
    },
    take: 1,
  },
} as const;

function mapArticleSummary(article: ArticleSummaryRecord): ArticleSummary {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    headline: article.headline,
    category: article.categories[0]?.category.name ?? "Sem categoria",
    publishedAt: article.publishedAt ?? article.createdAt,
    imageUrl: article.imageUrl,
  };
}

function mapArticleDetail(article: ArticleDetailRecord): ArticleDetail {
  return {
    ...mapArticleSummary(article),
    content: sanitizeHtmlContent(article.content),
    tags: article.tags.map(({ tag }) => tag.name),
    author: article.author,
  };
}

export const getLatestArticles = cache(
  async (take = 12): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    const articles = await prisma.article.findMany({
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });

    return articles.map(mapArticleSummary);
  },
);

export const getArticleById = cache(
  async (id: number): Promise<ArticleDetail | null> => {
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        ...articleSummarySelect,
        content: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
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

    return mapArticleDetail(article);
  },
);

export const getArticleBySlug = cache(
  async (slug: string): Promise<ArticleDetail | null> => {
    const article = await prisma.article.findUnique({
      where: { slug },
      select: {
        ...articleSummarySelect,
        content: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
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

    return mapArticleDetail(article);
  },
);

export const getArticleCategories = cache(async (): Promise<string[]> => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories.map((category) => category.name);
});

export const getArticlesByCategory = cache(
  async (category: string, take = 30): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    const articles = await prisma.article.findMany({
      where: {
        categories: {
          some: {
            category: {
              OR: [
                { slug: category },
                { name: { equals: category, mode: "insensitive" } },
              ],
            },
          },
        },
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });

    return articles.map(mapArticleSummary);
  },
);

export const getArticlesByAuthor = cache(
  async (authorId: number, take = 30): Promise<ArticleSummary[]> => {
    const safeTake = Math.min(Math.max(take, 1), 50);

    const articles = await prisma.article.findMany({
      where: {
        authorId,
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });

    return articles.map(mapArticleSummary);
  },
);

export const searchArticles = cache(
  async (query: string, take = 30): Promise<ArticleSummary[]> => {
    const safeQuery = query.trim();
    const safeTake = Math.min(Math.max(take, 1), 50);

    if (!safeQuery) {
      return getLatestArticles(safeTake);
    }

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: safeQuery, mode: "insensitive" } },
          { headline: { contains: safeQuery, mode: "insensitive" } },
          {
            categories: {
              some: {
                category: {
                  name: { contains: safeQuery, mode: "insensitive" },
                },
              },
            },
          },
          {
            tags: {
              some: {
                tag: {
                  name: { contains: safeQuery, mode: "insensitive" },
                },
              },
            },
          },
        ],
      },
      select: articleSummarySelect,
      orderBy: {
        publishedAt: "desc",
      },
      take: safeTake,
    });

    return articles.map(mapArticleSummary);
  },
);

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
