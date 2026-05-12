"use client";

import ErrorPage from "@/components/public/ErrorPage";

export default function ArticleError({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      status="500"
      eyebrow="Erro na noticia"
      title="Nao foi possivel abrir esta noticia"
      description="Tente novamente para recarregar o conteudo solicitado."
      onRetry={reset}
    />
  );
}
