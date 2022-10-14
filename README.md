
# @liou666/eslint-config

自定义`eslint-config`预设
+ 单引号，无分号
+ ...

## 用法

### 安装

```bash
pnpm add -D eslint @liou666/eslint-config
```

### 配置 `.eslintrc`
>默认规则检测`md,yml,yaml,js,json`文件,如果要开启ts文件的检测需继承`@liou666/eslint-config-ts`
```json
{
  "extends": "@liou666"
}
```
