import { roles, type Role } from "@doppelnews/shared/constants/roles";

export function canAccessAdmin(role?: Role) {
  return role === roles.admin || role === roles.editor;
}
