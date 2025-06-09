import { defineConfig } from 'eslint/config';
import { default as eslint, default as js } from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

// Clean up globals to remove any whitespace
const cleanGlobals = Object.entries(globals.browser).reduce((acc, [key, value]) => {
  const cleanKey = key.trim();
  return { ...acc, [cleanKey]: value };
}, {});

export default defineConfig([
  {
    ignores: [
      '.react-router/**',
      'build/**',
      'vite.config.ts',
      'vitest.config.ts',
      'eslint.config.js',
      'app/components/ui/**',
      'playwright.config.ts',
      'node_modules/**',
    ],
  },
  {
    plugins: {
      js,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    extends: ['js/recommended'],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...cleanGlobals,
        AudioWorkletGlobalScope: true,
      },
    },
  },
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  react.configs.flat.recommended,
  prettier,
  {
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
