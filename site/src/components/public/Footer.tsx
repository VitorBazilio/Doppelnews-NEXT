import Link from "next/link";

// Grupos de navegação do rodapé. Manter aqui facilita adicionar novas colunas.
const footerLinks = {
  Navegacao: ["Notícias", "Reviews", "Artigos", "Vídeos"],
  Categorias: ["PlayStation", "Xbox", "Nintendo", "PC"],
  DoppelNews: ["Sobre", "Equipe", "Contato", "Privacidade"],
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <span className="DoppelTitle">DoppelNews</span>
          <p>
            Notícias, análises e cultura gamer com leitura direta e visual de
            revista.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <nav key={title} aria-label={title} className="footer-column">
            <h2>{title}</h2>
            {links.map((link) => (
              <Link key={link} href="/noticias">
                {link}
              </Link>
            ))}
          </nav>
        ))}

        <form className="newsletter">
          <h2>Newsletter</h2>
          <p>Receba os principais destaques no seu email.</p>
          <div>
            <input type="email" placeholder="seu@email.com" aria-label="Email" />
            <button type="submit">Receber</button>
          </div>
        </form>
      </div>
      <p className="copyright">
        &copy; 2026 DoppelNews. Todos os direitos reservados.
      </p>
    </footer>
  );
}
