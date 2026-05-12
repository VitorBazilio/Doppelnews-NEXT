import { notFound } from "next/navigation";
import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { ArchiveNewsCard } from "@/components/public/NewsCard";
import { getArticlesByCategory } from "@doppelnews/shared/lib/articles";

export default async function CategoryPage({
  params,
}: PageProps<"/categorias/[slug]">) {
  const { slug } = await params;
  await connection();

  const articles = await getArticlesByCategory(slug);

  if (!articles.length) {
    notFound();
  }

  return (
    <div>
      <Header title="DoppelNews" />
      <main className="archive-page">
        <section className="archive-hero">
          <span className="eyebrow">Categoria</span>
          <h1>{slug}</h1>
        </section>
        <section className="archive-grid" aria-label="Noticias da categoria">
          {articles.map((article) => (
            <ArchiveNewsCard key={article.id} article={article} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
