import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Unsaid",
  description:
    "How Unsaid collects, uses, and protects information for the web conversation analyzer and optional waitlist.",
}

const sections = [
  {
    title: "What we collect",
    body: "When you use the web analyzer, we process the conversation text or screenshot you submit so we can generate the requested analysis. If you join the optional waitlist, we collect your name and email address. We may also collect basic technical data like browser type and anonymous usage events.",
  },
  {
    title: "How we use it",
    body: "We use this information to generate analysis responses, manage the optional waitlist, improve the site experience, and prevent misuse.",
  },
  {
    title: "How conversation inputs are handled",
    body: "The web MVP is designed to be stateless for analysis results. We do not currently offer user accounts or saved history for submitted conversations in the website experience.",
  },
  {
    title: "Data sharing",
    body: "We do not sell your personal information. We may use trusted service providers to host data and send communications on our behalf.",
  },
  {
    title: "Your choices",
    body: "You can request access, correction, or deletion of your waitlist data by contacting us.",
  },
  {
    title: "Contact",
    body: "For privacy questions, email us at privacy@unsaid.app.",
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to home
        </Link>

        <h1 className="mt-6 font-serif text-4xl font-medium text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 16, 2026</p>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Unsaid is committed to handling personal information with care. This policy explains how we
          collect and use information through our web conversation analyzer and optional waitlist.
        </p>

        <div className="mt-10 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-border/60 bg-card p-5">
              <h2 className="text-lg font-medium text-foreground">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
