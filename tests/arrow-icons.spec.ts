import { expect, test } from '@playwright/test';

const textArrowGlyphs = /[↗→←]/;

test('uses SVG arrows instead of text glyphs across homepage actions', async ({ page }) => {
  await page.goto('./');

  expect(await page.locator('body').innerText()).not.toMatch(textArrowGlyphs);

  await expect(
    page.getByRole('link', { name: 'Обсудить мою ситуацию' }).locator('svg[data-arrow-icon="up-right"]'),
  ).toHaveCount(1);

  const primaryOfferLinks = page.locator('.offer__actions .text-link:not(.offer__details)');
  await expect(primaryOfferLinks).toHaveCount(6);
  await expect(primaryOfferLinks.locator('svg[data-arrow-icon="up-right"]')).toHaveCount(6);

  const detailLinks = page.locator('.offer__actions .offer__details');
  await expect(detailLinks).toHaveCount(4);
  await expect(detailLinks.locator('svg[data-arrow-icon="right"]')).toHaveCount(4);

  await expect(
    page.getByRole('link', { name: 'Мой Instagram' }).locator('svg[data-arrow-icon="up-right"]'),
  ).toHaveCount(1);

  const contact = page.locator('#contact');
  await expect(
    contact.getByRole('link', { name: /Написать в VK/ }).locator('svg[data-arrow-icon="up-right"]'),
  ).toHaveCount(1);
  await expect(
    contact.getByRole('link', { name: /Instagram/ }).locator('svg[data-arrow-icon="up-right"]'),
  ).toHaveCount(1);
  await expect(page.locator('.mobile-contact svg[data-arrow-icon="up-right"]')).toHaveCount(1);
});

test('uses SVG navigation arrows on service detail pages', async ({ page }) => {
  await page.goto('./avtopodbor/');

  expect(await page.locator('body').innerText()).not.toMatch(textArrowGlyphs);

  await expect(
    page.getByRole('link', { name: 'Все услуги' }).locator('svg[data-arrow-icon="left"]'),
  ).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: /Обсудить услугу/i }).locator('svg[data-arrow-icon="up-right"]'),
  ).toHaveCount(1);
});

test('directional SVGs stay decorative and cannot enter the accessibility tree', async ({ page }) => {
  await page.goto('./');

  const icons = page.locator('svg[data-arrow-icon]');
  expect(await icons.count()).toBeGreaterThan(0);

  for (const icon of await icons.all()) {
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon).toHaveAttribute('focusable', 'false');
  }
});
