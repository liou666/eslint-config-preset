import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  format: ['esm'],
  clean: true,
  dts: true,
  esbuildOptions: (options) => {
    options.external = ['path', 'fs', 'os']; 
    options.platform = 'node'; 
  },
})
