"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const storageKey = "theme";
const darkTheme: Theme = "dark";
const themeListeners = new Set<() => void>();

function getStoredTheme(): Theme {
  try {
    return localStorage.getItem(storageKey) === darkTheme ? "dark" : "light";
  } catch {
    return "light";
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {}
}

function getActiveTheme(fallback: Theme): Theme {
  if (typeof document === "undefined") {
    return fallback;
  }

  return document.documentElement.dataset.theme === darkTheme ? "dark" : fallback;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const isDark = theme === darkTheme;

  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  document.body.classList.toggle("theme-black", isDark);
}

function getThemeSnapshot(): Theme {
  return getActiveTheme(getStoredTheme());
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);

  return () => {
    themeListeners.delete(listener);
  };
}

function notifyThemeChange() {
  themeListeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const isDark = theme === darkTheme;

  useEffect(() => {
    applyTheme(getThemeSnapshot());
    notifyThemeChange();
  }, []);

  function handleToggle() {
    const currentTheme = getActiveTheme(theme);
    const nextTheme = currentTheme === darkTheme ? "light" : "dark";

    applyTheme(nextTheme);
    storeTheme(nextTheme);
    notifyThemeChange();
  }

  return (
    <button
      type="button"
      className="theme-toggle-button"
      aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
      aria-pressed={isDark}
      onClick={handleToggle}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="theme-icon theme-icon-moon"
      >
        <path
          d="M20.5 14.3A8.4 8.4 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"
          fill="currentColor"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="theme-icon theme-icon-sun"
      >
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={1.7} />
        <path d="M12 2V4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M12 20V22" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M4 12H2" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M22 12H20" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M19.1 4.9L17.7 6.3" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M6.3 17.7L4.9 19.1" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M4.9 4.9L6.3 6.3" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
        <path d="M17.7 17.7L19.1 19.1" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    </button>
  );
}
