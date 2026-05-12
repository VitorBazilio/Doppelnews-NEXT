"use client";

import { useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/main.css";
import ErrorPage from "@/components/public/ErrorPage";

export default function GlobalError({
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <title>Erro interno | DoppelNews</title>
        <ErrorPage
          status="500"
          eyebrow="Falha global"
          title="O portal não conseguiu renderizar"
          description="Uma parte essencial da aplicação caiu antes de montar a página. Tente novamente para reconstruir a interface."
          details={error.digest ? `Código técnico: ${error.digest}` : undefined}
          onRetry={unstable_retry}
        />
      </body>
    </html>
  );
}
