// Categorias disponíveis para novas notícias.
export const NEWS_CATEGORIES = [
  "RPG",
  "Ação",
  "Aventura",
  "Estratégia",
  "Esportes",
  "Corrida",
  "Simulação",
  "Terror",
  "Hardware",
  "Consoles",
  "PC",
  "Mobile",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

// Estados previstos para um futuro fluxo editorial.
export const PUBLISH_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type PublishStatus =
  (typeof PUBLISH_STATUS)[keyof typeof PUBLISH_STATUS];

// Configurações de paginação usadas nas telas de listagem.
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const;

// Regras de upload que documentam os limites aceitos pela aplicação.
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB.
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  IMAGES_FOLDER: "/images/news/",
} as const;
