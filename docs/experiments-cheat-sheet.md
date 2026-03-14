# Experiments Cheat Sheet

This is the simple version.

Use this file when you want to know:
- what is being tested
- where to change it
- how to pause it
- what to look at in Clarity

## Where to edit experiments

All experiment settings live in `lib/experiments.ts`.

Each experiment has:
- `id`: the name of the test
- `variants`: the versions being tested
- `enabled`: turns the test on or off
- `trafficPercent`: how much visitor traffic enters the test

Example:

```ts
export const heroPrimaryCopyExperiment = {
  id: "hero_primary_cta_copy_v1",
  variants: ["try_the_30_sec_preview", "see_your_next_move"] as const,
  enabled: true,
  trafficPercent: 100,
}
```

## Important rule

The first item in `variants` is the control version.

That means:
- if a test is paused, everyone sees the first variant
- if someone is not included because of `trafficPercent`, they also see the first variant

## Current live experiments

### 1. Hero button copy

File using it:
- `components/landing/hero.tsx`

Config:
- `heroPrimaryCopyExperiment`

Variants:
- `try_the_30_sec_preview` = button says `Try the 30-sec preview`
- `see_your_next_move` = button says `See your next move`

Question this test answers:
- Which headline-style CTA gets more clicks and more waitlist joins?

Best Clarity things to check:
- `experiment_viewed`
- `hero_cta_clicked`
- `waitlist_submit_success`

### 2. Hero button destination

File using it:
- `components/landing/hero.tsx`

Config:
- `heroPrimaryDestinationExperiment`

Variants:
- `preview` = hero CTA sends people to the preview section
- `waitlist_direct` = hero CTA sends people straight to the direct waitlist section

Question this test answers:
- Do people convert better after seeing the preview, or when friction is lower and they can join immediately?

Best Clarity things to check:
- `hero_cta_clicked`
- `preview_started`
- `waitlist_form_viewed`
- `waitlist_submit_success`

### 3. Navbar CTA copy

File using it:
- `components/landing/navbar.tsx`

Config:
- `navbarPreviewCtaExperiment`

Variants:
- `try_preview` = button says `Try Preview`
- `see_preview` = button says `See Preview`

Question this test answers:
- Which small sticky-nav CTA gets more engagement?

Best Clarity things to check:
- `experiment_viewed`
- `nav_try_preview_clicked`
- `preview_started`

### 4. Waitlist button copy

File using it:
- `components/landing/waitlist-form.tsx`

Config:
- `waitlistSubmitExperiment`

Variants:
- `join_waitlist` = button says `Join waitlist`
- `get_early_access` = button says `Get early access`

Question this test answers:
- Which waitlist button wording gets more completed signups?

Best Clarity things to check:
- `waitlist_submit_started`
- `waitlist_submit_success`
- `waitlist_submit_failed`

## How to pause a test

In `lib/experiments.ts`, change:

```ts
enabled: true
```

to:

```ts
enabled: false
```

What happens:
- everyone sees the control version
- the experiment is effectively off

## How to roll out slowly

Change `trafficPercent`.

Examples:
- `trafficPercent: 10` = about 10% of visitors enter the test
- `trafficPercent: 50` = about half of visitors enter the test
- `trafficPercent: 100` = everyone enters the test

Safe rollout plan:

1. Start at `10`
2. Watch recordings and conversions for 1-2 days
3. Move to `25`
4. Move to `50`
5. Move to `100` if the test looks healthy

## What "healthy" means

Before increasing traffic, check that the variant does not cause:
- obvious confusion in recordings
- lower CTA clicks
- lower waitlist submits
- more `waitlist_submit_failed` events

## Which numbers matter most

If you are just getting started, focus on these:

1. `landing_view`
2. `hero_cta_clicked`
3. `preview_started`
4. `preview_completed`
5. `waitlist_submit_started`
6. `waitlist_submit_success`

That gives you a simple funnel:

`visit -> click -> preview -> submit -> success`

## Easiest first workflow each week

1. Filter Clarity to `utm_source=tiktok`
2. Look at which experiment variants got the most `hero_cta_clicked`
3. Look at which variants got the most `waitlist_submit_success`
4. Open 5-10 recordings from winners and losers
5. Keep the better variant and test the next thing

## If you want to keep things simple

Only run one major test at a time.

Recommended order:

1. Hero button copy
2. Hero destination
3. Waitlist button copy
4. Navbar copy

That makes results easier to understand.
