import type { Metadata, Viewport } from "next"
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "unsaid - decode the conversation, not just the words",
  description:
    "Paste a conversation or upload a screenshot to get emotionally intelligent clarity on what was said, what was meant, what was felt, and what to do next.",
  keywords: ["communication", "relationships", "emotional clarity", "conversation help", "texting support"],
  icons: {
    icon: [
      {
        url: "/icon-dark-32x32.png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0F0E13",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${fraunces.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
        {clarityProjectId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityProjectId}");`}
          </Script>
        ) : null}
        <Analytics />
      </body>
    </html>
  )
}
