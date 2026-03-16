type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

type RateLimitOptions = {
  limit: number
  windowMs: number
}

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }

  return headers.get("x-real-ip") ?? "unknown"
}

export function checkRateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now()
  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + options.windowMs }
    store.set(key, next)
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: next.resetAt,
    }
  }

  if (current.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    }
  }

  current.count += 1
  store.set(key, current)

  return {
    allowed: true,
    remaining: Math.max(0, options.limit - current.count),
    resetAt: current.resetAt,
  }
}
