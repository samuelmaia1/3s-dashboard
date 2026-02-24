export function formatToCurrency(value: number, locale: string = "pt-BR", currency: string = "BRL"): string {
 return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  });
}

export function formatPath(path = "") {
  return path
    .replace(/^\/+/, "")
    .split("/")
    .map(
      part =>
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join(" ");
}