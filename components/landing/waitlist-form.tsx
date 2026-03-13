"use client"

import { type FormEvent, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { trackClarityEvent } from "@/lib/clarity"
import { cn } from "@/lib/utils"

type PreviewAnswers = {
  context: string
  feeling: string
  goal: string
}

interface WaitlistFormProps {
  className?: string
  previewAnswers?: PreviewAnswers | null
}

export function WaitlistForm({ className, previewAnswers }: WaitlistFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const formElement = formRef.current

    if (!formElement) {
      return
    }

    let hasTrackedView = false

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry?.isIntersecting && !hasTrackedView) {
          hasTrackedView = true
          trackClarityEvent("waitlist_form_viewed", {
            has_preview_answers: Boolean(previewAnswers),
          })
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(formElement)

    return () => {
      observer.disconnect()
    }
  }, [previewAnswers])

  function getWaitlistErrorType(message: string) {
    const normalizedMessage = message.toLowerCase()

    if (normalizedMessage.includes("already on the waitlist")) {
      return "duplicate"
    }

    if (normalizedMessage.includes("invalid") || normalizedMessage.includes("email")) {
      return "validation"
    }

    if (normalizedMessage.includes("network") || normalizedMessage.includes("fetch")) {
      return "network"
    }

    return "unknown"
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    trackClarityEvent("waitlist_submit_started", {
      has_preview_answers: Boolean(previewAnswers),
    })

    setIsPending(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, previewAnswers }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }

      setName("")
      setEmail("")

      toast({
        title: "You're on the waitlist",
        description: "Your launch offer is saved: 50% off month one and 25% off month two.",
      })
      trackClarityEvent("waitlist_submit_success", {
        has_preview_answers: Boolean(previewAnswers),
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "unknown"

      trackClarityEvent("waitlist_submit_failed", {
        has_preview_answers: Boolean(previewAnswers),
        error_type: getWaitlistErrorType(errorMessage),
      })
      toast({
        title: "Could not join waitlist",
        description: errorMessage === "unknown" ? "Please try again in a moment." : errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      ref={formRef}
      id="waitlist"
      onSubmit={handleSubmit}
      className={cn(
        "rounded-3xl border border-border/60 bg-card/70 p-4 sm:p-5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">Want first access when we open?</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Join early for a priority invite and lock in 50% off month one plus 25% off month two.
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          autoComplete="name"
          required
          className="h-11 rounded-2xl border-border/60 bg-background/80"
        />
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          autoComplete="email"
          required
          className="h-11 rounded-2xl border-border/60 bg-background/80"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-11 rounded-full px-6"
        >
          {isPending ? "Joining..." : "Join waitlist"}
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          No spam. 1-2 emails per month. Unsubscribe anytime.
        </p>
      </div>
    </form>
  )
}
