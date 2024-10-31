import type { Linter } from 'eslint'
import eslintPluginYml from 'eslint-plugin-yml'

const YmlPreset: Linter.Config[] = [
  ...eslintPluginYml.configs['flat/standard'],
  {
    files: ['**/*.yml', '**/*.yaml'],
    rules: {
      'yml/spaced-comment': 'off',
    },
  },
]
export default YmlPreset
