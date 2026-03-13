"use client"

import { useEffect } from "react"
import { trackClarityEvent } from "@/lib/clarity"

const LANDING_VIEW_SESSION_KEY = "unsaid_landing_view_tracked"

function getReferrerDomain(referrer: string) {
  if (!referrer) {
    return "direct"
  }

  try {
    const url = new URL(referrer)
    return url.hostname || "direct"
  } catch {
    return "unknown"
  }
}

function getAttributionProperties() {
  const params = new URLSearchParams(window.location.search)

  return {
    landing_path: window.location.pathname,
    landing_search: window.location.search,
    referrer_domain: getReferrerDomain(document.referrer),
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  }
}

export function LandingTracker() {
  useEffect(() => {
    const hasTrackedLandingView = sessionStorage.getItem(LANDING_VIEW_SESSION_KEY) === "1"

    if (!hasTrackedLandingView) {
      trackClarityEvent("landing_view", getAttributionProperties())
      sessionStorage.setItem(LANDING_VIEW_SESSION_KEY, "1")
    }

    const scrollMilestones = [25, 50, 75, 100]
    const seenMilestones = new Set<number>()

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        return
      }

      const scrolledPercent = Math.round((window.scrollY / maxScroll) * 100)

      for (const milestone of scrollMilestones) {
        if (scrolledPercent >= milestone && !seenMilestones.has(milestone)) {
          seenMilestones.add(milestone)
          trackClarityEvent("landing_scroll_depth", { percent: milestone })
        }
      }
    }

    let hasTrackedExitIntent = false

    const handleMouseOut = (event: MouseEvent) => {
      if (hasTrackedExitIntent || window.innerWidth < 1024) {
        return
      }

      if (event.clientY <= 0) {
        hasTrackedExitIntent = true
        trackClarityEvent("exit_intent", { section: "landing" })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("mouseout", handleMouseOut)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return null
}
