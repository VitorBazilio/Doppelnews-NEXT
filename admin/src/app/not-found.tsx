import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="admin-panel">
      <div className="admin-section-title">
        <h2>Pagina nao encontrada</h2>
        <Link href="/">Voltar ao dashboard</Link>
      </div>
      <p className="field-hint">A rota administrativa solicitada nao existe.</p>
    </main>
  );
}
