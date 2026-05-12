import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";

export default function AboutPage() {
  return (
    <div>
      <Header title="DoppelNews" />
      <main className="archive-page">
        <section className="archive-hero">
          <span className="eyebrow">Sobre</span>
          <h1>DoppelNews</h1>
          <p>
            Um portal de noticias de jogos pensado para leitura rapida,
            organizacao editorial e evolucao futura com painel separado.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
