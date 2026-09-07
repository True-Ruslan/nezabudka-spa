# Roadmap

## v0.1 — Production foundation

- [x] Архитектура Astro static site
- [x] Визуальная система и responsive layout
- [x] Основные смысловые секции
- [x] SEO и structured data
- [x] Accessibility baseline
- [x] Playwright desktop/mobile checks
- [x] GitHub Pages CI/CD
- [x] Подготовка custom domain

## v0.1.1 — Production hardening

- [x] Зафиксировать npm dependency graph через `package-lock.json`
- [x] Перевести CI/deploy на `npm ci`
- [x] Добавить статические detail routes для `publish: true` кейсов
- [x] Не публиковать `case-template.md`
- [x] Добавить custom 404
- [x] Закрывать mobile navigation по Escape с восстановлением focus
- [x] Добавить static-output verifier для generated links/assets/canonical
- [x] Добавить negative regression-check verifier-а
- [x] Проверять project-Pages и custom-domain build modes
- [x] Добавить post-deploy HTTP smoke главной страницы
- [x] Добавить production проверку настоящего HTTP 404
- [x] Документировать безопасный workflow добавления контента

## v0.1.2 — Nepomka identity

- [x] Переименовать публичный бренд в Nepomka
- [x] Использовать полное русское имя `Непомнящий Данил Александрович`
- [x] Подключить утверждённый горизонтальный wordmark
- [x] Подключить отдельный compact mark для favicon/touch icon
- [x] Подключить утверждённый hero-визуал на основе предоставленных фотографий
- [x] Перевести Open Graph и manifest на новую идентичность
- [x] Зафиксировать exact asset integrity через Git blob hash-gate
- [x] Проверять бренд и hero в desktop/mobile Playwright screenshots

## Commercial foundation — 2026-09-07

- [x] Подключить production domain `nepomka.ru`
- [x] Опубликовать подтверждённые телефон, VK и Instagram
- [x] Зафиксировать Белгород как основной город и онлайн/очный формат
- [x] Упаковать коммерческие предложения и стартовые цены
- [x] Добавить понятный процесс работы и FAQ
- [x] Скрывать пустую секцию кейсов до появления реальных материалов
- [ ] Опубликовать первые документированные реальные кейсы
- [ ] При наличии разрешения добавить отзывы и рабочие фотографии

## Repository hygiene

- [x] Запускать CI автоматически только для PR в `main` и push в `main`
- [x] Отменять superseded CI runs одной ветки через `concurrency`
- [x] Убрать отдельный manual bypass GitHub Pages deployment
- [x] Сократить хранение visual artifacts и Playwright reports до полезных сценариев
- [x] Включить Dependabot для npm и GitHub Actions
- [x] Удалить неиспользуемые legacy `public/brand-mark.svg` и `public/favicon.svg`
- [ ] Включить ruleset для `main`: PR required, status check `quality`, linear history, запрет force-push/delete
- [ ] Включить automatic deletion of merged head branches
- [ ] Удалить уже слитые и временные исторические ветки
- [ ] Нормализовать merge policy: squash-only; при необходимости включить auto-merge и update branch
- [ ] Заполнить repository description/homepage/topics и отключить неиспользуемые Wiki/Projects

## Measurement / SEO

- [ ] Добавить privacy-friendly analytics, если появляется потребность измерять воронку
- [ ] Проверить Google Search Console и Яндекс Вебмастер
- [ ] Проверить индексирование sitemap, canonical и ключевых страниц
- [ ] После появления реального контента рассмотреть отдельные страницы услуг и практические публикации

## Не делать без данных и разрешения

- не публиковать вымышленные отзывы;
- не придумывать количество клиентов/автомобилей;
- не использовать неподтверждённые контакты и сертификаты;
- не использовать сгенерированный визуал как доказательство реального кейса, события или достижения;
- не заменять утверждённые brand assets новыми генерациями без отдельного согласования.
