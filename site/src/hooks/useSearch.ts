"use client";

import { useMemo, useState } from "react";

export function useSearch<T>(items: T[], getText: (item: T) => string) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const safeQuery = query.trim().toLowerCase();

    if (!safeQuery) {
      return items;
    }

    return items.filter((item) => getText(item).toLowerCase().includes(safeQuery));
  }, [getText, items, query]);

  return {
    query,
    results,
    setQuery,
  };
}
