"use client";

import { useEffect } from "react";
import ErrorPage from "@/components/public/ErrorPage";

export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      status="500"
      eyebrow="Erro interno"
      title="Algo falhou ao carregar esta página"
      description="A publicação ou seção solicitada encontrou um problema temporário. Você pode tentar recarregar a rota sem sair do site."
      details={error.digest ? `Código técnico: ${error.digest}` : undefined}
      onRetry={unstable_retry}
    />
  );
}
