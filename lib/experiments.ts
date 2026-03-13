"use client"

import { useEffect, useState } from "react"
import { trackClarityEvent } from "@/lib/clarity"

type ExperimentConfig<TVariant extends string> = {
  id: string
  variants: readonly TVariant[]
}

type ExperimentResult<TVariant extends string> = {
  experimentId: string
  variant: TVariant
}

const assignedExperiments = new Map<string, string>()
const exposedExperiments = new Set<string>()

function getExperimentStorageKey(experimentId: string) {
  return `unsaid_experiment_${experimentId}`
}

function pickVariant<TVariant extends string>(variants: readonly TVariant[]) {
  const index = Math.floor(Math.random() * variants.length)
  return variants[index] ?? variants[0]
}

function assignExperimentVariant<TVariant extends string>(config: ExperimentConfig<TVariant>) {
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
}

export const heroPrimaryDestinationExperiment = {
  id: "hero_primary_cta_destination_v1",
  variants: ["preview", "waitlist_direct"] as const,
}

export const navbarPreviewCtaExperiment = {
  id: "navbar_preview_cta_copy_v1",
  variants: ["try_preview", "see_preview"] as const,
}

export const waitlistSubmitExperiment = {
  id: "waitlist_submit_cta_v1",
  variants: ["join_waitlist", "get_early_access"] as const,
}

export function useExperiment<TVariant extends string>(config: ExperimentConfig<TVariant>): ExperimentResult<TVariant> {
  const [variant, setVariant] = useState<TVariant>(config.variants[0])

  useEffect(() => {
    const assignedVariant = assignExperimentVariant(config)
    setVariant(assignedVariant)
    trackExperimentExposure(config.id, assignedVariant)
  }, [config])

  return {
    experimentId: config.id,
    variant,
  }
}
