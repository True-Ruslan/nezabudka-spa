# Project State

Обновлено: 2026-09-06

## Статус

Version 0.1.0 — первая production-готовая версия сайта.

## Реализовано

- Astro 6 static site;
- адаптивная editorial/technical визуальная система NEZABUDKA;
- Hero, Expertise, Cases, Experience, Help Paths, Principles, About, Contact, Footer;
- desktop/mobile navigation;
- accessibility: semantic landmarks, skip link, focus states, reduced motion;
- SEO: canonical, description, Open Graph, Twitter Card, JSON-LD Person, sitemap, robots.txt;
- manifest и favicon;
- типизированная content collection для реальных кейсов;
- честные empty states вместо вымышленных отзывов, кейсов и контактов;
- CI с Astro check, production build, Playwright desktop/mobile и visual artifacts;
- проверка project-Pages и custom-domain build modes;
- GitHub Pages deployment workflow после успешного CI на `main`.

## Публикация

Текущий production target до покупки домена:

`https://true-ruslan.github.io/nezabudka-spa/`

Custom domain поддерживается конфигурацией deployment без изменения кода. См. `docs/CUSTOM_DOMAIN.md`.

## Осознанно отложено

- подтверждённые контактные данные;
- реальные опубликованные кейсы;
- профессиональная фотография Данила;
- финальный купленный домен.

Эти пункты являются контентными входными данными, а не блокерами архитектуры или публикации сайта.
