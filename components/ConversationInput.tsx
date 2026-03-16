"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { ImagePlus, LoaderCircle, MessageSquareText, Sparkles } from "lucide-react"
import { AnalysisResults } from "@/components/AnalysisResults"
import { LoadingState } from "@/components/LoadingState"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { trackClarityEvent } from "@/lib/clarity"
import type { AnalysisResult, AnalyzeResponse, RelationshipContext } from "@/types/analysis"

type InputMode = "text" | "image"

const contextOptions: Array<{ value: RelationshipContext; label: string }> = [
  { value: "romantic", label: "💕 Partner" },
  { value: "ex", label: "💔 Ex" },
  { value: "friend", label: "🫂 Friend" },
  { value: "family", label: "👨‍👩‍👧 Family" },
  { value: "situationship", label: "🤷 Situationship" },
]

const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      const [, base64 = ""] = result.split(",")
      resolve(base64)
    }
    reader.onerror = () => reject(new Error("Couldn't read that screenshot."))
    reader.readAsDataURL(file)
  })
}

export function ConversationInput() {
  const [mode, setMode] = useState<InputMode>("text")
  const [context, setContext] = useState<RelationshipContext>("romantic")
  const [conversation, setConversation] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const canSubmit = useMemo(() => {
    return mode === "text" ? conversation.trim().length > 0 : Boolean(imageFile)
  }, [conversation, imageFile, mode])

  function resetAll() {
    trackClarityEvent("decode_another_clicked", {
      source: "results",
    })
    setConversation("")
    setImageFile(null)
    setAnalysis(null)
    setError(null)
    setIsLoading(false)
    setMode("text")
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    if (!file) return

    if (!acceptedImageTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PNG, JPG, JPEG, or WEBP screenshot.",
        variant: "destructive",
      })
      return
    }

    setImageFile(file)
    setAnalysis(null)
    setError(null)
    trackClarityEvent("screenshot_selected", {
      input_mode: "image",
      image_type: file.type,
      image_size_kb: Math.round(file.size / 1024),
    })
  }

  function handleModeChange(value: string) {
    const nextMode = value as InputMode
    if (nextMode !== mode) {
      trackClarityEvent("input_mode_selected", {
        input_mode: nextMode,
      })
    }
    setMode(nextMode)
  }

  async function handleSubmit() {
    if (!canSubmit) return

    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const startedAt = Date.now()
      const body: Record<string, string> = { context }
      const normalizedText = conversation.trim()

      trackClarityEvent("analysis_started", {
        input_mode: mode,
        context,
        text_length: mode === "text" ? normalizedText.length : undefined,
        has_image: mode === "image",
      })

      if (mode === "text") {
        body.text = normalizedText
      } else if (imageFile) {
        body.image = await fileToBase64(imageFile)
        body.imageType = imageFile.type
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = (await response.json()) as AnalyzeResponse

      if (!data.success) {
        throw new Error(data.error)
      }

      setAnalysis(data.analysis)
      trackClarityEvent("analysis_succeeded", {
        input_mode: mode,
        context,
        duration_ms: Date.now() - startedAt,
        emotional_tone: data.analysis.emotional_tone,
      })
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Please try again in a moment."
      setError(message)
      trackClarityEvent("analysis_failed", {
        input_mode: mode,
        context,
        error_message: message.slice(0, 140),
      })
      toast({
        title: "Couldn't decode that just yet",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-[680px] space-y-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(35,33,41,0.94),rgba(20,18,25,0.98))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:rounded-[32px] sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,180,184,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(184,169,201,0.08),transparent_32%)]" />
          <div className="relative space-y-5">
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <Sparkles className="size-4 text-[var(--accent-primary)]" />
              <p className="text-sm">Paste the conversation or upload the screenshot that is sitting weird in your chest.</p>
            </div>

            <Tabs value={mode} onValueChange={handleModeChange} className="gap-4">
              <TabsList className="grid h-auto grid-cols-2 rounded-[22px] border border-white/10 bg-white/5 p-1 sm:rounded-full">
                <TabsTrigger value="text" className="min-w-0 rounded-[18px] px-2 py-2 text-xs leading-tight data-[state=active]:bg-white/10 data-[state=active]:text-[var(--text-primary)] sm:rounded-full sm:py-2.5 sm:text-sm">
                  <MessageSquareText className="size-4" />
                  <span className="truncate">Paste a conversation</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="min-w-0 rounded-[18px] px-2 py-2 text-xs leading-tight data-[state=active]:bg-white/10 data-[state=active]:text-[var(--text-primary)] sm:rounded-full sm:py-2.5 sm:text-sm">
                  <ImagePlus className="size-4" />
                  <span className="truncate">Upload a screenshot</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Textarea
                  value={conversation}
                  onChange={(event) => setConversation(event.target.value)}
                  placeholder={"Paste your conversation here...\n\nLike:\nHim: I'm fine\nMe: Are you sure?\nHim: I said I'm fine\nMe: Ok..."}
                  className="min-h-[220px] rounded-[24px] border-white/10 bg-black/15 px-4 py-4 text-[15px] leading-6 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] sm:min-h-[240px] sm:rounded-[28px] sm:px-5 sm:py-5 sm:leading-7"
                />
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <label className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-white/14 bg-black/15 p-6 text-center transition hover:border-[var(--accent-primary)]/50 hover:bg-white/[0.06] sm:min-h-[240px] sm:rounded-[28px] sm:p-8">
                  <div className="rounded-full border border-white/10 bg-white/8 p-4 text-[var(--accent-primary)]">
                    <ImagePlus className="size-6" />
                  </div>
                  <div>
                    <p className="text-base text-[var(--text-primary)]">Drop in a screenshot or tap to upload</p>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">PNG, JPG, JPEG, WEBP</p>
                    {imageFile ? <p className="mt-4 text-sm text-[var(--accent-warm)]">{imageFile.name}</p> : null}
                  </div>
                  <input type="file" accept=".png,.jpg,.jpeg,.webp" className="hidden" onChange={handleImageChange} />
                </label>
              </TabsContent>
            </Tabs>

            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">context</p>
              <div className="flex flex-wrap gap-2">
                {contextOptions.map((option) => {
                  const isActive = option.value === context
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setContext(option.value)
                        trackClarityEvent("context_selected", {
                          context: option.value,
                        })
                      }}
                      className={`rounded-full border px-3 py-2 text-sm transition sm:px-4 ${
                        isActive
                          ? "border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/14 text-[var(--text-primary)]"
                          : "border-white/10 bg-white/5 text-[var(--text-secondary)] hover:bg-white/8"
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-[var(--text-secondary)]">
                No signup. No saved history. Just clarity when you need it.
              </div>
              <Button
                type="button"
                disabled={!canSubmit || isLoading}
                onClick={handleSubmit}
                className="h-12 w-full rounded-full px-6 text-[var(--bg-primary)] sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    decoding...
                  </>
                ) : (
                  "decode this →"
                )}
              </Button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-[24px] border border-[var(--accent-primary)]/20 bg-[rgba(232,180,184,0.08)] px-5 py-4 text-sm leading-7 text-[var(--text-primary)] animate-fade-up">
            {error}
          </div>
        ) : null}

        {isLoading ? <LoadingState /> : null}

        {analysis ? <AnalysisResults analysis={analysis} onReset={resetAll} /> : null}
      </div>
    </section>
  )
}
