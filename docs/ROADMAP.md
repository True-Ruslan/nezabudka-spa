# Roadmap

## v0.1 — Production foundation

- [x] Astro static architecture и responsive UI
- [x] Основные смысловые секции
- [x] SEO / structured data / accessibility baseline
- [x] Playwright desktop/mobile checks
- [x] GitHub Pages CI/CD и подготовка custom domain

## v0.1.1 — Production hardening

- [x] committed `package-lock.json` и `npm ci`
- [x] static `/cases/<id>/` для `publish: true`
- [x] непубличный `case-template.md`
- [x] custom 404
- [x] keyboard-safe mobile menu
- [x] static-output verifier + negative regression tests
- [x] Project Pages/custom-domain build checks
- [x] post-deploy home + real-404 smoke
- [x] content publication guide

## v0.1.2 — Nepomka identity

- [x] публичный бренд Nepomka
- [x] полное имя `Непомнящий Данил Александрович`
- [x] утверждённые wordmark / compact mark / hero visual
- [x] Open Graph и manifest под новую идентичность
- [x] Git blob hash-gate production assets

## Commercial foundation — 2026-09-07

- [x] production domain `nepomka.ru`
- [x] подтверждённые телефон, Telegram и Instagram; MAX отмечен у номера без неподтверждённой профильной ссылки
- [x] Белгород + онлайн/очный формат
- [x] шесть коммерческих предложений и стартовые цены
- [x] процесс работы и FAQ
- [x] скрытие пустой секции кейсов
- [ ] первые документированные реальные кейсы
- [ ] реальные отзывы/рабочие фотографии при наличии разрешения

## v0.2 — Service pages & SEO foundation

- [x] общий homepage title `Nepomka — автомобильный специалист в Белгороде`
- [x] `/avtopodbor/`
- [x] `/proverka-avto/`
- [x] `/bronirovanie-plenkoy/`
- [x] `/tonirovka/`
- [x] единый factual source для цены/режима через `offers`
- [x] page-specific typed SEO/content config
- [x] reusable `ServiceDetail.astro`
- [x] unique metadata/canonical и Service JSON-LD
- [x] base-safe homepage detail links без потери contact CTA
- [x] Playwright desktop/mobile coverage новых routes
- [x] static verifier для обязательных service outputs/canonical
- [x] Project Pages/custom-domain/sitemap CI assertions
- [x] representative production `/avtopodbor/` smoke
- [x] project marker `0.2.0`

## Conversion flow — 2026-09-09

- [x] компактный client-side lead brief без backend и persistent storage
- [x] единый список шести услуг из `src/data/site.ts`, без дублирования offer-данных
- [x] service-page preselection текущего offer через typed `initialOfferId`
- [x] hero CTA четырёх service pages ведёт прямо в раскрываемый `#lead-brief`
- [x] формирование factual message: услуга, автомобиль, optional год/пробег, вопрос
- [x] Clipboard API + видимый fallback, если автоматическое копирование недоступно
- [x] Telegram остаётся прямым destination, без client-side bot token или скрытого backend
- [x] explicit labels, native validation, live status, Escape/focus behavior
- [x] desktop/mobile functional tests, overflow regression и visual artifacts раскрытого брифа
- [x] production smoke для homepage lead brief и preselected `/avtopodbor/` flow

## Automated quality gates — 2026-09-09

- [x] deterministic external-link checker с regression-тестами на dedup/403/404 behavior
- [x] live external-link audit для generated custom-domain build
- [x] axe-core WCAG A/AA gate для desktop всех публичных routes и representative mobile scenarios
- [x] Lighthouse CI для главной и `/avtopodbor/`, 3 runs + `median-run`
- [x] category budgets: performance `>= 0.85`, accessibility/best-practices/SEO `>= 0.95`
- [x] metric budgets: LCP `<= 3000 ms`, CLS `<= 0.1`, TBT `<= 300 ms`
- [x] short-retention Lighthouse HTML/JSON GitHub Actions artifacts без внешнего LHCI public upload
- [x] quality-gate RED → GREEN regression contracts

## Repository hygiene

- [x] CI только PR/main push + manual diagnostic run
- [x] concurrency для superseded CI
- [x] production deploy без manual bypass
- [x] короткий retention visual/report artifacts
- [x] Dependabot для npm и GitHub Actions
- [x] удалены unused legacy assets
- [x] active ruleset для `main`: PR, `quality`, CodeQL, linear history, no delete/force-push
- [x] automatic deletion of merged head branches
- [x] удалены исторические stale branches
- [x] squash-only merge policy
- [x] auto-merge и update branch
- [x] repository description/homepage/topics
- [x] Wiki/Projects выключены

## Measurement / SEO — next

- [x] environment-aware robots sitemap discovery
- [x] service breadcrumbs + BreadcrumbList structured data
- [x] internal related-service navigation for four key service pages
- [ ] privacy-friendly analytics при появлении измерительной задачи
- [ ] Google Search Console
- [ ] Яндекс Вебмастер
- [ ] проверить индексирование sitemap, canonical и четырёх service pages
- [ ] после появления реального экспертного материала оценить публикации/новые страницы по фактическому спросу

## Не делать без данных и разрешения

- не публиковать вымышленные отзывы и кейсы;
- не придумывать количество клиентов/автомобилей;
- не использовать неподтверждённые контакты, сертификаты и гарантии;
- не использовать generated visual как доказательство реального кейса/события;
- не заменять утверждённые brand assets без отдельного согласования.
