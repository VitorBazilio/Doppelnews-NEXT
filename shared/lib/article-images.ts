import type { ArticleSummary } from "./articles";

type ArticleImageInput = Pick<
  ArticleSummary,
  "title" | "category" | "imageUrl"
> & {
  tags?: string[];
};

type DevelopmentImageRule = {
  keywords: string[];
  imageUrl: string;
};

const developmentImageRules: DevelopmentImageRule[] = [
  {
    keywords: ["inazuma", "victory road", "level-5", "futebol"],
    imageUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2799860/d7e5240b6182e4a085a365503b22aefd2e6ae6cf/header.jpg",
  },
  {
    keywords: ["zelda", "hyrule", "nintendo"],
    imageUrl:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/956c12eb1a4c9e68b494cca7efd23d20ba8a789a5eb02589affae64bc6bc3282",
  },
  {
    keywords: ["assassin", "ubisoft", "furtividade"],
    imageUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3159330/header.jpg",
  },
  {
    keywords: ["resident evil", "capcom", "terror", "survival horror"],
    imageUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg",
  },
  {
    keywords: ["indie", "silksong", "hollow knight"],
    imageUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1776125736",
  },
];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function buildSearchText(article: ArticleImageInput) {
  return normalizeSearchText(
    [article.title, article.category, ...(article.tags ?? [])].join(" "),
  );
}

// Fallback apenas para deixar a interface de desenvolvimento mais fiel.
export function getDisplayArticleImage(article: ArticleImageInput) {
  if (article.imageUrl) {
    return article.imageUrl;
  }

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const searchText = buildSearchText(article);
  const matchedRule = developmentImageRules.find((rule) =>
    rule.keywords.some((keyword) =>
      searchText.includes(normalizeSearchText(keyword)),
    ),
  );

  return matchedRule?.imageUrl ?? null;
}
