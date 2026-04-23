export function normalizeImageUrl(url: string): string {
  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith("http://")) {
    return `https://${trimmed.slice("http://".length)}`;
  }

  if (!/^https?:\/\//i.test(trimmed) && trimmed.includes("res.cloudinary.com")) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

export function normalizeImageUrls(urls: string[]): string[] {
  return urls.map(normalizeImageUrl).filter(Boolean);
}