import markdown from '@eslint/markdown'
import type { Linter } from 'eslint'
export default [
  {
    name: 'liou/markdown/setup',
    plugins: {
      markdown,
    },
  },
  {
    files: ['**/*.md/*.*'],
    languageOptions: {
      parser: {
        meta: {
          name: 'parser-plain',
        },
        parseForESLint: (code: string) => ({
          ast: {
            body: [],
            comments: [],
            loc: { end: code.length, start: 0 },
            range: [0, code.length],
            tokens: [],
            type: 'Program',
          },
          scopeManager: null,
          services: { isPlain: true },
          visitorKeys: {
            Program: [],
          },
        }),
      },
    },
    name: 'liou/markdown/rules',
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'import/no-unresolved': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
] as Linter.Config[]
