import type { Linter } from 'eslint'
import eslintPluginYml from 'eslint-plugin-yml'

const YmlPreset: Linter.Config[] = [
  ...eslintPluginYml.configs['flat/standard'],
  {
    files: ['**/*.yml', '**/*.yaml'],
    rules: {
      'yml/spaced-comment': 'error',
      // TODO: Add spaced-comment rule to eslint-plugin-yml
      '@stylistic/spaced-comment': 'off',
      '@stylistic/no-multi-spaces': 'off',
    },
  },
]
export default YmlPreset
