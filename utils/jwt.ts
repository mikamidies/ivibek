interface JWTPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function isTokenExpired(
  token: string | null | undefined,
  bufferSeconds: number = 60
): boolean {
  if (!token) return true;

  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return payload.exp - bufferSeconds <= now;
}

export function getTokenExpiryTime(token: string | null | undefined): number {
  if (!token) return 0;

  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return 0;
  }

  const now = Math.floor(Date.now() / 1000);
  const timeLeft = payload.exp - now;

  return Math.max(0, timeLeft);
}

export function shouldRefreshToken(token: string | null | undefined): boolean {
  if (!token) return false;

  const timeLeft = getTokenExpiryTime(token);
  const REFRESH_THRESHOLD = 5 * 60;

  return timeLeft > 0 && timeLeft < REFRESH_THRESHOLD;
}
