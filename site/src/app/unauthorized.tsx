import type { Metadata } from "next";
import ErrorPage from "@/components/public/ErrorPage";
import { externalRoutes } from "@doppelnews/shared/constants/routes";

export const metadata: Metadata = {
  title: "401 - Login necessário | DoppelNews",
  description: "Faça login para acessar esta área da DoppelNews.",
};

export default function Unauthorized() {
  return (
    <ErrorPage
      status="401"
      eyebrow="Login necessário"
      title="Você precisa entrar para continuar"
      description="Essa página exige uma sessão ativa. Faça login e volte para seguir com a leitura ou administração."
      actions={[
        { href: externalRoutes.admin("/login"), label: "Entrar" },
        { href: "/noticias", label: "Ver notícias", secondary: true },
      ]}
    />
  );
}
