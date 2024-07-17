import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      exclude: [
        'src/entrypoints/**',
        'src/static/**',
        'html/**',
        'tests/**',
        'out-src/**',
      ],
      reportsDirectory: './html/coverage',
    },
    globalSetup: './tests/utils/global-setup.ts',
    reporters: ['default', 'html'],
  },
  resolve: {
    alias: {
      driver: '/src/driver',
      search: '/src/search',
      lib: '/src/lib',
    },
  },
});
