import Link from "next/link";
import { connection } from "next/server";
import { getArticleCategories } from "@doppelnews/shared/lib/articles";

export default async function AdminCategoriesPage() {
  await connection();

  const categories = await getArticleCategories();

  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Categorias</h2>
        <Link href="/categorias/criar">Criar categoria</Link>
      </div>

      <div className="category-strip" aria-label="Categorias cadastradas">
        {categories.length > 0 ? (
          categories.map((category) => <span key={category}>{category}</span>)
        ) : (
          <p className="empty-state">Nenhuma categoria publicada ainda.</p>
        )}
      </div>
    </section>
  );
}
