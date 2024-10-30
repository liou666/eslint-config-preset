import type { Linter } from 'eslint'
import eslintPluginYml from 'eslint-plugin-yml'

export default [
  ...eslintPluginYml.configs['flat/standard'],
  {
    files: ['**/*.yml', '**/*.yaml'],
    rules: {
      'yml/spaced-comment': 'off',
    },
  },
] as Linter.Config[]
