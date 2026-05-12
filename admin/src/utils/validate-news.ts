export function hasRequiredNewsFields(data: {
  title?: string;
  category?: string;
  content?: string;
}) {
  return Boolean(data.title?.trim() && data.category?.trim() && data.content?.trim());
}
