import assert from 'node:assert/strict';
import test from 'node:test';

const { default: config } = await import('../lighthouserc.cjs');

const assertions = config?.ci?.assert?.assertions;

test('Lighthouse audits representative production routes with stable repeated runs', () => {
  assert.equal(config.ci.collect.staticDistDir, './dist');
  assert.deepEqual(config.ci.collect.url, [
    'http://localhost/',
    'http://localhost/avtopodbor/',
  ]);
  assert.equal(config.ci.collect.numberOfRuns, 3);
  assert.deepEqual(config.ci.collect.settings.onlyCategories, [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
  ]);
});

test('Lighthouse enforces explicit category and Core Web Vitals budgets', () => {
  assert.deepEqual(assertions['categories:performance'], [
    'error',
    { minScore: 0.85, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['categories:accessibility'], [
    'error',
    { minScore: 0.95, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['categories:best-practices'], [
    'error',
    { minScore: 0.95, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['categories:seo'], [
    'error',
    { minScore: 0.95, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['largest-contentful-paint'], [
    'error',
    { maxNumericValue: 3000, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['cumulative-layout-shift'], [
    'error',
    { maxNumericValue: 0.1, aggregationMethod: 'median-run' },
  ]);
  assert.deepEqual(assertions['total-blocking-time'], [
    'error',
    { maxNumericValue: 300, aggregationMethod: 'median-run' },
  ]);
});

test('Lighthouse reports remain private CI artifacts', () => {
  assert.equal(config.ci.upload.target, 'filesystem');
  assert.equal(config.ci.upload.outputDir, './artifacts/lighthouse');
});
