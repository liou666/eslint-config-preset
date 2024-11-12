import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import astroRules from './rules/astro'
import basePresetCreator from './rules/base'
import jsonRules from './rules/json'
import markdownRules from './rules/markdown'
import reactRules from './rules/react'
import tsRules from './rules/typescript'
import ymlRules from './rules/yml'

interface CustomConfig {
  /**
   * Custom files to ignore eslint
   * @default
   * [
   *   'dist', 'node_modules', 'package-lock.json',
   *   'yarn.lock', 'pnpm-lock.yaml', '*.min.*',
   *   'CHANGELOG.md', 'LICENSE', 'output',
   *   'public', '!.github', '!.vscode'
   * ]
   */
  ignores?: string[]

  /**
   * Custom style options
   * @default
   * {
   *  indent: 2,
   *  quotes: 'single',
   *  semi: false,
   *  jsx: false,
   * }
   */
  style?: StylisticCustomizeOptions

  /**
   * Custom plugins, will merge with existing rules
   */
  plugins?: ESLint.Plugin[]

  /**
   * Custom lint rules, will merge with existing rules
   */
  rules?: Linter.RulesRecord

  /**
   * Enable TypeScript rules for `.ts` and `.tsx` files
    */
  ts?: boolean

  /**
   * Enable React rules for `.jsx`, and `.tsx` files
   * @default true
   */
  react?: boolean

  /**
   * Enable JSON rules for `.json` `.json5` files
   * @default true
   */
  json?: boolean

  /**
   * Enable Markdown rules for `.md` and `.mdx` files
   * @default true
   */
  markdown?: boolean

  /**
     * Enable YML rules for `.yml` and `.yaml` files
     * @default true
     */
  yml?: boolean

  /**
   * Enable Astro rules for `.astro` files
   * @default false
   */
  astro?: boolean
}

const DEFAULT_IGNORES = [
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
]

const DEFAULT_CONFIG: CustomConfig = {
  ts: true,
  react: true,
  markdown: true,
  json: true,
  yml: true,
  astro: false,
  ignores: [],
  plugins: [],
  rules: {},
}

/**
 * Create ESLint configurations.
 * @param userConfig - Custom configuration
 * @param additionalConfigs - Additional configurations
 */
export default function createConfig(userConfig: CustomConfig = {}, ...additionalConfigs: Linter.Config[]) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }
  const eslintConfig: Linter.Config[] = []
  const baseRules = basePresetCreator(userConfig.style || {})

  // Add ignores
  eslintConfig.push({
    ignores: [...DEFAULT_IGNORES, ...(config.ignores || [])],
  })

  // Add rule configurations based on enabled features
  const ruleConfigs = {
    base: baseRules,
    ts: config.ts && tsRules,
    json: config.json && jsonRules,
    markdown: config.markdown && markdownRules,
    react: config.react && reactRules,
    yml: config.yml && ymlRules,
    astro: config.astro && astroRules,
  }

  // Filter out disabled configurations and flatten the array
  Object.values(ruleConfigs)
    .filter(Boolean)
    .forEach(rules => eslintConfig.push(...(rules as Linter.Config[])))

  // Add custom rules if provided
  if (config.rules && Object.keys(config.rules).length > 0)
    eslintConfig.push({ rules: config.rules })

  // Add additional configs
  if (additionalConfigs.length > 0)
    eslintConfig.push(...additionalConfigs)

  return eslintConfig
}
