var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/configs/eslint-all.js
var require_eslint_all = __commonJS({
  "node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/configs/eslint-all.js"(exports, module) {
    "use strict";
    module.exports = Object.freeze({
      "rules": {
        "accessor-pairs": "error",
        "array-callback-return": "error",
        "arrow-body-style": "error",
        "block-scoped-var": "error",
        "camelcase": "error",
        "capitalized-comments": "error",
        "class-methods-use-this": "error",
        "complexity": "error",
        "consistent-return": "error",
        "consistent-this": "error",
        "constructor-super": "error",
        "curly": "error",
        "default-case": "error",
        "default-case-last": "error",
        "default-param-last": "error",
        "dot-notation": "error",
        "eqeqeq": "error",
        "for-direction": "error",
        "func-name-matching": "error",
        "func-names": "error",
        "func-style": "error",
        "getter-return": "error",
        "grouped-accessor-pairs": "error",
        "guard-for-in": "error",
        "id-denylist": "error",
        "id-length": "error",
        "id-match": "error",
        "init-declarations": "error",
        "logical-assignment-operators": "error",
        "max-classes-per-file": "error",
        "max-depth": "error",
        "max-lines": "error",
        "max-lines-per-function": "error",
        "max-nested-callbacks": "error",
        "max-params": "error",
        "max-statements": "error",
        "new-cap": "error",
        "no-alert": "error",
        "no-array-constructor": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-const-assign": "error",
        "no-constant-binary-expression": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-continue": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-div-regex": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-else-return": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-empty-static-block": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-ex-assign": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-import-assign": "error",
        "no-inline-comments": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "error",
        "no-irregular-whitespace": "error",
        "no-iterator": "error",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-loop-func": "error",
        "no-loss-of-precision": "error",
        "no-magic-numbers": "error",
        "no-misleading-character-class": "error",
        "no-multi-assign": "error",
        "no-multi-str": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-native-nonconstructor": "error",
        "no-new-wrappers": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-obj-calls": "error",
        "no-object-constructor": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-plusplus": "error",
        "no-promise-executor-return": "error",
        "no-proto": "error",
        "no-prototype-builtins": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-exports": "error",
        "no-restricted-globals": "error",
        "no-restricted-imports": "error",
        "no-restricted-properties": "error",
        "no-restricted-syntax": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-setter-return": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-ternary": "error",
        "no-this-before-super": "error",
        "no-throw-literal": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-undefined": "error",
        "no-underscore-dangle": "error",
        "no-unexpected-multiline": "error",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "error",
        "no-unreachable": "error",
        "no-unreachable-loop": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-unused-private-class-members": "error",
        "no-unused-vars": "error",
        "no-use-before-define": "error",
        "no-useless-assignment": "error",
        "no-useless-backreference": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-constructor": "error",
        "no-useless-escape": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "no-void": "error",
        "no-warning-comments": "error",
        "no-with": "error",
        "object-shorthand": "error",
        "one-var": "error",
        "operator-assignment": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "error",
        "prefer-exponentiation-operator": "error",
        "prefer-named-capture-group": "error",
        "prefer-numeric-literals": "error",
        "prefer-object-has-own": "error",
        "prefer-object-spread": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-regex-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "radix": "error",
        "require-atomic-updates": "error",
        "require-await": "error",
        "require-unicode-regexp": "error",
        "require-yield": "error",
        "sort-imports": "error",
        "sort-keys": "error",
        "sort-vars": "error",
        "strict": "error",
        "symbol-description": "error",
        "unicode-bom": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "vars-on-top": "error",
        "yoda": "error"
      }
    });
  }
});

// node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/configs/eslint-recommended.js
var require_eslint_recommended = __commonJS({
  "node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/configs/eslint-recommended.js"(exports, module) {
    "use strict";
    module.exports = Object.freeze({
      rules: Object.freeze({
        "constructor-super": "error",
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-binary-expression": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-empty-static-block": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-import-assign": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "error",
        "no-misleading-character-class": "error",
        "no-new-native-nonconstructor": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-prototype-builtins": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-self-assign": "error",
        "no-setter-return": "error",
        "no-shadow-restricted-names": "error",
        "no-sparse-arrays": "error",
        "no-this-before-super": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-labels": "error",
        "no-unused-private-class-members": "error",
        "no-unused-vars": "error",
        "no-useless-backreference": "error",
        "no-useless-catch": "error",
        "no-useless-escape": "error",
        "no-with": "error",
        "require-yield": "error",
        "use-isnan": "error",
        "valid-typeof": "error"
      })
    });
  }
});

// node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/@eslint+js@9.13.0/node_modules/@eslint/js/src/index.js"(exports, module) {
    "use strict";
    module.exports = {
      configs: {
        all: require_eslint_all(),
        recommended: require_eslint_recommended()
      }
    };
  }
});

// src/base-rule.ts
var import_js = __toESM(require_src(), 1);
import importPlugin from "eslint-plugin-import";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
var base_rule_default = [
  import_js.default.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
  pluginPromise.configs["flat/recommended"],
  nodePlugin.configs["flat/recommended-script"],
  {
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".mjs"] }
      }
    },
    rules: {
      // import
      "import/order": "error",
      "import/first": "error",
      "import/no-mutable-exports": "error",
      "import/no-unresolved": "off",
      "import/no-absolute-path": "off",
      // Common
      "semi": ["error", "never"],
      "curly": ["error", "multi-or-nest", "consistent"],
      "quotes": ["error", "single"],
      "quote-props": ["error", "consistent-as-needed"],
      "no-unused-vars": "warn",
      "no-param-reassign": "off",
      "array-bracket-spacing": ["error", "never"],
      "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "block-spacing": ["error", "always"],
      "camelcase": "off",
      "comma-spacing": ["error", { before: false, after: true }],
      "comma-style": ["error", "last"],
      "comma-dangle": ["error", "always-multiline"],
      "no-constant-condition": "warn",
      "no-debugger": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-cond-assign": ["error", "always"],
      "func-call-spacing": ["off", "never"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "indent": ["error", 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
      "no-restricted-syntax": [
        "error",
        "DebuggerStatement",
        "LabeledStatement",
        "WithStatement"
      ],
      "object-curly-spacing": ["error", "always"],
      "no-return-await": "off",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always"
        }
      ],
      "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
      // es6
      "no-var": "error",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: true
        }
      ],
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],
      "object-shorthand": [
        "error",
        "always",
        {
          ignoreConstructors: false,
          avoidQuotes: true
        }
      ],
      "prefer-exponentiation-operator": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
      "generator-star-spacing": "off",
      "spaced-comment": ["error", "always", {
        line: {
          markers: ["/"],
          exceptions: ["/", "#"]
        },
        block: {
          markers: ["!"],
          exceptions: ["*"],
          balanced: true
        }
      }],
      // best-practice
      "array-callback-return": "error",
      "block-scoped-var": "error",
      "consistent-return": "off",
      "complexity": ["off", 11],
      "eqeqeq": ["error", "smart"],
      "no-alert": "warn",
      "no-case-declarations": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-with": "error",
      "no-void": "error",
      "no-useless-escape": "off",
      "vars-on-top": "error",
      "require-await": "off",
      "no-return-assign": "off",
      "operator-linebreak": ["error", "before"],
      "no-use-before-define": ["error", { functions: false, classes: false, variables: true }],
      "eslint-comments/disable-enable-pair": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
      "import/namespace": "off",
      "n/no-callback-literal": "off",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false
        }
      ]
    }
  },
  {
    files: ["*.d.ts"],
    rules: {
      "import/no-duplicates": "off"
    }
  },
  {
    files: ["*.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    files: ["scripts/**/*.*", "cli.*"],
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["*.test.ts", "*.test.js", "*.spec.ts", "*.spec.js"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
];

// src/ts-rule.ts
import tseslint from "typescript-eslint";
var ts_rule_default = [
  ...tseslint.configs.recommended,
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
      "**/*.cts"
    ],
    rules: {
      "import/named": "off",
      // TS
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: false }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-ts-expect-error": "error",
      // Override JS
      "indent": "off",
      "space-infix-ops": "off",
      "keyword-spacing": "off",
      "comma-spacing": "off",
      "no-extra-parens": "off",
      "no-dupe-class-members": "off",
      "no-loss-of-precision": "off",
      "lines-between-class-members": "off",
      // off
      // '@typescript-eslint/no-explicit-any': 'off',
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off"
    }
  }
];

// src/react-rule.ts
import react from "eslint-plugin-react";
import globals from "globals";
var react_rule_default = [
  {
    // extends: [
    //   '@liou666/eslint-config-ts',
    //   'plugin:react/recommended',
    //   'plugin:react-hooks/recommended',
    // ],
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] }
      },
      "react": {
        version: "detect"
      }
    },
    rules: {
      // off
      "react/prop-types": "off",
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-boolean-value": "error",
      "react/sort-prop-types": "error",
      "react/sort-comp": "error",
      // code style
      "jsx-quotes": ["error", "prefer-single"],
      "react/jsx-indent-props": [2, 2],
      "react/jsx-indent": [2, 2, { indentLogicalExpressions: true }],
      "react/jsx-first-prop-new-line": "error",
      "react/jsx-newline": ["error", { prevent: true }],
      "react/jsx-closing-tag-location": "error",
      "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
      "react/jsx-wrap-multilines": ["error", {
        declaration: "parens-new-line",
        assignment: "parens",
        return: "parens-new-line",
        arrow: "parens",
        condition: "ignore",
        logical: "ignore",
        prop: "ignore"
      }],
      "react/jsx-tag-spacing": ["error", {
        closingSlash: "never",
        // "beforeSelfClosing": "allow",
        afterOpening: "never",
        beforeClosing: "never"
      }],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true
        }
      ],
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-closing-bracket-location": ["error"],
      "react/jsx-max-props-per-line": ["error", { maximum: 2 }],
      "react/void-dom-elements-no-children": "error"
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'error',
    }
  }
];

// src/markdown-rule.ts
import markdown from "@eslint/markdown";
var markdown_rule_default = [
  {
    name: "liou/markdown/setup",
    plugins: {
      markdown
    }
  },
  {
    files: ["**/*.md/*.*"],
    languageOptions: {
      parser: {
        meta: {
          name: "parser-plain"
        },
        parseForESLint: (code) => ({
          ast: {
            body: [],
            comments: [],
            loc: { end: code.length, start: 0 },
            range: [0, code.length],
            tokens: [],
            type: "Program"
          },
          scopeManager: null,
          services: { isPlain: true },
          visitorKeys: {
            Program: []
          }
        })
      }
    },
    name: "liou/markdown/rules",
    rules: {
      "@typescript-eslint/no-redeclare": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/comma-dangle": "off",
      "import/no-unresolved": "off",
      "no-alert": "off",
      "no-console": "off",
      "no-restricted-imports": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "off"
    }
  }
];

// src/json-rule.ts
import eslintPluginJsonc2 from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
var json_rule_default = [
  {
    name: "liou/jsonc/setup",
    plugins: {
      jsonc: eslintPluginJsonc2
    }
  },
  {
    files: ["*.json", "*.json5"],
    languageOptions: {
      parser: jsoncParser
    },
    name: "liou/jsonc/rules",
    rules: {
      "jsonc/no-bigint-literals": "error",
      "jsonc/no-binary-expression": "error",
      "jsonc/no-binary-numeric-literals": "error",
      "jsonc/no-dupe-keys": "error",
      "jsonc/no-escape-sequence-in-identifier": "error",
      "jsonc/no-floating-decimal": "error",
      "jsonc/no-hexadecimal-numeric-literals": "error",
      "jsonc/no-infinity": "error",
      "jsonc/no-multi-str": "error",
      "jsonc/no-nan": "error",
      "jsonc/no-number-props": "error",
      "jsonc/no-numeric-separators": "error",
      "jsonc/no-octal": "error",
      "jsonc/no-octal-escape": "error",
      "jsonc/no-octal-numeric-literals": "error",
      "jsonc/no-parenthesized": "error",
      "jsonc/no-plus-sign": "error",
      "jsonc/no-regexp-literals": "error",
      "jsonc/no-sparse-arrays": "error",
      "jsonc/no-template-literals": "error",
      "jsonc/no-undefined-value": "error",
      "jsonc/no-unicode-codepoint-escapes": "error",
      "jsonc/no-useless-escape": "error",
      "jsonc/space-unary-ops": "error",
      "jsonc/valid-json-number": "error",
      "jsonc/vue-custom-block/no-parsing-error": "error",
      "jsonc/array-bracket-spacing": ["error", "never"],
      "jsonc/comma-dangle": ["error", "never"],
      "jsonc/comma-style": ["error", "last"],
      "jsonc/indent": ["error", 2],
      "jsonc/key-spacing": ["error", { afterColon: true, beforeColon: false }],
      "jsonc/object-curly-newline": ["error", { consistent: true, multiline: true }],
      "jsonc/object-curly-spacing": ["error", "always"],
      "jsonc/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
      "jsonc/quote-props": "error",
      "jsonc/quotes": "error"
    }
  },
  {
    files: ["package.json"],
    languageOptions: {
      parser: jsoncParser
      // Set this parser.
    },
    rules: {
      "jsonc/sort-keys": [
        "error",
        {
          pathPattern: "^$",
          order: [
            "publisher",
            "name",
            "displayName",
            "type",
            "version",
            "private",
            "packageManager",
            "description",
            "author",
            "license",
            "funding",
            "homepage",
            "repository",
            "bugs",
            "keywords",
            "categories",
            "sideEffects",
            "exports",
            "main",
            "module",
            "unpkg",
            "jsdelivr",
            "types",
            "typesVersions",
            "bin",
            "icon",
            "files",
            "engines",
            "activationEvents",
            "contributes",
            "scripts",
            "peerDependencies",
            "peerDependenciesMeta",
            "dependencies",
            "optionalDependencies",
            "devDependencies",
            "pnpm",
            "overrides",
            "resolutions",
            "husky",
            "simple-git-hooks",
            "lint-staged",
            "eslintConfig"
          ]
        },
        {
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
          order: { type: "asc" }
        },
        {
          pathPattern: "^exports.*$",
          order: [
            "types",
            "require",
            "import"
          ]
        }
      ]
    }
  }
];

// src/index.ts
async function src_default(liou_config = {
  ts: true,
  react: true,
  markdown: true,
  json: true,
  ignores: [],
  plugins: [],
  rules: {}
}, ...rest) {
  const config = liou_config;
  const eslint_config = [];
  eslint_config.push({
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "*.min.*",
      "*.d.ts",
      "**/CHANGELOG.md",
      "**/dist",
      "**/LICENSE*",
      "**/output",
      "**/public",
      "!.github",
      "!.vscode",
      ...(config == null ? void 0 : config.ignores) || []
    ]
  });
  eslint_config.push(...base_rule_default);
  if (config == null ? void 0 : config.ts)
    eslint_config.push(...ts_rule_default);
  if (config == null ? void 0 : config.markdown)
    eslint_config.push(...markdown_rule_default);
  if (config == null ? void 0 : config.json)
    eslint_config.push(...json_rule_default);
  if (config == null ? void 0 : config.react)
    eslint_config.push(...react_rule_default);
  if (config == null ? void 0 : config.rules)
    eslint_config.push({ rules: config.rules });
  if (rest.length > 0)
    eslint_config.push(...rest);
  return eslint_config;
}
export {
  src_default as default
};
