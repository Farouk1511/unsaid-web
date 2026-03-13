import { WaitlistForm } from "./waitlist-form"

export function WaitlistSection() {
  return (
    <section id="waitlist-direct" className="px-6 py-24 bg-background-alt/40">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">Early access</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground leading-tight">
            Join the waitlist without taking the preview
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            If you already get the idea, leave your email and we will let you know when Unsaid opens.
          </p>
        </div>

        <WaitlistForm className="mx-auto mt-10 max-w-2xl" formId="waitlist-direct-form" surface="standalone" />
      </div>
    </section>
  )
}
