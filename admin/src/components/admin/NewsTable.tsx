import Link from "next/link";
import { externalRoutes } from "@doppelnews/shared/constants/routes";
import type { ArticleSummary } from "@doppelnews/shared/lib/articles";
import { formatArticleDate } from "@doppelnews/shared/lib/articles";
import { getArticleHref } from "@doppelnews/shared/lib/slugs";
import Table from "@/components/ui/Table";

type NewsTableProps = {
  articles: ArticleSummary[];
};

export default function NewsTable({ articles }: NewsTableProps) {
  return (
    <Table label="Noticias">
      <div role="row">
        <strong>Titulo</strong>
        <strong>Categoria</strong>
        <strong>Data</strong>
        <strong>Acoes</strong>
      </div>

      {articles.map((article) => (
        <div key={article.id} role="row">
          <span>{article.title}</span>
          <span>{article.category}</span>
          <span>{formatArticleDate(article.publishedAt)}</span>
          <span className="admin-row-actions">
            <Link href={externalRoutes.site(getArticleHref(article))}>Ver</Link>
            <Link href={`/noticias/editar/${article.id}`}>Editar</Link>
          </span>
        </div>
      ))}
    </Table>
  );
}
