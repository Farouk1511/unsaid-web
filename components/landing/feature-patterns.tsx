import { PhoneMockup } from "./phone-mockup"

export function FeaturePatterns() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <PhoneMockup
              imageSrc="/analysi-2-portrait.png"
              imageAlt="Conversation analysis showing what happened and emotional patterns"
            />
          </div>

          <div className="text-center lg:text-left order-1 lg:order-2">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
              Bring the conversation in fast
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground leading-tight">
              Start with the conversation you already have
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unsaid is built for a mobile moment: you have screenshots in your camera roll, a voice note you need help unpacking, or a text thread you can paste in right away.
            </p>

            <div className="mt-8 grid gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="rounded-2xl border border-border/60 bg-background-alt/70 px-4 py-4 text-left">
                <p className="text-sm font-medium text-foreground">Upload screenshot</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Use the exact exchange instead of trying to summarize it from memory.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background-alt/70 px-4 py-4 text-left">
                <p className="text-sm font-medium text-foreground">Add context only if it helps</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Relationship type, what led up to the moment, or how you feel right now.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background-alt/70 px-4 py-4 text-left">
                <p className="text-sm font-medium text-foreground">One clear next action</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  No dashboard clutter, just a focused path into the analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
