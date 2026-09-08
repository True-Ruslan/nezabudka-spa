module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/avtopodbor/',
      ],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          { minScore: 0.85, aggregationMethod: 'median-run' },
        ],
        'categories:accessibility': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:best-practices': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:seo': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'largest-contentful-paint': [
          'error',
          { maxNumericValue: 3000, aggregationMethod: 'median-run' },
        ],
        'cumulative-layout-shift': [
          'error',
          { maxNumericValue: 0.1, aggregationMethod: 'median-run' },
        ],
        'total-blocking-time': [
          'error',
          { maxNumericValue: 300, aggregationMethod: 'median-run' },
        ],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './artifacts/lighthouse',
    },
  },
};
