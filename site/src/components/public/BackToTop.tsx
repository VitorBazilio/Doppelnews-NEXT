export default function BackToTop() {
  return (
    <a
      className="mobile-scroll-top"
      href="#top"
      data-back-to-top="true"
      aria-label="Voltar ao topo"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 19V5m0 0-6 6m6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </a>
  );
}
