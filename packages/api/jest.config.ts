import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  verbose: true,

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/entrypoints/**/*.ts',
  ],

  globalSetup: './tests/global/global-setup.ts',
  globalTeardown: './tests/global/global-teardown.ts',
};

export default config;
