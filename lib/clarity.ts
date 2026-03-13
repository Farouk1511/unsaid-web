declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
  }
}

type ClarityValue = string | number | boolean | null | undefined

type ClarityProperties = Record<string, ClarityValue>

export type ClarityExperiment = {
  experiment_id: string
  experiment_variant: string
}

function normalizeClarityValue(value: ClarityValue) {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length ? trimmed : undefined
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  return undefined
}

function sanitizeClarityKey(key: string) {
  return key.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_")
}

export function setClarityTags(properties: ClarityProperties) {
  if (typeof window === "undefined") {
    return
  }

  for (const [key, value] of Object.entries(properties)) {
    const normalizedKey = sanitizeClarityKey(key)
    const normalizedValue = normalizeClarityValue(value)

    if (!normalizedKey || !normalizedValue) {
      continue
    }

    window.clarity?.("set", normalizedKey, normalizedValue)
  }
}

export function trackClarityEvent(eventName: string, properties?: ClarityProperties) {
  if (typeof window === "undefined") {
    return
  }

  if (properties) {
    setClarityTags(properties)
  }

  window.clarity?.("event", eventName)
}

export function getClarityExperimentProperties(experiment: ClarityExperiment, properties?: ClarityProperties) {
  return {
    ...experiment,
    ...properties,
  }
}
