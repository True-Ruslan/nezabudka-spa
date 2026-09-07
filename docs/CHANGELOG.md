# Changelog

## Unreleased — 2026-09-07

### Added

- production domain `https://nepomka.ru/`;
- подтверждённые телефон, VK и Instagram;
- коммерческие предложения для частных клиентов: разбор сметы, сравнение запчастей, проверка и подбор автомобиля, бронеплёнка и тонировка;
- стартовые цены, ограничения формата услуг, процесс работы и FAQ;
- отдельный Open Graph cover;
- `.github/dependabot.yml` для еженедельных обновлений npm dependencies и GitHub Actions.

### Changed

- главная страница переработана из имиджевого портфолио в коммерческий landing с прямым сценарием обращения;
- пустая секция кейсов скрывается до появления реального `publish: true` материала;
- VK и Instagram открываются в новой вкладке с `noopener noreferrer`, внутренние ссылки и `tel:` остаются в текущем контексте;
- Astro обновлён с 6.x до 7.3.1; `@astrojs/sitemap` — до 3.7.4, `@astrojs/check` — до 0.9.10;
- Dependabot policy ограничивает routine npm version updates уровнями minor/patch, но не блокирует security updates, требующие SemVer major; security updates группируются отдельно;
- CI автоматически запускается только для pull request в `main` и push в `main`; ручной CI остаётся доступен для диагностики;
- superseded CI runs одной ветки отменяются через `concurrency`;
- checkout в CI/deploy не сохраняет write credentials;
- visual screenshots сохраняются для PR, Playwright report — при ошибке, retention сокращён до 7 дней;
- GitHub Pages deployment запускается только после успешного `CI` в `main`; отдельный `workflow_dispatch` production bypass удалён;
- `PROJECT_STATE.md` и `ROADMAP.md` синхронизированы с текущим production и repository governance.

### Security

- regenerated `package-lock.json` resolves `sharp` 0.35.4 and `esbuild` 0.28.2, removing the dependency versions covered by the current Dependabot alerts;
- static verifier больше не превращает hostname/canonical URL в динамическое регулярное выражение; canonical извлекается из generated `<link>` и сравнивается как строка;
- CI отдельно доказывает, что verifier отклоняет намеренно неверный canonical URL;
- full migration validation on Node.js 24 passed `astro check`, static build, static verifier and Playwright regression tests;
- `npm audit --audit-level=low` reports 0 vulnerabilities for the refreshed dependency tree.

### Removed

- неиспользуемый legacy `public/brand-mark.svg`;
- неиспользуемый legacy `public/favicon.svg`.

### Repository governance

GitHub-level ruleset для `main`, automatic deletion of merged branches и нормализация merge settings остаются отдельными настройками репозитория и не могут быть выражены только файлами в Git tree.

## 0.1.1 — 2026-09-06

### Added

- статические detail routes `/cases/<id>/` для кейсов с `publish: true`;
- собственная base-path-safe страница 404;
- закрытие мобильного меню по Escape с возвратом keyboard focus;
- `scripts/verify-static-build.mjs` для проверки generated HTML, локальных ссылок/assets, canonical и обязательных static artifacts;
- negative regression-check, подтверждающий, что static verifier отклоняет намеренно сломанную локальную ссылку;
- post-deploy HTTP smoke-check опубликованной главной страницы;
- production smoke реального неизвестного URL с ожиданием HTTP 404 и custom error page;
- `docs/CONTENT_GUIDE.md` с правилами подготовки контактов, кейсов и фотографий.

### Changed

- добавлен committed `package-lock.json`;
- CI и GitHub Pages deploy переведены на `npm ci`;
- generated Pages artifact повторно проходит static verifier перед upload;
- custom-domain build также проходит verifier;
- README и project state обновлены под воспроизводимый v0.1.1 workflow.

### Verified

- Astro check: 0 errors, 0 warnings, 0 hints;
- static verifier: pass на корректной сборке и ожидаемый fail на намеренно сломанной ссылке;
- Playwright: 16 passed, 2 skipped, 0 failed на последней полной feature-веточной проверке перед release documentation;
- GitHub Project Pages build mode: pass;
- custom-domain root build mode: pass.

### Safety / integrity

- `case-template.md` остаётся `publish: false` и не получает публичный route;
- новые возможности не добавляют вымышленные контакты, кейсы, отзывы, сертификаты или метрики;
- production state считается окончательно подтверждённым только после merge, post-merge CI и успешного GitHub Pages smoke-check.

## 0.1.0 — 2026-09-06

### Added

- первая версия персонального сайта NEZABUDKA;
- Astro 6 + TypeScript static architecture;
- responsive desktop/mobile дизайн;
- основные информационные секции и техническая hero-графика;
- SEO, Open Graph, JSON-LD, sitemap, robots.txt и manifest;
- content collection для будущих проверенных кейсов;
- CI с Astro check, build, Playwright и visual artifacts;
- GitHub Pages deploy pipeline;
- автоматическая адаптация build base URL к текущим GitHub Pages settings, включая будущий custom domain.

### Safety / integrity

- исключены вымышленные отзывы, кейсы, цифры и контактные данные;
- custom domain не завязан на `CNAME` для Actions-based Pages deployment.
