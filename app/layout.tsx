import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ConvexClientProvider } from '@/components/convex-client-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: 'Unsaid - Your Pocket Companion for Emotional Growth',
  description: 'Unsaid helps you make sense of your emotions, spot unhelpful patterns in conversations, and grow through calm, thoughtful guidance.',
  generator: 'v0.app',
  keywords: ['communication', 'relationships', 'emotional clarity', 'conversation help', 'texting support'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FCFAF6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground`}>
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
