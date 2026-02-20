export function setItem(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

export function getItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

export function removeItem(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}