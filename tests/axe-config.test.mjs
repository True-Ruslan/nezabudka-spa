import assert from 'node:assert/strict';
import test from 'node:test';

const { wcagTags, scenarios } = await import('../scripts/axe-audit-config.mjs');

test('axe audit covers WCAG 2.0, 2.1 and 2.2 at both A and AA', () => {
  assert.deepEqual(wcagTags, [
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
    'wcag22a',
    'wcag22aa',
  ]);
});

test('axe audit keeps all key desktop routes and representative mobile coverage', () => {
  const desktopRoutes = scenarios
    .filter((scenario) => scenario.name.startsWith('desktop '))
    .map((scenario) => scenario.route);
  const mobileRoutes = scenarios
    .filter((scenario) => scenario.name.startsWith('mobile '))
    .map((scenario) => scenario.route);

  assert.deepEqual(desktopRoutes, [
    '/',
    '/avtopodbor/',
    '/proverka-avto/',
    '/bronirovanie-plenkoy/',
    '/tonirovka/',
  ]);
  assert.deepEqual(mobileRoutes, ['/', '/avtopodbor/']);
});
