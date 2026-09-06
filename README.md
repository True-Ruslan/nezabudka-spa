# Nepomka

Персональный сайт автомобильного специалиста **Непомнящего Данила Александровича**.

## Что внутри

- Astro 6 + TypeScript;
- полностью статическая production-сборка;
- адаптивный интерфейс без клиентского UI-фреймворка;
- фирменная идентичность Nepomka: утверждённый wordmark, компактный знак и browser icons;
- утверждённый hero-портрет на основе предоставленных владельцем референсных фотографий;
- SEO metadata, Open Graph, JSON-LD, sitemap, robots.txt и web manifest;
- типизированная content collection для проверенных автомобильных кейсов;
- отдельные статические страницы опубликованных кейсов `/cases/<id>/`;
- собственная base-path-safe страница 404;
- Playwright-проверки desktop/mobile, навигации, accessibility и горизонтального overflow;
- hash-gate для ключевых утверждённых brand assets;
- zero-dependency проверка целостности generated static site;
- автоматический деплой на GitHub Pages после успешного CI в `main`;
- post-deploy HTTP smoke-check главной страницы и реального 404.

## Brand assets

Production-ассеты находятся в `public/branding/`:

- `nepomka-logo.webp` — основной горизонтальный логотип;
- `nepomka-favicon.png` — компактный знак для вкладки браузера и малых состояний;
- `nepomka-apple-touch-icon.png` — touch icon;
- `danil-hero.webp` — утверждённый hero-визуал.

CI фиксирует Git blob SHA основного логотипа и hero-визуала. Случайная замена валидным, но неутверждённым изображением должна ломать quality gate.

## Локальный запуск

Требуется Node.js 24+.

Установка зависимостей воспроизводима через committed `package-lock.json`:

```bash
npm ci
npm run dev
```

Полный набор проверок:

```bash
npm ci --no-audit --no-fund
npm run check
npm run build
npm run verify:build
npx playwright install chromium
npm run test:e2e
```

`npm run verify:build` проверяет generated HTML и локальные `href`/`src`, наличие custom `404.html`, canonical URL и отсутствие опубликованного route для редакционного `case-template`.

## Production

До подключения собственного домена сайт собирается как GitHub Project Pages:

`https://true-ruslan.github.io/nezabudka-spa/`

Workflow `.github/workflows/deploy.yml` запускается только после успешного `CI` в `main`, получает фактические `origin` и `base_path` из GitHub Pages и собирает Astro под них. Благодаря этому тот же код работает и после назначения собственного домена.

После deployment workflow проверяет опубликованную главную страницу по HTTP и делает отдельный запрос к несуществующему URL: GitHub Pages должен вернуть HTTP 404 с нашей страницей «Страница не найдена».

Инструкция по домену: [`docs/CUSTOM_DOMAIN.md`](docs/CUSTOM_DOMAIN.md).

## Контент

Контакты, опыт и основные публичные тексты находятся в `src/data/site.ts`. Неизвестные контактные каналы остаются `null` и не заменяются временными или вымышленными данными.

Реальные кейсы добавляются в `src/content/cases/`. Новый кейс готовится с `publish: false`; после фактчекинга и разрешения на публикацию `publish: true` автоматически включает карточку на главной и отдельный статический route `/cases/<id>/`.

Редакционный `src/content/cases/case-template.md` всегда остаётся непубличным.

Полные правила подготовки контактов, кейсов и визуальных материалов: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).
