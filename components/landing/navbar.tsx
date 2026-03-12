"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Infinity } from "lucide-react"

const navLinks = [
  { label: "Preview", href: "#preview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You Get", href: "#analysis" },
  { label: "Privacy", href: "#privacy" },
]

export function Navbar() {
  function scrollToPreview() {
    const preview = document.getElementById("preview")

    if (!preview) {
      return
    }

    const top = preview.getBoundingClientRect().top + window.scrollY - 96

    window.scrollTo({
      top,
      behavior: "smooth",
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-soft-lavender flex items-center justify-center">
            <Infinity className="w-5 h-5 text-primary" />
          </div>
          <span className="font-serif text-lg font-medium text-foreground">Unsaid</span>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Button
            type="button"
            onClick={scrollToPreview}
            size="sm"
            variant="outline"
            className="rounded-full px-5 h-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Try Preview
          </Button>
        </div>
      </nav>
    </header>
  )
}
