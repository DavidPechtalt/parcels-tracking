export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
}
