"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackClarityEvent } from "@/lib/clarity"
import { WaveDivider } from "./wave-divider"
import { PhoneMockup } from "./phone-mockup"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-18 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
              Clarity for complicated conversations
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground leading-[1.1] tracking-tight">
              Know what happened before you text back
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Unsaid helps you slow down, read the moment clearly, and choose a response that feels calm, honest, and grounded.
            </p>

            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto lg:mx-0">
              Upload a screenshot, paste the chat, or add a quick voice note.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link
                  href="#preview"
                  onClick={() => trackClarityEvent("hero_cta_clicked", { cta: "try_preview", destination: "preview" })}
                >
                  Try the 30-sec preview
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full px-6 border-primary/60 text-primary"
              >
                <Link
                  href="#how-it-works"
                  onClick={() =>
                    trackClarityEvent("hero_cta_clicked", { cta: "see_how_it_works", destination: "how_it_works" })
                  }
                >
                  See how it works
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground">
                Upload the conversation
              </div>
              <div className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground">
                See what changed
              </div>
              <div className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground">
                Send a better reply
              </div>
            </div>
          </div>

          {/* Phone Preview */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up animation-delay-300">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
            />
            <div className="relative z-10">
              <PhoneMockup
                imageAlt="Unsaid home screen with quick actions for uploading a screenshot, audio, or text"
                imageSrc="/home-portrait.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <WaveDivider />
    </section>
  )
}
