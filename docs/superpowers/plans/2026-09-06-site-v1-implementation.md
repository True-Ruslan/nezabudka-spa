# Nezabudka Site v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a production-ready personal automotive website for Danil Nepomnyashchiy on GitHub Pages, with a future custom-domain switch that requires no redesign or routing rewrite.

**Architecture:** Astro 6 static site with TypeScript and custom CSS. Content is stored as typed data and Markdown/MDX-ready case content; UI remains mostly server-rendered HTML with only lightweight client JavaScript for navigation and reveal behavior. GitHub Actions owns CI, browser QA, Pages build/deploy, and screenshot artifacts.

**Tech Stack:** Astro 6.3.x, TypeScript 5.x, custom CSS, Playwright, Node.js 24, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-06-nezabudka-personal-site-design.md`

## Global Constraints

- Do not invent client cases, testimonials, credentials, employer claims, vehicle counts, revenue, certifications, or contact details.
- Position Danil as a broad automotive specialist, not as a mechanic, detailing shop, or QWEP landing page.
- Visual direction: Precision Editorial — warm light surfaces, graphite sections, forget-me-not blue accent, editorial typography, restrained technical labeling.
- No fake HUDs, tachometers, carbon-fiber backgrounds, neon tuning aesthetics, speed lines, or decorative supercar imagery.
- First release must work at `https://true-ruslan.github.io/nezabudka-spa/`.
- Future custom domain must be supported via `CUSTOM_DOMAIN` without changing page/component code.
- Respect `prefers-reduced-motion`, keyboard navigation, semantic headings, visible focus styles, and WCAG AA contrast.
- No dependency-heavy animation or component library unless a concrete implementation need appears.
- Build output must be static and deployable by GitHub Pages.

---

## File map

### Project/config
- `package.json` — scripts and pinned dependency floors.
- `astro.config.mjs` — static output, GitHub Pages base path, optional custom domain, sitemap.
- `tsconfig.json` — strict Astro TypeScript setup.
- `.prettierrc.json` — formatting baseline.

### Content/data
- `src/data/site.ts` — typed brand, navigation, expertise, experience, principles, help paths, and contact configuration.
- `src/content.config.ts` — Astro content collection schema for future cases.
- `src/content/cases/README.md` — editorial rules for adding real cases without fabrication.

### Layout/components
- `src/layouts/BaseLayout.astro` — document shell, SEO/meta, skip link, global assets.
- `src/components/Header.astro`
- `src/components/Hero.astro`
- `src/components/Expertise.astro`
- `src/components/Cases.astro`
- `src/components/Experience.astro`
- `src/components/HelpPaths.astro`
- `src/components/Principles.astro`
- `src/components/About.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`
- `src/components/TechnicalVisual.astro` — honest non-photographic fallback until Danil supplies personal photography.
- `src/pages/index.astro` — section composition only.

### Styling/client behavior
- `src/styles/tokens.css` — palette, type, spacing, radii, borders, motion.
- `src/styles/global.css` — reset, layout, responsive rules, focus/reduced-motion behavior.
- `src/scripts/site.ts` — mobile navigation, current-year, progressive reveal; no framework runtime.

### Static assets
- `public/favicon.svg`
- `public/brand-mark.svg`
- `public/robots.txt`
- `public/site.webmanifest`
- `public/og-image.svg` — deterministic branded social preview until a real photo-based OG image is provided.

### Quality/deployment
- `playwright.config.ts`
- `tests/site.spec.ts` — structural, accessibility-oriented, navigation, responsive and custom-domain-safe smoke coverage.
- `.github/workflows/ci.yml` — install, Astro check, build, browser tests, screenshot artifact.
- `.github/workflows/deploy.yml` — GitHub Pages deploy on `main` and manual dispatch.
- `docs/CUSTOM_DOMAIN.md` — DNS and repository-variable switch procedure.
- `docs/PROJECT_STATE.md` — current production state and known content gaps.
- `docs/ROADMAP.md` — photo/case/contact enhancements after v1.
- `CHANGELOG.md` — release history.

---

### Task 1: Establish a failing executable contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `playwright.config.ts`
- Create: `tests/site.spec.ts`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces scripts: `npm run check`, `npm run build`, `npm run test:e2e`.
- Tests expect `/nezabudka-spa/` to render a page containing the approved hero copy and all required section anchors.

- [ ] Write Playwright tests before the page exists. Tests must require: H1 `Автомобили без догадок.`, nav anchors, expertise headings, owner/business help paths, principles, honest contact fallback, no horizontal mobile overflow, and no generic fake metrics such as `100+ автомобилей`.
- [ ] Add CI that installs dependencies, installs Chromium, runs `check`, `build`, then Playwright against `astro preview`.
- [ ] Push the contract-only commit and verify CI fails because production page/config files do not yet exist. The failure must be attributable to missing implementation rather than malformed YAML or dependency resolution.

### Task 2: Implement build configuration and typed content

**Files:**
- Create: `astro.config.mjs`
- Create: `.prettierrc.json`
- Create: `src/data/site.ts`
- Create: `src/content.config.ts`
- Create: `src/content/cases/README.md`

**Interfaces:**
- `site.ts` exports typed immutable data consumed by all sections.
- `astro.config.mjs` derives `site` and `base` from `CUSTOM_DOMAIN`: default `site=https://true-ruslan.github.io`, `base=/nezabudka-spa`; custom domain `site=https://<domain>`, no base.
- Future cases must satisfy a schema with title, vehicle/context, summary, problem, investigation, decision, rationale, result, optional images, and publish flag.

- [ ] Implement only factual copy supplied or approved in the design spec.
- [ ] Keep contact values nullable. UI must not fabricate Telegram handles, phone numbers, or email addresses.
- [ ] Make future case ingestion fail validation when required proof fields are missing.

### Task 3: Build the page from the approved Precision Editorial concept

**Files:**
- Create all layout/component/style/script files listed in the File map.
- Create `src/pages/index.astro`.

**Interfaces:**
- Every major section has a stable ID: `expertise`, `cases`, `experience`, `help`, `principles`, `about`, `contact`.
- Header links use base-safe fragment URLs.
- Contact component receives nullable contact configuration and renders an honest fallback state when all direct channels are absent.

- [ ] Implement the first viewport with the approved headline, restrained support copy, two CTAs, and a technical visual fallback rather than an AI portrait or stock supercar.
- [ ] Implement expertise as four open editorial columns, not a generic rounded-card grid.
- [ ] Implement the cases section as an explicit empty/proof state: explain that only documented real cases will be published; do not manufacture examples.
- [ ] Implement professional trajectory, two help paths, principles, short about copy, contact, and footer.
- [ ] Add responsive behavior at desktop/tablet/mobile widths without horizontal overflow.
- [ ] Add subtle motion only for progressive reveal and navigation; disable it through `prefers-reduced-motion`.

### Task 4: Add SEO, brand assets, and domain-safe metadata

**Files:**
- Create static assets listed above.
- Update `BaseLayout.astro` and `astro.config.mjs` as needed.

**Interfaces:**
- Canonical URL is based on `Astro.site` and current path.
- `Person` JSON-LD describes Danil only with verified fields: name and broad role description; no fabricated employer/phone/social profiles.
- Manifest/start URL and internal assets work with the repository base path.

- [ ] Add title, description, canonical, OpenGraph/Twitter metadata, theme color, favicon, manifest and JSON-LD.
- [ ] Add `robots.txt` and sitemap support.
- [ ] Ensure project Pages and custom-domain mode produce valid absolute canonical URLs.

### Task 5: Complete test coverage and browser QA

**Files:**
- Modify `tests/site.spec.ts`
- Modify `playwright.config.ts`
- Modify `.github/workflows/ci.yml`

**Interfaces:**
- CI uploads `playwright-report` and a `site-screenshots` artifact with desktop and mobile screenshots.

- [ ] Run the same contract that failed in Task 1 and make it pass without weakening assertions.
- [ ] Verify keyboard-accessible mobile navigation, visible focus, working fragment links and mobile viewport width.
- [ ] Add screenshot capture at 1440×1100 and 390×844.
- [ ] Run `npm run check`, `npm run build`, `npm run test:e2e` in CI with zero failures.

### Task 6: GitHub Pages and custom domain delivery

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `docs/CUSTOM_DOMAIN.md`

**Interfaces:**
- Deploy uses current official Astro/GitHub Pages action generations documented for 2026: `actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`.
- `CUSTOM_DOMAIN` repository variable is passed to Astro. When set, the workflow creates `dist/CNAME` containing only the domain.

- [ ] Deploy on pushes to `main` plus manual dispatch.
- [ ] Grant only `contents: read`, `pages: write`, `id-token: write` as needed.
- [ ] Document DNS setup and the exact variable switch, including how to roll back to project Pages.
- [ ] After merge, verify the Pages deployment workflow completes and the published URL returns the expected hero copy.

### Task 7: Project documentation and release state

**Files:**
- Replace: `README.md`
- Create: `docs/PROJECT_STATE.md`
- Create: `docs/ROADMAP.md`
- Create: `CHANGELOG.md`

- [ ] Document local development, commands, content-editing locations, deployment, custom-domain behavior and the deliberate photography/contact limitations.
- [ ] Record v1 as production-capable but content-conservative: no fake cases, no fake contacts, technical visual used until real photography is supplied.
- [ ] Roadmap only real next improvements: Danil photo session, verified contacts, documented cases, optional analytics.

### Task 8: Final verification and integration

- [ ] Re-read the design spec and this plan; verify every requirement has a corresponding implementation or documented intentional deviation.
- [ ] Inspect desktop/mobile CI screenshots against `docs/design/precision-editorial-concept.png` and the approved design principles. Record at least five fidelity checks.
- [ ] Confirm above-the-fold copy contains no invented claims or metrics.
- [ ] Verify the full CI run and build are green on the feature branch.
- [ ] Create a PR, inspect diff and checks, merge only after green.
- [ ] Verify the post-merge deploy run and public Pages URL.
- [ ] Update `PROJECT_STATE.md` if deployment reveals any repository-level limitation that code cannot solve.
