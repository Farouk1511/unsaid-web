"use client"

import Link from "next/link"
import { Infinity } from "lucide-react"
import { trackClarityEvent } from "@/lib/clarity"

const navLinks = [
  { label: "Preview", href: "#preview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You Get", href: "#analysis" },
  { label: "Privacy", href: "#privacy" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-xl bg-soft-lavender flex items-center justify-center">
                  <Infinity className="w-5 h-5 text-primary" />
                </div>
                <Link
                  href="/"
                  className="font-serif text-lg font-medium text-foreground"
                  onClick={() => trackClarityEvent("footer_logo_clicked", { location: "footer" })}
                >
                  Unsaid
                </Link>
              </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Decode hard conversations, choose the next move, and reply with more clarity.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() =>
                      trackClarityEvent("footer_nav_link_clicked", {
                        label: link.label,
                        destination: link.href,
                      })
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() =>
                      trackClarityEvent(
                        link.href === "/privacy" ? "privacy_clicked" : "terms_clicked",
                        {
                          location: "footer",
                          destination: link.href,
                        },
                      )
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm text-foreground font-medium mb-4">Follow Us on</p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <Link
                href="https://instagram.com/getunsaid"
                target="_blank"
                rel="noreferrer"
                aria-label="Unsaid on Instagram"
                onClick={() =>
                  trackClarityEvent("social_link_clicked", {
                    network: "instagram",
                    location: "footer",
                  })
                }
                className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4 text-background" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Unsaid. Made with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
