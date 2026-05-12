import Link from "next/link";
import { getDisplayArticleImage } from "@doppelnews/shared/lib/article-images";
import type { ArticleSummary } from "@doppelnews/shared/lib/articles";
import { formatArticleDate } from "@doppelnews/shared/lib/articles";
import { getArticleHref } from "@doppelnews/shared/lib/slugs";
import { ArticleImage } from "./NewsCard";

type FeaturedNewsProps = {
  article: ArticleSummary;
};

export default function FeaturedNews({ article }: FeaturedNewsProps) {
  const imageUrl = getDisplayArticleImage(article);

  return (
    <Link
      href={getArticleHref(article)}
      className={`hero-card${imageUrl ? "" : " hero-card-text-only"}`}
    >
      <ArticleImage article={article} width={900} height={620} priority />
      <div className="hero-content">
        <span className="eyebrow">Destaque</span>
        <h1>{article.title}</h1>
        <p>{article.headline}</p>
        <small>Por DoppelNews - {formatArticleDate(article.publishedAt)}</small>
      </div>
    </Link>
  );
}
