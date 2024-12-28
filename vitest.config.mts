import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'tests',
    coverage: {
      enabled: true,
      provider: 'istanbul',
      exclude: [
        'packages/**',
        'packages-old/**',
        'src/client/**',
        'src/integrations/**',
        'scripts/**',
        'tests/**',
        'html/**',
        '*.{mjs,ts}',
      ],
      reportsDirectory: './html/coverage',
    },
    reporters: ['default', 'html'],
  },
});
