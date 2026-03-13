import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { ConvexClientProvider } from '@/components/convex-client-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

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
