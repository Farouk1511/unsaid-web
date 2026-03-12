import { EyeOff, Lock, Shield } from "lucide-react"

const trustItems = [
  {
    icon: Lock,
    text: "Built for sensitive conversations, with a calmer one-thread-at-a-time experience.",
    borderColor: "border-l-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: EyeOff,
    text: "No public profile, no social feed, no pressure to turn private moments into content.",
    borderColor: "border-l-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Shield,
    text: "Focused guidance instead of noisy widgets, so the product stays useful when emotions are high.",
    borderColor: "border-l-border",
    bgColor: "bg-background-alt",
  },
]

export function PrivacySection() {
  return (
    <section id="privacy" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4 leading-tight">
              Designed for the conversations you would rather keep{" "}
              <span className="text-primary">between you and your phone</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Unsaid should feel like a quiet late-night debrief, not a busy productivity app. The experience stays minimal so you can reflect, understand the tension, and respond with more care.
            </p>

            <div className="space-y-4">
              {trustItems.map((item) => (
                <div
                  key={item.text}
                  className={`flex items-start gap-4 rounded-xl p-4 border-l-4 ${item.borderColor} ${item.bgColor}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center flex-shrink-0 shadow-sm">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary/30"
              >
                <ellipse cx="85" cy="90" rx="45" ry="55" className="fill-primary/20" />
                <ellipse cx="115" cy="90" rx="45" ry="55" className="fill-secondary/20" />
                <path d="M100 45 C100 45 90 70 100 90 C110 110 100 135 100 135" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M75 65 C85 70 95 65 100 70" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M100 80 C105 75 115 70 125 75" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M80 95 C90 100 95 95 100 100" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M100 105 C105 100 110 95 120 100" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="88" cy="85" r="3" fill="white" />
                <circle cx="112" cy="85" r="3" fill="white" />
                <path d="M94 100 C97 105 103 105 106 100" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>

              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-primary/20" />
              <div className="absolute top-12 -right-8 w-4 h-4 rounded-full bg-primary/20" />
              <div className="absolute -bottom-4 right-8 w-5 h-5 rounded-full bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
