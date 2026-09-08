# Project State

Обновлено: 2026-09-08

## Статус

Nepomka — статический коммерческий сайт автомобильного специалиста **Непомнящего Данила Александровича**. Production URL: `https://nepomka.ru/`. Project/release marker в текущем source tree — `0.2.0`.

Источником истины для production остаётся `main`. GitHub Pages deployment запускается только после успешного CI соответствующей main-ревизии.

## v0.2 product / SEO

Главная позиционирует Nepomka как общий сайт автомобильного специалиста и использует title:

`Nepomka — автомобильный специалист в Белгороде`

На главной сохраняются все шесть предложений. Для четырёх ключевых направлений существуют явные статические routes:

- `/avtopodbor/`;
- `/proverka-avto/`;
- `/bronirovanie-plenkoy/`;
- `/tonirovka/`.

Карточки этих услуг сохраняют прямой contact CTA и дополнительно ведут на detail page. Разбор сметы и сравнение запчастей остаются на главной без искусственно тонких страниц.

Page-specific SEO/content хранится в `src/data/service-pages.ts`; цены, режимы и краткие offer-условия остаются единственным источником истины в `src/data/site.ts`.

## Контакты и фактические данные

В `src/data/site.ts` подтверждены и опубликованы:

- телефон;
- Telegram (`https://t.me/+79045328772`);
- Instagram.

Рядом с телефоном используется официальный знак MAX как некликабельный индикатор доступности номера в MAX. Неподтверждённая персональная MAX-ссылка не публикуется. Email остаётся `null`.

Вымышленные кейсы, отзывы, сертификаты, гарантии результата и метрики не публикуются.

## Accessibility / SEO

- semantic landmarks, skip link, visible focus и reduced motion;
- уникальные title/description/canonical для четырёх service pages;
- Person/Offer JSON-LD на главной;
- отдельный Service JSON-LD на detail pages без ложной фиксированной цены для услуг «от»;
- Open Graph, Twitter Card, sitemap, robots.txt и web manifest;
- mobile horizontal-overflow regression checks;
- base-path safety для Project Pages fallback и root custom domain.

## Build / CI / deploy

- Node.js 24;
- committed `package-lock.json`, установки через `npm ci`;
- Astro check + static production build;
- hash-gate утверждённых `danil-hero.webp` и `nepomka-logo.webp`;
- `scripts/verify-static-build.mjs` проверяет generated HTML, локальные references, обязательные service outputs и canonical;
- negative tests доказывают отказ verifier-а на broken reference и canonical drift;
- Playwright desktop/mobile suite;
- ephemeral `publish: true` case-route smoke;
- отдельные Project Pages и custom-domain assertions, включая sitemap/service canonical;
- CI запускается для PR в `main`, push в `main` и вручную; superseded runs отменяются через `concurrency`;
- deploy запускается только по successful `workflow_run` CI для `main`;
- production smoke проверяет главную, `/avtopodbor/` и реальный custom 404.

## Repository governance — фактическое состояние

Активен ruleset **Main branch protection** для default branch:

- branch deletion запрещён;
- non-fast-forward / force-push запрещён;
- required linear history;
- merge только через pull request, required approvals: 0 для solo-repository;
- required status check: `quality`, strict up-to-date policy выключена;
- CodeQL: блокирующий policy для `high_or_higher`, alerts threshold `errors`;
- bypass actors отсутствуют.

Repository settings:

- squash merge — включён;
- merge commits и rebase merge — выключены;
- auto-merge — включён;
- update branch — включён;
- automatic deletion of merged head branches — включено;
- description: `Nepomka — сайт автомобильного специалиста Данила Непомнящего`;
- homepage: `https://nepomka.ru`;
- topics заполнены;
- Wiki и Projects выключены.

Перед v0.2 в repository остались только `main` и текущая feature-ветка; исторические stale branches удалены.

## Следующие содержательные задачи

- опубликовать первые реальные документированные кейсы;
- при наличии разрешения добавить реальные отзывы/рабочие фотографии;
- подключить privacy-friendly analytics только при появлении измерительной задачи;
- проверить Google Search Console и Яндекс Вебмастер;
- после release проверить индексирование sitemap/canonical/service pages.

Финальный production status всегда сверяется по актуальному `main`, GitHub Actions и опубликованному сайту, а не только по этому документу.
