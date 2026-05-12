"use client";

import Link from "next/link";

type ErrorAction = {
  href: string;
  label: string;
  secondary?: boolean;
};

type ErrorPageProps = {
  status: string;
  eyebrow: string;
  title: string;
  description: string;
  details?: string;
  actions?: ErrorAction[];
  onRetry?: () => void;
};

export default function ErrorPage({
  status,
  eyebrow,
  title,
  description,
  details,
  actions = [
    { href: "/", label: "Voltar ao início" },
    { href: "/noticias", label: "Ver notícias", secondary: true },
  ],
  onRetry,
}: ErrorPageProps) {
  return (
    <main className="error-page" aria-labelledby="error-title">
      <section className="error-panel">
        <div className="error-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 id="error-title">{title}</h1>
          <p>{description}</p>

          {details ? <small className="error-details">{details}</small> : null}

          <div className="error-actions" aria-label="Ações de recuperação">
            {onRetry ? (
              <button type="button" className="error-retry-button" onClick={onRetry}>
                Tentar novamente
              </button>
            ) : null}

            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={`error-action-link${
                  action.secondary ? " error-action-secondary" : ""
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <strong className="error-code" aria-label={`Código ${status}`}>
          {status}
        </strong>
      </section>
    </main>
  );
}
