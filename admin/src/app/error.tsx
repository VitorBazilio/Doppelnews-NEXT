"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="admin-panel">
      <div className="admin-section-title">
        <h2>Erro no painel</h2>
      </div>
      <p className="field-hint">Nao foi possivel carregar esta tela.</p>
      <button type="button" onClick={reset}>
        Tentar novamente
      </button>
    </main>
  );
}
