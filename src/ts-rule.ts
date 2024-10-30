import type { Linter } from 'eslint'
import tseslint from 'typescript-eslint'
export default [
  // ts
  ...tseslint.configs.recommended,
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.mts',
      '**/*.cts',
    ],
    rules: {
      'import/named': 'off',
      // TS
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-ts-expect-error': 'error',

      // Override JS
      // 'indent': 'off',

      'space-infix-ops': 'off',
      'keyword-spacing': 'off',
      'comma-spacing': 'off',
      'no-extra-parens': 'off',
      'no-dupe-class-members': 'off',
      'no-loss-of-precision': 'off',
      'lines-between-class-members': 'off',

      // off
      // '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
] as Linter.Config[]
