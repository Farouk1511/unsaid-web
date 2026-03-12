# AGENTS.md — Unsaid Website + Waitlist

This file is for coding agents working in this repository.

The product is the **Unsaid marketing website and waitlist funnel**.

The website exists to do one job well:

**attract the right user → explain the value clearly → build trust → capture waitlist intent**

The site is **not the product**.  
It is the **gateway to the product**.

Everything should reinforce this.

---

# 1. Product Context

Unsaid is a mobile app that helps people understand relationship communication.

Core product loop:

**upload conversation → understand what happened → choose next move → communicate better**

The website should communicate this value simply and calmly.

The website should make the user feel:

- understood
- safe
- curious
- relieved

Not:

- overwhelmed
- sold to
- confused
- rushed

The tone should feel like **late-night reflection**, not startup hype.

---

# 2. Stack and Architecture

Framework: **Next.js (App Router)**  
Language: **TypeScript (`strict: true`)**  
Styling: **Tailwind CSS**  
Forms: **React Hook Form + Zod**  
Validation: **Zod**  
State: minimal local state first  
Backend for waitlist:

Preferred options:

- Supabase
- Convex
- Server Actions with database

Analytics:

- lightweight event tracking only

Deployment:

- **Vercel**

---

# 3. Architecture Philosophy

Use a **feature-first modular monolith**.

Do not overengineer the marketing website like a SaaS product.

Avoid:

- unnecessary abstractions
- fake scalability
- premature architecture
- complex folder nesting

Prefer:

- simple
- readable
- mobile-first
- fast iteration

---

# 4. Directory Structure
