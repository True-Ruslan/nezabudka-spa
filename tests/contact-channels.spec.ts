import { expect, test } from '@playwright/test';

test('uses Telegram as the primary messenger and marks the phone as available in MAX', async ({ page }) => {
  await page.goto('./#contact');

  const contact = page.locator('#contact');
  const telegramLink = contact.getByRole('link', { name: 'Написать в Telegram' });
  await expect(telegramLink).toHaveAttribute('href', 'https://t.me/+79045328772');
  await expect(telegramLink).toHaveAttribute('target', '_blank');
  await expect(telegramLink).toHaveAttribute('rel', 'noopener noreferrer');

  const mobileTelegramLink = page.locator('.mobile-contact');
  await expect(mobileTelegramLink).toHaveAccessibleName('Написать Данилу в Telegram');
  await expect(mobileTelegramLink).toHaveAttribute('href', 'https://t.me/+79045328772');
  await expect(mobileTelegramLink).toHaveAttribute('target', '_blank');
  await expect(mobileTelegramLink).toHaveAttribute('rel', 'noopener noreferrer');

  const phoneRow = contact.locator('[data-contact-phone-row]');
  await expect(phoneRow.locator('a[href="tel:+79045328772"]')).toBeVisible();
  await expect(phoneRow.locator('[data-max-mark]')).toHaveAttribute(
    'src',
    '/nezabudka-spa/branding/max-mark.svg',
  );
  await expect(phoneRow.getByText('MAX доступен по этому номеру', { exact: true })).toHaveCount(1);

  await expect(contact.getByRole('link', { name: /Написать в VK/ })).toHaveCount(0);
  await expect(contact.locator('a[href*="vk.ru"]')).toHaveCount(0);
});

test('publishes Telegram rather than VK in the Person sameAs metadata', async ({ page }) => {
  await page.goto('./');

  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  const person = JSON.parse(jsonLd ?? '{}');

  expect(person.sameAs).toContain('https://t.me/+79045328772');
  expect(person.sameAs).toContain('https://www.instagram.com/nepomka.d');
  expect(person.sameAs).not.toContain('https://vk.ru/boypocek');
});
