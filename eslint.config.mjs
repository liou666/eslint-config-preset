import Configg from '@antfu/eslint-config'
import js from '@eslint/js'
import markdown from '@eslint/markdown'
import stylistic from '@stylistic/eslint-plugin'
import stylisticPluginJs from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import nodePlugin from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginPromise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import ReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginYml from 'eslint-plugin-yml'
import globals from 'globals'
import jsoncParser from 'jsonc-eslint-parser'
// export default liou()
import tseslint from 'typescript-eslint'

const nodeRecommended = nodePlugin.configs['flat/mixed-esm-and-cjs']

nodeRecommended.forEach(config => delete config.languageOptions?.sourceType)
import liou from './dist/index.js'
// export default [
//   js.configs.recommended,
//   pluginPromise.configs['flat/recommended'],
//   importPlugin.flatConfigs.recommended,
//   nodePlugin.configs['flat/recommended-script'],
//   {
//     ignores: [
//       '**/dist',
//       '**/node_modules',
//       '**/package-lock.json',
//       '**/yarn.lock',
//       '**/pnpm-lock.yaml',
//       '*.min.*',
//       '*.d.ts',
//       '**/CHANGELOG.md',
//       '**/dist',
//       '**/LICENSE*',
//       '**/output',
//       '**/public',
//       '!.github',
//       '!.vscode',
//     ],
//   },

//   // js
//   stylistic.configs.customize({
//     indent: 2,
//     quotes: 'single',
//     semi: false,
//     jsx: true,
//   }),
//   {
//     plugins: {
//       stylistic: stylisticPluginJs,
//     },
//     // files: ['**/*mjs', '**/*js', '**/*cjs', '**/*jsx', '**/*tsx', '**/*.ts'],
//     rules: {
//       // import
//       'import/order': 'error',
//       'import/first': 'error',
//       'import/no-mutable-exports': 'error',
//       'import/no-unresolved': 'off',
//       'import/no-absolute-path': 'off',

//       'space-infix-ops': ['error'],
//       'space-before-blocks': ['error'],
//       'keyword-spacing': ['error'],
//       // 'space-before-function-paren': ['error'],
//       'space-in-parens': ['error', 'never'],

//       // Common
//       // 'semi': ['error', 'never'],
//       'curly': ['error', 'multi-or-nest', 'consistent'],
//       // 'quotes': ['error', 'single'],
//       'quote-props': ['error', 'consistent-as-needed'],
//       'no-unused-vars': 'error',
//       'no-param-reassign': 'off',
//       'array-bracket-spacing': ['error', 'never'],
//       'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
//       'block-spacing': ['error', 'always'],
//       'camelcase': 'off',
//       'comma-spacing': ['error', { before: false, after: true }],
//       'comma-style': ['error', 'last'],
//       'comma-dangle': ['error', 'always-multiline'],
//       'no-constant-condition': 'warn',
//       'no-debugger': 'error',
//       'no-console': ['warn', { allow: ['warn', 'error'] }],
//       'no-cond-assign': ['error', 'always'],
//       'func-call-spacing': ['off', 'never'],
//       'key-spacing': ['error', { beforeColon: false, afterColon: true }],
//       // 'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
//       'no-restricted-syntax': [
//         'error',
//         'DebuggerStatement',
//         'LabeledStatement',
//         'WithStatement',
//       ],
//       'object-curly-spacing': ['error', 'always'],
//       'no-return-await': 'off',
//       'space-before-function-paren': [
//         'error',
//         {
//           anonymous: 'always',
//           named: 'never',
//           asyncArrow: 'always',
//         },
//       ],
//       'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],

//       // es6
//       'no-var': 'error',
//       'prefer-const': [
//         'error',
//         {
//           destructuring: 'any',
//           ignoreReadBeforeAssign: true,
//         },
//       ],
//       'prefer-arrow-callback': [
//         'error',
//         {
//           allowNamedFunctions: false,
//           allowUnboundThis: true,
//         },
//       ],
//       'object-shorthand': [
//         'error',
//         'always',
//         {
//           ignoreConstructors: false,
//           avoidQuotes: true,
//         },
//       ],
//       'prefer-exponentiation-operator': 'error',
//       'prefer-rest-params': 'error',
//       'prefer-spread': 'error',
//       'prefer-template': 'error',
//       'template-curly-spacing': 'error',
//       'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
//       'generator-star-spacing': 'off',
//       'spaced-comment': ['error', 'always', {
//         line: {
//           markers: ['/'],
//           exceptions: ['/', '#'],
//         },
//         block: {
//           markers: ['!'],
//           exceptions: ['*'],
//           balanced: true,
//         },
//       }],

//       // best-practice
//       'array-callback-return': 'error',
//       'block-scoped-var': 'error',
//       'consistent-return': 'off',
//       'complexity': ['off', 11],
//       'eqeqeq': ['error', 'smart'],
//       'no-alert': 'warn',
//       'no-case-declarations': 'error',
//       'no-multi-spaces': 'error',
//       'no-multi-str': 'error',
//       'no-with': 'error',
//       'no-void': 'error',
//       'no-useless-escape': 'off',
//       'vars-on-top': 'error',
//       'require-await': 'off',
//       'no-return-assign': 'off',
//       'operator-linebreak': ['error', 'before'],
//       'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
//       'eslint-comments/disable-enable-pair': 'off',
//       'import/no-named-as-default-member': 'off',
//       'import/no-named-as-default': 'off',
//       'import/namespace': 'off',
//       'n/no-callback-literal': 'off',
//       'n/no-unpublished-import': 'off',
//       'n/no-extraneous-import': 'off',
//       'sort-imports': [
//         'error',
//         {
//           ignoreCase: false,
//           ignoreDeclarationSort: true,
//           ignoreMemberSort: false,
//           memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
//           allowSeparatedGroups: false,
//         },
//       ],
//       'stylistic/linebreak-style': ['error', 'unix'],
//     },
//   },
//   {
//     name: 'liou/perfectionist/setup',
//     plugins: {
//       perfectionist: pluginPerfectionist,
//     },
//     rules: {
//       'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
//       'perfectionist/sort-imports': ['error', {
//         groups: [
//           'type',
//           ['parent-type', 'sibling-type', 'index-type'],

//           'builtin',
//           'external',
//           ['internal', 'internal-type'],
//           ['parent', 'sibling', 'index'],
//           'side-effect',
//           'object',
//           'unknown',
//         ],
//         newlinesBetween: 'ignore',
//         order: 'asc',
//         type: 'natural',
//       }],
//       'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
//       'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
//     },
//   },

//   // ts
//   ...tseslint.configs.recommended,
//   {
//     files: [
//       '**/*.ts',
//       '**/*.tsx',
//       '**/*.mts',
//       '**/*.cts',
//     ],
//     rules: {
//       'import/named': 'off',
//       // TS
//       '@typescript-eslint/ban-ts-comment': ['off'],
//       '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
//       '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
//       '@typescript-eslint/prefer-ts-expect-error': 'error',
//       '@typescript-eslint/no-explicit-any': 'off',
//       // '@typescript-eslint/indent': ['error', 2],
//       // Override JS
//       // 'indent': 'off',
//       'no-unused-vars': 'error',
//       'space-infix-ops': 'off',
//       // 'keyword-spacing': 'off',
//       'no-extra-parens': 'off',
//       'no-dupe-class-members': 'off',
//       'no-loss-of-precision': 'off',
//       'lines-between-class-members': 'off',
//       'no-array-constructor': 'off',

//     },
//   },
//   // json
//   {
//     name: 'liou/jsonc/setup',
//     plugins: {
//       jsonc: eslintPluginJsonc,
//     },
//   },
//   {
//     files: ['**/*.json', '**/*.json5'],
//     languageOptions: {
//       parser: jsoncParser,
//     },
//     name: 'liou/jsonc/rules',
//     rules: {
//       'jsonc/no-bigint-literals': 'error',
//       'jsonc/no-binary-expression': 'error',
//       'jsonc/no-binary-numeric-literals': 'error',
//       'jsonc/no-dupe-keys': 'error',
//       'jsonc/no-escape-sequence-in-identifier': 'error',
//       'jsonc/no-floating-decimal': 'error',
//       'jsonc/no-hexadecimal-numeric-literals': 'error',
//       'jsonc/no-infinity': 'error',
//       'jsonc/no-multi-str': 'error',
//       'jsonc/no-nan': 'error',
//       'jsonc/no-number-props': 'error',
//       'jsonc/no-numeric-separators': 'error',
//       'jsonc/no-octal': 'error',
//       'jsonc/no-octal-escape': 'error',
//       'jsonc/no-octal-numeric-literals': 'error',
//       'jsonc/no-parenthesized': 'error',
//       'jsonc/no-plus-sign': 'error',
//       'jsonc/no-regexp-literals': 'error',
//       'jsonc/no-sparse-arrays': 'error',
//       'jsonc/no-template-literals': 'error',
//       'jsonc/no-undefined-value': 'error',
//       'jsonc/no-unicode-codepoint-escapes': 'error',
//       'jsonc/no-useless-escape': 'error',
//       'jsonc/space-unary-ops': 'error',
//       'jsonc/valid-json-number': 'error',
//       'jsonc/vue-custom-block/no-parsing-error': 'error',
//       'jsonc/array-bracket-spacing': ['error', 'never'],
//       'jsonc/comma-dangle': ['error', 'never'],
//       'jsonc/comma-style': ['error', 'last'],
//       'jsonc/indent': ['error', 2],
//       'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
//       'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
//       'jsonc/object-curly-spacing': ['error', 'always'],
//       'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
//       'jsonc/quote-props': 'error',
//       'jsonc/quotes': 'error',

//     },
//   },
//   {
//     files: ['package.json'],
//     languageOptions: {
//       parser: jsoncParser, // Set this parser.
//     },
//     rules: {
//       'jsonc/sort-keys': [
//         'error',
//         {
//           pathPattern: '^$',
//           order: [
//             'publisher',
//             'name',
//             'displayName',
//             'type',
//             'version',
//             'private',
//             'packageManager',
//             'description',
//             'author',
//             'license',
//             'funding',
//             'homepage',
//             'repository',
//             'bugs',
//             'keywords',
//             'categories',
//             'sideEffects',
//             'exports',
//             'main',
//             'module',
//             'unpkg',
//             'jsdelivr',
//             'types',
//             'typesVersions',
//             'bin',
//             'icon',
//             'files',
//             'engines',
//             'activationEvents',
//             'contributes',
//             'scripts',
//             'peerDependencies',
//             'peerDependenciesMeta',
//             'dependencies',
//             'optionalDependencies',
//             'devDependencies',
//             'pnpm',
//             'overrides',
//             'resolutions',
//             'husky',
//             'simple-git-hooks',
//             'lint-staged',
//             'eslintConfig',
//           ],
//         },
//         {
//           pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
//           order: { type: 'asc' },
//         },
//         {
//           pathPattern: '^exports.*$',
//           order: [
//             'types',
//             'require',
//             'import',
//           ],
//         },
//       ],
//     },
//   },
//   // md
//   {
//     plugin: {
//       markdown,
//     },
//     files: ['**/*.md'],
//     languageOptions: {
//       parser: {
//         meta: {
//           name: 'parser-plain',
//         },
//         parseForESLint: code => ({
//           ast: {
//             body: [],
//             comments: [],
//             loc: { end: code.length, start: 0 },
//             range: [0, code.length],
//             tokens: [],
//             type: 'Program',
//           },
//           scopeManager: null,
//           services: { isPlain: true },
//           visitorKeys: {
//             Program: [],
//           },
//         }),
//       },
//     },
//     name: 'liou/markdown/rules',
//     rules: {
//       '@typescript-eslint/no-redeclare': 'off',
//       '@typescript-eslint/no-unused-vars': 'off',
//       '@typescript-eslint/no-use-before-define': 'off',
//       '@typescript-eslint/no-var-requires': 'off',
//       '@typescript-eslint/comma-dangle': 'off',
//       'import/no-unresolved': 'off',
//       'no-alert': 'off',
//       'no-console': 'off',
//       'no-restricted-imports': 'off',
//       'no-undef': 'off',
//       'no-unused-expressions': 'off',
//       'no-unused-vars': 'off',
//     },
//   },

//   // react
//   {
//     files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
//     plugins: {
//       react,
//       'react-hooks': ReactHooks,
//     },
//     languageOptions: {
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: {
//         ...globals.browser,
//       },
//     },
//     settings: {
//       'import/resolver': {
//         node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
//       },
//       'react': {
//         version: 'detect',
//       },
//     },
//     rules: {
//       // off
//       'react/prop-types': 'off',
//       'react/jsx-curly-brace-presence': 'error',
//       'react/jsx-uses-react': 'off',
//       'react/react-in-jsx-scope': 'off',

//       'react/jsx-boolean-value': 'error',

//       'react/sort-prop-types': 'error',
//       'react/sort-comp': 'error',

//       // code style
//       // 'jsx-quotes': ['error', 'prefer-single'],
//       'react/jsx-indent-props': [2, 2],
//       'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
//       'react/jsx-first-prop-new-line': 'error',
//       'react/jsx-newline': ['error', { prevent: true }],
//       'react/jsx-closing-tag-location': 'error',
//       'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
//       'react/jsx-wrap-multilines': ['error', {
//         declaration: 'parens-new-line',
//         assignment: 'parens',
//         return: 'parens-new-line',
//         arrow: 'parens',
//         condition: 'ignore',
//         logical: 'ignore',
//         prop: 'ignore',
//       }],
//       'react/jsx-tag-spacing': ['error', {
//         closingSlash: 'never',
//         // "beforeSelfClosing": "allow",
//         afterOpening: 'never',
//         beforeClosing: 'never',
//       }],
//       'react/self-closing-comp': [
//         'error',
//         {
//           component: true,
//           html: true,
//         },
//       ],
//       'react/jsx-no-constructed-context-values': 'error',
//       'react/jsx-closing-bracket-location': ['error'],
//       'react/jsx-max-props-per-line': ['error', { maximum: 2 }],
//       'react/void-dom-elements-no-children': 'error',

//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'warn',

//     },
//   },

//   // yml
//   ...eslintPluginYml.configs['flat/standard'],
//   {
//     files: ['**/*.yml', '**/*.yaml'],
//     rules: {
//       'yml/spaced-comment': 'off',
//     },
//   },

// ]

// export default Configg()
