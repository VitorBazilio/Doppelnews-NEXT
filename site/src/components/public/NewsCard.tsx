import Image from "next/image";
import Link from "next/link";
import { getDisplayArticleImage } from "@doppelnews/shared/lib/article-images";
import type { ArticleSummary } from "@doppelnews/shared/lib/articles";
import { formatArticleDate } from "@doppelnews/shared/lib/articles";
import { getArticleHref } from "@doppelnews/shared/lib/slugs";

type ArticleImageProps = {
  article: ArticleSummary;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

type ArticleCardProps = {
  article: ArticleSummary;
  rank?: number;
};

export function ArticleImage({
  article,
  width,
  height,
  priority = false,
  className,
}: ArticleImageProps) {
  const imageUrl = getDisplayArticleImage(article);

  if (!imageUrl) {
    return null;
  }

  return (
    <Image
      src={imageUrl}
      alt={article.title}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export function StoryRow({ article, rank }: ArticleCardProps) {
  const imageUrl = getDisplayArticleImage(article);

  return (
    <Link
      href={getArticleHref(article)}
      className={`story-row${imageUrl ? "" : " story-row-text-only"}`}
    >
      {typeof rank === "number" ? <span className="story-rank">{rank}</span> : null}
      <ArticleImage article={article} width={180} height={110} />
      <span>
        <small>{article.category}</small>
        <strong>{article.title}</strong>
        <time dateTime={article.publishedAt.toISOString()}>
          {formatArticleDate(article.publishedAt)}
        </time>
      </span>
    </Link>
  );
}

export function RankedArticleCard({ article, rank = 1 }: ArticleCardProps) {
  const imageUrl = getDisplayArticleImage(article);

  return (
    <Link
      href={getArticleHref(article)}
      className={`rank-card${imageUrl ? "" : " rank-card-text-only"}`}
    >
      <span>{rank}</span>
      <ArticleImage article={article} width={340} height={210} />
      <small>{article.category}</small>
      <h2>{article.title}</h2>
    </Link>
  );
}

export function ArchiveNewsCard({ article }: ArticleCardProps) {
  const imageUrl = getDisplayArticleImage(article);

  return (
    <Link
      href={getArticleHref(article)}
      className={`archive-card${imageUrl ? "" : " archive-card-text-only"}`}
    >
      <ArticleImage article={article} width={420} height={260} />
      <div>
        <small>
          {article.category} - {formatArticleDate(article.publishedAt)}
        </small>
        <h2>{article.title}</h2>
        <p>{article.headline}</p>
      </div>
    </Link>
  );
}

export function SidebarStory({ article }: ArticleCardProps) {
  const imageUrl = getDisplayArticleImage(article);

  return (
    <Link
      href={getArticleHref(article)}
      className={`sidebar-story${imageUrl ? "" : " sidebar-story-text-only"}`}
    >
      <ArticleImage article={article} width={160} height={100} />
      <span>
        <small>{article.category}</small>
        <strong>{article.title}</strong>
      </span>
    </Link>
  );
}

export default function NewsCard({ article }: ArticleCardProps) {
  return <ArchiveNewsCard article={article} />;
}
