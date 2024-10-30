import type { Linter } from 'eslint'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import stylisticPluginJs from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPromise from 'eslint-plugin-promise'

const nodeRecommended = nodePlugin.configs['flat/mixed-esm-and-cjs']
nodeRecommended.forEach(config => delete config.languageOptions?.sourceType)

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  nodePlugin.configs['flat/recommended-script'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  {
    plugins: {
      stylistic: stylisticPluginJs,
    },
    // files: ['**/*mjs', '**/*js', '**/*cjs', '**/*jsx', '**/*tsx', '**/*.ts'],
    rules: {
      // import
      'import/order': 'error',
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',

      'space-infix-ops': ['error'],
      'space-before-blocks': ['error'],
      'keyword-spacing': ['error'],
      // 'space-before-function-paren': ['error'],
      'space-in-parens': ['error', 'never'],

      // Common
      // 'semi': ['error', 'never'],
      'curly': ['error', 'multi-or-nest', 'consistent'],
      // 'quotes': ['error', 'single'],
      'quote-props': ['error', 'consistent-as-needed'],
      'no-unused-vars': 'error',
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
      // 'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
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
      'n/no-unpublished-import': 'off',
      'n/no-extraneous-import': 'off',
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
      'stylistic/linebreak-style': ['error', 'unix'],
    },
  },
  {
    name: 'liou/perfectionist/setup',
    plugins: {
      perfectionist: pluginPerfectionist,
    },
    rules: {
      'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-imports': ['error', {
        groups: [
          'type',
          ['parent-type', 'sibling-type', 'index-type'],

          'builtin',
          'external',
          ['internal', 'internal-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'object',
          'unknown',
        ],
        newlinesBetween: 'ignore',
        order: 'asc',
        type: 'natural',
      }],
      'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
    },
  },
  {
    files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },

] as Linter.Config[]
