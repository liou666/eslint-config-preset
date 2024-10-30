import type { Linter } from 'eslint'
import importPlugin from 'eslint-plugin-import'
import js from '@eslint/js'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import { jsoncParser } from 'jsonc-eslint-parser'
import nodePlugin from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import { fixupPluginRules } from '@eslint/compat'

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  pluginPromise.configs['flat/recommended'],
  nodePlugin.configs['flat/recommended-script'],
  {
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs'] },
      },
    },
    rules: {
      // import
      'import/order': 'error',
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
  
      // Common
      'semi': ['error', 'never'],
      'curly': ['error', 'multi-or-nest', 'consistent'],
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'consistent-as-needed'],
      'no-unused-vars': 'warn',
      'no-param-reassign': 'off',
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      'camelcase': 'off',
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-constant-condition': 'warn',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-cond-assign': ['error', 'always'],
      'func-call-spacing': ['off', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
      'no-restricted-syntax': [
        'error',
        'DebuggerStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-return-await': 'off',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
  
      // es6
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      'generator-star-spacing': 'off',
      'spaced-comment': ['error', 'always', {
        line: {
          markers: ['/'],
          exceptions: ['/', '#'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      }],
  
      // best-practice
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'off',
      'complexity': ['off', 11],
      'eqeqeq': ['error', 'smart'],
      'no-alert': 'warn',
      'no-case-declarations': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-with': 'error',
      'no-void': 'error',
      'no-useless-escape': 'off',
      'vars-on-top': 'error',
      'require-await': 'off',
      'no-return-assign': 'off',
      'operator-linebreak': ['error', 'before'],
      'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
      'eslint-comments/disable-enable-pair': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/namespace': 'off',
      'n/no-callback-literal': 'off',
  
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
  },
 
  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['scripts/**/*.*', 'cli.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
 
]as Linter.Config[]
