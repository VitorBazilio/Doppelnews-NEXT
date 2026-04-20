import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/main.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoppelNews - Notícias Geek sobre Jogos",
  description: "Seu portal de notícias sobre games, RPGs, consoles e tudo sobre o mundo geek dos videogames.",
  keywords: "games, notícias, RPG, consoles, PC gaming, mobile games",
  authors: [{ name: "DoppelNews Team" }],
  openGraph: {
    title: "DoppelNews - Notícias Geek sobre Jogos",
    description: "Seu portal de notícias sobre games, RPGs, consoles e tudo sobre o mundo geek dos videogames.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}