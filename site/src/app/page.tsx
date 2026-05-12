import { connection } from "next/server";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import MainPage from "@/components/public/MainPage";
import { getArticleCategories, getLatestArticles } from "@doppelnews/shared/lib/articles";

export default async function Home() {
  // Mantém a página dinâmica para buscar os artigos mais recentes no servidor.
  await connection();

  // Busca os dados principais em paralelo para reduzir o tempo de renderização.
  const [articles, categories] = await Promise.all([
    getLatestArticles(8),
    getArticleCategories(),
  ]);

  return (
    <div>
      <Header title="DoppelNews" />
      <MainPage articles={articles} categories={categories} />
      <Footer />
    </div>
  );
}
