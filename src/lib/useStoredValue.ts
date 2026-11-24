"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// A primitive snapshot stays stable between reads and hydrates without
// accessing browser storage on the server.
export function useStoredValue(key: string) {
  const getSnapshot = useCallback(() => {
    try { return localStorage.getItem(key); } catch { return null; }
  }, [key]);
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
