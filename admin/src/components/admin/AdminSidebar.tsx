import Link from "next/link";

const adminLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/noticias", label: "Noticias" },
  { href: "/noticias/criar", label: "Criar noticia" },
  { href: "/categorias", label: "Categorias" },
  { href: "/midias", label: "Midias" },
  { href: "/usuarios", label: "Usuarios" },
  { href: "/configuracoes", label: "Configuracoes" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Navegacao administrativa">
      <Link href="/" className="admin-brand">
        DoppelNews
      </Link>
      <nav>
        {adminLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
