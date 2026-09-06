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

## v0.2 — Verified content

- [ ] Добавить подтверждённые контакты Данила
- [ ] Опубликовать первые реальные кейсы через content collection
- [ ] При наличии — добавить проверяемые внешние профили/соцсети
- [ ] При необходимости добавить реальные редакционные фотографии в About/кейсы

## v0.3 — Domain and measurement

- [ ] Купить и подключить собственный домен
- [ ] Включить Enforce HTTPS после проверки DNS
- [ ] При необходимости добавить privacy-friendly analytics
- [ ] Проверить индексацию и Search Console/Яндекс Вебмастер после появления финального домена

## Не делать без данных и разрешения

- не публиковать вымышленные отзывы;
- не придумывать количество клиентов/автомобилей;
- не использовать неподтверждённые контакты и сертификаты;
- не использовать сгенерированный визуал как доказательство реального кейса, события или достижения;
- не заменять утверждённые brand assets новыми генерациями без отдельного согласования.
