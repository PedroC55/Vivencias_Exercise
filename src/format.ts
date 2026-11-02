const LOCALE = "pt-PT";
const TIME_ZONE = "Europe/Lisbon";

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
