import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Astro site URL is required to generate robots.txt');

  const base = import.meta.env.BASE_URL;
  const home = new URL(base, site);
  const sitemap = new URL('sitemap-index.xml', home);
  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
