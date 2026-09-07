# Project State

Обновлено: 2026-09-07

## Статус

Nepomka работает как статический коммерческий сайт автомобильного специалиста **Непомнящего Данила Александровича**. Production URL — `https://nepomka.ru/`. Источником истины для production остаётся `main`; публикация выполняется GitHub Pages только после успешного CI для соответствующей ревизии.

## Product / UX

- Astro 6 + TypeScript, полностью статическая сборка;
- фирменная идентичность Nepomka и утверждённые brand assets;
- адаптивный desktop/mobile интерфейс без клиентского UI-фреймворка;
- коммерческий первый экран и шесть предложений: разбор сметы, сравнение запчастей, проверка авто перед покупкой, подбор автомобиля, бронеплёнка и тонировка;
- опубликованы стартовые цены и ограничения формата услуги;
- основной город — Белгород, часть услуг доступна онлайн;
- отдельные секции процесса работы, FAQ, About и Contact;
- типизированная content collection для автомобильных кейсов;
- `publish: true` автоматически создаёт карточку и route `/cases/<id>/`;
- при отсутствии опубликованных кейсов пустая секция не показывается;
- собственная base-path-safe страница `404.html`.

## Контакты и публичные данные

Текущие production-данные находятся в `src/data/site.ts`:

- телефон опубликован;
- VK опубликован;
- Instagram опубликован;
- Telegram и email пока не заданы и остаются `null`.

Неизвестные контакты, кейсы, отзывы, сертификаты и метрики не должны заполняться временными или вымышленными значениями.

## Accessibility / SEO

- semantic landmarks, skip link, focus states и reduced motion;
- canonical, description, Open Graph, Twitter Card, JSON-LD Person/Offer, sitemap, robots.txt и web manifest;
- отдельный OG cover;
- mobile horizontal-overflow regression check;
- custom domain `nepomka.ru` поддерживается без hardcoded production base path.

## Build / CI / deploy

- Node.js 24;
- committed `package-lock.json` и воспроизводимые установки через `npm ci`;
- Astro check + production build;
- Git blob hash-gate для утверждённых `danil-hero.webp` и `nepomka-logo.webp`;
- zero-dependency `scripts/verify-static-build.mjs` для generated HTML, локальных ссылок/assets, canonical и обязательных artifacts;
- negative regression-check verifier-а;
- Playwright desktop/mobile checks;
- ephemeral `publish: true` case-route smoke;
- проверки GitHub Project Pages и custom-domain build modes;
- CI запускается для PR в `main`, push в `main` и вручную; superseded runs одной ветки отменяются через `concurrency`;
- visual screenshots сохраняются для PR, Playwright report — при ошибке;
- GitHub Pages deploy не имеет отдельного manual bypass и запускается только после успешного `CI` в `main`;
- deployment повторно проверяет static build и выполняет HTTP smoke главной страницы и реального 404;
- Dependabot еженедельно проверяет npm dependencies и GitHub Actions.

## Repository hygiene

В кодовой части принята схема `branch → PR → CI → squash merge → main`. Для её реального принудительного соблюдения GitHub repository settings должны содержать ruleset для `main` с обязательным PR и required status check `quality`, запретом force-push/delete и linear history.

Также рекомендуется включить automatic deletion of merged head branches. Эти настройки находятся на уровне GitHub и не задаются файлами репозитория.

## Что остаётся сделать

- добавить первые реальные документированные кейсы и, при наличии разрешения, отзывы/рабочие фотографии;
- подключить privacy-friendly analytics при появлении потребности в измерении воронки;
- проверить Google Search Console и Яндекс Вебмастер;
- включить и проверить ruleset для `main`;
- удалить уже слитые и временные исторические ветки после проверки их refs;
- включить автоматическое удаление head branches после merge.

Финальный production status всегда сверяется по актуальному `main`, GitHub Actions и опубликованному сайту, а не только по этому документу.
