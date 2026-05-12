import Link from "next/link";

export default function MediaPage() {
  return (
    <section className="admin-panel">
      <div className="admin-section-title">
        <h2>Midias</h2>
        <Link href="/midias/upload">Enviar midia</Link>
      </div>
      <p className="field-hint">
        Biblioteca preparada para receber imagens e arquivos do portal.
      </p>
    </section>
  );
}
