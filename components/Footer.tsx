"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { trackClarityEvent } from "@/lib/clarity"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    trackClarityEvent("footer_waitlist_submit_started", {
      cta_text: "notify me",
      cta_surface: "footer",
    })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Unsaid web user",
          email,
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Couldn't save your email just yet.")
      }

      setEmail("")
      trackClarityEvent("footer_waitlist_submit_success", {
        cta_text: "notify me",
        cta_surface: "footer",
      })
      toast({
        title: "You're on the list",
        description: "We'll let you know when Unsaid lands on your phone.",
      })
    } catch (error) {
      trackClarityEvent("footer_waitlist_submit_failed", {
        cta_text: "notify me",
        cta_surface: "footer",
      })
      toast({
        title: "Couldn't save your email",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  async function handleShare() {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      trackClarityEvent("share_link_copied", {
        source: "footer",
      })
      toast({
        title: "Link copied",
        description: "Send it to the friend who always ends up decoding texts with you.",
      })
    } catch {
      toast({
        title: "Couldn't copy the link",
        description: "You can copy the URL from your browser for now.",
        variant: "destructive",
      })
    }
  }

  return (
    <footer className="px-4 pb-14 pt-8 sm:px-6">
      <div className="mx-auto max-w-[680px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,28,36,0.92),rgba(20,18,25,0.95))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
        <div className="grid gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-start">
          <div>
            <p className="font-serif text-3xl text-[var(--text-primary)]">want unsaid in your pocket?</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
              we're building the app. be first to know.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your email"
                className="h-12 rounded-full border-white/10 bg-white/5 px-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
              <Button type="submit" disabled={isPending} className="h-12 w-full rounded-full px-6 text-[var(--bg-primary)] sm:w-auto">
                {isPending ? "saving..." : "notify me"}
              </Button>
            </form>
          </div>

          <div className="space-y-4 sm:pt-1">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">This helped? Share Unsaid with a friend</p>
              <Button type="button" variant="ghost" className="mt-2 rounded-full px-0 text-[var(--accent-primary)] hover:bg-transparent hover:text-[var(--text-primary)]" onClick={handleShare}>
                copy link →
              </Button>
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              <Link href="/privacy" className="hover:text-[var(--text-primary)]">
                Privacy
              </Link>
              <span className="mx-2">·</span>
              <Link href="/terms" className="hover:text-[var(--text-primary)]">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
