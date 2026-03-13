"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { trackClarityEvent } from "@/lib/clarity"
import { WaitlistForm } from "./waitlist-form"

type QuestionId = "context" | "feeling" | "goal"

type Answers = Partial<Record<QuestionId, string>>

export type PreviewAnswers = {
  context: string
  feeling: string
  goal: string
}

const questions: Array<{
  id: QuestionId
  prompt: string
  options: Array<{ value: string; label: string }>
}> = [
  {
    id: "context",
    prompt: "What kind of conversation are you dealing with?",
    options: [
      { value: "dating", label: "Dating" },
      { value: "partner", label: "Partner" },
      { value: "friend", label: "Friend" },
      { value: "family", label: "Family" },
    ],
  },
  {
    id: "feeling",
    prompt: "How do you feel right now?",
    options: [
      { value: "confused", label: "Confused" },
      { value: "anxious", label: "Anxious" },
      { value: "angry", label: "Frustrated" },
      { value: "numb", label: "Shut down" },
    ],
  },
  {
    id: "goal",
    prompt: "What do you want next?",
    options: [
      { value: "clarity", label: "Clarity" },
      { value: "reply", label: "A grounded reply" },
      { value: "pause", label: "Space to pause" },
      { value: "boundary", label: "Set a boundary" },
    ],
  },
]

function buildPreview(answers: Answers) {
  const context = answers.context ?? "this"
  const feeling = answers.feeling ?? "overloaded"
  const goal = answers.goal ?? "clarity"

  const focusMap: Record<string, string> = {
    clarity: `Name the facts from this ${context} exchange before assigning intent.`,
    reply: `Draft one short response that stays honest and calm, even while feeling ${feeling}.`,
    pause: `Choose a pause window and communicate it clearly so you are not replying from stress.`,
    boundary: `Decide one boundary you need now, then phrase it in one direct sentence.`,
  }

  const avoidMap: Record<string, string> = {
    confused: "Avoid re-reading the thread in loops looking for one perfect meaning.",
    anxious: "Avoid sending multiple follow-up texts to force certainty.",
    angry: "Avoid drafting when your nervous system still feels hot.",
    numb: "Avoid defaulting to silence if you actually need to say something.",
  }

  const lineMap: Record<string, string> = {
    clarity: "I want to make sure I understood you correctly before I respond.",
    reply: "I care about this conversation and I want to reply clearly, not react fast.",
    pause: "I need a little time to think, and I will get back to you tonight.",
    boundary: "I am open to talking, but I need us to keep this respectful.",
  }

  return {
    focus: focusMap[goal],
    avoid: avoidMap[feeling],
    line: lineMap[goal],
  }
}

export function PreviewFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasTrackedPreviewStarted = useRef(false)
  const hasTrackedPreviewCompleted = useRef(false)

  const isComplete = step >= questions.length
  const currentQuestion = questions[Math.min(step, questions.length - 1)]
  const preview = useMemo(() => buildPreview(answers), [answers])
  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100)

  function handleSelect(value: string) {
    if (!currentQuestion) {
      return
    }

    if (!hasTrackedPreviewStarted.current) {
      hasTrackedPreviewStarted.current = true
      trackClarityEvent("preview_started")
    }

    trackClarityEvent("preview_step_completed", {
      step_id: currentQuestion.id,
      step_index: step + 1,
      selected_option: value,
    })

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
    setStep((prev) => Math.min(prev + 1, questions.length))
  }

  function handleBack() {
    trackClarityEvent("preview_back_clicked", { step_index: step + 1 })
    setStep((prev) => Math.max(prev - 1, 0))
  }

  function restart() {
    trackClarityEvent("preview_restarted")
    hasTrackedPreviewCompleted.current = false
    setAnswers({})
    setStep(0)
  }

  useEffect(() => {
    if (!isComplete || hasTrackedPreviewCompleted.current) {
      return
    }

    hasTrackedPreviewCompleted.current = true

    trackClarityEvent("preview_completed", {
      context: answers.context,
      feeling: answers.feeling,
      goal: answers.goal,
    })
  }, [answers.context, answers.feeling, answers.goal, isComplete])

  useEffect(() => {
    const sectionElement = sectionRef.current

    if (!sectionElement) {
      return
    }

    let hasTrackedView = false

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry?.isIntersecting && !hasTrackedView) {
          hasTrackedView = true
          trackClarityEvent("preview_viewed")
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(sectionElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  const completedAnswers: PreviewAnswers | null = isComplete
    ? {
        context: answers.context ?? "",
        feeling: answers.feeling ?? "",
        goal: answers.goal ?? "",
      }
    : null

  return (
    <section ref={sectionRef} id="preview" className="px-6 py-24 bg-background-alt/50">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
            30-second preview
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground leading-tight">
            See your first grounded next move
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Answer three quick prompts and get a starter plan for this moment.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border/60 bg-card/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>{isComplete ? "Preview complete" : `Step ${step + 1} of ${questions.length}`}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/60">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {!isComplete && currentQuestion ? (
            <div>
              <p className="text-xl font-medium text-foreground">{currentQuestion.prompt}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    onClick={() => handleSelect(option.value)}
                    className="h-12 justify-start rounded-2xl border-border/70 bg-background text-left text-foreground hover:border-primary/70 hover:bg-primary/5"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <div className="mt-5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="rounded-full px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
                >
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl font-medium text-foreground">Your first-week roadmap</p>
              <p className="mt-2 text-sm text-muted-foreground">
                A fast preview based on your answers. Full guidance unlocks at launch.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <p className="text-sm font-medium text-foreground">What to focus on now</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{preview.focus}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <p className="text-sm font-medium text-foreground">What to avoid this week</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{preview.avoid}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-4">
                  <p className="text-sm font-medium text-foreground">Try this response starter</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">"{preview.line}"</p>
                </div>
              </div>

              <div className="mt-6">
                <Button type="button" variant="outline" onClick={restart} className="rounded-full px-6">
                  Retake preview
                </Button>
              </div>

              <WaitlistForm className="mt-8" previewAnswers={completedAnswers} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
