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

async function main() {
  const adminPassword = randomUUID();

  // Cria ou atualiza o autor padrão usado pelos artigos de exemplo.
  const author = await prisma.user.upsert({
    where: { email: "admin@doppelnews.local" },
    update: {
      name: "DoppelNews Admin",
      password: adminPassword,
    },
    create: {
      name: "DoppelNews Admin",
      email: "admin@doppelnews.local",
      password: adminPassword,
    },
  });

  const articles = [
    {
      id: 1,
      title: "Zelda: nova aventura reacende a exploração em Hyrule",
      slug: "zelda-nova-aventura-reacende-a-exploracao-em-hyrule",
      headline:
        "A série da Nintendo volta ao centro das conversas com puzzles, mundo aberto e segredos para descobrir",
      content:
        "<p>A nova fase de Zelda reforça o que a franquia faz melhor: transformar exploração em descoberta constante. Entre templos, vilarejos e regiões escondidas, a aventura aposta em liberdade e criatividade para manter cada jogador no controle do próprio caminho.</p><p>Os destaques ficam para os sistemas de física, a variedade de desafios e a sensação de que sempre existe algo curioso logo depois da próxima colina.</p>",
      category: "Aventura",
      tags: ["Zelda", "Nintendo", "Aventura"],
      publishedAt: new Date("2026-05-07T12:00:00.000Z"),
      imageUrl:
        "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/956c12eb1a4c9e68b494cca7efd23d20ba8a789a5eb02589affae64bc6bc3282",
      authorId: author.id,
    },
    {
      id: 2,
      title: "Assassin's Creed mira uma experiência mais furtiva",
      slug: "assassins-creed-mira-uma-experiencia-mais-furtiva",
      headline:
        "A Ubisoft busca equilibrar mundo aberto, investigação e assassinatos planejados",
      content:
        "<p>Assassin's Creed volta a apostar na fantasia histórica com foco maior em infiltração, observação e rotas alternativas. A proposta é recuperar parte da tensão dos primeiros jogos sem abandonar a escala moderna da série.</p><p>Com cidades mais densas e contratos que valorizam paciência, a nova direção pode agradar jogadores que sentiam falta de missões mais silenciosas.</p>",
      category: "Ação",
      tags: ["Assassin's Creed", "Ubisoft", "Furtividade"],
      publishedAt: new Date("2026-05-06T12:00:00.000Z"),
      imageUrl:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3159330/header.jpg",
      authorId: author.id,
    },
    {
      id: 3,
      title: "Indies ganham espaço com mundos menores e ideias ousadas",
      slug: "indies-ganham-espaco-com-mundos-menores-e-ideias-ousadas",
      headline:
        "Jogos independentes apostam em direção de arte forte, campanhas compactas e mecânicas experimentais",
      content:
        "<p>A nova leva de jogos independentes mostra que tamanho não é sinônimo de ambição. Estúdios menores vêm criando experiências memoráveis com foco em identidade visual, ritmo de campanha e sistemas que incentivam descoberta.</p><p>Com orçamentos mais enxutos, esses projetos conseguem testar ideias que muitas produções maiores evitam, abrindo espaço para propostas mais autorais.</p>",
      category: "Indie",
      tags: ["Indie", "Design", "Criatividade"],
      publishedAt: new Date("2026-05-05T12:00:00.000Z"),
      imageUrl:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1776125736",
      authorId: author.id,
    },
    {
      id: 4,
      title: "Resident Evil prepara novo capítulo de terror",
      slug: "resident-evil-prepara-novo-capitulo-de-terror",
      headline:
        "Capcom deve manter a tensão em alta com exploração sombria, recursos escassos e criaturas marcantes",
      content:
        "<p>Resident Evil segue como uma das principais referências do survival horror. O próximo capítulo deve preservar a combinação de ambientes opressivos, munição limitada e ameaças que obrigam o jogador a pensar antes de cada confronto.</p><p>A expectativa é que a Capcom continue alternando horror psicológico, ação controlada e narrativa cheia de laboratórios, conspirações e sobreviventes no limite.</p>",
      category: "Terror",
      tags: ["Resident Evil", "Capcom", "Survival horror"],
      publishedAt: new Date("2026-05-04T12:00:00.000Z"),
      imageUrl:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg",
      authorId: author.id,
    },
    {
      id: 5,
      title: "Inazuma Eleven: Victory Road confirma fôlego da série",
      slug: "inazuma-eleven-victory-road-confirma-folego-da-serie",
      headline:
        "O RPG de futebol da LEVEL-5 combina história inédita, coleção massiva de personagens e atualizações gratuitas",
      content:
        "<p>Inazuma Eleven: Victory Road chegou mundialmente em 13 de novembro de 2025 no horário GMT para Nintendo Switch 2, Nintendo Switch, PlayStation 5, PlayStation 4, Xbox Series X|S e PC via Steam. A nova fase coloca a franquia de futebol e RPG em uma escala mais ampla, com Story Mode ambientado 25 anos depois do primeiro Inazuma Eleven.</p><p>Além da campanha, o jogo aposta no Chronicle Mode para revisitar a história da série e no Kizuna Station para criar uma cidade social e interagir online. A LEVEL-5 anunciou em janeiro de 2026 que as vendas digitais mundiais passaram de 800 mil cópias, reforçando o interesse do público no retorno da franquia.</p>",
      category: "RPG",
      tags: ["Inazuma Eleven", "LEVEL-5", "RPG", "Futebol"],
      publishedAt: new Date("2026-05-08T12:00:00.000Z"),
      imageUrl:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2799860/d7e5240b6182e4a085a365503b22aefd2e6ae6cf/header.jpg",
      authorId: author.id,
    },
  ];

  // Upsert mantém o seed idempotente: pode rodar várias vezes sem duplicar dados.
  for (const article of articles) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
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
