export const SITE_URL = "https://ocmulgeefreepress.com";

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function articleDateIso(date: string) {
  const normalizedDate = date.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const parsedDate = new Date(`${normalizedDate} 12:00:00 UTC`);

  if (Number.isNaN(parsedDate.valueOf())) {
    return undefined;
  }

  return parsedDate.toISOString();
}
