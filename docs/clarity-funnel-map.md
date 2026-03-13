# Clarity Funnel Map

Use this document to analyze how visitors move from TikTok to waitlist signup.

## Core funnel

Recommended funnel order:

1. `landing_view`
2. `experiment_viewed`
3. `hero_cta_clicked` or `nav_try_preview_clicked`
4. `preview_viewed` or `waitlist_form_viewed`
5. `preview_started`
6. `preview_step_completed`
7. `preview_completed`
8. `waitlist_form_viewed`
9. `waitlist_submit_started`
10. `waitlist_submit_success`

If a user drops between any two steps, open session recordings filtered by the earlier event.

## Event map

### Acquisition and page intent

`landing_view`
- Fires once per session on the homepage.
- Properties: `landing_path`, `landing_search`, `referrer_domain`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Use it to segment TikTok traffic vs other sources.

`landing_scroll_depth`
- Fires at `25`, `50`, `75`, `100` percent.
- Property: `percent`
- Use it to see whether users reach the preview and waitlist sections.

`exit_intent`
- Fires when desktop users move toward leaving the page.
- Property: `section`
- Use it to inspect last-second abandonment sessions.

### CTA interactions

`experiment_viewed`
- Fires once per session when a visitor is assigned to a live experiment variant.
- Properties: `experiment_id`, `experiment_variant`
- Use it to measure exposure before clicks or conversions.

`hero_cta_clicked`
- Fires on both hero buttons.
- Properties: `cta`, `cta_text`, `cta_surface`, `destination`, `copy_experiment_id`, `copy_experiment_variant`, `destination_experiment_id`, `destination_experiment_variant`
- Main filter for hero CTA performance tests.

`nav_try_preview_clicked`
- Fires when the navbar CTA button is used.
- Properties: `cta_text`, `cta_surface`, `location`, `experiment_id`, `experiment_variant`
- Compare sticky-nav CTA usage against hero CTA usage.

`nav_link_clicked`
- Fires for navbar section links.
- Properties: `label`, `cta_text`, `cta_surface`, `destination`

`footer_nav_link_clicked`
- Fires for footer section links.
- Properties: `label`, `cta_text`, `cta_surface`, `destination`

`privacy_clicked`
- Fires when privacy policy link is used.
- Properties: `location`, `cta_text`, `cta_surface`, `destination`

`terms_clicked`
- Fires when terms link is used.
- Properties: `location`, `cta_text`, `cta_surface`, `destination`

`social_link_clicked`
- Fires when Instagram link is used.
- Properties: `network`, `cta_text`, `cta_surface`, `location`, `experiment_id`, `experiment_variant`

### Preview funnel

`preview_viewed`
- Fires when the preview section becomes visible.
- Use it to measure how many users make it far enough down the page.

`preview_started`
- Fires on the first answer click.
- Use it to measure preview-start rate.

`preview_step_completed`
- Fires on each answered prompt.
- Properties: `step_id`, `step_index`, `selected_option`
- Use it to identify which question causes abandonment.

`preview_back_clicked`
- Fires when users go backward.
- Property: `step_index`
- Helpful for spotting confusion or weak option labeling.

`preview_completed`
- Fires after all three answers are completed.
- Properties: `context`, `feeling`, `goal`
- Use it to see which emotional/job-to-be-done combinations correlate with conversion.

`preview_restarted`
- Fires when users retake the preview.
- Use it to find people exploring multiple outcomes before joining.

### Waitlist funnel

`waitlist_form_viewed`
- Fires when the form is visible on screen.
- Properties: `has_preview_answers`, `form_id`, `form_surface`

`waitlist_submit_started`
- Fires on form submit.
- Properties: `has_preview_answers`, `form_id`, `form_surface`, `cta_text`, `cta_surface`, `experiment_id`, `experiment_variant`

`waitlist_submit_success`
- Fires on successful form completion.
- Properties: `has_preview_answers`, `form_id`, `form_surface`, `cta_text`, `cta_surface`, `experiment_id`, `experiment_variant`

`waitlist_submit_failed`
- Fires on failed submission.
- Properties: `has_preview_answers`, `form_id`, `form_surface`, `cta_text`, `cta_surface`, `experiment_id`, `experiment_variant`, `error_type`
- `error_type` values: `duplicate`, `validation`, `network`, `unknown`

## Suggested Clarity filters

### TikTok traffic quality

Filter sessions by:
- `Custom tag` `utm_source=tiktok`
- Event `landing_view`

Then compare:
- sessions with `preview_started`
- sessions with `preview_completed`
- sessions with `waitlist_submit_success`

### Hero CTA performance

Filter by:
- Event `hero_cta_clicked`
- `Custom tag` `copy_experiment_id=hero_primary_cta_copy_v1`

Break down by:
- `copy_experiment_variant`
- `cta_text`

### Hero CTA destination test

Filter by:
- Event `hero_cta_clicked`
- `Custom tag` `destination_experiment_id=hero_primary_cta_destination_v1`

Break down by:
- `destination_experiment_variant`
- `destination`

Compare:
- sessions with `preview_started`
- sessions with `waitlist_submit_started`
- sessions with `waitlist_submit_success`

### Sticky nav CTA performance

Filter by:
- Event `nav_try_preview_clicked`
- `Custom tag` `experiment_id=navbar_preview_cta_copy_v1`

Compare to:
- sessions that also have `preview_started`
- sessions that also have `waitlist_submit_success`

### Preview drop-off diagnosis

Filter by:
- Event `preview_step_completed`

Break down by:
- `step_id`
- `selected_option`

Look for sessions where users have:
- `preview_started` but not `preview_completed`
- repeated `preview_back_clicked`

### Waitlist friction diagnosis

Filter by:
- Event `waitlist_submit_failed`

Break down by:
- `error_type`
- `has_preview_answers`
- `form_surface`

Then open recordings to see whether the issue is:
- validation confusion
- duplicate email frustration
- technical failure

## A/B testing conventions

When adding a new experiment, keep these fields on the CTA event:

- `experiment_id`: stable test name, for example `hero_primary_cta_copy_v2`
- `experiment_variant`: exact treatment label, for example `get_my_grounded_reply`
- `cta_text`: visible button text
- `cta_surface`: where the CTA lives, for example `hero`, `navbar`, `waitlist_form`

Recommended first tests:

1. Hero primary CTA copy
2. Hero primary CTA destination
3. Navbar CTA copy
4. Waitlist button copy

## Live experiments

These experiments are now live and assigned per visitor with a persistent local variant:

1. `hero_primary_cta_copy_v1`
   - `try_the_30_sec_preview`
   - `see_your_next_move`
2. `hero_primary_cta_destination_v1`
   - `preview`
   - `waitlist_direct`
3. `navbar_preview_cta_copy_v1`
   - `try_preview`
   - `see_preview`
4. `waitlist_submit_cta_v1`
   - `join_waitlist`
   - `get_early_access`

All live experiment controls are defined in `lib/experiments.ts`.

- `enabled: true | false`
  - Set to `false` to pause the test and send everyone to the control variant.
- `trafficPercent: 0-100`
  - Set below `100` to ramp exposure gradually.
  - Example: `10` means only about 10% of visitors enter that experiment.
- Control variant
  - The first item in `variants` is treated as the control/fallback version.
  - If a test is paused, the control variant is what all visitors see.

Example rollout plan:

1. Start at `trafficPercent: 10`
2. Review Clarity for obvious UX issues
3. Increase to `25`
4. Increase to `50`
5. Increase to `100` once the variant looks safe

## Quick reads to run weekly

1. TikTok sessions with `landing_view` but no `preview_started`
2. Sessions with `preview_started` but no `preview_completed`
3. Sessions with `preview_completed` but no `waitlist_submit_started`
4. Sessions with `waitlist_submit_started` but no `waitlist_submit_success`
5. Conversion rate by `utm_campaign`
6. Conversion rate by `goal` from `preview_completed`
