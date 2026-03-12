import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
                <Link href="#preview">Try the 30-sec preview</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full px-6 border-primary/60 text-primary"
              >
                <Link href="#how-it-works">See how it works</Link>
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
          <div className="relative animate-fade-up animation-delay-300">
            <div className="relative mx-auto h-[460px] sm:h-[500px] lg:h-[540px] w-full max-w-[440px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]"
              />

              <div className="absolute inset-0 flex items-end justify-center">
                <div className="relative z-20 w-[58vw] max-w-[340px] sm:w-[52vw] sm:max-w-[360px] lg:w-[48vw] lg:max-w-[390px]">
                  <div className="overflow-hidden rounded-[2.6rem]">
                    {/* <Image
                      src="/home-portrait.png"
                      alt="Unsaid home screen with quick actions for uploading a screenshot, audio, or text"
                      width={857}
                      height={1835}
                      className="block h-auto w-full scale-[1.08] drop-shadow-[0_22px_70px_rgba(123,97,255,0.30)]"
                      priority
                    /> */}

                    <PhoneMockup imageAlt="Unsaid home screen with quick actions for uploading a screenshot, audio, or text" imageSrc="/home-portrait.png" />
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -left-10 w-24 h-24 bg-primary/12 rounded-full blur-2xl"
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
