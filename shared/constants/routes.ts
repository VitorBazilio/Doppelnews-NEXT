const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001";

function joinUrl(baseUrl: string, path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl.replace(/\/$/, "")}${safePath}`;
}

export const siteRoutes = {
  home: "/",
  news: "/noticias",
  newsDetail: (slug: string) => `/noticias/${slug}`,
  category: (slug: string) => `/categorias/${slug}`,
  author: (id: string | number) => `/autores/${id}`,
  search: (query: string) => `/busca?q=${encodeURIComponent(query)}`,
  about: "/sobre",
};

export const adminRoutes = {
  dashboard: "/",
  login: "/login",
  newsList: "/noticias",
  newsCreate: "/noticias/criar",
  newsEdit: (id: string | number) => `/noticias/editar/${id}`,
  categories: "/categorias",
  media: "/midias",
  users: "/usuarios",
  settings: "/configuracoes",
};

export const externalRoutes = {
  site: (path = siteRoutes.home) => joinUrl(siteBaseUrl, path),
  admin: (path = adminRoutes.dashboard) => joinUrl(adminBaseUrl, path),
};

export const routes = {
  site: siteRoutes,
  admin: adminRoutes,
  external: externalRoutes,
};
