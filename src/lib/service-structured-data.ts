import type { ServicePageConfig } from '../data/service-pages';
import { brand, offers } from '../data/site';

type Offer = (typeof offers)[number];

type Input = Readonly<{
  offer: Offer;
  config: ServicePageConfig;
  site: URL;
  base: string;
}>;

export function buildServiceStructuredData({ offer, config, site, base }: Input) {
  if (!offer.pagePath) {
    throw new Error(`Offer ${offer.id} does not have a service page path`);
  }

  const homeUrl = new URL(base, site).href;
  const serviceUrl = new URL(offer.pagePath, homeUrl).href;

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offer.title,
    description: config.seoDescription,
    areaServed: { '@type': 'City', name: 'Белгород' },
    provider: {
      '@type': 'Person',
      name: brand.person,
      alternateName: brand.name,
      url: homeUrl,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: offer.title, item: serviceUrl },
    ],
  };

  return [service, breadcrumb] as const;
}
