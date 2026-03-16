# Product Metrics Guide

Use this to make product decisions from real behavior, not guesses.

## Core funnel events

These events are now instrumented in the product UI:

1. `product_view`
2. `input_mode_selected`
3. `context_selected`
4. `analysis_started`
5. `analysis_succeeded` or `analysis_failed`
6. `analysis_results_viewed`
7. `rewrite_copied`
8. `decode_another_clicked`
9. `share_link_copied`
10. `footer_waitlist_submit_started`
11. `footer_waitlist_submit_success` or `footer_waitlist_submit_failed`

## Most important weekly metrics

1. Analysis start rate
   - Formula: `analysis_started / product_view`
   - Tells you if users understand what to do quickly.

2. Analysis success rate
   - Formula: `analysis_succeeded / analysis_started`
   - Tells you if the product actually delivers value reliably.

3. Time to insight
   - Use `duration_ms` on `analysis_succeeded`.
   - Track median and p90 by input mode.

4. Input mode split
   - Compare `analysis_started` by `input_mode` (`text` vs `image`).
   - Helps prioritize prompt and UI improvements.

5. Context demand
   - Compare `analysis_started` by `context`.
   - Reveals top relationship scenarios to optimize for.

6. Repeat intent
   - Formula: `decode_another_clicked / analysis_results_viewed`
   - Strong signal of immediate product usefulness.

7. Rewrite usefulness
   - Formula: `rewrite_copied / analysis_results_viewed`
   - Indicates whether suggested language is practical.

8. Viral behavior
   - Formula: `share_link_copied / analysis_results_viewed`
   - Measures word-of-mouth potential.

9. Soft conversion rate
   - Formula: `footer_waitlist_submit_success / analysis_results_viewed`
   - Measures trust after value delivery.

## Suggested first dashboards

1. Funnel dashboard
   - `product_view -> analysis_started -> analysis_succeeded -> analysis_results_viewed`

2. Reliability dashboard
   - Success rate by `input_mode`
   - Failures by `error_message`

3. Value dashboard
   - `decode_another_clicked`
   - `rewrite_copied`
   - `share_link_copied`

4. Monetization-intent dashboard
   - Footer submit start, success, and failure rates

## Recommended decisions this enables

- If start rate is low, improve above-the-fold instructions and examples.
- If success rate is low for image mode, improve screenshot prompt guidance and validation.
- If time to insight is high, tune model choice or prompt length.
- If rewrite copy rate is high, prioritize stronger rewrite UX and variants.
- If decode-another rate is high, prioritize anonymous history in the next phase.
