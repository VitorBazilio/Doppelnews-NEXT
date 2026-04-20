import { Inter } from "next/font/google";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

// TODO: Substituir por dados reais do banco
const mockArticles = [
    {
        id: 1,
        title: "Crimson Desert: O RPG que está revolucionando o gênero",
        headline: "O novo jogo da Pearl Abyss traz gráficos impressionantes e combate inovador",
        category: "RPG",
        publishedAt: new Date('2026-04-15'),
        imageUrl: "https://picsum.photos/400/250?random=1"
    },
    {
        id: 2,
        title: "Setup Gamer Profissional: Como montar o seu",
        headline: "Dicas essenciais para criar o setup dos seus sonhos",
        category: "Hardware",
        publishedAt: new Date('2026-04-14'),
        imageUrl: "https://picsum.photos/400/250?random=2"
    }
];

export default function NoticiasPage() {
    return (
        <main>
            <Header title="DoppelNews" />
            <div className="container">
                <h1>Todas as Notícias</h1>
                <div className="news-list">
                    {mockArticles.map((article) => (
                        <article key={article.id} className="news-item">
                            <img src={article.imageUrl} alt={article.title} />
                            <div>
                                <h3>{article.title}</h3>
                                <p>{article.headline}</p>
                                <small>{article.category} - {article.publishedAt.toLocaleDateString()}</small>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}