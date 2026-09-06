import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const rawDomain = process.env.CUSTOM_DOMAIN?.trim() ?? '';
const customDomain = rawDomain
  .replace(/^https?:\/\//, '')
  .replace(/\/+$/, '');
const hasCustomDomain = customDomain.length > 0;

export default defineConfig({
  output: 'static',
  site: hasCustomDomain ? `https://${customDomain}` : 'https://true-ruslan.github.io',
  base: hasCustomDomain ? '/' : '/nezabudka-spa',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
