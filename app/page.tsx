import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { FeaturePatterns } from "@/components/landing/feature-patterns"
import { FeatureSupport } from "@/components/landing/feature-support"
import { PrivacySection } from "@/components/landing/privacy-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturePatterns />
      <FeatureSupport />
      <PrivacySection />
      <Footer />
    </main>
  )
}
