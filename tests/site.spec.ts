import { mkdir } from 'node:fs/promises';
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

  await expect(page.getByRole('heading', { name: 'Автовладельцам', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Автобизнесу', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Как я принимаю решения', exact: true })).toBeVisible();

  await expect(page.getByText(/100\+ автомобилей/i)).toHaveCount(0);
  await expect(page.getByText(/5\.0|отзыв/i)).toHaveCount(0);
  await expect(page.getByText(/сертифицирован/i)).toHaveCount(0);
  await expect(page.getByText(/шаблон кейса/i)).toHaveCount(0);
});

test('keeps navigation usable and base-path safe', async ({ page, isMobile }) => {
  await page.goto('./');

  if (isMobile) {
    await page.getByRole('button', { name: 'Открыть меню' }).click();
  }

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

test('publishes canonical metadata for the GitHub Pages project path', async ({ page }) => {
  await page.goto('./');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://true-ruslan.github.io/nezabudka-spa/',
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://true-ruslan.github.io/nezabudka-spa/',
  );
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/nezabudka-spa/site.webmanifest');
});

test('has no horizontal overflow on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only regression check');
  await page.goto('./');

  const diagnostics = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll<HTMLElement>('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: element.className,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter(({ left, right }) => left < -1 || right > viewport + 1)
      .slice(0, 12);

    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: viewport,
      offenders,
    };
  });

  expect(
    diagnostics.scrollWidth,
    `Overflow offenders: ${JSON.stringify(diagnostics.offenders)}`,
  ).toBeLessThanOrEqual(diagnostics.clientWidth + 1);
});

test('supports keyboard navigation and visible focus', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');

  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
  const outline = await focused.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe('none');
});

test('renders the generated custom 404 with base-safe recovery links', async ({ page }) => {
  const response = await page.goto('./404.html');
  expect(response?.status()).toBe(200);

  await expect(page.getByRole('heading', { name: /страница не найдена/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'На главную', exact: true })).toHaveAttribute(
    'href',
    '/nezabudka-spa/',
  );
  await expect(page.getByRole('link', { name: /контакт/i })).toHaveAttribute(
    'href',
    '/nezabudka-spa/#contact',
  );
});

test('mobile menu closes with Escape and returns focus to its button', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only interaction');
  await page.goto('./');

  const button = page.locator('[data-menu-button]');
  await expect(button).toHaveAccessibleName('Открыть меню');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(button).toHaveAccessibleName('Закрыть меню');

  await page.keyboard.press('Escape');

  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toHaveAccessibleName('Открыть меню');
  await expect(button).toBeFocused();
});

test('renders without page errors and captures a visual baseline', async ({ page }, testInfo) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.waitForLoadState('networkidle');

  expect(pageErrors).toEqual([]);

  await mkdir('artifacts/screenshots', { recursive: true });
  await page.screenshot({
    path: `artifacts/screenshots/${testInfo.project.name}.png`,
    fullPage: true,
  });
});
