import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      exclude: ['src/entrypoints/**', 'html/**', 'tests/**'],
      reportsDirectory: './html/coverage',
    },
    globalSetup: './tests/utils/global-setup.ts',
    reporters: ['default', 'html'],
  },
});
