import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
      <div className="mx-auto max-w-[680px] text-center animate-fade-up">
        <Badge className="mx-auto rounded-full border-white/10 bg-white/6 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)] shadow-none">
          emotionally clear, instantly
        </Badge>
        <p className="mt-6 text-sm lowercase tracking-[0.35em] text-[var(--accent-primary)]">unsaid</p>
        <h1 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
          finally understand what they actually meant
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
          Paste a conversation or drop in a screenshot. Get calm, emotionally intelligent clarity in seconds.
        </p>
      </div>
    </section>
  )
}
