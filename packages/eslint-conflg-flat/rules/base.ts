import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import stylisticPluginJs from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPromise from 'eslint-plugin-promise'
import globals from 'globals'

const nodeRecommended = nodePlugin.configs['flat/mixed-esm-and-cjs']
nodeRecommended.forEach(config => delete config.languageOptions?.sourceType)

const basePresetCreator = (styleOptions: StylisticCustomizeOptions): Linter.Config[] => {
  return [
    js.configs.recommended,
    importPlugin.flatConfigs.recommended,
    pluginPromise.configs['flat/recommended'],
    nodePlugin.configs['flat/recommended-script'],
    stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: false,
      jsx: false,
      ...styleOptions,
    }),

    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },

    {
      plugins: {
        stylistic: stylisticPluginJs,
      },
      // files: ['**/*mjs', '**/*js', '**/*cjs', '**/*jsx', '**/*tsx', '**/*.ts'],
      rules: {
        // import
        'import/first': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-unresolved': 'off',
        'import/no-absolute-path': 'off',
        'import/order': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/namespace': 'off',

        // style
        'space-infix-ops': ['error'],
        // 'space-before-blocks': ['error'],
        // 'keyword-spacing': ['error'],
        // 'space-before-function-paren': ['error'],
        // 'space-in-parens': ['error', 'never'],
        // 'comma-spacing': ['error', { before: false, after: true }],
        // 'comma-style': ['error', 'last'],
        // 'comma-dangle': ['error', 'always-multiline'],
        // 'func-call-spacing': ['off', 'never'],
        // 'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        // 'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        // 'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
        '@stylistic/space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
          },
        ],

        // Common
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'quote-props': ['error', 'consistent-as-needed'],
        'no-unused-vars': 'error',
        'no-param-reassign': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'block-spacing': ['error', 'always'],
        'camelcase': 'off',

        'no-constant-condition': 'warn',
        'no-debugger': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-cond-assign': ['error', 'always'],

        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'object-curly-spacing': ['error', 'always'],
        'no-return-await': 'off',

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
        '@stylistic/spaced-comment': ['error', 'always', {
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
        'stylistic/linebreak-style': ['error', 'unix'],
        'promise/always-return': 'off',

        // best-practice
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'consistent-return': 'off',
        'complexity': ['off', 11],
        'eqeqeq': ['error', 'smart'],
        'no-alert': 'warn',
        'no-case-declarations': 'error',
        'no-multi-str': 'error',
        'no-with': 'error',
        'vars-on-top': 'error',
        'require-await': 'off',
        'no-return-assign': 'off',
        'operator-linebreak': ['error', 'before'],
        'no-use-before-define': 'off',
        'eslint-comments/disable-enable-pair': 'off',

        'n/no-callback-literal': 'off',
        'n/no-unpublished-import': 'off',
        'n/no-extraneous-import': 'off',
        'n/no-missing-import': 'off',
        'n/no-process-exit': 'off',
        'n/no-unpublished-require': 'off',
        'n/no-unsupported-features/node-builtins': ['error', {
          // version: '>=18.0.0',
          // ignores: [],
        }],
        'sort-imports': 'off',
        'promise/param-names': 'off',
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
            'reflect-metadata',
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
          customGroups: {
            value: {
              'reflect-metadata': 'reflect-metadata',
            },
          },
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

  ]
}

export default basePresetCreator
