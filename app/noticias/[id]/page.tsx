import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

interface PageProps {
    params: {
        id: string;
    };
}

// TODO: Substituir por dados reais do banco
const mockArticle = {
    id: 1,
    title: "Crimson Desert: O RPG que está revolucionando o gênero",
    content: `
    <p>Crimson Desert é mais do que um simples jogo — é uma experiência que redefine o que esperamos de um RPG moderno. Desenvolvido pela Pearl Abyss, os mesmos criadores de Black Desert Online, o jogo traz uma combinação perfeita entre gráficos de última geração e mecânicas de combate inovadoras.</p>

    <h2>Gráficos Cinematográficos</h2>
    <p>O visual do jogo é simplesmente impressionante. Cada detalhe, desde as texturas das armaduras até os efeitos de luz e sombra, foi criado com o máximo de cuidado. O mundo aberto é vasto e detalhado, oferecendo horas de exploração.</p>

    <h2>Combate Inovador</h2>
    <p>O sistema de combate é uma das grandes inovações do Crimson Desert. Misturando elementos de ação em tempo real com estratégia tática, o jogador pode alternar entre diferentes estilos de luta dependendo da situação.</p>
  `,
    category: "RPG",
    publishedAt: new Date('2026-04-15'),
    author: "João Silva",
    imageUrl: "https://picsum.photos/800/400?random=1"
};

export default function NoticiaPage({ params }: PageProps) {
    const articleId = parseInt(params.id);

    // TODO: Buscar artigo real do banco
    if (articleId !== 1) {
        notFound();
    }

    const article = mockArticle;

    return (
        <main>
            <Header title="DoppelNews" />
            <article className="news-article">
                <div className="container">
                    <header>
                        <h1>{article.title}</h1>
                        <div className="article-meta">
                            <span>Por {article.author}</span>
                            <span>{article.category}</span>
                            <time>{article.publishedAt.toLocaleDateString('pt-BR')}</time>
                        </div>
                    </header>

                    {article.imageUrl && (
                        <img src={article.imageUrl} alt={article.title} className="article-image" />
                    )}

                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </article>
            <Footer />
        </main>
    );
}