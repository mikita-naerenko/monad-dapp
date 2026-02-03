"use client";

import { useEffect } from "react";

export function ErrorHandler() {
  useEffect(() => {
    const handleChunkError = (event: ErrorEvent) => {
      if (
        event.message?.includes(
          "Failed to fetch dynamically imported module"
        ) ||
        event.message?.includes("Loading chunk") ||
        event.message?.includes("ChunkLoadError")
      ) {
        console.warn("Chunk load error detected, reloading page...", event);
        window.location.reload();
      }
    };

    window.addEventListener("error", handleChunkError);

    return () => {
      window.removeEventListener("error", handleChunkError);
    };
  }, []);

  return null;
}
