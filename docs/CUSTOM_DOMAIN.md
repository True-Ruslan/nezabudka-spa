# Собственный домен для GitHub Pages

Сайт уже подготовлен к переходу с GitHub Project Pages на собственный домен без изменения исходного кода.

## После покупки домена

1. Откройте репозиторий `True-Ruslan/nezabudka-spa` → **Settings** → **Pages**.
2. В поле **Custom domain** укажите купленный домен и сохраните его.
3. Только после этого настройте DNS у регистратора.
4. Дождитесь проверки DNS в GitHub Pages и включите **Enforce HTTPS**, когда переключатель станет доступен.
5. Запустите `Deploy GitHub Pages` вручную либо сделайте следующий commit в `main`.

Для custom GitHub Actions workflow файл `CNAME` не требуется и GitHub его игнорирует. Домен должен быть назначен в Pages settings.

## DNS

### Вариант A: поддомен, например `www.example.ru`

Создайте CNAME:

```text
www  CNAME  true-ruslan.github.io
```

### Вариант B: корневой домен, например `example.ru`

Используйте актуальные A/AAAA/ALIAS/ANAME записи, которые GitHub показывает в документации Pages для apex-домена. Не копируйте IP-адреса из старых инструкций без проверки — они могут изменяться.

Практичный вариант: основной apex-домен + `www` CNAME, с единым canonical доменом в GitHub Pages.

## Почему код менять не понадобится

На deploy-шаге `actions/configure-pages` возвращает текущие `origin` и `base_path`. Workflow передаёт их Astro как `SITE_ORIGIN` и `BASE_PATH`.

До домена это соответствует примерно:

```text
SITE_ORIGIN=https://true-ruslan.github.io
BASE_PATH=/nezabudka-spa
```

После назначения домена GitHub Pages вернёт, например:

```text
SITE_ORIGIN=https://example.ru
BASE_PATH=
```

Astro автоматически перестроит canonical URL, sitemap, asset paths и внутренние ссылки под новую схему.

## Локальная проверка custom-domain режима

```bash
SITE_ORIGIN=https://example.ru BASE_PATH='' npm run build
```

CI выполняет аналогичную проверку на тестовом домене и завершится ошибкой, если в custom-domain build протечёт `/nezabudka-spa/` или URL `true-ruslan.github.io`.
