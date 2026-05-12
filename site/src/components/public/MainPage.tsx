import Link from "next/link";
import { getDisplayArticleImage } from "@doppelnews/shared/lib/article-images";
import type { ArticleSummary } from "@doppelnews/shared/lib/articles";
import { formatArticleDate } from "@doppelnews/shared/lib/articles";
import { getArticleHref } from "@doppelnews/shared/lib/slugs";
import { ArticleImage, RankedArticleCard, StoryRow } from "./NewsCard";

type MainPageProps = {
  articles: ArticleSummary[];
  categories: string[];
};

export default function MainPage({ articles, categories }: MainPageProps) {
  const [featured, ...rest] = articles;
  const featuredImageUrl = featured ? getDisplayArticleImage(featured) : null;
  const sideStories = rest.slice(0, 4);
  const popularArticles = articles.slice(0, 5);
  const latestArticles = rest.slice(4, 10);
  const reviewArticle = articles[1];
  const videoArticle = articles[2];

  return (
    <main className="home-page">
      <section className="hero-grid" aria-label="Destaque principal">
        {featured ? (
          <Link
            href={getArticleHref(featured)}
            className={`hero-card${featuredImageUrl ? "" : " hero-card-text-only"}`}
          >
            <ArticleImage
              article={featured}
              width={900}
              height={620}
              priority
            />
            <div className="hero-content">
              <span className="eyebrow">Destaque</span>
              <h1>{featured.title}</h1>
              <p>{featured.headline}</p>
              <small>
                Por DoppelNews - {formatArticleDate(featured.publishedAt)}
              </small>
            </div>
          </Link>
        ) : (
          <div className="empty-state">Nenhuma notícia publicada ainda.</div>
        )}
      </section>

      {popularArticles.length > 0 && (
        <section className="popular-section" aria-label="Mais lidas">
          <div className="section-title">
            <span>Mais lidas</span>
            <Link href="/noticias">Ver todas</Link>
          </div>
          <div className="popular-grid">
            {popularArticles.map((article, index) => (
              <RankedArticleCard
                key={article.id}
                article={article}
                rank={index + 1}
              />
            ))}
          </div>
        </section>
      )}

      {sideStories.length > 0 && (
        <section className="read-more-section" aria-label="Leia também">
          <div className="section-title">
            <span>Leia também</span>
          </div>
          <div className="read-more-grid">
            {sideStories.map((article) => (
              <StoryRow key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      <section className="editorial-grid" aria-label="Editorias">
        {reviewArticle && (
          <div className="panel-card">
            <div className="section-title">
              <span>Reviews</span>
            </div>
            <Link
              href={getArticleHref(reviewArticle)}
              className={`large-list-card${getDisplayArticleImage(reviewArticle)
                  ? ""
                  : " large-list-card-text-only"
                }`}
            >
              <ArticleImage article={reviewArticle} width={520} height={290} />
              <h2>{reviewArticle.title}</h2>
            </Link>
          </div>
        )}

        {latestArticles.length > 0 && (
          <div className="panel-card">
            <div className="section-title">
              <span>Artigos</span>
            </div>
            <div className="compact-list">
              {latestArticles.slice(0, 4).map((article, index) => (
                <StoryRow
                  key={article.id}
                  article={article}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {videoArticle && (
          <div className="panel-card">
            <div className="section-title">
              <span>Vídeos</span>
            </div>
            <Link
              href={getArticleHref(videoArticle)}
              className={`video-card${getDisplayArticleImage(videoArticle)
                  ? ""
                  : " video-card-text-only"
                }`}
            >
              <ArticleImage article={videoArticle} width={520} height={290} />
              {getDisplayArticleImage(videoArticle) && (
                <span className="play-button">Play</span>
              )}
              <h2>{videoArticle.title}</h2>
            </Link>
          </div>
        )}
      </section>

      <section className="release-strip" aria-label="Categorias">
        <div className="section-title">
          <span>Categorias</span>
        </div>
        <div className="category-strip">
          {(categories.length
            ? categories
            : ["PlayStation", "Xbox", "Nintendo", "PC"]
          ).map((category) => (
            <Link key={category} href="/noticias">
              {category}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
