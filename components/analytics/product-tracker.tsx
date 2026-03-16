"use client"

import { useEffect } from "react"
import { trackClarityEvent } from "@/lib/clarity"

const PRODUCT_VIEW_SESSION_KEY = "unsaid_product_view_tracked"

function getReferrerDomain(referrer: string) {
  if (!referrer) {
    return "direct"
  }

  try {
    return new URL(referrer).hostname || "direct"
  } catch {
    return "unknown"
  }
}

export function ProductTracker() {
  useEffect(() => {
    const hasTrackedView = sessionStorage.getItem(PRODUCT_VIEW_SESSION_KEY) === "1"
    const params = new URLSearchParams(window.location.search)

    if (!hasTrackedView) {
      trackClarityEvent("product_view", {
        path: window.location.pathname,
        search: window.location.search,
        referrer_domain: getReferrerDomain(document.referrer),
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        utm_term: params.get("utm_term"),
      })

      sessionStorage.setItem(PRODUCT_VIEW_SESSION_KEY, "1")
    }
  }, [])

  return null
}
