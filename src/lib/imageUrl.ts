export function optimizeCloudinaryUrl(url: string, width = 600): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  if (url.includes("f_auto") || url.includes("q_auto")) {
    return url;
  }

  return url.replace(/\/image\/upload\/(?!f_auto)/, `/image/upload/f_auto,q_auto,w_${width},c_limit/`);
}

export function normalizeImageUrl(url: string, width = 600): string {
  let trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("//")) {
    trimmed = `https:${trimmed}`;
  } else if (trimmed.startsWith("http://")) {
    trimmed = `https://${trimmed.slice("http://".length)}`;
  } else if (!/^https?:\/\//i.test(trimmed) && trimmed.includes("res.cloudinary.com")) {
    trimmed = `https://${trimmed}`;
  }

  if (trimmed.includes("res.cloudinary.com") && trimmed.includes("/image/upload/")) {
    trimmed = optimizeCloudinaryUrl(trimmed, width);
  }

  return trimmed;
}

export function normalizeImageUrls(urls: string[], width = 600): string[] {
  return urls.flatMap((url) => {
    const normalized = normalizeImageUrl(url, width);
    return normalized ? [normalized] : [];
  });
}
