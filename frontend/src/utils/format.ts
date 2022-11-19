export function formatNumber(value: number, locale = 'pt-BR') {
  return new Intl.NumberFormat(locale, {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}

export function formatDate(value: string, locale = 'pt-BR') {
  return new Date(value).toLocaleDateString(locale);
}
