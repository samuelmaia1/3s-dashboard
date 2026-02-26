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

export function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCep(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskInstagram(value: string) {
  if (!value) return "";

  const sanitized = value
    .replace(/\s/g, "")  
    .replace(/@+/g, "@");

  if (sanitized.startsWith("@")) {
    return sanitized;
  }

  return `@${sanitized}`;
}