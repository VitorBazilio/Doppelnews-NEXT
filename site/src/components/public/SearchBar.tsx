type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Buscar notícias...",
}: SearchBarProps) {
  return (
    <form className="search-box" action="/busca" method="get">
      <input
        type="search"
        name="q"
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-button" aria-label="Buscar">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path
            d="m20 20-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </form>
  );
}
