import type { Metadata } from "next";
import ErrorPage from "@/components/public/ErrorPage";
import { externalRoutes } from "@doppelnews/shared/constants/routes";

export const metadata: Metadata = {
  title: "403 - Acesso negado | DoppelNews",
  description: "Acesso negado a esta área da DoppelNews.",
};

export default function Forbidden() {
  return (
    <ErrorPage
      status="403"
      eyebrow="Acesso negado"
      title="Essa área não está liberada"
      description="Sua sessão não tem permissão para acessar este conteúdo. Volte para uma área pública ou entre com uma conta autorizada."
      actions={[
        { href: externalRoutes.admin("/login"), label: "Ir para login" },
        { href: "/", label: "Voltar ao início", secondary: true },
      ]}
    />
  );
}
