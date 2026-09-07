# Nepomka

Статический коммерческий сайт автомобильного специалиста **Непомнящего Данила Александровича**.

Текущий release marker: **0.2.0**. Production: `https://nepomka.ru/`.

## Публичная структура

Главная страница остаётся обзорной: шесть коммерческих предложений, процесс работы, FAQ, About и Contact. Для четырёх ключевых услуг опубликованы отдельные статические страницы:

- `/avtopodbor/` — подбор автомобиля с пробегом;
- `/proverka-avto/` — проверка автомобиля перед покупкой;
- `/bronirovanie-plenkoy/` — защита кузова бронеплёнкой;
- `/tonirovka/` — тонировка автомобиля.

Разбор рекомендаций сервиса и сравнение запчастей остаются предложениями главной без отдельных thin SEO pages.

## Технологии и качество

- Astro 7 + TypeScript, полностью статическая сборка;
- адаптивный интерфейс без клиентского UI-фреймворка;
- SEO metadata, canonical, Open Graph, Twitter Card, sitemap, robots.txt и web manifest;
- Person/Offer JSON-LD на главной и отдельный Service JSON-LD на страницах услуг;
- типизированная content collection для проверенных автомобильных кейсов;
- `/cases/<id>/` создаётся только для `publish: true`;
- base-path-safe custom `404.html`;
- Playwright desktop/mobile regression tests;
- zero-dependency `scripts/verify-static-build.mjs` для generated output;
- проверки Project Pages fallback и root custom-domain build;
- CI/CD через GitHub Actions и GitHub Pages.

## Источники контента

`src/data/site.ts` — бренд, контакты, шесть offer-карточек, цены, режимы и основные общие тексты.

`src/data/service-pages.ts` — только page-specific SEO/content для четырёх detail pages. Цена, режим и краткое offer-описание там не дублируются.

`src/content/cases/` — реальные кейсы. Новый материал готовится с `publish: false`; `case-template.md` всегда остаётся непубличным.

Подробные правила: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

## Brand assets

Production assets находятся в `public/branding/`:

- `nepomka-logo.webp`;
- `nepomka-favicon.png`;
- `nepomka-apple-touch-icon.png`;
- `danil-hero.webp`;
- `og-cover.png`.

CI фиксирует Git blob SHA утверждённых `nepomka-logo.webp` и `danil-hero.webp`, чтобы случайная замена production asset ломала quality gate.

## Локальная проверка

Требуется Node.js 24+.

```bash
npm ci --no-audit --no-fund
npm run check
npm run build
npm run verify:build
npx playwright install chromium
npm run test:e2e
```

`verify:build` проверяет обязательные generated pages, локальные `href`/`src`, canonical главной и service pages, custom 404 и отсутствие публичного `case-template`.

## Production и delivery

GitHub Pages custom domain настроен на `nepomka.ru`. `.github/workflows/deploy.yml` не имеет manual production bypass: deployment стартует только после успешного `CI` в `main`, повторно строит и проверяет artifact, публикует его и выполняет HTTP smoke главной, `/avtopodbor/` и реального 404.

Build не hardcode-ит production base path: `actions/configure-pages` передаёт фактические `origin` и `base_path`, поэтому тот же код проверяется и для Project Pages fallback `/nezabudka-spa/`, и для root custom domain.

Инструкция: [`docs/CUSTOM_DOMAIN.md`](docs/CUSTOM_DOMAIN.md).

## Repository policy

`main` защищён active repository ruleset: PR обязателен, required status check — `quality`, включены linear history, запрет deletion/non-fast-forward и CodeQL policy для high-or-higher alerts. Repository merge policy — squash-only; auto-merge, update branch и automatic deletion of merged head branches включены.
