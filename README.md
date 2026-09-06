# NEZABUDKA

Персональный сайт автомобильного специалиста Данила Непомнящего.

## Что внутри

- Astro 6 + TypeScript;
- полностью статическая production-сборка;
- адаптивный интерфейс без клиентского UI-фреймворка;
- SEO metadata, Open Graph, JSON-LD, sitemap, robots.txt и web manifest;
- типизированная коллекция для будущих реальных кейсов;
- Playwright-проверки desktop/mobile, навигации, accessibility и горизонтального overflow;
- автоматический деплой на GitHub Pages после успешного CI в `main`.

## Локальный запуск

Требуется Node.js 24+.

```bash
npm install
npm run dev
```

Проверки:

```bash
npm run check
npm run build
npx playwright install chromium
npm run test:e2e
```

## Production

До подключения собственного домена сайт собирается как GitHub Project Pages:

`https://true-ruslan.github.io/nezabudka-spa/`

Workflow `.github/workflows/deploy.yml` запускается только после успешного `CI` в `main`, получает фактические `origin` и `base_path` из GitHub Pages и собирает Astro под них. Благодаря этому тот же код работает и после назначения собственного домена.

Инструкция по домену: [`docs/CUSTOM_DOMAIN.md`](docs/CUSTOM_DOMAIN.md).

## Контент

Реальные кейсы добавляются в `src/content/cases/`. Схема намеренно требует явного `publish: true`; непроверенные кейсы и доказательства не публикуются.

Контактный блок также не содержит придуманных данных. До внесения подтверждённых контактов он показывает нейтральное состояние.
