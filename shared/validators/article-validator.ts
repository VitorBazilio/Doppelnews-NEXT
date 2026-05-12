export function isValidArticleTitle(title: string) {
  return title.trim().length >= 3 && title.trim().length <= 255;
}
