# Atlis AI marketing site — Phase 0 plan

## Scope

This checkpoint intentionally stops before production marketing pages. It delivers a reviewable design board containing three static Home hero directions and one supporting content-section mockup for each direction at desktop (1366 px) and mobile (390 px) proportions. The user will choose one direction before production pages, form handling, database work, content expansion, SEO hardening, or deployment configuration are implemented.

## Implementation approach

- Reuse the initialized React/Vite Webdev starter and keep the preview self-contained.
- Render a single design-review board at `/` and `/design-directions` with accessible semantic HTML.
- Use CSS variables matching the requested Atlis palette and CSS-only product surfaces rather than stock imagery or invented screenshots.
- Use Lucide icons for the review board's small interface symbols.
- Label every rendered product example as `Sample data` and every review note as a design decision, not as a product fact.
- Register all factual statements visible in the mockups in `content/claims-register.json`; do not render `[CONFIRM: ...]` placeholders.
- Add `public/manus-routes.json` before starting the preview server.

## Phase 0 directions

1. **Product-first** — the product frame is the hero; strongest immediate proof of what the desk looks like. Trade-off: visually denser and less editorial.
2. **Editorial and clinical calm** — typography, source-linked facts, and a quiet data rhythm lead; strongest for credibility and compliance review. Trade-off: the product feels one step further away.
3. **Claim journey** — a sample claim is the narrative spine; strongest for explaining the before/after journey. Trade-off: requires slightly more reading to understand the product category.

No direction is selected for production yet. The design board is the intentional Phase 0 artifact because the brief asks the owner to choose.

## Design system for the mockups

- Light-only, calm enterprise interface using canvas `#F5F5F7`, surface `#FFFFFF`, text `#1D1D1F`, secondary `#6E6E73`, border `#E5E5EA`, primary `#0071E3`, and paired severity colors.
- Inter/system sans fallback, tight headings, tabular figures, 8 px rhythm, 12 px cards, 8 px controls, soft layered shadows.
- 12-column desktop composition represented inside a 1200 px content frame; mobile collapses to a single column.
- No gradients, blobs, stock photography, testimonials, customer logos, or unsupported owner facts.
- Motion is not required for Phase 0; if a subtle hover state is used, it respects reduced-motion preferences.

## Proposed full-site architecture after direction approval

- `client/src/pages/` — route-level pages.
- `client/src/components/` — shared header, footer, product-frame, claim journey, forms, disclosure and source-link components.
- `content/` — `claims-register.json`, `faq.json`, and sourced MDX resources.
- `server/` + `drizzle/` — pilot-request route, validation, leads table and notification wiring after approved owner inputs are available.
- `public/` — route manifest, sitemap/robots and approved assets.
- `tests/` — schema, claims-register, API, Playwright, accessibility and link checks.

## Open inputs intentionally not rendered

Legal entity/address, insurer pilot status, capability statuses, hosting region, encryption facts, subprocessors, data-processing/breach/grievance contacts, pilot terms/duration, sender domain, logo files, approved screenshots, and response-time promise remain omitted until supplied.
