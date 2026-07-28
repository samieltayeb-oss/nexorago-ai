/**
 * Application URL Configuration
 * 
 * Provides a reliable base URL for canonical links, absolute URLs, and Open Graph tags,
 * prioritizing production environment variables over development variables.
 */

export function getAppUrl(): string {
  // 1. Explicit application URL (Highest Priority)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  // 2. Vercel System Domain (Production or Preview)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`.replace(/\/$/, "");
  }

  // 3. Fallback for Local Development
  return "http://localhost:3000";
}

export function generateShareUrl(shareId: string): string {
  const baseUrl = getAppUrl();
  return `${baseUrl}/trip/${shareId}`;
}
