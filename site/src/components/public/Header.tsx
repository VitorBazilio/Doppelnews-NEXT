import Link from "next/link";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  title: string;
};

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/noticias?categoria=games", label: "Games" },
  { href: "/noticias?categoria=reviews", label: "Reviews" },
  { href: "/noticias?categoria=artigos", label: "Artigos" },
  { href: "/noticias?categoria=videos", label: "Videos" },
];

const hotTopics = [
  "Lancamentos da semana",
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Indies",
];

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <header className="site-header">
        <div className="header-shell">
          <Link href="/" className="brand" aria-label="DoppelNews inicio">
            <span className="DoppelTitle">{title}</span>
          </Link>

          <Navbar items={navItems} />

          <div className="header-actions">
            <SearchBar />
            <ThemeToggle />
          </div>
        </div>

        <nav className="trend-bar" aria-label="Em alta">
          <span>Em alta</span>
          {hotTopics.map((topic) => (
            <Link key={topic} href="/noticias">
              {topic}
            </Link>
          ))}
        </nav>
      </header>

      <BackToTop />
    </>
  );
}
