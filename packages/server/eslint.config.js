// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tsdoc from 'eslint-plugin-tsdoc';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'off',
        {
          checksVoidReturn: {
            arguments: false,
          },
        },
      ],
      "sort-imports": "error",
      "camelcase": ["error", {
        properties: "never"
      }]
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettierConfig,
  {
    plugins: {
      tsdoc
    },
    rules: {
      "tsdoc/syntax": "warn"
    },
    ignores: ['src/types/*.ts'] // Ignore Auto Generated Zod Types
  }
);
