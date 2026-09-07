import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('presents actionable services without fabricated proof', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Без догадок.');
  await expect(page.locator('.offer')).toHaveCount(6);
  for (const id of ['expertise', 'process', 'about', 'faq', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('#cases')).toHaveCount(0);
  await expect(page.getByText(/вымышлен|выдуман|контакты будут/i)).toHaveCount(0);
  await expect(page.getByText(/Белгород · онлайн и очно/).first()).toBeVisible();
  await expect(page.getByText('3 900 ₽', { exact: true })).toBeVisible();
  await expect(page.getByText('2 900 ₽', { exact: true })).toBeVisible();
  await expect(page.getByText('от 8 900 ₽', { exact: true })).toBeVisible();
  await expect(page.getByText('от 38 000 ₽', { exact: true })).toBeVisible();
  await expect(page.getByText('от 16 000 ₽', { exact: true })).toBeVisible();
});

test('uses a high-resolution portrait-shaped hero asset without aggressive lateral cropping', async ({ page }) => {
  await page.goto('./');

  const brandLogo = page.locator('[data-brand-logo]');
  await expect(brandLogo).toBeVisible();
  await expect(brandLogo).toHaveAttribute('src', /\/branding\/nepomka-logo\.webp$/);
  await expect(brandLogo).toHaveAttribute('alt', 'Nepomka');
  expect(await brandLogo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const heroPortrait = page.locator('[data-hero-portrait]');
  await expect(heroPortrait).toBeVisible();
  await expect(heroPortrait).toHaveAttribute('src', /\/branding\/danil-hero\.webp$/);
  await expect(heroPortrait).toHaveAttribute('alt', 'Непомнящий Данил Александрович');

  const portraitMetrics = await heroPortrait.evaluate((image: HTMLImageElement) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    objectFit: getComputedStyle(image).objectFit,
    objectPosition: getComputedStyle(image).objectPosition,
  }));

  expect(portraitMetrics.naturalWidth).toBeGreaterThanOrEqual(1100);
  expect(portraitMetrics.naturalHeight).toBeGreaterThanOrEqual(1400);
  expect(portraitMetrics.naturalWidth / portraitMetrics.naturalHeight).toBeLessThan(0.85);
  expect(portraitMetrics.objectFit).toBe('cover');
  expect(portraitMetrics.objectPosition).toBe('50% 16%');

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    '/nezabudka-spa/branding/nepomka-favicon.png',
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/nezabudka-spa/branding/nepomka-apple-touch-icon.png',
  );
  await expect(page).toHaveTitle(/Данил Непомнящий.*Nepomka/);
});

test('keeps navigation usable and base-path safe', async ({ page, isMobile }) => {
  await page.goto('./');

  if (isMobile) {
    await page.getByRole('button', { name: 'Открыть меню' }).click();
  }

  const expertiseLink = page.getByRole('link', { name: 'С чем помогу' }).first();
  await expect(expertiseLink).toHaveAttribute('href', /#expertise$/);
  await expertiseLink.click();
  await expect(page.locator('#expertise')).toBeInViewport();

  const contactLinks = page.getByRole('link', { name: /написать|связаться|обсудить/i });
  await expect(contactLinks.first()).toBeVisible();
});

test('offers the supplied contact channels and an accessible FAQ', async ({ page }) => {
  await page.goto('./#contact');
  const contact = page.locator('#contact');
  const vkLink = contact.getByRole('link', { name: /Написать в VK/ });
  await expect(vkLink).toHaveAttribute('href', 'https://vk.ru/boypocek');
  await expect(vkLink).toHaveAttribute('target', '_blank');
  await expect(vkLink).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(contact.locator('a[href^="tel:"]')).toHaveAttribute('href', 'tel:+79045328772');

  const instagramLink = contact.getByRole('link', { name: /Instagram/ });
  await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/nepomka.d');
  await expect(instagramLink).toHaveAttribute('target', '_blank');
  await expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

  const mobileVkLink = page.getByRole('link', { name: /Написать Данилу в VK/ });
  await expect(mobileVkLink).toHaveAttribute('target', '_blank');
  await expect(mobileVkLink).toHaveAttribute('rel', 'noopener noreferrer');

  const question = page.locator('summary').filter({ hasText: 'Почему часть цен указана «от»?' });
  await question.click();
  await expect(page.getByText('Цена осмотра и подбора зависит от модели', { exact: false })).toBeVisible();
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
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Nepomka');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://true-ruslan.github.io/nezabudka-spa/branding/og-cover.png',
  );
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/nezabudka-spa/site.webmanifest');

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  const person = JSON.parse(jsonLd ?? '{}');
  const fixedOffer = person.makesOffer.find((offer: { itemOffered: { name: string } }) =>
    offer.itemOffered.name === 'Разобраться в рекомендациях сервиса');
  const variableOffer = person.makesOffer.find((offer: { itemOffered: { name: string } }) =>
    offer.itemOffered.name === 'Подобрать автомобиль с пробегом');
  expect(fixedOffer.price).toBe(3900);
  expect(variableOffer.price).toBeUndefined();
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
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
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
