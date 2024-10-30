import type { Linter } from 'eslint'
import react from 'eslint-plugin-react'
import ReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [{
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  plugins: {
    react,
    'react-hooks': ReactHooks,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
    },
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    'react': {
      version: 'detect',
    },
  },
  rules: {
    // off
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'react/jsx-boolean-value': 'error',

    'react/sort-prop-types': 'error',
    'react/sort-comp': 'error',

    // code style
    // 'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens',
      return: 'parens-new-line',
      arrow: 'parens',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
    }],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      // "beforeSelfClosing": "allow",
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-closing-bracket-location': ['error'],
    'react/jsx-max-props-per-line': ['error', { maximum: 2 }],
    'react/void-dom-elements-no-children': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

  },
},
] as Linter.Config[]
