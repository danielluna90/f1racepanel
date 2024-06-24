// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import tsdoc from 'eslint-plugin-tsdoc';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,
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
    }
  }
);
