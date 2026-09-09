import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { chromium } from '@playwright/test';
import { scenarios, wcagTags } from './axe-audit-config.mjs';

const axeSourcePath = process.env.AXE_SOURCE_PATH?.trim();
if (!axeSourcePath) {
  throw new Error('AXE_SOURCE_PATH is required');
}

const baseUrl = new URL(process.env.A11Y_BASE_URL?.trim() || 'http://127.0.0.1:4322/');
const axeSource = await readFile(axeSourcePath, 'utf8');

const browser = await chromium.launch({ headless: true });
const failures = [];

try {
  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: scenario.viewport,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const url = new URL(scenario.route.replace(/^\//, ''), baseUrl).href;

    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: axeSource });

      const result = await page.evaluate(async (tags) => {
        return await window.axe.run(document, {
          runOnly: { type: 'tag', values: tags },
          resultTypes: ['violations'],
        });
      }, wcagTags);

      if (result.violations.length === 0) {
        console.log(`AXE PASS ${scenario.name}`);
        continue;
      }

      for (const violation of result.violations) {
        const targets = violation.nodes
          .flatMap((node) => node.target)
          .map((target) => String(target))
          .join(', ');
        failures.push({ scenario: scenario.name, violation, targets });
        console.error(
          `AXE FAIL ${scenario.name}: ${violation.id} [${violation.impact ?? 'unknown'}] ${violation.help} :: ${targets}`,
        );
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error(`${failures.length} accessibility violation group(s) found.`);
  process.exitCode = 1;
} else {
  console.log(`${scenarios.length} accessibility scenario(s) passed.`);
}
