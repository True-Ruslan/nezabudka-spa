import { expect, test } from '@playwright/test';

const requiredSections = ['expertise', 'cases', 'experience', 'help', 'principles', 'about', 'contact'];

test('presents Danil as an automotive specialist without fabricated proof', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: 'Автомобили без догадок.' })).toBeVisible();
  await expect(page.getByText('Данил Непомнящий', { exact: true })).toBeVisible();
  await expect(page.getByText('Состояние автомобиля', { exact: true })).toBeVisible();
  await expect(page.getByText('Обслуживание', { exact: true })).toBeVisible();
  await expect(page.getByText('Запчасти', { exact: true })).toBeVisible();
  await expect(page.getByText('Автобизнес', { exact: true })).toBeVisible();

  for (const id of requiredSections) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  await expect(page.getByRole('heading', { name: 'Автовладельцам' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Автобизнесу' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Как я принимаю решения' })).toBeVisible();

  await expect(page.getByText(/100\+ автомобилей/i)).toHaveCount(0);
  await expect(page.getByText(/5\.0|отзыв/i)).toHaveCount(0);
  await expect(page.getByText(/сертифицирован/i)).toHaveCount(0);
});

test('keeps navigation usable and base-path safe', async ({ page }) => {
  await page.goto('./');

  const expertiseLink = page.getByRole('link', { name: 'Экспертиза' }).first();
  await expect(expertiseLink).toHaveAttribute('href', /#expertise$/);
  await expertiseLink.click();
  await expect(page.locator('#expertise')).toBeInViewport();

  const contactLinks = page.getByRole('link', { name: /написать|связаться|обсудить/i });
  await expect(contactLinks.first()).toBeVisible();
});

test('renders an honest contact state until verified details are supplied', async ({ page }) => {
  await page.goto('./#contact');

  const contact = page.locator('#contact');
  await expect(contact).toContainText(/контакт/i);
  await expect(contact).toContainText(/добав/i);
  await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(contact.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(contact.locator('a[href*="t.me/"]')).toHaveCount(0);
});

test('has no horizontal overflow on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only regression check');
  await page.goto('./');

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});

test('supports keyboard navigation and visible focus', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');

  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
  const outline = await focused.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe('none');
});
