"use client"

import { useEffect } from "react"
import { Copy, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/ResultCard"
import { toast } from "@/hooks/use-toast"
import { trackClarityEvent } from "@/lib/clarity"
import type { AnalysisResult } from "@/types/analysis"

type AnalysisResultsProps = {
  analysis: AnalysisResult
  onReset: () => void
}

export function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  useEffect(() => {
    trackClarityEvent("analysis_results_viewed", {
      emotional_tone: analysis.emotional_tone,
    })
  }, [analysis.emotional_tone])

  async function copyRewrite() {
    try {
      await navigator.clipboard.writeText(analysis.message_to_send)
      trackClarityEvent("rewrite_copied", {
        source: "analysis_results",
      })
      toast({
        title: "Message copied",
        description: "Copied just the sendable message.",
      })
    } catch {
      toast({
        title: "Couldn't copy that",
        description: "Try selecting it manually for now.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="animate-fade-up">
        <div className="w-full rounded-[24px] border border-white/10 bg-white/6 p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Emotional tone
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-[var(--accent-warm)] sm:text-[15px]">
            {analysis.emotional_tone}
          </p>
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">A softer read on what just happened.</p>
      </div>

      <ResultCard title="What was said" eyebrow="surface level" className="bg-[var(--card-said)]/92" delay={0}>
        <p>{analysis.what_was_said}</p>
      </ResultCard>

      <ResultCard title="What was likely meant" eyebrow="under the words" className="bg-[var(--card-meant)]/92" delay={100}>
        <p>{analysis.what_was_likely_meant}</p>
      </ResultCard>

      <ResultCard title="What was felt" eyebrow="emotional layer" className="bg-[var(--card-felt)]/92" delay={200}>
        <p>{analysis.what_was_felt}</p>
      </ResultCard>

      <ResultCard title="The healthiest next move" eyebrow="what to do now" className="bg-[var(--card-next)]/92" delay={300}>
        <p>{analysis.healthiest_next_move}</p>
        <p className="mt-4 text-xs text-[var(--text-secondary)]/90">This is AI-generated insight, not professional advice.</p>
      </ResultCard>

      <ResultCard title="Rewrite it" eyebrow="if you could say what you actually mean" className="bg-[linear-gradient(180deg,rgba(38,33,45,0.94),rgba(28,25,35,0.94))]" delay={400}>
        <p className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[var(--text-primary)]">
          {analysis.message_to_send}
        </p>
        <p className="mt-4">{analysis.rewrite}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full border-white/10 bg-white/5 text-[var(--text-primary)] hover:bg-white/10 sm:w-auto"
            onClick={copyRewrite}
          >
            <Copy className="size-4" />
            Copy rewrite
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full rounded-full text-[var(--text-primary)] hover:bg-white/8 sm:w-auto"
            onClick={onReset}
          >
            <RefreshCcw className="size-4" />
            Decode another conversation
          </Button>
        </div>
      </ResultCard>
    </div>
  )
}
