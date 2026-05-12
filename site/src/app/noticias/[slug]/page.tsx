import { notFound, permanentRedirect } from "next/navigation";
import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { ArticleImage, SidebarStory } from "@/components/public/NewsCard";
import { getDisplayArticleImage } from "@doppelnews/shared/lib/article-images";
import {
  formatArticleDate,
  getArticleById,
  getArticleBySlug,
  getLatestArticles,
} from "@doppelnews/shared/lib/articles";
import {
  getArticleHref,
  isLegacyArticleId,
  isValidArticleSlug,
} from "@doppelnews/shared/lib/slugs";

export default async function NoticiaPage({
  params,
}: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;

  // Slugs inválidos caem no fluxo padrão de 404 do Next.js.
  if (!isValidArticleSlug(slug) && !isLegacyArticleId(slug)) {
    notFound();
  }

  await connection();

  const [articleBySlug, latestArticles] = await Promise.all([
    getArticleBySlug(slug),
    getLatestArticles(6),
  ]);

  if (!articleBySlug && isLegacyArticleId(slug)) {
    const legacyArticle = await getArticleById(Number(slug));

    if (legacyArticle) {
      permanentRedirect(getArticleHref(legacyArticle));
    }
  }

  const article = articleBySlug;

  if (!article) {
    notFound();
  }

  const relatedArticles = latestArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 4);
  const articleImageUrl = getDisplayArticleImage(article);

  return (
    <div>
      <Header title="DoppelNews" />
      <main className="article-page">
        <article className="article-shell">
          <div className="article-intro">
            <nav className="breadcrumbs" aria-label="Caminho">
              <span>Home</span>
              <span>Notícias</span>
              <span>{article.category}</span>
            </nav>

            <header className="article-header">
              <span className="eyebrow">{article.category}</span>
              <h1>{article.title}</h1>
              <p>{article.headline}</p>
              <div className="article-meta">
                <span>Por {article.author.name}</span>
                <time dateTime={article.publishedAt.toISOString()}>
                  {formatArticleDate(article.publishedAt)}
                </time>
              </div>
            </header>
          </div>

          <div className="article-main">
            {articleImageUrl && (
              <figure className="article-image">
                <ArticleImage
                  className="article-img"
                  article={article}
                  width={920}
                  height={520}
                  priority
                />
                <figcaption>Imagem: DoppelNews</figcaption>
              </figure>
            )}

            {/* O conteúdo vem do editor rico e é salvo como HTML no banco. */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.tags.length > 0 && (
              <div className="tag-list" aria-label="Tags">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>

          <aside className="article-sidebar" aria-label="Leia também">
            <h2>Leia também</h2>
            {relatedArticles.map((item) => (
              <SidebarStory key={item.id} article={item} />
            ))}
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
