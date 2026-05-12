import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { ArchiveNewsCard } from "@/components/public/NewsCard";
import { getLatestArticles } from "@doppelnews/shared/lib/articles";

export default async function NoticiasPage() {
  // Mantem a pagina dinamica para refletir novas publicacoes.
  await connection();

  const articles = await getLatestArticles(50);

  return (
    <div>
      <Header title="DoppelNews" />
      <main className="archive-page">
        <section className="archive-hero">
          <span className="eyebrow">Arquivo</span>
          <h1>Todas as noticias</h1>
          <p>
            Os principais destaques publicados pela DoppelNews em uma lista
            feita para leitura rapida.
          </p>
        </section>

        <section className="archive-grid" aria-label="Lista de noticias">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArchiveNewsCard key={article.id} article={article} />
            ))
          ) : (
            <p className="empty-state">Nenhuma noticia publicada ainda.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
