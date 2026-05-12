import Link from "next/link";

type CategorySectionProps = {
  categories: string[];
};

export default function CategorySection({ categories }: CategorySectionProps) {
  const safeCategories = categories.length
    ? categories
    : ["PlayStation", "Xbox", "Nintendo", "PC"];

  return (
    <section className="release-strip" aria-label="Categorias">
      <div className="section-title">
        <span>Categorias</span>
      </div>
      <div className="category-strip">
        {safeCategories.map((category) => (
          <Link key={category} href="/noticias">
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
