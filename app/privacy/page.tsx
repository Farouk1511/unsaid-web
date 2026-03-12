import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Unsaid",
  description:
    "How Unsaid collects, uses, and protects information for the marketing website and waitlist.",
}

const sections = [
  {
    title: "What we collect",
    body: "When you join the waitlist, we collect your name and email address. If you complete the preview prompts, we also store the selected context, feeling, and goal answers. We may also collect basic technical data like browser type and anonymous usage events.",
  },
  {
    title: "How we use it",
    body: "We use this information to manage the waitlist, send launch updates, improve the site experience, and prevent misuse.",
  },
  {
    title: "Waitlist emails",
    body: "We only send occasional product and launch updates. You can unsubscribe any time from the link in our emails.",
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
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 12, 2026</p>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Unsaid is committed to handling personal information with care. This policy explains how we
          collect and use information through our marketing website and waitlist.
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
