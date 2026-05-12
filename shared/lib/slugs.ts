const ARTICLE_SLUG_MAX_LENGTH = 160;
const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ArticleUrlSource = {
  slug: string;
};

function trimSlug(value: string) {
  return value.slice(0, ARTICLE_SLUG_MAX_LENGTH).replace(/-+$/g, "");
}

export function slugify(value: string) {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return trimSlug(normalized);
}

export function normalizeArticleSlug(value: string, fallback = "noticia") {
  return slugify(value) || fallback;
}

export function isValidArticleSlug(value: string) {
  return (
    value.length > 0 &&
    value.length <= ARTICLE_SLUG_MAX_LENGTH &&
    !/^\d+$/.test(value) &&
    ARTICLE_SLUG_PATTERN.test(value)
  );
}

export function isLegacyArticleId(value: string) {
  return /^\d+$/.test(value);
}

export async function createUniqueArticleSlug(
  value: string,
  isTaken: (slug: string) => Promise<boolean>,
) {
  const baseSlug = normalizeArticleSlug(value);
  const safeBase = /^\d+$/.test(baseSlug) ? `noticia-${baseSlug}` : baseSlug;
  let slug = safeBase;
  let suffix = 2;

  while (await isTaken(slug)) {
    const suffixText = `-${suffix}`;
    slug = `${trimSlug(safeBase.slice(0, ARTICLE_SLUG_MAX_LENGTH - suffixText.length))}${suffixText}`;
    suffix += 1;
  }

  return slug;
}

export function getArticleHref(article: ArticleUrlSource) {
  return `/noticias/${article.slug}`;
}
