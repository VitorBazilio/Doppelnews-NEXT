import { notFound } from "next/navigation";
import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { ArchiveNewsCard } from "@/components/public/NewsCard";
import { getArticlesByAuthor } from "@doppelnews/shared/lib/articles";

export default async function AuthorPage({
  params,
}: PageProps<"/autores/[id]">) {
  const { id } = await params;
  const authorId = Number(id);

  if (!Number.isInteger(authorId) || authorId <= 0) {
    notFound();
  }

  await connection();
  const articles = await getArticlesByAuthor(authorId);

  return (
    <div>
      <Header title="DoppelNews" />
      <main className="archive-page">
        <section className="archive-hero">
          <span className="eyebrow">Autor</span>
          <h1>Publicacoes do autor</h1>
        </section>
        <section className="archive-grid" aria-label="Noticias do autor">
          {articles.length ? (
            articles.map((article) => (
              <ArchiveNewsCard key={article.id} article={article} />
            ))
          ) : (
            <p className="empty-state">Nenhuma noticia encontrada.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
