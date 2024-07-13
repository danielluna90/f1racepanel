import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['src/entrypoints/**'],
    },
    globalSetup: './tests/utils/global-setup.ts',
  },
});
