import { ConversationInput } from "@/components/ConversationInput"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { ProductTracker } from "@/components/analytics/product-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <ProductTracker />
      <Hero />
      <ConversationInput />
      <Footer />
    </main>
  )
}
