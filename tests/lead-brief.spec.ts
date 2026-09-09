import { expect, test } from '@playwright/test';

const telegramUrl = 'https://t.me/+79045328772';

test('keeps the lead brief compact on the homepage and sources all six offers', async ({ page }) => {
  await page.goto('./#contact');

  const brief = page.locator('[data-lead-brief]');
  await expect(brief).toHaveCount(1);
  await expect(brief).not.toHaveAttribute('open', '');
  await expect(brief.getByText('Подготовить сообщение', { exact: true })).toBeVisible();

  const service = brief.getByLabel('Услуга');
  await expect(service.locator('option')).toHaveCount(6);
});

test('preselects and opens the matching service brief on a service page', async ({ page }) => {
  await page.goto('./avtopodbor/#lead-brief');

  const brief = page.locator('[data-lead-brief]');
  await expect(brief).toHaveAttribute('open', '');
  await expect(brief.getByLabel('Услуга')).toHaveValue('car-selection');
  await expect(brief.getByLabel('Услуга')).toContainText('Подобрать автомобиль с пробегом');
});

test('formats a factual brief, copies it and keeps Telegram as the direct destination', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./avtopodbor/#lead-brief');

  const brief = page.locator('[data-lead-brief]');
  await brief.getByLabel('Автомобиль').fill('BMW 320i');
  await brief.getByLabel('Год / пробег').fill('2019 · 98 000 км');
  await brief
    .getByLabel('Вопрос')
    .fill('Нужен подбор под ключ, важны прозрачная история и минимум кузовных ремонтов.');

  const telegram = brief.getByRole('link', { name: 'Скопировать и открыть Telegram' });
  await expect(telegram).toHaveAttribute('href', telegramUrl);
  await expect(telegram).toHaveAttribute('target', '_blank');
  await expect(telegram).toHaveAttribute('rel', 'noopener noreferrer');

  page.on('popup', async (popup) => {
    await popup.close().catch(() => undefined);
  });
  await telegram.click();

  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe(
    [
      'Здравствуйте! Хочу обсудить услугу: Подобрать автомобиль с пробегом.',
      'Автомобиль: BMW 320i.',
      'Год / пробег: 2019 · 98 000 км.',
      'Вопрос: Нужен подбор под ключ, важны прозрачная история и минимум кузовных ремонтов.',
    ].join('\n'),
  );
  await expect(brief.getByRole('status')).toContainText('Текст скопирован');
});

test('Escape closes an expanded brief and returns focus to its summary', async ({ page }) => {
  await page.goto('./#contact');

  const brief = page.locator('[data-lead-brief]');
  const summary = brief.locator('summary');
  await summary.click();
  await expect(brief).toHaveAttribute('open', '');

  const vehicle = brief.getByLabel('Автомобиль');
  await vehicle.focus();
  await page.keyboard.press('Escape');

  await expect(brief).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
});
