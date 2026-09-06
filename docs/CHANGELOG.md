# Changelog

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
