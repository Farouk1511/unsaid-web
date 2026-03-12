import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use | Unsaid",
  description: "Terms governing access and use of the Unsaid website and waitlist.",
}

const sections = [
  {
    title: "Service overview",
    body: "Unsaid provides a marketing website and waitlist experience for an upcoming mobile app. Features may change as the product evolves.",
  },
  {
    title: "Acceptable use",
    body: "Please use this website lawfully and respectfully. Do not attempt to interfere with site security, performance, or availability.",
  },
  {
    title: "Waitlist expectations",
    body: "Joining the waitlist does not guarantee immediate access, availability in all regions, or specific release dates.",
  },
  {
    title: "No guarantees",
    body: "We aim to provide accurate information, but the site and content are provided as-is without warranties of any kind.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent allowed by law, Unsaid is not liable for indirect, incidental, or consequential damages arising from use of this site.",
  },
  {
    title: "Changes to terms",
    body: "We may update these terms over time. Continued use of the site after updates means you accept the revised terms.",
  },
  {
    title: "Contact",
    body: "For questions about these terms, email us at legal@unsaid.app.",
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to home
        </Link>

        <h1 className="mt-6 font-serif text-4xl font-medium text-foreground">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 12, 2026</p>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          These terms govern your access to and use of the Unsaid website and waitlist. If you do not
          agree with these terms, please do not use the site.
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
