import { expect, test } from '@playwright/test';

const servicePages = [
  {
    route: 'avtopodbor/',
    title: 'Автоподбор в Белгороде — подбор авто с пробегом | Nepomka',
    heading: 'Подобрать автомобиль с пробегом',
    description:
      'Подбор автомобиля с пробегом в Белгороде: требования, отбор объявлений, проверка продавцов и финальных вариантов, сопровождение решения и сделки.',
  },
  {
    route: 'proverka-avto/',
    title: 'Проверка авто перед покупкой в Белгороде | Nepomka',
    heading: 'Проверить автомобиль перед покупкой',
    description:
      'Проверка автомобиля перед покупкой в Белгороде: кузов, техническое состояние, документы и история, риски, будущие вложения и аргументы для торга.',
  },
  {
    route: 'bronirovanie-plenkoy/',
    title: 'Бронеплёнка для автомобиля в Белгороде | Nepomka',
    heading: 'Защитить кузов бронеплёнкой',
    description:
      'Бронеплёнка для автомобиля в Белгороде: подбор зон защиты и плёнки под автомобиль, условия эксплуатации и бюджет. Капот — от 16 000 ₽.',
  },
  {
    route: 'tonirovka/',
    title: 'Тонировка автомобиля в Белгороде | Nepomka',
    heading: 'Затонировать автомобиль',
    description:
      'Тонировка автомобиля в Белгороде: подбор типа и светопропускания плёнки с учётом автомобиля, нужного эффекта и допустимых норм.',
  },
] as const;

test('positions the homepage as the general Nepomka automotive service', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle('Nepomka — автомобильный специалист в Белгороде');
});

test('links the four key offers to base-safe detail routes', async ({ page }) => {
  await page.goto('./#expertise');

  for (const { route } of servicePages) {
    await expect(page.locator(`a[href="/nezabudka-spa/${route}"]`)).toHaveCount(1);
  }
});

for (const service of servicePages) {
  test(`${service.route} publishes unique SEO metadata and conversion paths`, async ({ page }) => {
    const response = await page.goto(`./${service.route}`);
    expect(response?.ok()).toBe(true);

    await expect(page).toHaveTitle(service.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      service.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://true-ruslan.github.io/nezabudka-spa/${service.route}`,
    );
    await expect(page.getByRole('heading', { level: 1, name: service.heading })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Хлебные крошки' })).toBeVisible();
    await expect(page.getByRole('link', { name: /обсудить услугу/i })).toHaveAttribute(
      'href',
      '#lead-brief',
    );

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const structuredData = jsonLdScripts.map((value) => JSON.parse(value));
    const serviceJsonLd = structuredData.find((value) => value['@type'] === 'Service');
    expect(serviceJsonLd?.name).toBe(service.heading);
    expect(serviceJsonLd?.areaServed?.name).toBe('Белгород');
    expect(serviceJsonLd?.offers).toBeUndefined();
  });
}

test('service contact keeps external social links isolated from the opener', async ({ page }) => {
  await page.goto('./avtopodbor/#contact');
  const contact = page.locator('#contact');

  await expect(contact.getByRole('link', { name: /Написать в Telegram/ })).toHaveAttribute(
    'target',
    '_blank',
  );
  await expect(contact.getByRole('link', { name: /Написать в Telegram/ })).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  );
  await expect(contact.getByRole('link', { name: /Instagram/ })).toHaveAttribute('target', '_blank');
  await expect(contact.getByRole('link', { name: /Instagram/ })).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  );
});

test('service pages do not introduce horizontal overflow on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only regression check');

  for (const { route } of servicePages) {
    await page.goto(`./${route}`);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth, `Horizontal overflow on ${route}`).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
  }
});
