import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArticleDate, getArticleById } from "@doppelnews/shared/lib/articles";
import { externalRoutes } from "@doppelnews/shared/constants/routes";
import { getArticleHref } from "@doppelnews/shared/lib/slugs";

export default async function EditNewsPage({
  params,
}: PageProps<"/noticias/editar/[id]">) {
  const { id } = await params;
  const articleId = Number(id);

  if (!Number.isInteger(articleId) || articleId <= 0) {
    notFound();
  }

  const article = await getArticleById(articleId);

  if (!article) {
    notFound();
  }

  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Editar noticia</h2>
        <Link href={externalRoutes.site(getArticleHref(article))}>
          Ver publicada
        </Link>
      </div>

      <dl className="admin-detail-list">
        <div>
          <dt>Titulo</dt>
          <dd>{article.title}</dd>
        </div>
        <div>
          <dt>Categoria</dt>
          <dd>{article.category}</dd>
        </div>
        <div>
          <dt>Publicacao</dt>
          <dd>{formatArticleDate(article.publishedAt)}</dd>
        </div>
      </dl>

      <p className="field-hint">
        Esta rota ja esta preparada na nova estrutura para receber o formulario
        de edicao quando essa etapa for implementada.
      </p>
    </section>
  );
}
