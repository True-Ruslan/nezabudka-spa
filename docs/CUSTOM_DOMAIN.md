# Custom domain GitHub Pages

Production domain уже настроен: **`https://nepomka.ru/`**.

## Текущее устройство

Домен назначается в repository **Settings → Pages → Custom domain**. Для Actions-based Pages deployment отдельный committed `CNAME` этому проекту не требуется.

DNS и **Enforce HTTPS** должны оставаться валидными в GitHub Pages settings. При изменении DNS необходимо сверяться с актуальной документацией GitHub Pages, а не копировать устаревшие IP-адреса.

## Как deployment получает домен

`.github/workflows/deploy.yml` запускается автоматически только после successful `CI` для `main`. Manual production `workflow_dispatch` отсутствует.

`actions/configure-pages` возвращает фактические `origin` и `base_path`; workflow передаёт их Astro как `SITE_ORIGIN` и `BASE_PATH`.

Для Project Pages fallback это примерно:

```text
SITE_ORIGIN=https://true-ruslan.github.io
BASE_PATH=/nezabudka-spa
```

Для текущего production custom domain:

```text
SITE_ORIGIN=https://nepomka.ru
BASE_PATH=
```

Поэтому canonical, sitemap, assets и internal links перестраиваются без hardcoded production path.

## Локальная проверка root custom-domain режима

```bash
SITE_ORIGIN=https://nepomka.ru BASE_PATH='' npm run build
SITE_ORIGIN=https://nepomka.ru BASE_PATH='' npm run verify:build
```

CI выполняет эквивалентную проверку на `https://danil.example.test`: требует root canonical для главной и четырёх service pages и завершится ошибкой при утечке `true-ruslan.github.io` или `/nezabudka-spa/`.

## Production verification

После merge в `main` нормальный pipeline:

1. main CI;
2. Pages build + static verifier;
3. Pages deployment;
4. HTTP smoke `PAGE_URL`;
5. HTTP smoke `/avtopodbor/`;
6. запрос неизвестного URL с ожидаемым HTTP 404 и текстом custom error page.

Ручной deploy не является штатным способом выпуска production.
