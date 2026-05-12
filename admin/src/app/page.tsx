import Link from "next/link";
import { connection } from "next/server";
import { getArticleCategories, getLatestArticles } from "@doppelnews/shared/lib/articles";
import DashboardCard from "@/components/admin/DashboardCard";

export default async function AdminDashboardPage() {
  await connection();

  const [articles, categories] = await Promise.all([
    getLatestArticles(8),
    getArticleCategories(),
  ]);

  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Visao geral</h2>
        <Link href="/noticias/criar">Nova noticia</Link>
      </div>

      <div className="admin-metrics">
        <DashboardCard label="Noticias recentes" value={articles.length} />
        <DashboardCard label="Categorias ativas" value={categories.length} />
      </div>

      <div className="admin-list">
        {articles.map((article) => (
          <Link key={article.id} href={`/noticias/editar/${article.id}`}>
            <span>{article.category}</span>
            <strong>{article.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
