# Project State

Обновлено: 2026-09-06

## Статус

Линия v0.1.x: production foundation/hardening и фирменная идентичность **Nepomka** реализованы. Фактический production release определяется состоянием `main` и последним успешным `Deploy GitHub Pages`; после каждого merge deployment дополнительно проверяет опубликованный сайт по HTTP.

## Реализовано

### Product / UX

- Astro 6 static site;
- адаптивная editorial/technical визуальная система Nepomka;
- основной горизонтальный wordmark, компактный знак, favicon и Apple Touch Icon;
- hero с утверждённым портретным визуалом на основе предоставленных владельцем референсных фотографий;
- публичное имя: `Непомнящий Данил Александрович`;
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
- Nepomka manifest/favicon и hero Open Graph image;
- mobile horizontal-overflow regression check.

### Build / CI / deploy

- Node.js 24;
- committed npm `package-lock.json` и воспроизводимые установки через `npm ci`;
- Astro check + production build;
- Git blob hash-gate для утверждённых `danil-hero.webp` и `nepomka-logo.webp`;
- zero-dependency `scripts/verify-static-build.mjs` для проверки generated HTML и локальных ссылок/assets;
- CI содержит negative regression-check: намеренно сломанная локальная ссылка обязана быть обнаружена verifier-ом;
- Playwright desktop/mobile checks и visual artifacts;
- проверка GitHub Project Pages и custom-domain build modes;
- GitHub Pages deployment запускается после успешного CI в `main`;
- deployment повторно проверяет generated static build перед upload;
- после публикации выполняется HTTP smoke-check реальной главной страницы;
- отдельный production smoke проверяет неизвестный URL: ожидаются HTTP 404 и наша страница «Страница не найдена».

## Quality gates

Каждый commit и PR проходят один и тот же CI-контур:

- `npm ci`;
- Astro check;
- production build;
- exact approved asset hashes;
- static build verifier;
- negative verifier regression;
- Playwright desktop/mobile;
- ephemeral `publish:true` case-route smoke;
- custom-domain build + verifier;
- visual screenshot artifacts.

Финальный production status необходимо сверять с GitHub Actions, а не считать этот документ заменой live-проверке.

## Публикация

Текущий production target до покупки домена:

`https://true-ruslan.github.io/nezabudka-spa/`

Custom domain поддерживается конфигурацией deployment без изменения application code. См. `docs/CUSTOM_DOMAIN.md`.

## Контентный workflow

- контакты и основные публичные данные: `src/data/site.ts`;
- брендовые production assets: `public/branding/`;
- кейсы: `src/content/cases/`;
- правила фактчекинга, публикации кейсов и визуалов: `docs/CONTENT_GUIDE.md`.

## Осознанно отложено

- подтверждённые контактные данные;
- реальные опубликованные кейсы;
- при необходимости — реальные редакционные фотографии для About/кейсов;
- финальный купленный домен.

Эти пункты являются контентными входными данными, а не блокерами архитектуры или публикации сайта.
