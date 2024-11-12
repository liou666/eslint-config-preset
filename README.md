# ⚙️ Custom Eslint-Config Preset

>Default rules detect md, yml, yaml, js, ts, json files.

## Usage

### Flat Config

``` bash
pnpm add -D eslint @liou666/eslint-config-flat
```

``` js
// eslint.config.js
import createConfig from '@liou666/eslint-config-flat'
export default createConfig()
```

#### Legacy Config

``` bash
pnpm add -D eslint @liou666/eslint-config
```

``` js
// .eslintrc
{
  "extends": "@liou666"
}
```
