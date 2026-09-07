# Changelog

## Unreleased

## 0.2.0 — 2026-09-07

### Added

- production domain `https://nepomka.ru/`;
- подтверждённые телефон, VK и Instagram;
- шесть коммерческих предложений, стартовые цены, процесс работы и FAQ;
- четыре статические service pages: `/avtopodbor/`, `/proverka-avto/`, `/bronirovanie-plenkoy/`, `/tonirovka/`;
- typed `src/data/service-pages.ts` и reusable `ServiceDetail.astro`;
- уникальные service title/description/canonical и Service JSON-LD;
- secondary homepage links на четыре detail pages без удаления прямого contact CTA;
- отдельный Open Graph cover;
- `.github/dependabot.yml` для npm dependencies и GitHub Actions;
- active `Main branch protection` ruleset с required `quality`, CodeQL policy и linear history.

### Changed

- homepage title расширен до `Nepomka — автомобильный специалист в Белгороде` вместо узкого автоподбор-позиционирования;
- landing переработан в коммерческий сценарий обращения, при этом все шесть offer-карточек сохранены;
- empty cases section скрывается до появления реального `publish: true` материала;
- Astro обновлён до 7.3.1, `@astrojs/sitemap` до 3.7.4, `@astrojs/check` до 0.9.10;
- project marker синхронизирован до `0.2.0` в `package.json` и `package-lock.json`;
- VK/Instagram открываются с `target="_blank" rel="noopener noreferrer"`;
- CI автоматически работает для PR/main и отменяет superseded runs;
- checkout в CI/deploy не сохраняет write credentials;
- GitHub Pages deploy запускается только после successful main CI;
- static verifier теперь требует четыре service outputs и проверяет их canonical;
- Project Pages и custom-domain CI проверяют service routes и sitemap;
- deployment smoke дополнительно проверяет `/avtopodbor/`;
- repository merge policy нормализован до squash-only, включены auto-merge, update branch и automatic branch deletion;
- repository description/homepage/topics заполнены, Wiki/Projects выключены.

### Security / integrity

- lockfile использует текущий security baseline dependency tree;
- verifier сравнивает canonical как строку и имеет negative canonical-drift test;
- CodeQL ruleset блокирует high-or-higher security findings;
- утверждённые `danil-hero.webp` и `nepomka-logo.webp` защищены Git blob hash-gate;
- никакие вымышленные отзывы, кейсы, метрики, сертификаты или гарантии в v0.2 не добавлены;
- цены «от» не публикуются как ложная фиксированная `price` в Service structured data.

### Removed

- unused legacy `public/brand-mark.svg`;
- unused legacy `public/favicon.svg`;
- исторические merged/temp branches после проверки refs.

## 0.1.1 — 2026-09-06

### Added

- статические detail routes `/cases/<id>/` для `publish: true`;
- base-path-safe custom 404;
- Escape/focus handling мобильного меню;
- `scripts/verify-static-build.mjs` и negative broken-reference test;
- post-deploy HTTP smoke главной и реального 404;
- `docs/CONTENT_GUIDE.md`.

### Changed

- committed `package-lock.json`;
- CI/deploy переведены на `npm ci`;
- generated Pages artifact и custom-domain build проходят verifier.

### Safety / integrity

- `case-template.md` остаётся `publish: false`;
- production state подтверждается только main CI + Pages smoke.

## 0.1.0 — 2026-09-06

### Added

- первая версия сайта;
- Astro + TypeScript static architecture;
- responsive design;
- SEO, Open Graph, JSON-LD, sitemap, robots.txt и manifest;
- content collection для будущих проверенных кейсов;
- CI и GitHub Pages deploy pipeline.

### Safety / integrity

- исключены вымышленные отзывы, кейсы, цифры и контактные данные.
