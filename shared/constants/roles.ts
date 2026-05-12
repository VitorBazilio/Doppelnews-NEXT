export const roles = {
  admin: "admin",
  editor: "editor",
  reader: "reader",
} as const;

export type Role = (typeof roles)[keyof typeof roles];
