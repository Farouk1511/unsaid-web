"use client"

import { useEffect, useState } from "react"

const loadingMessages = [
  "reading between the lines...",
  "decoding the subtext...",
  "figuring out what they actually meant...",
  "picking up on what wasn't said...",
  "almost there...",
]

export function LoadingState() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % loadingMessages.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(232,180,184,0.14),rgba(184,169,201,0.08),rgba(255,255,255,0.04))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] animate-fade-up">
      <div className="absolute inset-0 animate-[gradientShift_7s_ease-in-out_infinite] bg-[radial-gradient(circle_at_top,rgba(232,180,184,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(184,169,201,0.14),transparent_36%)] opacity-80" />
      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-[breathe_1.6s_ease-in-out_infinite] rounded-full bg-[var(--accent-primary)]" />
          <span className="h-3 w-3 animate-[breathe_1.6s_ease-in-out_0.2s_infinite] rounded-full bg-[var(--accent-secondary)]" />
          <span className="h-3 w-3 animate-[breathe_1.6s_ease-in-out_0.4s_infinite] rounded-full bg-[var(--accent-warm)]" />
        </div>
        <div>
          <p className="font-serif text-2xl text-[var(--text-primary)]">{loadingMessages[index]}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Taking a careful read so this feels useful, not generic.
          </p>
        </div>
      </div>
    </div>
  )
}
