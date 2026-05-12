import type { ReactNode } from "react";

type AdminHeaderProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export default function AdminHeader({
  title = "Painel DoppelNews",
  description = "Gerencie noticias, categorias e usuarios em uma area separada do site publico.",
  action,
}: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div>
        <span className="eyebrow">Administracao</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action ? <div className="admin-header-action">{action}</div> : null}
    </header>
  );
}
