import appsync from '@aws-appsync/eslint-plugin'
import eslint from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['backend/api/src/resolvers/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 2018,
        project: './tsconfig.json',
      },
    },
    plugins: { '@aws-appsync': appsync },
    rules: { ...appsync.configs.recommended.rules, '@typescript-eslint/no-unused-vars': 'warn' },
  },
  {
    ignores: ['.aws-sam/*', '**/build/**/*'],
  }
)
