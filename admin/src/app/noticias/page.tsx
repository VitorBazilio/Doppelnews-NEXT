import Link from "next/link";
import { connection } from "next/server";
import { getLatestArticles } from "@doppelnews/shared/lib/articles";
import NewsTable from "@/components/admin/NewsTable";

export default async function AdminNewsPage() {
  await connection();

  const articles = await getLatestArticles(50);

  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Noticias</h2>
        <Link href="/noticias/criar">Criar noticia</Link>
      </div>

      <NewsTable articles={articles} />
    </section>
  );
}
