# Unsaid Web MVP Phases

## Phase 0 - Launch MVP

Goal: deliver immediate value with zero signup friction.

Scope:
- Replace the current waitlist-first homepage with a product-first homepage.
- Add a compact hero, conversation input, animated loading state, and structured results.
- Support two inputs:
  - pasted conversation text
  - uploaded screenshot
- Add `POST /api/analyze` using Google Gemini.
- Return structured analysis:
  - what was said
  - what was likely meant
  - what was felt
  - healthiest next move
  - rewrite
  - emotional tone
- Keep the experience stateless.
- Keep optional footer email capture connected to the existing Convex waitlist flow.
- Add simple server-side rate limiting: 10 analyses per IP per hour.
- Update legal copy to reflect the analyzer product, not just the waitlist.

Technical decisions:
- AI provider: Google Gemini via `@google/genai`
- Env var: `GEMINI_API_KEY`
- Deployment: Vercel
- Persistence: none for analysis data in v1
- Waitlist storage: existing Convex `waitlistUsers`

Success criteria:
- User can paste a conversation and get insight in under 15 seconds.
- User can upload a screenshot and get insight in under 20 seconds.
- The page feels calm, premium, and emotionally safe.
- No signup is required before value is delivered.

## Phase 1 - Product Analytics and Quality

Goal: learn what users do and where the experience breaks.

Scope:
- Replace current waitlist-funnel analytics with product-funnel events.
- Track:
  - landing view
  - analysis started
  - analysis succeeded
  - analysis failed
  - input mode selected
  - context selected
  - decode another clicked
  - waitlist CTA viewed and submitted
  - share link copied
- Add structured server logging for Gemini failures, invalid screenshots, and rate limits.
- Add prompt and version tracking in code so analysis quality changes can be compared over time.
- Add lightweight safety handling for abusive or dangerous conversation content.

Why this phase matters:
- It helps us see whether users understand the product quickly.
- It helps us improve prompt quality and reduce failed analyses.

## Phase 2 - Durable Usage Limits

Goal: move beyond fragile in-memory rate limiting.

Scope:
- Store anonymous usage counters in Convex.
- Key usage by install or session fingerprint or IP hash.
- Track remaining free analyses.
- Replace in-memory limiter with durable usage checks.
- Keep the product no-login by default.

Possible Convex tables to use or add:
- extend `creditGrants`
- add anonymous install or session tracking
- add server-side usage events if needed

Why this phase matters:
- Vercel in-memory limits are best-effort only.
- Durable limits make abuse prevention more reliable.

## Phase 3 - Anonymous Conversation Persistence

Goal: let users return to recent analyses without requiring accounts.

Scope:
- Save conversations and analyses anonymously in Convex.
- Use install-based identity first, not full auth.
- Start using the existing dev table concepts:
  - `conversations`
  - `conversationInputs`
  - `analyses`
  - `suggestedResponses`
- Add a lightweight recent conversations section.
- Allow open again and copy rewrite actions.

Important note:
- Before this phase, reconcile local Convex schema with the dev deployment schema.

Why this phase matters:
- Repeat usage is the core retention loop.
- Returning to prior analyses increases usefulness without adding sign-up friction.

## Phase 4 - Credits and Monetization Prep

Goal: prepare for limited free use and future paid access.

Scope:
- Introduce anonymous free credits.
- Use Convex-backed credit tracking.
- Show soft usage messaging in-product.
- Preserve zero-friction first-time use.
- Do not add paywalls until usage patterns justify them.

Possible backend pieces:
- `creditGrants`
- `subscriptions` later, once auth and payments exist

Why this phase matters:
- It creates a bridge from free MVP to sustainable product economics.

## Phase 5 - Account System and Cross-Device Access

Goal: let users keep history across devices.

Scope:
- Add auth only after anonymous retention proves demand.
- Link prior anonymous analyses to a newly created user.
- Enable history sync, saved rewrites, and subscription state.
- Start using `users`, `authAccounts`, and `subscriptions` deliberately.

Why this phase matters:
- Accounts are only useful once users already value the product enough to want persistence.

## Phase 6 - Mobile App Handoff

Goal: turn the web MVP into the acquisition and retention gateway for the native app.

Scope:
- Add clear get-the-app upgrade paths after successful analyses.
- Port winning prompts, result structures, and credit logic into the mobile product.
- Use web learnings to define onboarding, limits, and premium conversion timing.

Why this phase matters:
- The web MVP should teach us what the mobile app actually needs to be.
