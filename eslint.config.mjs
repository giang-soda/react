import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ['src/*.js', 'src/**/*.js', 'src/*.ts', 'src/**/*.ts', 'src/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'off', // not use var dependency in useEffect []
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: "^_"
        },
      ],
    },
  },
];

export default eslintConfig;
