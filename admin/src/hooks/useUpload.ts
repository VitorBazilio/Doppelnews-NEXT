"use client";

import { useState } from "react";

export function useUpload() {
  const [file, setFile] = useState<File | null>(null);

  return {
    file,
    setFile,
  };
}
