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

export function formatDate(dateInput: any, fullDate = false) {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  if (fullDate) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    formattedDate += ` ${hours}:${minutes}`;
  }

  return formattedDate;
};