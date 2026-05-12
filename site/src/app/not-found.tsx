import type { Metadata } from "next";
import ErrorPage from "@/components/public/ErrorPage";

export const metadata: Metadata = {
  title: "404 - Página não encontrada | DoppelNews",
  description: "A página solicitada não foi encontrada na DoppelNews.",
};

export default function NotFound() {
  return (
    <ErrorPage
      status="404"
      eyebrow="Página não encontrada"
      title="Essa rota saiu do mapa"
      description="O endereço pode ter mudado, a notícia pode ter sido removida ou o link foi digitado com algum detalhe fora do lugar."
    />
  );
}
