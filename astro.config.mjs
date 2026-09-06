import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const rawDomain = process.env.CUSTOM_DOMAIN?.trim() ?? '';
const customDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '');
const hasCustomDomain = customDomain.length > 0;

const explicitSiteOrigin = process.env.SITE_ORIGIN?.trim().replace(/\/+$/, '') ?? '';
const hasExplicitSiteOrigin = explicitSiteOrigin.length > 0;
const hasExplicitBasePath = Object.prototype.hasOwnProperty.call(process.env, 'BASE_PATH');
const rawBasePath = process.env.BASE_PATH?.trim() ?? '';

const normalizeBasePath = (value) => {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
};

const site = hasExplicitSiteOrigin
  ? explicitSiteOrigin
  : hasCustomDomain
    ? `https://${customDomain}`
    : 'https://true-ruslan.github.io';

const base = hasExplicitBasePath
  ? normalizeBasePath(rawBasePath)
  : hasExplicitSiteOrigin || hasCustomDomain
    ? '/'
    : '/nezabudka-spa';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
