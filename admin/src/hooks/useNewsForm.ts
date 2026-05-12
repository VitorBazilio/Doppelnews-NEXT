"use client";

import { useState } from "react";

export function useNewsForm() {
  const [isDirty, setIsDirty] = useState(false);

  return {
    isDirty,
    markDirty: () => setIsDirty(true),
    resetDirty: () => setIsDirty(false),
  };
}
