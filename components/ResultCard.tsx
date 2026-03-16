import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ResultCardProps = {
  title: string
  eyebrow?: string
  children: ReactNode
  className?: string
  delay?: number
}

export function ResultCard({ title, eyebrow, children, className, delay = 0 }: ResultCardProps) {
  return (
    <section
      className={cn(
        "animate-fade-up rounded-[24px] border border-white/10 p-5 shadow-[0_20px_65px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-6",
        className,
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {eyebrow ? <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] sm:text-[11px] sm:tracking-[0.22em]">{eyebrow}</p> : null}
      <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-[var(--text-primary)] sm:text-2xl">{title}</h3>
      <div className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px] sm:leading-7">{children}</div>
    </section>
  )
}
