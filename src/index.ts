/* eslint-disable n/no-missing-import */
import type { ESLint, Linter } from 'eslint'
import base_rules from './base-rule'
import json_rules from './json-rule'
import markdown_rules from './markdown-rule'
import react_rules from './react-rule'
import ts_rules from './ts-rule'
import yml_rules from './yml-rule'
interface LiouConfig {
  ts?: boolean
  ignores?: string[]
  plugins?: ESLint.Plugin[]
  rules?: Linter.RulesRecord
  react?: boolean
  json?: boolean
  markdown?: boolean
  yml?: boolean
}

export default async function (liou_config: LiouConfig, ...rest: Linter.Config[]) {
  const default_config: LiouConfig = {
    ts: true,
    react: true,
    markdown: true,
    json: true,
    yml:true,
    ignores: [],
    plugins: [],
    rules: {},
  }

  const config = { ...default_config, ...liou_config }
  const eslint_config: Linter.Config[] = []

  // ignores
  eslint_config.push({
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '*.min.*',
      '**/CHANGELOG.md',
      '**/dist',
      '**/LICENSE*',
      '**/output',
      '**/public',
      '!.github',
      '!.vscode',
      ...config?.ignores || [],
    ],
  })

  // js base
  eslint_config.push(...base_rules)
  console.log('config', config)
  // ts
  if (config?.ts)
    eslint_config.push(...ts_rules)

  // json
  if (config?.json)
    eslint_config.push(...json_rules)

  // md
  if (config?.markdown)
    eslint_config.push(...markdown_rules)

  // react
  if (config?.react)
    eslint_config.push(...react_rules)

  // yml
  if (config?.yml)
    eslint_config.push(...yml_rules)

  // additional rules
  if (config?.rules)
    eslint_config.push({ rules: config.rules })

  // additional configs
  if (rest.length > 0)
    eslint_config.push(...rest)

  console.log('eslint_config', eslint_config)

  return eslint_config
}
