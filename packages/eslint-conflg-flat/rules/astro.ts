import type { Linter } from 'eslint'
import astroPlugin from 'eslint-plugin-astro'

const astroPreset: Linter.Config[] = [
  ...astroPlugin.configs['flat/recommended'],
  {
    rules: {
      'astro/missing-client-only-directive-value': 'error',
      'astro/no-conflict-set-directives': 'error',
      'astro/no-deprecated-astro-canonicalurl': 'error',
      'astro/no-deprecated-astro-fetchcontent': 'error',
      'astro/no-deprecated-astro-resolve': 'error',
      'astro/no-deprecated-getentrybyslug': 'error',
      'astro/no-set-html-directive': 'off',
      'astro/no-unused-define-vars-in-style': 'error',
      'astro/semi': 'off',
      'astro/valid-compile': 'error',
    },
  },
]
export default astroPreset
