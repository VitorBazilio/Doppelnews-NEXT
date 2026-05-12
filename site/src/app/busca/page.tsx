import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { ArchiveNewsCard } from "@/components/public/NewsCard";
import { searchArticles } from "@doppelnews/shared/lib/articles";

export default async function SearchPage({
  searchParams,
}: PageProps<"/busca">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  await connection();
  const articles = await searchArticles(query);

  return (
    <div>
      <Header title="DoppelNews" />
      <main className="archive-page">
        <section className="archive-hero">
          <span className="eyebrow">Busca</span>
          <h1>{query ? `Resultados para ${query}` : "Buscar noticias"}</h1>
        </section>
        <section className="archive-grid" aria-label="Resultados da busca">
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
