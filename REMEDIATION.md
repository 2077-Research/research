# 2077 Research remediation checklist

This checklist tracks the 2026-10-31 launch, security, privacy, accessibility,
SEO, and maintainability audit. Each completed item should be delivered as a
small commit with its own verification.

## P0 — production and compliance risk

- [x] Require consent before loading non-essential analytics and provide persistent cookie settings.
- [ ] Update the privacy notice to match the site's actual data processing and vendors.
- [ ] Disable the dormant public article-review workflow until abuse controls and disclosures exist.
- [ ] Triage and remediate production dependency vulnerabilities, prioritizing reachable critical/high issues.
- [ ] Preserve HTTP 404 responses for missing articles instead of converting them to HTTP 500.

## P1 — broken or unsafe functionality

- [ ] Remove or disable dormant sign-in, sign-up, bookmarks, and Ethereum Navigator routes.
- [ ] Harden or retire legacy Algolia/Ghost webhook endpoints and remove sensitive/excessive logging.
- [ ] Replace unverified proprietary/trial fonts with licensed open-source assets.
- [ ] Restore `pnpm check`, formatting, and ESLint to a clean baseline.
- [ ] Add meaningful unit and browser smoke tests for critical public routes and article rendering.
- [ ] Add CI and automated dependency-update configuration.

## P2 — security, accessibility, and discoverability

- [ ] Add missing security headers and tighten the Content Security Policy.
- [ ] Escape bot-rendered HTML and safely serialize structured data.
- [ ] Correct canonical, Open Graph, Twitter, and per-route metadata.
- [ ] Correct and complete the XML sitemap without logging article contents.
- [ ] Fix known accessible-name, keyboard, and ARIA issues; add automated accessibility checks.
- [ ] Publish `security.txt` and document the vulnerability-reporting contact.
- [ ] Remove duplicate/dead frontend assets and address build warnings.

## P3 — governance and owner input

- [ ] Add Terms of Use, a research/non-financial-advice disclaimer, and content reuse terms.
- [ ] Add the operator's legal name, address, applicable jurisdictions, and regulator details to legal notices.
- [ ] Verify content, logo, image, and font ownership; add an appropriate repository license or rights notice.
- [ ] Document production operations, monitoring, backups, restoration, and secret rotation.

## Verification baseline

For every change, run the narrowest relevant checks plus the following before
release:

```sh
pnpm check
pnpm lint
pnpm test:unit -- --run
pnpm build
```

The full browser suite should also run once Playwright smoke tests are present.
