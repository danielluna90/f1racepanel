import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      exclude: [
        'src/entrypoints/**',
        'src/types/prisma/**',
        'src/static/**',
        'html/**',
        'tests/**',
      ],
      reportsDirectory: './html/coverage',
    },
    globalSetup: './tests/utils/global-setup.ts',
    reporters: ['default', 'html'],
  },
  resolve: {
    alias: {
      // circuit: '/src/circuit',
      // driver: '/src/driver',
      // search: '/src/search',
      types: '/src/types',
      lib: '/src/lib',
    },
  },
});
