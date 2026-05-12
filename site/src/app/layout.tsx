import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/main.css";

export const metadata: Metadata = {
  title: "DoppelNews - Notícias Geek sobre Jogos",
  description:
    "Seu portal de notícias sobre games, RPGs, consoles e tudo sobre o mundo geek dos videogames.",
  keywords: "games, notícias, RPG, consoles, PC gaming, mobile games",
  authors: [{ name: "DoppelNews Team" }],
  openGraph: {
    title: "DoppelNews - Notícias Geek sobre Jogos",
    description:
      "Seu portal de notícias sobre games, RPGs, consoles e tudo sobre o mundo geek dos videogames.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div id="top" className="top-anchor" tabIndex={-1} />
        {/* Estrutura base compartilhada por todas as rotas do App Router. */}
        {children}
        <script src="/site.js" defer />
      </body>
    </html>
  );
}
