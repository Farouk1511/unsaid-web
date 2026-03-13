"use client"

import { useEffect, useState } from "react"
import { trackClarityEvent } from "@/lib/clarity"

type ExperimentConfig<TVariant extends string> = {
  id: string
  variants: readonly TVariant[]
  enabled: boolean
  trafficPercent: number
}

type ExperimentResult<TVariant extends string> = {
  experimentId: string
  variant: TVariant
  enabled: boolean
  trafficPercent: number
}

const assignedExperiments = new Map<string, string>()
const exposedExperiments = new Set<string>()

function clampTrafficPercent(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)))
}

function getExperimentStorageKey(experimentId: string) {
  return `unsaid_experiment_${experimentId}`
}

function getExperimentBucketStorageKey(experimentId: string) {
  return `unsaid_experiment_bucket_${experimentId}`
}

function getControlVariant<TVariant extends string>(variants: readonly TVariant[]) {
  return variants[0]
}

function pickVariant<TVariant extends string>(variants: readonly TVariant[]) {
  const index = Math.floor(Math.random() * variants.length)
  return variants[index] ?? variants[0]
}

function getExperimentBucket(experimentId: string) {
  const storageKey = getExperimentBucketStorageKey(experimentId)
  const storedBucket = window.localStorage.getItem(storageKey)
  const parsedBucket = storedBucket ? Number.parseInt(storedBucket, 10) : Number.NaN

  if (!Number.isNaN(parsedBucket) && parsedBucket >= 0 && parsedBucket <= 99) {
    return parsedBucket
  }

  const bucket = Math.floor(Math.random() * 100)
  window.localStorage.setItem(storageKey, String(bucket))
  return bucket
}

function isUserIncludedInExperiment(experimentId: string, trafficPercent: number) {
  if (trafficPercent >= 100) {
    return true
  }

  if (trafficPercent <= 0) {
    return false
  }

  return getExperimentBucket(experimentId) < trafficPercent
}

function assignExperimentVariant<TVariant extends string>(config: ExperimentConfig<TVariant>) {
  const controlVariant = getControlVariant(config.variants)
  const trafficPercent = clampTrafficPercent(config.trafficPercent)

  if (!config.enabled || !isUserIncludedInExperiment(config.id, trafficPercent)) {
    assignedExperiments.set(config.id, controlVariant)
    return controlVariant
  }

  const cachedVariant = assignedExperiments.get(config.id)

  if (cachedVariant && config.variants.includes(cachedVariant as TVariant)) {
    return cachedVariant as TVariant
  }

  const storageKey = getExperimentStorageKey(config.id)
  const storedVariant = window.localStorage.getItem(storageKey)

  if (storedVariant && config.variants.includes(storedVariant as TVariant)) {
    assignedExperiments.set(config.id, storedVariant)
    return storedVariant as TVariant
  }

  const assignedVariant = pickVariant(config.variants)
  assignedExperiments.set(config.id, assignedVariant)
  window.localStorage.setItem(storageKey, assignedVariant)
  return assignedVariant
}

function trackExperimentExposure(experimentId: string, variant: string) {
  const exposureKey = `${experimentId}:${variant}`

  if (exposedExperiments.has(exposureKey)) {
    return
  }

  exposedExperiments.add(exposureKey)

  trackClarityEvent("experiment_viewed", {
    experiment_id: experimentId,
    experiment_variant: variant,
  })
}

export const heroPrimaryCopyExperiment = {
  id: "hero_primary_cta_copy_v1",
  variants: ["try_the_30_sec_preview", "see_your_next_move"] as const,
  enabled: true,
  trafficPercent: 100,
}

export const heroPrimaryDestinationExperiment = {
  id: "hero_primary_cta_destination_v1",
  variants: ["preview", "waitlist_direct"] as const,
  enabled: true,
  trafficPercent: 100,
}

export const navbarPreviewCtaExperiment = {
  id: "navbar_preview_cta_copy_v1",
  variants: ["try_preview", "see_preview"] as const,
  enabled: true,
  trafficPercent: 100,
}

export const waitlistSubmitExperiment = {
  id: "waitlist_submit_cta_v1",
  variants: ["join_waitlist", "get_early_access"] as const,
  enabled: true,
  trafficPercent: 100,
}

export function useExperiment<TVariant extends string>(config: ExperimentConfig<TVariant>): ExperimentResult<TVariant> {
  const controlVariant = getControlVariant(config.variants)
  const [variant, setVariant] = useState<TVariant>(controlVariant)
  const trafficPercent = clampTrafficPercent(config.trafficPercent)
  const isEnabled = config.enabled && trafficPercent > 0

  useEffect(() => {
    const assignedVariant = assignExperimentVariant(config)
    setVariant(assignedVariant)
    if (config.enabled && isUserIncludedInExperiment(config.id, trafficPercent)) {
      trackExperimentExposure(config.id, assignedVariant)
    }
  }, [config, trafficPercent])

  return {
    experimentId: config.id,
    variant,
    enabled: isEnabled,
    trafficPercent,
  }
}
