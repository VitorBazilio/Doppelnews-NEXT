export function isValidCategoryName(name: string) {
  return name.trim().length >= 2 && name.trim().length <= 80;
}
