import { expect, test } from '@playwright/test';

const services = [
  { route: 'avtopodbor/', title: 'Подобрать автомобиль с пробегом' },
  { route: 'proverka-avto/', title: 'Проверить автомобиль перед покупкой' },
  { route: 'bronirovanie-plenkoy/', title: 'Защитить кузов бронеплёнкой' },
  { route: 'tonirovka/', title: 'Затонировать автомобиль' },
] as const;

for (const current of services) {
  test(`${current.route} exposes breadcrumb and three other service routes`, async ({ page }) => {
    await page.goto(`./${current.route}`);

    const breadcrumb = page.getByRole('navigation', { name: 'Хлебные крошки' });
    await expect(breadcrumb.getByRole('link', { name: 'Главная' })).toHaveAttribute(
      'href',
      '/nezabudka-spa/',
    );
    await expect(breadcrumb.getByText(current.title, { exact: true })).toBeVisible();

    const related = page.locator('.related-services');
    const expectedOthers = services.filter((service) => service.route !== current.route);
    await expect(related.locator('a')).toHaveCount(3);

    for (const other of expectedOthers) {
      await expect(related.getByRole('link', { name: new RegExp(other.title) })).toHaveAttribute(
        'href',
        `/nezabudka-spa/${other.route}`,
      );
    }
    await expect(related.getByRole('link', { name: new RegExp(current.title) })).toHaveCount(0);
  });
}
