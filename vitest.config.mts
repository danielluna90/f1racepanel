import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'tests',
    coverage: {
      enabled: true,
      provider: 'istanbul',
      exclude: [
        'src/client/**',
        'src/integrations/**',
        'tests/**',
        'html/**',
        '*.{mjs,ts}',
      ],
      reportsDirectory: './html/coverage',
    },
    reporters: ['default', 'html'],
  },
});
