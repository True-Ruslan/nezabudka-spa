import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(process.env.CHECK_LINK_ROOT?.trim() || 'dist');
const retries = parseNonNegativeInteger(process.env.CHECK_LINK_RETRIES, 2);
const timeoutMs = parsePositiveInteger(process.env.CHECK_LINK_TIMEOUT_MS, 8000);
const acceptedRestrictedStatuses = new Set([401, 403, 429]);

function parseNonNegativeInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(absolute)));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(absolute);
  }

  return files;
}

function decodeHref(value) {
  return value.replaceAll('&amp;', '&');
}

function extractExternalAnchors(html) {
  const urls = [];
  const anchorPattern = /<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)')[^>]*>/gi;

  for (const match of html.matchAll(anchorPattern)) {
    const href = decodeHref(match[1] ?? match[2] ?? '').trim();
    if (/^https?:\/\//i.test(href)) urls.push(href);
  }

  return urls;
}

function isAcceptedStatus(status) {
  return (status >= 200 && status < 400) || acceptedRestrictedStatuses.has(status);
}

async function request(url, method) {
  return await fetch(url, {
    method,
    redirect: 'follow',
    headers: {
      'user-agent': 'Nepomka-Link-Checker/1.0 (+https://nepomka.ru/)',
      accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
    },
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function probe(url) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      let response = await request(url, 'HEAD');
      if (response.status === 405 || response.status === 501) {
        response = await request(url, 'GET');
      }

      if (isAcceptedStatus(response.status)) {
        return { url, status: response.status, ok: true };
      }

      lastError = new Error(`HTTP ${response.status}`);
      if (response.status >= 400 && response.status < 500) break;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  return {
    url,
    status: null,
    ok: false,
    error: lastError?.message ?? 'unknown network error',
  };
}

async function main() {
  const htmlFiles = await collectHtmlFiles(root);
  const urls = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const url of extractExternalAnchors(html)) urls.add(url);
  }

  const orderedUrls = [...urls].sort();
  const failures = [];

  for (const url of orderedUrls) {
    const result = await probe(url);
    if (result.ok) {
      const note = acceptedRestrictedStatuses.has(result.status) ? ' (reachable, access restricted)' : '';
      console.log(`OK ${result.status} ${url}${note}`);
    } else {
      failures.push(result);
      console.error(`FAIL ${url}: ${result.error}`);
    }
  }

  if (failures.length > 0) {
    console.error(`${failures.length} external link(s) failed out of ${orderedUrls.length}.`);
    process.exitCode = 1;
    return;
  }

  console.log(`${orderedUrls.length} external link(s) checked successfully.`);
}

await main();
