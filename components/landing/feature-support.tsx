import { PhoneMockup } from "./phone-mockup"

export function FeatureSupport() {
  return (
    <section id="analysis" className="py-24 px-6 bg-background-alt">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
              Calm debrief, clear next move
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground leading-tight">
              See what happened without getting lost in the spiral
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Results are broken into simple cards so you can move from confusion to action: what likely happened, what each person may be feeling, where communication broke down, and what not to assume.
            </p>

            <div className="mt-8 space-y-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="rounded-2xl border border-border/60 bg-background px-4 py-4">
                <p className="text-sm font-medium text-foreground">Best next move</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Decide whether to clarify, pause, apologize, ask a question, or not respond yet.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background px-4 py-4">
                <p className="text-sm font-medium text-foreground">Suggested response</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Get wording that sounds grounded, direct, and less reactive.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background px-4 py-4">
                <p className="text-sm font-medium text-foreground">Healthier rewrite</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Keep your meaning, remove the parts that escalate the conversation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <PhoneMockup
              imageSrc="/analysis-3-portrait.png"
              imageAlt="Analysis cards showing the best next move and a suggested response"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
