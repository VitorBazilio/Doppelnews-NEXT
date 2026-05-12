"use client";

export function useAuth() {
  return {
    isAuthenticated: false,
    user: null,
  };
}
