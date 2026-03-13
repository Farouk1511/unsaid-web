import { Navbar } from "@/components/landing/navbar"
import { LandingTracker } from "@/components/analytics/landing-tracker"
import { Hero } from "@/components/landing/hero"
import { FeaturePatterns } from "@/components/landing/feature-patterns"
import { FeatureSupport } from "@/components/landing/feature-support"
import { PreviewFlow } from "@/components/landing/preview-flow"
import { PrivacySection } from "@/components/landing/privacy-section"
import { WaitlistSection } from "@/components/landing/waitlist-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingTracker />
      <Navbar />
      <Hero />
      <FeaturePatterns />
      <FeatureSupport />
      <PreviewFlow />
      <PrivacySection />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
