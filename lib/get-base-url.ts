/**
 * Get the base URL for API calls
 * Works in both local development and production
 *
 * For server-side fetch in Next.js, you can use relative URLs in most cases.
 * This function provides absolute URLs for cases where relative URLs don't work.
 */
export function getBaseUrl(): string {
  // First, try NEXT_PUBLIC_BASE_URL (user-defined)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // For Vercel deployments, use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For other deployment platforms, check for custom environment variables
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Check for production URL environment variable (common in many platforms)
  if (process.env.PRODUCTION_URL) {
    return process.env.PRODUCTION_URL;
  }

  // In production, if no URL is set, return empty string to use relative URLs
  // Next.js server components can resolve relative URLs internally
  if (process.env.NODE_ENV === "production") {
    // Return empty string to allow relative URLs
    // Next.js will resolve /api/elanlar internally
    return "";
  }

  // Fallback to localhost for local development
  return "http://localhost:3000";
}
