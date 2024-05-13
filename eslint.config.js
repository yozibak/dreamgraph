import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import appsync from '@aws-appsync/eslint-plugin'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['frontend/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    plugins: { '@aws-appsync': appsync },
    files: ['backend/**/*.js'],
    rules: appsync.configs.base.rules,
  }
)
