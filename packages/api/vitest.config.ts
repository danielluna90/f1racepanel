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
        'old-src/**',
      ],
      reportsDirectory: './html/coverage',
    },
    globalSetup: './tests/utils/global-setup.ts',
    reporters: ['default', 'html'],
  },
  resolve: {
    alias: {
      client: '/src/circuit',
      driver: '/src/driver',
      search: '/src/search',
      lib: '/src/lib',
    },
  },
});
