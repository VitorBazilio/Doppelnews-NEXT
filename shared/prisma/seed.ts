import "dotenv/config";
import { randomUUID } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString),
});

const articles = [
  {
    title: "Nintendo reforca calendario com novas experiencias cooperativas",
    slug: "nintendo-reforca-calendario-com-novas-experiencias-cooperativas",
    headline:
      "Publicadora aposta em aventuras compartilhadas e modos locais para manter o Switch no centro da sala",
    excerpt:
      "A Nintendo prepara uma leva de jogos com foco em cooperacao, acessibilidade e partidas rapidas entre amigos.",
    content:
      "<p>A Nintendo voltou a sinalizar que experiencias cooperativas seguem como parte central de sua estrategia. A nova selecao de projetos valoriza partidas locais, desafios curtos e mecanicas que funcionam tanto para jogadores experientes quanto para quem entra apenas por alguns minutos.</p><p>Nos bastidores, a aposta e clara: manter o console como uma plataforma de encontro. Jogos com leitura imediata, controles simples e progressao compartilhada tendem a ganhar espaco nas proximas vitrines da marca.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Controle de videogame sobre uma mesa iluminada",
    category: {
      name: "Nintendo",
      slug: "nintendo",
      description: "Noticias sobre consoles, jogos e franquias da Nintendo.",
    },
    tags: ["Nintendo", "Cooperativo", "Switch"],
    games: [
      {
        title: "Mario Kart 8 Deluxe",
        slug: "mario-kart-8-deluxe",
        developer: "Nintendo",
        publisher: "Nintendo",
        platforms: ["Nintendo Switch"],
        genres: ["Corrida", "Party"],
        score: 8.7,
      },
    ],
    featured: true,
    views: 240,
    publishedAt: new Date("2026-05-13T12:00:00.000Z"),
  },
  {
    title: "RPGs japoneses encontram novo ritmo em campanhas mais enxutas",
    slug: "rpgs-japoneses-encontram-novo-ritmo-em-campanhas-mais-enxutas",
    headline:
      "Estudios buscam preservar sistemas profundos sem exigir jornadas enormes do publico",
    excerpt:
      "Novos JRPGs tentam equilibrar combate tatico, narrativa forte e duracao mais amigavel.",
    content:
      "<p>Depois de anos em que campanhas muito longas viraram quase uma assinatura do genero, parte dos RPGs japoneses esta ajustando o ritmo. A tendencia aparece em aventuras com capitulos mais diretos, sistemas de progressao menos repetitivos e batalhas que recompensam planejamento sem alongar cada encontro.</p><p>O resultado pode agradar tanto veteranos quanto jogadores que gostam do genero, mas ja nao conseguem reservar dezenas de horas antes de chegar ao ponto alto da historia.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Jogador segurando controle diante de uma tela",
    category: {
      name: "RPG",
      slug: "rpg",
      description: "Cobertura de RPGs, JRPGs e jogos com progressao narrativa.",
    },
    tags: ["JRPG", "RPG", "Design"],
    games: [
      {
        title: "Persona 5 Royal",
        slug: "persona-5-royal",
        developer: "Atlus",
        publisher: "Sega",
        platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
        genres: ["RPG", "JRPG"],
        score: 9.1,
      },
    ],
    featured: false,
    views: 188,
    publishedAt: new Date("2026-05-12T15:00:00.000Z"),
  },
  {
    title: "Jogos de terror recuperam a forca do som como principal ameaca",
    slug: "jogos-de-terror-recuperam-a-forca-do-som-como-principal-ameaca",
    headline:
      "Design de audio ganha protagonismo em experiencias que preferem tensao a sustos constantes",
    excerpt:
      "Novos projetos de horror usam silencio, distancia e ruidos ambientais para aumentar a pressao.",
    content:
      "<p>O terror nos games vive uma fase em que o som voltou a ser tao importante quanto a imagem. Em vez de depender apenas de aparicoes repentinas, muitos jogos estao construindo medo com passos distantes, portas vibrando e ambientes que parecem reagir ao jogador.</p><p>Essa abordagem favorece partidas mais lentas e memoraveis, porque transforma cada corredor em uma pergunta. O jogador nao teme apenas o que ve, mas principalmente o que acredita ter ouvido.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Corredor escuro com iluminacao dramatica",
    category: {
      name: "Terror",
      slug: "terror",
      description: "Noticias e analises sobre horror, suspense e survival horror.",
    },
    tags: ["Terror", "Audio", "Survival horror"],
    games: [
      {
        title: "Resident Evil 4",
        slug: "resident-evil-4",
        developer: "Capcom",
        publisher: "Capcom",
        platforms: ["PC", "PlayStation", "Xbox"],
        genres: ["Terror", "Acao"],
        score: 8.9,
      },
    ],
    featured: true,
    views: 321,
    publishedAt: new Date("2026-05-11T18:00:00.000Z"),
  },
  {
    title: "Indies de estrategia crescem com partidas curtas e decisoes duras",
    slug: "indies-de-estrategia-crescem-com-partidas-curtas-e-decisoes-duras",
    headline:
      "Desenvolvedores independentes combinam roguelite, tabuleiro e gestao em formatos mais acessiveis",
    excerpt:
      "A cena indie transforma sistemas complexos em sessoes menores, mas cheias de consequencias.",
    content:
      "<p>A estrategia independente encontrou uma formula poderosa: partidas curtas, regras legiveis e escolhas que pesam desde o primeiro minuto. Em vez de mapas gigantes, muitos jogos preferem ciclos compactos em que cada recurso gasto altera o rumo da campanha.</p><p>Essa estrutura tambem ajuda streamers e comunidades, ja que cada tentativa cria uma historia facil de acompanhar. O genero fica menos intimidador sem perder profundidade.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pecas de jogo sobre tabuleiro estrategico",
    category: {
      name: "Indie",
      slug: "indie",
      description: "Jogos independentes, criatividade e novas propostas.",
    },
    tags: ["Indie", "Estrategia", "Roguelite"],
    games: [
      {
        title: "Into the Breach",
        slug: "into-the-breach",
        developer: "Subset Games",
        publisher: "Subset Games",
        platforms: ["PC", "Nintendo Switch", "Mobile"],
        genres: ["Estrategia", "Roguelite"],
        score: 8.5,
      },
    ],
    featured: false,
    views: 156,
    publishedAt: new Date("2026-05-10T13:30:00.000Z"),
  },
  {
    title: "Corridas arcade voltam a mirar velocidade imediata e estilo",
    slug: "corridas-arcade-voltam-a-mirar-velocidade-imediata-e-estilo",
    headline:
      "Genero ganha espaco com direcao visual vibrante, drifting simples e progresso sem burocracia",
    excerpt:
      "A nova onda de corridas arcade valoriza resposta rapida, pistas expressivas e competicao leve.",
    content:
      "<p>As corridas arcade estao reencontrando um publico que quer entrar, acelerar e sentir progresso sem menus excessivos. A prioridade e resposta imediata: curvas amplas, nitro generoso, trilhas marcantes e carros com personalidade visual.</p><p>Mesmo com simuladores cada vez mais sofisticados, existe espaco para jogos que tratam direcao como espetaculo. O apelo esta em dominar a pista pelo estilo, nao apenas pela precisao tecnica.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Carro esportivo em estrada aberta",
    category: {
      name: "Corrida",
      slug: "corrida",
      description: "Jogos de corrida arcade, simuladores e automobilismo virtual.",
    },
    tags: ["Corrida", "Arcade", "Drift"],
    games: [
      {
        title: "Forza Horizon 5",
        slug: "forza-horizon-5",
        developer: "Playground Games",
        publisher: "Xbox Game Studios",
        platforms: ["PC", "Xbox"],
        genres: ["Corrida", "Mundo aberto"],
        score: 8.2,
      },
    ],
    featured: false,
    views: 199,
    publishedAt: new Date("2026-05-09T16:45:00.000Z"),
  },
  {
    title: "Acessibilidade vira criterio central em grandes lancamentos",
    slug: "acessibilidade-vira-criterio-central-em-grandes-lancamentos",
    headline:
      "Opcoes de controle, leitura e assistencia deixam de ser extras e passam a integrar o design base",
    excerpt:
      "Mais estudios tratam acessibilidade como parte do planejamento, nao como ajuste de fim de producao.",
    content:
      "<p>A discussao sobre acessibilidade nos games amadureceu. Recursos como remapeamento completo de botoes, modos de alto contraste, ajustes de legenda e assistencias de mira ja aparecem no planejamento inicial de muitos projetos.</p><p>Quando essas opcoes nascem junto com o design, o jogo tende a ficar melhor para todo mundo. Interfaces mais claras, feedbacks visuais consistentes e dificuldade ajustavel ampliam o publico sem reduzir a identidade da obra.</p>",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Controles de videogame em ambiente colorido",
    category: {
      name: "Industria",
      slug: "industria",
      description: "Mercado, desenvolvimento, tecnologia e bastidores dos games.",
    },
    tags: ["Acessibilidade", "Industria", "Design"],
    games: [
      {
        title: "The Last of Us Part II",
        slug: "the-last-of-us-part-ii",
        developer: "Naughty Dog",
        publisher: "Sony Interactive Entertainment",
        platforms: ["PlayStation"],
        genres: ["Acao", "Aventura"],
        score: 9.0,
      },
    ],
    featured: true,
    views: 278,
    publishedAt: new Date("2026-05-08T20:00:00.000Z"),
  },
];

async function main() {
  const author = await prisma.user.upsert({
    where: { email: "admin@doppelnews.local" },
    update: {
      name: "DoppelNews Admin",
      username: "doppeladmin",
      role: "ADMIN",
    },
    create: {
      name: "DoppelNews Admin",
      username: "doppeladmin",
      email: "admin@doppelnews.local",
      password: randomUUID(),
      role: "ADMIN",
    },
  });

  const heroSection = await prisma.featuredSection.upsert({
    where: { slug: "destaques-principais" },
    update: {
      title: "Destaques principais",
      type: "hero",
      active: true,
      order: 1,
    },
    create: {
      title: "Destaques principais",
      slug: "destaques-principais",
      type: "hero",
      active: true,
      order: 1,
    },
  });

  for (const [index, article] of articles.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: article.category.slug },
      update: {
        name: article.category.name,
        description: article.category.description,
      },
      create: article.category,
    });

    const tags = await Promise.all(
      article.tags.map((tagName) => {
        const slug = tagName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return prisma.tag.upsert({
          where: { slug },
          update: { name: tagName },
          create: { name: tagName, slug },
        });
      }),
    );

    const games = await Promise.all(
      article.games.map((game) =>
        prisma.game.upsert({
          where: { slug: game.slug },
          update: game,
          create: game,
        }),
      ),
    );

    const savedArticle = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        headline: article.headline,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        imageAlt: article.imageAlt,
        status: "PUBLISHED",
        featured: article.featured,
        views: article.views,
        seoTitle: article.title,
        seoDescription: article.excerpt,
        publishedAt: article.publishedAt,
        authorId: author.id,
      },
      create: {
        title: article.title,
        slug: article.slug,
        headline: article.headline,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        imageAlt: article.imageAlt,
        status: "PUBLISHED",
        featured: article.featured,
        views: article.views,
        seoTitle: article.title,
        seoDescription: article.excerpt,
        publishedAt: article.publishedAt,
        authorId: author.id,
      },
    });

    await prisma.articleCategory.upsert({
      where: {
        articleId_categoryId: {
          articleId: savedArticle.id,
          categoryId: category.id,
        },
      },
      update: {},
      create: {
        articleId: savedArticle.id,
        categoryId: category.id,
      },
    });

    for (const tag of tags) {
      await prisma.articleTag.upsert({
        where: {
          articleId_tagId: {
            articleId: savedArticle.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          articleId: savedArticle.id,
          tagId: tag.id,
        },
      });
    }

    for (const game of games) {
      await prisma.articleGame.upsert({
        where: {
          articleId_gameId: {
            articleId: savedArticle.id,
            gameId: game.id,
          },
        },
        update: {},
        create: {
          articleId: savedArticle.id,
          gameId: game.id,
        },
      });
    }

    if (article.featured) {
      await prisma.featuredArticle.upsert({
        where: {
          sectionId_articleId: {
            sectionId: heroSection.id,
            articleId: savedArticle.id,
          },
        },
        update: { order: index + 1 },
        create: {
          sectionId: heroSection.id,
          articleId: savedArticle.id,
          order: index + 1,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
