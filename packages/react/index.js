const baseConfig = require('@liou666/eslint-config-ts')

module.exports = {
  extends: [
    '@liou666/eslint-config-ts',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    'react': {
      version: 'detect',
    },
  },
  overrides: baseConfig.overrides,
  rules: {

    // off
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-boolean-value': 'error',
    'react/jsx-tag-spacing': 'error',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'error',

  },
}
