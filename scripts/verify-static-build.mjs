import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const distRoot = path.resolve('dist');
const defaultOrigin = 'https://true-ruslan.github.io';
const defaultBasePath = '/nezabudka-spa';
const hasExplicitBasePath = Object.prototype.hasOwnProperty.call(process.env, 'BASE_PATH');
const siteOrigin = (process.env.SITE_ORIGIN?.trim() || defaultOrigin).replace(/\/+$/, '');
const basePath = normalizeBasePath(hasExplicitBasePath ? process.env.BASE_PATH ?? '' : defaultBasePath);
const expectedHomeCanonical = `${siteOrigin}${basePath === '/' ? '/' : `${basePath}/`}`;
const ignoredScheme = /^(?:https?:|mailto:|tel:|data:|javascript:)/i;
const attributePattern = /\b(?:href|src)=(?:"([^"]*)"|'([^']*)')/gi;
const linkTagPattern = /<link\b[^>]*>/gi;
const relAttributePattern = /\brel=(?:"([^"]*)"|'([^']*)')/i;
const hrefAttributePattern = /\bhref=(?:"([^"]*)"|'([^']*)')/i;
const errors = [];

function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function isLocalReference(value) {
  return Boolean(
    value &&
      !value.startsWith('#') &&
      !value.startsWith('//') &&
      !ignoredScheme.test(value),
  );
}

function stripQueryAndHash(value) {
  return value.split(/[?#]/, 1)[0];
}

function extractCanonicalHref(html) {
  for (const match of html.matchAll(linkTagPattern)) {
    const tag = match[0];
    const relMatch = tag.match(relAttributePattern);
    const rel = relMatch?.[1] ?? relMatch?.[2] ?? '';
    if (!rel.split(/\s+/).includes('canonical')) continue;

    const hrefMatch = tag.match(hrefAttributePattern);
    return hrefMatch?.[1] ?? hrefMatch?.[2] ?? null;
  }
  return null;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(absolutePath, relativePath)));
    else files.push(relativePath);
  }

  return files;
}

function pageUrlForHtml(relativeHtmlPath) {
  if (relativeHtmlPath === 'index.html') return `${expectedHomeCanonical}`;
  if (relativeHtmlPath === '404.html') return `${expectedHomeCanonical}404.html`;

  const routePath = relativeHtmlPath.endsWith('/index.html')
    ? relativeHtmlPath.slice(0, -'index.html'.length)
    : relativeHtmlPath;
  return new URL(routePath, expectedHomeCanonical).href;
}

function toDistCandidate(reference, sourceHtmlPath) {
  const cleanReference = stripQueryAndHash(reference);
  if (!cleanReference) return null;

  const sourceUrl = pageUrlForHtml(sourceHtmlPath);
  const resolved = new URL(cleanReference, sourceUrl);

  if (resolved.origin !== new URL(siteOrigin).origin) return null;

  let pathname = decodeURIComponent(resolved.pathname);
  if (basePath !== '/') {
    if (pathname === basePath) pathname = '/';
    else if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
    else return { invalidBasePath: pathname };
  }

  pathname = pathname.replace(/^\/+/, '');
  if (!pathname) return 'index.html';
  if (pathname.endsWith('/')) return `${pathname}index.html`;

  const extension = path.posix.extname(pathname);
  return extension ? pathname : `${pathname}/index.html`;
}

function extractLocalReferences(html) {
  const refs = [];
  for (const match of html.matchAll(attributePattern)) {
    const value = match[1] ?? match[2] ?? '';
    if (isLocalReference(value)) refs.push(value);
  }
  return refs;
}

const requiredFiles = ['index.html', '404.html'];
for (const requiredFile of requiredFiles) {
  if (!(await exists(path.join(distRoot, requiredFile)))) {
    errors.push(`Missing required generated file: dist/${requiredFile}`);
  }
}

if (await exists(distRoot)) {
  const files = await collectFiles(distRoot);
  const fileSet = new Set(files);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  for (const htmlFile of htmlFiles) {
    const html = await readFile(path.join(distRoot, htmlFile), 'utf8');
    for (const reference of extractLocalReferences(html)) {
      const candidate = toDistCandidate(reference, htmlFile);
      if (!candidate) continue;
      if (typeof candidate === 'object' && candidate.invalidBasePath) {
        errors.push(
          `${htmlFile}: local reference escapes configured base path ${basePath}: ${reference}`,
        );
        continue;
      }
      if (!fileSet.has(candidate)) {
        errors.push(`${htmlFile}: broken local reference ${reference} -> dist/${candidate}`);
      }
    }
  }

  if (fileSet.has('cases/case-template/index.html')) {
    errors.push('Unpublished template leaked into public output: dist/cases/case-template/index.html');
  }
}

if (await exists(path.join(distRoot, 'index.html'))) {
  const homeHtml = await readFile(path.join(distRoot, 'index.html'), 'utf8');
  const canonicalHref = extractCanonicalHref(homeHtml);
  if (canonicalHref !== expectedHomeCanonical) {
    errors.push(`Homepage canonical is not ${expectedHomeCanonical}`);
  }
}

if (errors.length > 0) {
  console.error(`Static build verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Static build verification passed (${basePath === '/' ? 'root' : basePath} @ ${siteOrigin}).`,
  );
}
