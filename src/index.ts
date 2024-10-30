import type { ESLint, Linter } from 'eslint'
import base_rules from './base-rule'
import ts_rules from './ts-rule'
import react_rules from './react-rule'
import markdown_rules from './markdown-rule'
import json_rules from './json-rule'

interface LiouConfig {
    ts?: boolean
    ignores?: string[]
    plugins?: ESLint.Plugin[]
    rules?: Linter.RulesRecord
    react?: boolean
    json?: boolean
    markdown?: boolean
}

export default async function (liou_config: LiouConfig = {
    ts: true,
    react: true,
    markdown: true,
    json: true,
    ignores: [],
    plugins: [],
    rules: {},
}, ...rest: Linter.Config[]) {

    const config = liou_config
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
          '*.d.ts',
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

    // js base md json ...
    eslint_config.push(...base_rules)

    // ts
    if (config?.ts) 
        eslint_config.push(...ts_rules) 

    // md 
    if (config?.markdown) 
        eslint_config.push(...markdown_rules)
    if (config?.json) 
        eslint_config.push(...json_rules)
  
  // react
  if (config?.react)  
    eslint_config.push(...react_rules)

    // additional rules
    if (config?.rules) 
        eslint_config.push({ rules: config.rules })

    // additional configs
    if (rest.length > 0) 
        eslint_config.push(...rest)

    return eslint_config
}
