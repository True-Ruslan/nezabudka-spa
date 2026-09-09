export const wcagTags = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22a',
  'wcag22aa',
];

const desktopRoutes = [
  '/',
  '/avtopodbor/',
  '/proverka-avto/',
  '/bronirovanie-plenkoy/',
  '/tonirovka/',
];

export const scenarios = [
  ...desktopRoutes.map((route) => ({
    name: `desktop ${route}`,
    route,
    viewport: { width: 1440, height: 1100 },
  })),
  {
    name: 'mobile /',
    route: '/',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'mobile /avtopodbor/',
    route: '/avtopodbor/',
    viewport: { width: 390, height: 844 },
  },
];
