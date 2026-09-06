# Project State

Обновлено: 2026-09-06

## Статус

Version 0.1.1 — production hardening завершён в feature-ветке и подтверждён CI; релиз ожидает PR/merge в `main` и post-deploy verification.

## Реализовано

### Product / UX

- Astro 6 static site;
- адаптивная editorial/technical визуальная система NEZABUDKA;
- Hero, Expertise, Cases, Experience, Help Paths, Principles, About, Contact, Footer;
- desktop/mobile navigation;
- Escape закрывает мобильное меню и возвращает keyboard focus на кнопку;
- собственная base-path-safe страница `404.html`;
- типизированная content collection для автомобильных кейсов;
- опубликованные (`publish: true`) кейсы автоматически получают статические страницы `/cases/<id>/`;
- редакционный `case-template.md` не публикуется;
- честные empty states вместо вымышленных отзывов, кейсов и контактов.

### Accessibility / SEO

- semantic landmarks, skip link, focus states, reduced motion;
- canonical, description, Open Graph, Twitter Card, JSON-LD Person, sitemap, robots.txt;
- manifest и favicon;
- mobile horizontal-overflow regression check.

### Build / CI / deploy

- Node.js 24;
- committed npm `package-lock.json` и воспроизводимые установки через `npm ci`;
- Astro check + production build;
- zero-dependency `scripts/verify-static-build.mjs` для проверки generated HTML и локальных ссылок/assets;
- CI содержит negative regression-check: намеренно сломанная локальная ссылка обязана быть обнаружена verifier-ом;
- Playwright desktop/mobile checks и visual artifacts;
- проверка GitHub Project Pages и custom-domain build modes;
- GitHub Pages deployment запускается после успешного CI в `main`;
- deployment повторно проверяет generated static build перед upload;
- после публикации выполняется HTTP smoke-check реальной главной страницы;
- отдельный production smoke проверяет неизвестный URL: ожидаются HTTP 404 и наша страница «Страница не найдена».

## Последняя подтверждённая проверка feature-ветки

Head: `a4da09f4aa89588eb0b2e4c57b69a5706e2da404` (`ci: verify built and published Pages site`).

GitHub Actions CI run `34032164995` завершён успешно:

- `npm ci` — success;
- `astro check` — 0 errors, 0 warnings, 0 hints;
- production build — success;
- static build verifier — success;
- negative verifier regression — success (сломанная ссылка корректно отклонена);
- Playwright — 16 passed, 2 skipped, 0 failed;
- custom-domain build + verifier — success.

После documentation commits требуется свежий PR CI перед merge; production smoke можно подтвердить только после merge/deploy.

## Публикация

Текущий production target до покупки домена:

`https://true-ruslan.github.io/nezabudka-spa/`

Custom domain поддерживается конфигурацией deployment без изменения application code. См. `docs/CUSTOM_DOMAIN.md`.

## Контентный workflow

- контакты и основные публичные данные: `src/data/site.ts`;
- кейсы: `src/content/cases/`;
- правила фактчекинга, публикации кейсов и фотографий: `docs/CONTENT_GUIDE.md`.

## Осознанно отложено

- подтверждённые контактные данные;
- реальные опубликованные кейсы;
- профессиональная фотография Данила;
- финальный купленный домен.

Эти пункты являются контентными входными данными, а не блокерами архитектуры или публикации сайта.
