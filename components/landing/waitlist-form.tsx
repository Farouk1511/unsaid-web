"use client"

import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface WaitlistFormProps {
  className?: string
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsPending(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
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
    } catch (error) {
      toast({
        title: "Could not join waitlist",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
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
