var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    module.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/.pnpm/brace-expansion@2.0.1/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/.pnpm/brace-expansion@2.0.1/node_modules/brace-expansion/index.js"(exports, module) {
    var balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand2(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand2(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m) return [str];
      var pre = m.pre;
      var post = m.post.length ? expand2(m.post, false) : [""];
      if (/\$$/.test(m.pre)) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + "{" + m.body + "}" + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,.*\}/)) {
            str = m.pre + "{" + m.body + escClose + m.post;
            return expand2(str);
          }
          return [str];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand2(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand2(n[j], false));
          }
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// node_modules/.pnpm/eslint-visitor-keys@3.4.3/node_modules/eslint-visitor-keys/dist/eslint-visitor-keys.cjs
var require_eslint_visitor_keys = __commonJS({
  "node_modules/.pnpm/eslint-visitor-keys@3.4.3/node_modules/eslint-visitor-keys/dist/eslint-visitor-keys.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var KEYS = {
      ArrayExpression: [
        "elements"
      ],
      ArrayPattern: [
        "elements"
      ],
      ArrowFunctionExpression: [
        "params",
        "body"
      ],
      AssignmentExpression: [
        "left",
        "right"
      ],
      AssignmentPattern: [
        "left",
        "right"
      ],
      AwaitExpression: [
        "argument"
      ],
      BinaryExpression: [
        "left",
        "right"
      ],
      BlockStatement: [
        "body"
      ],
      BreakStatement: [
        "label"
      ],
      CallExpression: [
        "callee",
        "arguments"
      ],
      CatchClause: [
        "param",
        "body"
      ],
      ChainExpression: [
        "expression"
      ],
      ClassBody: [
        "body"
      ],
      ClassDeclaration: [
        "id",
        "superClass",
        "body"
      ],
      ClassExpression: [
        "id",
        "superClass",
        "body"
      ],
      ConditionalExpression: [
        "test",
        "consequent",
        "alternate"
      ],
      ContinueStatement: [
        "label"
      ],
      DebuggerStatement: [],
      DoWhileStatement: [
        "body",
        "test"
      ],
      EmptyStatement: [],
      ExperimentalRestProperty: [
        "argument"
      ],
      ExperimentalSpreadProperty: [
        "argument"
      ],
      ExportAllDeclaration: [
        "exported",
        "source"
      ],
      ExportDefaultDeclaration: [
        "declaration"
      ],
      ExportNamedDeclaration: [
        "declaration",
        "specifiers",
        "source"
      ],
      ExportSpecifier: [
        "exported",
        "local"
      ],
      ExpressionStatement: [
        "expression"
      ],
      ForInStatement: [
        "left",
        "right",
        "body"
      ],
      ForOfStatement: [
        "left",
        "right",
        "body"
      ],
      ForStatement: [
        "init",
        "test",
        "update",
        "body"
      ],
      FunctionDeclaration: [
        "id",
        "params",
        "body"
      ],
      FunctionExpression: [
        "id",
        "params",
        "body"
      ],
      Identifier: [],
      IfStatement: [
        "test",
        "consequent",
        "alternate"
      ],
      ImportDeclaration: [
        "specifiers",
        "source"
      ],
      ImportDefaultSpecifier: [
        "local"
      ],
      ImportExpression: [
        "source"
      ],
      ImportNamespaceSpecifier: [
        "local"
      ],
      ImportSpecifier: [
        "imported",
        "local"
      ],
      JSXAttribute: [
        "name",
        "value"
      ],
      JSXClosingElement: [
        "name"
      ],
      JSXClosingFragment: [],
      JSXElement: [
        "openingElement",
        "children",
        "closingElement"
      ],
      JSXEmptyExpression: [],
      JSXExpressionContainer: [
        "expression"
      ],
      JSXFragment: [
        "openingFragment",
        "children",
        "closingFragment"
      ],
      JSXIdentifier: [],
      JSXMemberExpression: [
        "object",
        "property"
      ],
      JSXNamespacedName: [
        "namespace",
        "name"
      ],
      JSXOpeningElement: [
        "name",
        "attributes"
      ],
      JSXOpeningFragment: [],
      JSXSpreadAttribute: [
        "argument"
      ],
      JSXSpreadChild: [
        "expression"
      ],
      JSXText: [],
      LabeledStatement: [
        "label",
        "body"
      ],
      Literal: [],
      LogicalExpression: [
        "left",
        "right"
      ],
      MemberExpression: [
        "object",
        "property"
      ],
      MetaProperty: [
        "meta",
        "property"
      ],
      MethodDefinition: [
        "key",
        "value"
      ],
      NewExpression: [
        "callee",
        "arguments"
      ],
      ObjectExpression: [
        "properties"
      ],
      ObjectPattern: [
        "properties"
      ],
      PrivateIdentifier: [],
      Program: [
        "body"
      ],
      Property: [
        "key",
        "value"
      ],
      PropertyDefinition: [
        "key",
        "value"
      ],
      RestElement: [
        "argument"
      ],
      ReturnStatement: [
        "argument"
      ],
      SequenceExpression: [
        "expressions"
      ],
      SpreadElement: [
        "argument"
      ],
      StaticBlock: [
        "body"
      ],
      Super: [],
      SwitchCase: [
        "test",
        "consequent"
      ],
      SwitchStatement: [
        "discriminant",
        "cases"
      ],
      TaggedTemplateExpression: [
        "tag",
        "quasi"
      ],
      TemplateElement: [],
      TemplateLiteral: [
        "quasis",
        "expressions"
      ],
      ThisExpression: [],
      ThrowStatement: [
        "argument"
      ],
      TryStatement: [
        "block",
        "handler",
        "finalizer"
      ],
      UnaryExpression: [
        "argument"
      ],
      UpdateExpression: [
        "argument"
      ],
      VariableDeclaration: [
        "declarations"
      ],
      VariableDeclarator: [
        "id",
        "init"
      ],
      WhileStatement: [
        "test",
        "body"
      ],
      WithStatement: [
        "object",
        "body"
      ],
      YieldExpression: [
        "argument"
      ]
    };
    var NODE_TYPES = Object.keys(KEYS);
    for (const type of NODE_TYPES) {
      Object.freeze(KEYS[type]);
    }
    Object.freeze(KEYS);
    var KEY_BLACKLIST = /* @__PURE__ */ new Set([
      "parent",
      "leadingComments",
      "trailingComments"
    ]);
    function filterKey(key) {
      return !KEY_BLACKLIST.has(key) && key[0] !== "_";
    }
    function getKeys(node) {
      return Object.keys(node).filter(filterKey);
    }
    function unionWith(additionalKeys) {
      const retv = (
        /** @type {{
            [type: string]: ReadonlyArray<string>
        }} */
        Object.assign({}, KEYS)
      );
      for (const type of Object.keys(additionalKeys)) {
        if (Object.prototype.hasOwnProperty.call(retv, type)) {
          const keys = new Set(additionalKeys[type]);
          for (const key of retv[type]) {
            keys.add(key);
          }
          retv[type] = Object.freeze(Array.from(keys));
        } else {
          retv[type] = Object.freeze(Array.from(additionalKeys[type]));
        }
      }
      return Object.freeze(retv);
    }
    exports.KEYS = KEYS;
    exports.getKeys = getKeys;
    exports.unionWith = unionWith;
  }
});

// node_modules/.pnpm/@eslint-community+eslint-utils@4.4.1_eslint@9.13.0/node_modules/@eslint-community/eslint-utils/index.js
var require_eslint_utils = __commonJS({
  "node_modules/.pnpm/@eslint-community+eslint-utils@4.4.1_eslint@9.13.0/node_modules/@eslint-community/eslint-utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var eslintVisitorKeys = require_eslint_visitor_keys();
    function getInnermostScope(initialScope, node) {
      const location = node.range[0];
      let scope = initialScope;
      let found = false;
      do {
        found = false;
        for (const childScope of scope.childScopes) {
          const range = childScope.block.range;
          if (range[0] <= location && location < range[1]) {
            scope = childScope;
            found = true;
            break;
          }
        }
      } while (found);
      return scope;
    }
    function findVariable(initialScope, nameOrNode) {
      let name2 = "";
      let scope = initialScope;
      if (typeof nameOrNode === "string") {
        name2 = nameOrNode;
      } else {
        name2 = nameOrNode.name;
        scope = getInnermostScope(scope, nameOrNode);
      }
      while (scope != null) {
        const variable = scope.set.get(name2);
        if (variable != null) {
          return variable;
        }
        scope = scope.upper;
      }
      return null;
    }
    function negate(f) {
      return (token) => !f(token);
    }
    function isPunctuatorTokenWithValue(token, value) {
      return token.type === "Punctuator" && token.value === value;
    }
    function isArrowToken(token) {
      return isPunctuatorTokenWithValue(token, "=>");
    }
    function isCommaToken(token) {
      return isPunctuatorTokenWithValue(token, ",");
    }
    function isSemicolonToken(token) {
      return isPunctuatorTokenWithValue(token, ";");
    }
    function isColonToken(token) {
      return isPunctuatorTokenWithValue(token, ":");
    }
    function isOpeningParenToken(token) {
      return isPunctuatorTokenWithValue(token, "(");
    }
    function isClosingParenToken(token) {
      return isPunctuatorTokenWithValue(token, ")");
    }
    function isOpeningBracketToken(token) {
      return isPunctuatorTokenWithValue(token, "[");
    }
    function isClosingBracketToken(token) {
      return isPunctuatorTokenWithValue(token, "]");
    }
    function isOpeningBraceToken(token) {
      return isPunctuatorTokenWithValue(token, "{");
    }
    function isClosingBraceToken(token) {
      return isPunctuatorTokenWithValue(token, "}");
    }
    function isCommentToken(token) {
      return ["Block", "Line", "Shebang"].includes(token.type);
    }
    var isNotArrowToken = negate(isArrowToken);
    var isNotCommaToken = negate(isCommaToken);
    var isNotSemicolonToken = negate(isSemicolonToken);
    var isNotColonToken = negate(isColonToken);
    var isNotOpeningParenToken = negate(isOpeningParenToken);
    var isNotClosingParenToken = negate(isClosingParenToken);
    var isNotOpeningBracketToken = negate(isOpeningBracketToken);
    var isNotClosingBracketToken = negate(isClosingBracketToken);
    var isNotOpeningBraceToken = negate(isOpeningBraceToken);
    var isNotClosingBraceToken = negate(isClosingBraceToken);
    var isNotCommentToken = negate(isCommentToken);
    function getOpeningParenOfParams(node, sourceCode) {
      return node.id ? sourceCode.getTokenAfter(node.id, isOpeningParenToken) : sourceCode.getFirstToken(node, isOpeningParenToken);
    }
    function getFunctionHeadLocation(node, sourceCode) {
      const parent = node.parent;
      let start = null;
      let end = null;
      if (node.type === "ArrowFunctionExpression") {
        const arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken);
        start = arrowToken.loc.start;
        end = arrowToken.loc.end;
      } else if (parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") {
        start = parent.loc.start;
        end = getOpeningParenOfParams(node, sourceCode).loc.start;
      } else {
        start = node.loc.start;
        end = getOpeningParenOfParams(node, sourceCode).loc.start;
      }
      return {
        start: { ...start },
        end: { ...end }
      };
    }
    var globalObject = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
    var builtinNames = Object.freeze(
      /* @__PURE__ */ new Set([
        "Array",
        "ArrayBuffer",
        "BigInt",
        "BigInt64Array",
        "BigUint64Array",
        "Boolean",
        "DataView",
        "Date",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "Float32Array",
        "Float64Array",
        "Function",
        "Infinity",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "isFinite",
        "isNaN",
        "isPrototypeOf",
        "JSON",
        "Map",
        "Math",
        "NaN",
        "Number",
        "Object",
        "parseFloat",
        "parseInt",
        "Promise",
        "Proxy",
        "Reflect",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "undefined",
        "unescape",
        "WeakMap",
        "WeakSet"
      ])
    );
    var callAllowed = new Set(
      [
        Array.isArray,
        Array.of,
        Array.prototype.at,
        Array.prototype.concat,
        Array.prototype.entries,
        Array.prototype.every,
        Array.prototype.filter,
        Array.prototype.find,
        Array.prototype.findIndex,
        Array.prototype.flat,
        Array.prototype.includes,
        Array.prototype.indexOf,
        Array.prototype.join,
        Array.prototype.keys,
        Array.prototype.lastIndexOf,
        Array.prototype.slice,
        Array.prototype.some,
        Array.prototype.toString,
        Array.prototype.values,
        typeof BigInt === "function" ? BigInt : void 0,
        Boolean,
        Date,
        Date.parse,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        escape,
        isFinite,
        isNaN,
        isPrototypeOf,
        Map,
        Map.prototype.entries,
        Map.prototype.get,
        Map.prototype.has,
        Map.prototype.keys,
        Map.prototype.values,
        ...Object.getOwnPropertyNames(Math).filter((k) => k !== "random").map((k) => Math[k]).filter((f) => typeof f === "function"),
        Number,
        Number.isFinite,
        Number.isNaN,
        Number.parseFloat,
        Number.parseInt,
        Number.prototype.toExponential,
        Number.prototype.toFixed,
        Number.prototype.toPrecision,
        Number.prototype.toString,
        Object,
        Object.entries,
        Object.is,
        Object.isExtensible,
        Object.isFrozen,
        Object.isSealed,
        Object.keys,
        Object.values,
        parseFloat,
        parseInt,
        RegExp,
        Set,
        Set.prototype.entries,
        Set.prototype.has,
        Set.prototype.keys,
        Set.prototype.values,
        String,
        String.fromCharCode,
        String.fromCodePoint,
        String.raw,
        String.prototype.at,
        String.prototype.charAt,
        String.prototype.charCodeAt,
        String.prototype.codePointAt,
        String.prototype.concat,
        String.prototype.endsWith,
        String.prototype.includes,
        String.prototype.indexOf,
        String.prototype.lastIndexOf,
        String.prototype.normalize,
        String.prototype.padEnd,
        String.prototype.padStart,
        String.prototype.slice,
        String.prototype.startsWith,
        String.prototype.substr,
        String.prototype.substring,
        String.prototype.toLowerCase,
        String.prototype.toString,
        String.prototype.toUpperCase,
        String.prototype.trim,
        String.prototype.trimEnd,
        String.prototype.trimLeft,
        String.prototype.trimRight,
        String.prototype.trimStart,
        Symbol.for,
        Symbol.keyFor,
        unescape
      ].filter((f) => typeof f === "function")
    );
    var callPassThrough = /* @__PURE__ */ new Set([
      Object.freeze,
      Object.preventExtensions,
      Object.seal
    ]);
    var getterAllowed = [
      [Map, /* @__PURE__ */ new Set(["size"])],
      [
        RegExp,
        /* @__PURE__ */ new Set([
          "dotAll",
          "flags",
          "global",
          "hasIndices",
          "ignoreCase",
          "multiline",
          "source",
          "sticky",
          "unicode"
        ])
      ],
      [Set, /* @__PURE__ */ new Set(["size"])]
    ];
    function getPropertyDescriptor(object, name2) {
      let x = object;
      while ((typeof x === "object" || typeof x === "function") && x !== null) {
        const d = Object.getOwnPropertyDescriptor(x, name2);
        if (d) {
          return d;
        }
        x = Object.getPrototypeOf(x);
      }
      return null;
    }
    function isGetter(object, name2) {
      const d = getPropertyDescriptor(object, name2);
      return d != null && d.get != null;
    }
    function getElementValues(nodeList, initialScope) {
      const valueList = [];
      for (let i = 0; i < nodeList.length; ++i) {
        const elementNode = nodeList[i];
        if (elementNode == null) {
          valueList.length = i + 1;
        } else if (elementNode.type === "SpreadElement") {
          const argument = getStaticValueR(elementNode.argument, initialScope);
          if (argument == null) {
            return null;
          }
          valueList.push(...argument.value);
        } else {
          const element = getStaticValueR(elementNode, initialScope);
          if (element == null) {
            return null;
          }
          valueList.push(element.value);
        }
      }
      return valueList;
    }
    function isEffectivelyConst(variable) {
      const refs = variable.references;
      const inits = refs.filter((r) => r.init).length;
      const reads = refs.filter((r) => r.isReadOnly()).length;
      if (inits === 1 && reads + inits === refs.length) {
        return true;
      }
      return false;
    }
    var operations = Object.freeze({
      ArrayExpression(node, initialScope) {
        const elements = getElementValues(node.elements, initialScope);
        return elements != null ? { value: elements } : null;
      },
      AssignmentExpression(node, initialScope) {
        if (node.operator === "=") {
          return getStaticValueR(node.right, initialScope);
        }
        return null;
      },
      //eslint-disable-next-line complexity
      BinaryExpression(node, initialScope) {
        if (node.operator === "in" || node.operator === "instanceof") {
          return null;
        }
        const left = getStaticValueR(node.left, initialScope);
        const right = getStaticValueR(node.right, initialScope);
        if (left != null && right != null) {
          switch (node.operator) {
            case "==":
              return { value: left.value == right.value };
            //eslint-disable-line eqeqeq
            case "!=":
              return { value: left.value != right.value };
            //eslint-disable-line eqeqeq
            case "===":
              return { value: left.value === right.value };
            case "!==":
              return { value: left.value !== right.value };
            case "<":
              return { value: left.value < right.value };
            case "<=":
              return { value: left.value <= right.value };
            case ">":
              return { value: left.value > right.value };
            case ">=":
              return { value: left.value >= right.value };
            case "<<":
              return { value: left.value << right.value };
            case ">>":
              return { value: left.value >> right.value };
            case ">>>":
              return { value: left.value >>> right.value };
            case "+":
              return { value: left.value + right.value };
            case "-":
              return { value: left.value - right.value };
            case "*":
              return { value: left.value * right.value };
            case "/":
              return { value: left.value / right.value };
            case "%":
              return { value: left.value % right.value };
            case "**":
              return { value: left.value ** right.value };
            case "|":
              return { value: left.value | right.value };
            case "^":
              return { value: left.value ^ right.value };
            case "&":
              return { value: left.value & right.value };
          }
        }
        return null;
      },
      CallExpression(node, initialScope) {
        const calleeNode = node.callee;
        const args = getElementValues(node.arguments, initialScope);
        if (args != null) {
          if (calleeNode.type === "MemberExpression") {
            if (calleeNode.property.type === "PrivateIdentifier") {
              return null;
            }
            const object = getStaticValueR(calleeNode.object, initialScope);
            if (object != null) {
              if (object.value == null && (object.optional || node.optional)) {
                return { value: void 0, optional: true };
              }
              const property = getStaticPropertyNameValue(
                calleeNode,
                initialScope
              );
              if (property != null) {
                const receiver = object.value;
                const methodName = property.value;
                if (callAllowed.has(receiver[methodName])) {
                  return { value: receiver[methodName](...args) };
                }
                if (callPassThrough.has(receiver[methodName])) {
                  return { value: args[0] };
                }
              }
            }
          } else {
            const callee = getStaticValueR(calleeNode, initialScope);
            if (callee != null) {
              if (callee.value == null && node.optional) {
                return { value: void 0, optional: true };
              }
              const func = callee.value;
              if (callAllowed.has(func)) {
                return { value: func(...args) };
              }
              if (callPassThrough.has(func)) {
                return { value: args[0] };
              }
            }
          }
        }
        return null;
      },
      ConditionalExpression(node, initialScope) {
        const test = getStaticValueR(node.test, initialScope);
        if (test != null) {
          return test.value ? getStaticValueR(node.consequent, initialScope) : getStaticValueR(node.alternate, initialScope);
        }
        return null;
      },
      ExpressionStatement(node, initialScope) {
        return getStaticValueR(node.expression, initialScope);
      },
      Identifier(node, initialScope) {
        if (initialScope != null) {
          const variable = findVariable(initialScope, node);
          if (variable != null && variable.defs.length === 0 && builtinNames.has(variable.name) && variable.name in globalObject) {
            return { value: globalObject[variable.name] };
          }
          if (variable != null && variable.defs.length === 1) {
            const def = variable.defs[0];
            if (def.parent && def.type === "Variable" && (def.parent.kind === "const" || isEffectivelyConst(variable)) && // TODO(mysticatea): don't support destructuring here.
            def.node.id.type === "Identifier") {
              return getStaticValueR(def.node.init, initialScope);
            }
          }
        }
        return null;
      },
      Literal(node) {
        if ((node.regex != null || node.bigint != null) && node.value == null) {
          return null;
        }
        return { value: node.value };
      },
      LogicalExpression(node, initialScope) {
        const left = getStaticValueR(node.left, initialScope);
        if (left != null) {
          if (node.operator === "||" && Boolean(left.value) === true || node.operator === "&&" && Boolean(left.value) === false || node.operator === "??" && left.value != null) {
            return left;
          }
          const right = getStaticValueR(node.right, initialScope);
          if (right != null) {
            return right;
          }
        }
        return null;
      },
      MemberExpression(node, initialScope) {
        if (node.property.type === "PrivateIdentifier") {
          return null;
        }
        const object = getStaticValueR(node.object, initialScope);
        if (object != null) {
          if (object.value == null && (object.optional || node.optional)) {
            return { value: void 0, optional: true };
          }
          const property = getStaticPropertyNameValue(node, initialScope);
          if (property != null) {
            if (!isGetter(object.value, property.value)) {
              return { value: object.value[property.value] };
            }
            for (const [classFn, allowed] of getterAllowed) {
              if (object.value instanceof classFn && allowed.has(property.value)) {
                return { value: object.value[property.value] };
              }
            }
          }
        }
        return null;
      },
      ChainExpression(node, initialScope) {
        const expression = getStaticValueR(node.expression, initialScope);
        if (expression != null) {
          return { value: expression.value };
        }
        return null;
      },
      NewExpression(node, initialScope) {
        const callee = getStaticValueR(node.callee, initialScope);
        const args = getElementValues(node.arguments, initialScope);
        if (callee != null && args != null) {
          const Func = callee.value;
          if (callAllowed.has(Func)) {
            return { value: new Func(...args) };
          }
        }
        return null;
      },
      ObjectExpression(node, initialScope) {
        const object = {};
        for (const propertyNode of node.properties) {
          if (propertyNode.type === "Property") {
            if (propertyNode.kind !== "init") {
              return null;
            }
            const key = getStaticPropertyNameValue(
              propertyNode,
              initialScope
            );
            const value = getStaticValueR(propertyNode.value, initialScope);
            if (key == null || value == null) {
              return null;
            }
            object[key.value] = value.value;
          } else if (propertyNode.type === "SpreadElement" || propertyNode.type === "ExperimentalSpreadProperty") {
            const argument = getStaticValueR(
              propertyNode.argument,
              initialScope
            );
            if (argument == null) {
              return null;
            }
            Object.assign(object, argument.value);
          } else {
            return null;
          }
        }
        return { value: object };
      },
      SequenceExpression(node, initialScope) {
        const last = node.expressions[node.expressions.length - 1];
        return getStaticValueR(last, initialScope);
      },
      TaggedTemplateExpression(node, initialScope) {
        const tag = getStaticValueR(node.tag, initialScope);
        const expressions = getElementValues(
          node.quasi.expressions,
          initialScope
        );
        if (tag != null && expressions != null) {
          const func = tag.value;
          const strings = node.quasi.quasis.map((q) => q.value.cooked);
          strings.raw = node.quasi.quasis.map((q) => q.value.raw);
          if (func === String.raw) {
            return { value: func(strings, ...expressions) };
          }
        }
        return null;
      },
      TemplateLiteral(node, initialScope) {
        const expressions = getElementValues(node.expressions, initialScope);
        if (expressions != null) {
          let value = node.quasis[0].value.cooked;
          for (let i = 0; i < expressions.length; ++i) {
            value += expressions[i];
            value += node.quasis[i + 1].value.cooked;
          }
          return { value };
        }
        return null;
      },
      UnaryExpression(node, initialScope) {
        if (node.operator === "delete") {
          return null;
        }
        if (node.operator === "void") {
          return { value: void 0 };
        }
        const arg = getStaticValueR(node.argument, initialScope);
        if (arg != null) {
          switch (node.operator) {
            case "-":
              return { value: -arg.value };
            case "+":
              return { value: +arg.value };
            //eslint-disable-line no-implicit-coercion
            case "!":
              return { value: !arg.value };
            case "~":
              return { value: ~arg.value };
            case "typeof":
              return { value: typeof arg.value };
          }
        }
        return null;
      }
    });
    function getStaticValueR(node, initialScope) {
      if (node != null && Object.hasOwnProperty.call(operations, node.type)) {
        return operations[node.type](node, initialScope);
      }
      return null;
    }
    function getStaticPropertyNameValue(node, initialScope) {
      const nameNode = node.type === "Property" ? node.key : node.property;
      if (node.computed) {
        return getStaticValueR(nameNode, initialScope);
      }
      if (nameNode.type === "Identifier") {
        return { value: nameNode.name };
      }
      if (nameNode.type === "Literal") {
        if (nameNode.bigint) {
          return { value: nameNode.bigint };
        }
        return { value: String(nameNode.value) };
      }
      return null;
    }
    function getStaticValue(node, initialScope = null) {
      try {
        return getStaticValueR(node, initialScope);
      } catch (_error) {
        return null;
      }
    }
    function getStringIfConstant(node, initialScope = null) {
      if (node && node.type === "Literal" && node.value === null) {
        if (node.regex) {
          return `/${node.regex.pattern}/${node.regex.flags}`;
        }
        if (node.bigint) {
          return node.bigint;
        }
      }
      const evaluated = getStaticValue(node, initialScope);
      return evaluated && String(evaluated.value);
    }
    function getPropertyName(node, initialScope) {
      switch (node.type) {
        case "MemberExpression":
          if (node.computed) {
            return getStringIfConstant(node.property, initialScope);
          }
          if (node.property.type === "PrivateIdentifier") {
            return null;
          }
          return node.property.name;
        case "Property":
        case "MethodDefinition":
        case "PropertyDefinition":
          if (node.computed) {
            return getStringIfConstant(node.key, initialScope);
          }
          if (node.key.type === "Literal") {
            return String(node.key.value);
          }
          if (node.key.type === "PrivateIdentifier") {
            return null;
          }
          return node.key.name;
      }
      return null;
    }
    function getFunctionNameWithKind(node, sourceCode) {
      const parent = node.parent;
      const tokens = [];
      const isObjectMethod = parent.type === "Property" && parent.value === node;
      const isClassMethod = parent.type === "MethodDefinition" && parent.value === node;
      const isClassFieldMethod = parent.type === "PropertyDefinition" && parent.value === node;
      if (isClassMethod || isClassFieldMethod) {
        if (parent.static) {
          tokens.push("static");
        }
        if (parent.key.type === "PrivateIdentifier") {
          tokens.push("private");
        }
      }
      if (node.async) {
        tokens.push("async");
      }
      if (node.generator) {
        tokens.push("generator");
      }
      if (isObjectMethod || isClassMethod) {
        if (parent.kind === "constructor") {
          return "constructor";
        }
        if (parent.kind === "get") {
          tokens.push("getter");
        } else if (parent.kind === "set") {
          tokens.push("setter");
        } else {
          tokens.push("method");
        }
      } else if (isClassFieldMethod) {
        tokens.push("method");
      } else {
        if (node.type === "ArrowFunctionExpression") {
          tokens.push("arrow");
        }
        tokens.push("function");
      }
      if (isObjectMethod || isClassMethod || isClassFieldMethod) {
        if (parent.key.type === "PrivateIdentifier") {
          tokens.push(`#${parent.key.name}`);
        } else {
          const name2 = getPropertyName(parent);
          if (name2) {
            tokens.push(`'${name2}'`);
          } else if (sourceCode) {
            const keyText = sourceCode.getText(parent.key);
            if (!keyText.includes("\n")) {
              tokens.push(`[${keyText}]`);
            }
          }
        }
      } else if (node.id) {
        tokens.push(`'${node.id.name}'`);
      } else if (parent.type === "VariableDeclarator" && parent.id && parent.id.type === "Identifier") {
        tokens.push(`'${parent.id.name}'`);
      } else if ((parent.type === "AssignmentExpression" || parent.type === "AssignmentPattern") && parent.left && parent.left.type === "Identifier") {
        tokens.push(`'${parent.left.name}'`);
      } else if (parent.type === "ExportDefaultDeclaration" && parent.declaration === node) {
        tokens.push("'default'");
      }
      return tokens.join(" ");
    }
    var typeConversionBinaryOps = Object.freeze(
      /* @__PURE__ */ new Set([
        "==",
        "!=",
        "<",
        "<=",
        ">",
        ">=",
        "<<",
        ">>",
        ">>>",
        "+",
        "-",
        "*",
        "/",
        "%",
        "|",
        "^",
        "&",
        "in"
      ])
    );
    var typeConversionUnaryOps = Object.freeze(/* @__PURE__ */ new Set(["-", "+", "!", "~"]));
    function isNode(x) {
      return x !== null && typeof x === "object" && typeof x.type === "string";
    }
    var visitor = Object.freeze(
      Object.assign(/* @__PURE__ */ Object.create(null), {
        $visit(node, options, visitorKeys) {
          const { type } = node;
          if (typeof this[type] === "function") {
            return this[type](node, options, visitorKeys);
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        $visitChildren(node, options, visitorKeys) {
          const { type } = node;
          for (const key of visitorKeys[type] || eslintVisitorKeys.getKeys(node)) {
            const value = node[key];
            if (Array.isArray(value)) {
              for (const element of value) {
                if (isNode(element) && this.$visit(element, options, visitorKeys)) {
                  return true;
                }
              }
            } else if (isNode(value) && this.$visit(value, options, visitorKeys)) {
              return true;
            }
          }
          return false;
        },
        ArrowFunctionExpression() {
          return false;
        },
        AssignmentExpression() {
          return true;
        },
        AwaitExpression() {
          return true;
        },
        BinaryExpression(node, options, visitorKeys) {
          if (options.considerImplicitTypeConversion && typeConversionBinaryOps.has(node.operator) && (node.left.type !== "Literal" || node.right.type !== "Literal")) {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        CallExpression() {
          return true;
        },
        FunctionExpression() {
          return false;
        },
        ImportExpression() {
          return true;
        },
        MemberExpression(node, options, visitorKeys) {
          if (options.considerGetters) {
            return true;
          }
          if (options.considerImplicitTypeConversion && node.computed && node.property.type !== "Literal") {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        MethodDefinition(node, options, visitorKeys) {
          if (options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal") {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        NewExpression() {
          return true;
        },
        Property(node, options, visitorKeys) {
          if (options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal") {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        PropertyDefinition(node, options, visitorKeys) {
          if (options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal") {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        UnaryExpression(node, options, visitorKeys) {
          if (node.operator === "delete") {
            return true;
          }
          if (options.considerImplicitTypeConversion && typeConversionUnaryOps.has(node.operator) && node.argument.type !== "Literal") {
            return true;
          }
          return this.$visitChildren(node, options, visitorKeys);
        },
        UpdateExpression() {
          return true;
        },
        YieldExpression() {
          return true;
        }
      })
    );
    function hasSideEffect(node, sourceCode, { considerGetters = false, considerImplicitTypeConversion = false } = {}) {
      return visitor.$visit(
        node,
        { considerGetters, considerImplicitTypeConversion },
        sourceCode.visitorKeys || eslintVisitorKeys.KEYS
      );
    }
    function getParentSyntaxParen(node, sourceCode) {
      const parent = node.parent;
      switch (parent.type) {
        case "CallExpression":
        case "NewExpression":
          if (parent.arguments.length === 1 && parent.arguments[0] === node) {
            return sourceCode.getTokenAfter(
              parent.callee,
              isOpeningParenToken
            );
          }
          return null;
        case "DoWhileStatement":
          if (parent.test === node) {
            return sourceCode.getTokenAfter(
              parent.body,
              isOpeningParenToken
            );
          }
          return null;
        case "IfStatement":
        case "WhileStatement":
          if (parent.test === node) {
            return sourceCode.getFirstToken(parent, 1);
          }
          return null;
        case "ImportExpression":
          if (parent.source === node) {
            return sourceCode.getFirstToken(parent, 1);
          }
          return null;
        case "SwitchStatement":
          if (parent.discriminant === node) {
            return sourceCode.getFirstToken(parent, 1);
          }
          return null;
        case "WithStatement":
          if (parent.object === node) {
            return sourceCode.getFirstToken(parent, 1);
          }
          return null;
        default:
          return null;
      }
    }
    function isParenthesized(timesOrNode, nodeOrSourceCode, optionalSourceCode) {
      let times, node, sourceCode, maybeLeftParen, maybeRightParen;
      if (typeof timesOrNode === "number") {
        times = timesOrNode | 0;
        node = nodeOrSourceCode;
        sourceCode = optionalSourceCode;
        if (!(times >= 1)) {
          throw new TypeError("'times' should be a positive integer.");
        }
      } else {
        times = 1;
        node = timesOrNode;
        sourceCode = nodeOrSourceCode;
      }
      if (node == null || // `Program` can't be parenthesized
      node.parent == null || // `CatchClause.param` can't be parenthesized, example `try {} catch (error) {}`
      node.parent.type === "CatchClause" && node.parent.param === node) {
        return false;
      }
      maybeLeftParen = maybeRightParen = node;
      do {
        maybeLeftParen = sourceCode.getTokenBefore(maybeLeftParen);
        maybeRightParen = sourceCode.getTokenAfter(maybeRightParen);
      } while (maybeLeftParen != null && maybeRightParen != null && isOpeningParenToken(maybeLeftParen) && isClosingParenToken(maybeRightParen) && // Avoid false positive such as `if (a) {}`
      maybeLeftParen !== getParentSyntaxParen(node, sourceCode) && --times > 0);
      return times === 0;
    }
    var placeholder = /\$(?:[$&`']|[1-9][0-9]?)/gu;
    var internal = /* @__PURE__ */ new WeakMap();
    function isEscaped(str, index3) {
      let escaped = false;
      for (let i = index3 - 1; i >= 0 && str.charCodeAt(i) === 92; --i) {
        escaped = !escaped;
      }
      return escaped;
    }
    function replaceS(matcher, str, replacement) {
      const chunks = [];
      let index3 = 0;
      let match2 = null;
      function replacer(key) {
        switch (key) {
          case "$$":
            return "$";
          case "$&":
            return match2[0];
          case "$`":
            return str.slice(0, match2.index);
          case "$'":
            return str.slice(match2.index + match2[0].length);
          default: {
            const i = key.slice(1);
            if (i in match2) {
              return match2[i];
            }
            return key;
          }
        }
      }
      for (match2 of matcher.execAll(str)) {
        chunks.push(str.slice(index3, match2.index));
        chunks.push(replacement.replace(placeholder, replacer));
        index3 = match2.index + match2[0].length;
      }
      chunks.push(str.slice(index3));
      return chunks.join("");
    }
    function replaceF(matcher, str, replace) {
      const chunks = [];
      let index3 = 0;
      for (const match2 of matcher.execAll(str)) {
        chunks.push(str.slice(index3, match2.index));
        chunks.push(String(replace(...match2, match2.index, match2.input)));
        index3 = match2.index + match2[0].length;
      }
      chunks.push(str.slice(index3));
      return chunks.join("");
    }
    var PatternMatcher = class {
      /**
       * Initialize this matcher.
       * @param {RegExp} pattern The pattern to match.
       * @param {{escaped:boolean}} options The options.
       */
      constructor(pattern, { escaped = false } = {}) {
        if (!(pattern instanceof RegExp)) {
          throw new TypeError("'pattern' should be a RegExp instance.");
        }
        if (!pattern.flags.includes("g")) {
          throw new Error("'pattern' should contains 'g' flag.");
        }
        internal.set(this, {
          pattern: new RegExp(pattern.source, pattern.flags),
          escaped: Boolean(escaped)
        });
      }
      /**
       * Find the pattern in a given string.
       * @param {string} str The string to find.
       * @returns {IterableIterator<RegExpExecArray>} The iterator which iterate the matched information.
       */
      *execAll(str) {
        const { pattern, escaped } = internal.get(this);
        let match2 = null;
        let lastIndex = 0;
        pattern.lastIndex = 0;
        while ((match2 = pattern.exec(str)) != null) {
          if (escaped || !isEscaped(str, match2.index)) {
            lastIndex = pattern.lastIndex;
            yield match2;
            pattern.lastIndex = lastIndex;
          }
        }
      }
      /**
       * Check whether the pattern is found in a given string.
       * @param {string} str The string to check.
       * @returns {boolean} `true` if the pattern was found in the string.
       */
      test(str) {
        const it = this.execAll(str);
        const ret = it.next();
        return !ret.done;
      }
      /**
       * Replace a given string.
       * @param {string} str The string to be replaced.
       * @param {(string|((...strs:string[])=>string))} replacer The string or function to replace. This is the same as the 2nd argument of `String.prototype.replace`.
       * @returns {string} The replaced string.
       */
      [Symbol.replace](str, replacer) {
        return typeof replacer === "function" ? replaceF(this, String(str), replacer) : replaceS(this, String(str), String(replacer));
      }
    };
    var IMPORT_TYPE = /^(?:Import|Export(?:All|Default|Named))Declaration$/u;
    var has = Function.call.bind(Object.hasOwnProperty);
    var READ = Symbol("read");
    var CALL = Symbol("call");
    var CONSTRUCT = Symbol("construct");
    var ESM = Symbol("esm");
    var requireCall = { require: { [CALL]: true } };
    function isModifiedGlobal(variable) {
      return variable == null || variable.defs.length !== 0 || variable.references.some((r) => r.isWrite());
    }
    function isPassThrough(node) {
      const parent = node.parent;
      switch (parent && parent.type) {
        case "ConditionalExpression":
          return parent.consequent === node || parent.alternate === node;
        case "LogicalExpression":
          return true;
        case "SequenceExpression":
          return parent.expressions[parent.expressions.length - 1] === node;
        case "ChainExpression":
          return true;
        default:
          return false;
      }
    }
    var ReferenceTracker = class {
      /**
       * Initialize this tracker.
       * @param {Scope} globalScope The global scope.
       * @param {object} [options] The options.
       * @param {"legacy"|"strict"} [options.mode="strict"] The mode to determine the ImportDeclaration's behavior for CJS modules.
       * @param {string[]} [options.globalObjectNames=["global","globalThis","self","window"]] The variable names for Global Object.
       */
      constructor(globalScope, {
        mode = "strict",
        globalObjectNames = ["global", "globalThis", "self", "window"]
      } = {}) {
        this.variableStack = [];
        this.globalScope = globalScope;
        this.mode = mode;
        this.globalObjectNames = globalObjectNames.slice(0);
      }
      /**
       * Iterate the references of global variables.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *iterateGlobalReferences(traceMap) {
        for (const key of Object.keys(traceMap)) {
          const nextTraceMap = traceMap[key];
          const path5 = [key];
          const variable = this.globalScope.set.get(key);
          if (isModifiedGlobal(variable)) {
            continue;
          }
          yield* this._iterateVariableReferences(
            variable,
            path5,
            nextTraceMap,
            true
          );
        }
        for (const key of this.globalObjectNames) {
          const path5 = [];
          const variable = this.globalScope.set.get(key);
          if (isModifiedGlobal(variable)) {
            continue;
          }
          yield* this._iterateVariableReferences(
            variable,
            path5,
            traceMap,
            false
          );
        }
      }
      /**
       * Iterate the references of CommonJS modules.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *iterateCjsReferences(traceMap) {
        for (const { node } of this.iterateGlobalReferences(requireCall)) {
          const key = getStringIfConstant(node.arguments[0]);
          if (key == null || !has(traceMap, key)) {
            continue;
          }
          const nextTraceMap = traceMap[key];
          const path5 = [key];
          if (nextTraceMap[READ]) {
            yield {
              node,
              path: path5,
              type: READ,
              info: nextTraceMap[READ]
            };
          }
          yield* this._iteratePropertyReferences(node, path5, nextTraceMap);
        }
      }
      /**
       * Iterate the references of ES modules.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *iterateEsmReferences(traceMap) {
        const programNode = this.globalScope.block;
        for (const node of programNode.body) {
          if (!IMPORT_TYPE.test(node.type) || node.source == null) {
            continue;
          }
          const moduleId = node.source.value;
          if (!has(traceMap, moduleId)) {
            continue;
          }
          const nextTraceMap = traceMap[moduleId];
          const path5 = [moduleId];
          if (nextTraceMap[READ]) {
            yield { node, path: path5, type: READ, info: nextTraceMap[READ] };
          }
          if (node.type === "ExportAllDeclaration") {
            for (const key of Object.keys(nextTraceMap)) {
              const exportTraceMap = nextTraceMap[key];
              if (exportTraceMap[READ]) {
                yield {
                  node,
                  path: path5.concat(key),
                  type: READ,
                  info: exportTraceMap[READ]
                };
              }
            }
          } else {
            for (const specifier of node.specifiers) {
              const esm = has(nextTraceMap, ESM);
              const it = this._iterateImportReferences(
                specifier,
                path5,
                esm ? nextTraceMap : this.mode === "legacy" ? { default: nextTraceMap, ...nextTraceMap } : { default: nextTraceMap }
              );
              if (esm) {
                yield* it;
              } else {
                for (const report of it) {
                  report.path = report.path.filter(exceptDefault);
                  if (report.path.length >= 2 || report.type !== READ) {
                    yield report;
                  }
                }
              }
            }
          }
        }
      }
      /**
       * Iterate the references for a given variable.
       * @param {Variable} variable The variable to iterate that references.
       * @param {string[]} path The current path.
       * @param {object} traceMap The trace map.
       * @param {boolean} shouldReport = The flag to report those references.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *_iterateVariableReferences(variable, path5, traceMap, shouldReport) {
        if (this.variableStack.includes(variable)) {
          return;
        }
        this.variableStack.push(variable);
        try {
          for (const reference of variable.references) {
            if (!reference.isRead()) {
              continue;
            }
            const node = reference.identifier;
            if (shouldReport && traceMap[READ]) {
              yield { node, path: path5, type: READ, info: traceMap[READ] };
            }
            yield* this._iteratePropertyReferences(node, path5, traceMap);
          }
        } finally {
          this.variableStack.pop();
        }
      }
      /**
       * Iterate the references for a given AST node.
       * @param rootNode The AST node to iterate references.
       * @param {string[]} path The current path.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      //eslint-disable-next-line complexity
      *_iteratePropertyReferences(rootNode, path5, traceMap) {
        let node = rootNode;
        while (isPassThrough(node)) {
          node = node.parent;
        }
        const parent = node.parent;
        if (parent.type === "MemberExpression") {
          if (parent.object === node) {
            const key = getPropertyName(parent);
            if (key == null || !has(traceMap, key)) {
              return;
            }
            path5 = path5.concat(key);
            const nextTraceMap = traceMap[key];
            if (nextTraceMap[READ]) {
              yield {
                node: parent,
                path: path5,
                type: READ,
                info: nextTraceMap[READ]
              };
            }
            yield* this._iteratePropertyReferences(
              parent,
              path5,
              nextTraceMap
            );
          }
          return;
        }
        if (parent.type === "CallExpression") {
          if (parent.callee === node && traceMap[CALL]) {
            yield { node: parent, path: path5, type: CALL, info: traceMap[CALL] };
          }
          return;
        }
        if (parent.type === "NewExpression") {
          if (parent.callee === node && traceMap[CONSTRUCT]) {
            yield {
              node: parent,
              path: path5,
              type: CONSTRUCT,
              info: traceMap[CONSTRUCT]
            };
          }
          return;
        }
        if (parent.type === "AssignmentExpression") {
          if (parent.right === node) {
            yield* this._iterateLhsReferences(parent.left, path5, traceMap);
            yield* this._iteratePropertyReferences(parent, path5, traceMap);
          }
          return;
        }
        if (parent.type === "AssignmentPattern") {
          if (parent.right === node) {
            yield* this._iterateLhsReferences(parent.left, path5, traceMap);
          }
          return;
        }
        if (parent.type === "VariableDeclarator") {
          if (parent.init === node) {
            yield* this._iterateLhsReferences(parent.id, path5, traceMap);
          }
        }
      }
      /**
       * Iterate the references for a given Pattern node.
       * @param {Node} patternNode The Pattern node to iterate references.
       * @param {string[]} path The current path.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *_iterateLhsReferences(patternNode, path5, traceMap) {
        if (patternNode.type === "Identifier") {
          const variable = findVariable(this.globalScope, patternNode);
          if (variable != null) {
            yield* this._iterateVariableReferences(
              variable,
              path5,
              traceMap,
              false
            );
          }
          return;
        }
        if (patternNode.type === "ObjectPattern") {
          for (const property of patternNode.properties) {
            const key = getPropertyName(property);
            if (key == null || !has(traceMap, key)) {
              continue;
            }
            const nextPath = path5.concat(key);
            const nextTraceMap = traceMap[key];
            if (nextTraceMap[READ]) {
              yield {
                node: property,
                path: nextPath,
                type: READ,
                info: nextTraceMap[READ]
              };
            }
            yield* this._iterateLhsReferences(
              property.value,
              nextPath,
              nextTraceMap
            );
          }
          return;
        }
        if (patternNode.type === "AssignmentPattern") {
          yield* this._iterateLhsReferences(patternNode.left, path5, traceMap);
        }
      }
      /**
       * Iterate the references for a given ModuleSpecifier node.
       * @param {Node} specifierNode The ModuleSpecifier node to iterate references.
       * @param {string[]} path The current path.
       * @param {object} traceMap The trace map.
       * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
       */
      *_iterateImportReferences(specifierNode, path5, traceMap) {
        const type = specifierNode.type;
        if (type === "ImportSpecifier" || type === "ImportDefaultSpecifier") {
          const key = type === "ImportDefaultSpecifier" ? "default" : specifierNode.imported.name;
          if (!has(traceMap, key)) {
            return;
          }
          path5 = path5.concat(key);
          const nextTraceMap = traceMap[key];
          if (nextTraceMap[READ]) {
            yield {
              node: specifierNode,
              path: path5,
              type: READ,
              info: nextTraceMap[READ]
            };
          }
          yield* this._iterateVariableReferences(
            findVariable(this.globalScope, specifierNode.local),
            path5,
            nextTraceMap,
            false
          );
          return;
        }
        if (type === "ImportNamespaceSpecifier") {
          yield* this._iterateVariableReferences(
            findVariable(this.globalScope, specifierNode.local),
            path5,
            traceMap,
            false
          );
          return;
        }
        if (type === "ExportSpecifier") {
          const key = specifierNode.local.name;
          if (!has(traceMap, key)) {
            return;
          }
          path5 = path5.concat(key);
          const nextTraceMap = traceMap[key];
          if (nextTraceMap[READ]) {
            yield {
              node: specifierNode,
              path: path5,
              type: READ,
              info: nextTraceMap[READ]
            };
          }
        }
      }
    };
    ReferenceTracker.READ = READ;
    ReferenceTracker.CALL = CALL;
    ReferenceTracker.CONSTRUCT = CONSTRUCT;
    ReferenceTracker.ESM = ESM;
    function exceptDefault(name2, index3) {
      return !(index3 === 1 && name2 === "default");
    }
    var index2 = {
      CALL,
      CONSTRUCT,
      ESM,
      findVariable,
      getFunctionHeadLocation,
      getFunctionNameWithKind,
      getInnermostScope,
      getPropertyName,
      getStaticValue,
      getStringIfConstant,
      hasSideEffect,
      isArrowToken,
      isClosingBraceToken,
      isClosingBracketToken,
      isClosingParenToken,
      isColonToken,
      isCommaToken,
      isCommentToken,
      isNotArrowToken,
      isNotClosingBraceToken,
      isNotClosingBracketToken,
      isNotClosingParenToken,
      isNotColonToken,
      isNotCommaToken,
      isNotCommentToken,
      isNotOpeningBraceToken,
      isNotOpeningBracketToken,
      isNotOpeningParenToken,
      isNotSemicolonToken,
      isOpeningBraceToken,
      isOpeningBracketToken,
      isOpeningParenToken,
      isParenthesized,
      isSemicolonToken,
      PatternMatcher,
      READ,
      ReferenceTracker
    };
    exports.CALL = CALL;
    exports.CONSTRUCT = CONSTRUCT;
    exports.ESM = ESM;
    exports.PatternMatcher = PatternMatcher;
    exports.READ = READ;
    exports.ReferenceTracker = ReferenceTracker;
    exports["default"] = index2;
    exports.findVariable = findVariable;
    exports.getFunctionHeadLocation = getFunctionHeadLocation;
    exports.getFunctionNameWithKind = getFunctionNameWithKind;
    exports.getInnermostScope = getInnermostScope;
    exports.getPropertyName = getPropertyName;
    exports.getStaticValue = getStaticValue;
    exports.getStringIfConstant = getStringIfConstant;
    exports.hasSideEffect = hasSideEffect;
    exports.isArrowToken = isArrowToken;
    exports.isClosingBraceToken = isClosingBraceToken;
    exports.isClosingBracketToken = isClosingBracketToken;
    exports.isClosingParenToken = isClosingParenToken;
    exports.isColonToken = isColonToken;
    exports.isCommaToken = isCommaToken;
    exports.isCommentToken = isCommentToken;
    exports.isNotArrowToken = isNotArrowToken;
    exports.isNotClosingBraceToken = isNotClosingBraceToken;
    exports.isNotClosingBracketToken = isNotClosingBracketToken;
    exports.isNotClosingParenToken = isNotClosingParenToken;
    exports.isNotColonToken = isNotColonToken;
    exports.isNotCommaToken = isNotCommaToken;
    exports.isNotCommentToken = isNotCommentToken;
    exports.isNotOpeningBraceToken = isNotOpeningBraceToken;
    exports.isNotOpeningBracketToken = isNotOpeningBracketToken;
    exports.isNotOpeningParenToken = isNotOpeningParenToken;
    exports.isNotSemicolonToken = isNotSemicolonToken;
    exports.isOpeningBraceToken = isOpeningBraceToken;
    exports.isOpeningBracketToken = isOpeningBracketToken;
    exports.isOpeningParenToken = isOpeningParenToken;
    exports.isParenthesized = isParenthesized;
    exports.isSemicolonToken = isSemicolonToken;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.js
var require_astUtilities = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/astUtilities.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isParenthesized = exports.hasSideEffect = exports.getStringIfConstant = exports.getStaticValue = exports.getPropertyName = exports.getFunctionNameWithKind = exports.getFunctionHeadLocation = void 0;
    var eslintUtils = __importStar(require_eslint_utils());
    var getFunctionHeadLocation = eslintUtils.getFunctionHeadLocation;
    exports.getFunctionHeadLocation = getFunctionHeadLocation;
    var getFunctionNameWithKind = eslintUtils.getFunctionNameWithKind;
    exports.getFunctionNameWithKind = getFunctionNameWithKind;
    var getPropertyName = eslintUtils.getPropertyName;
    exports.getPropertyName = getPropertyName;
    var getStaticValue = eslintUtils.getStaticValue;
    exports.getStaticValue = getStaticValue;
    var getStringIfConstant = eslintUtils.getStringIfConstant;
    exports.getStringIfConstant = getStringIfConstant;
    var hasSideEffect = eslintUtils.hasSideEffect;
    exports.hasSideEffect = hasSideEffect;
    var isParenthesized = eslintUtils.isParenthesized;
    exports.isParenthesized = isParenthesized;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.js
var require_PatternMatcher = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatternMatcher = void 0;
    var eslintUtils = __importStar(require_eslint_utils());
    var PatternMatcher = eslintUtils.PatternMatcher;
    exports.PatternMatcher = PatternMatcher;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.js
var require_predicates = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/predicates.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isSemicolonToken = exports.isOpeningParenToken = exports.isOpeningBracketToken = exports.isOpeningBraceToken = exports.isNotSemicolonToken = exports.isNotOpeningParenToken = exports.isNotOpeningBracketToken = exports.isNotOpeningBraceToken = exports.isNotCommentToken = exports.isNotCommaToken = exports.isNotColonToken = exports.isNotClosingParenToken = exports.isNotClosingBracketToken = exports.isNotClosingBraceToken = exports.isNotArrowToken = exports.isCommentToken = exports.isCommaToken = exports.isColonToken = exports.isClosingParenToken = exports.isClosingBracketToken = exports.isClosingBraceToken = exports.isArrowToken = void 0;
    var eslintUtils = __importStar(require_eslint_utils());
    var isArrowToken = eslintUtils.isArrowToken;
    exports.isArrowToken = isArrowToken;
    var isNotArrowToken = eslintUtils.isNotArrowToken;
    exports.isNotArrowToken = isNotArrowToken;
    var isClosingBraceToken = eslintUtils.isClosingBraceToken;
    exports.isClosingBraceToken = isClosingBraceToken;
    var isNotClosingBraceToken = eslintUtils.isNotClosingBraceToken;
    exports.isNotClosingBraceToken = isNotClosingBraceToken;
    var isClosingBracketToken = eslintUtils.isClosingBracketToken;
    exports.isClosingBracketToken = isClosingBracketToken;
    var isNotClosingBracketToken = eslintUtils.isNotClosingBracketToken;
    exports.isNotClosingBracketToken = isNotClosingBracketToken;
    var isClosingParenToken = eslintUtils.isClosingParenToken;
    exports.isClosingParenToken = isClosingParenToken;
    var isNotClosingParenToken = eslintUtils.isNotClosingParenToken;
    exports.isNotClosingParenToken = isNotClosingParenToken;
    var isColonToken = eslintUtils.isColonToken;
    exports.isColonToken = isColonToken;
    var isNotColonToken = eslintUtils.isNotColonToken;
    exports.isNotColonToken = isNotColonToken;
    var isCommaToken = eslintUtils.isCommaToken;
    exports.isCommaToken = isCommaToken;
    var isNotCommaToken = eslintUtils.isNotCommaToken;
    exports.isNotCommaToken = isNotCommaToken;
    var isCommentToken = eslintUtils.isCommentToken;
    exports.isCommentToken = isCommentToken;
    var isNotCommentToken = eslintUtils.isNotCommentToken;
    exports.isNotCommentToken = isNotCommentToken;
    var isOpeningBraceToken = eslintUtils.isOpeningBraceToken;
    exports.isOpeningBraceToken = isOpeningBraceToken;
    var isNotOpeningBraceToken = eslintUtils.isNotOpeningBraceToken;
    exports.isNotOpeningBraceToken = isNotOpeningBraceToken;
    var isOpeningBracketToken = eslintUtils.isOpeningBracketToken;
    exports.isOpeningBracketToken = isOpeningBracketToken;
    var isNotOpeningBracketToken = eslintUtils.isNotOpeningBracketToken;
    exports.isNotOpeningBracketToken = isNotOpeningBracketToken;
    var isOpeningParenToken = eslintUtils.isOpeningParenToken;
    exports.isOpeningParenToken = isOpeningParenToken;
    var isNotOpeningParenToken = eslintUtils.isNotOpeningParenToken;
    exports.isNotOpeningParenToken = isNotOpeningParenToken;
    var isSemicolonToken = eslintUtils.isSemicolonToken;
    exports.isSemicolonToken = isSemicolonToken;
    var isNotSemicolonToken = eslintUtils.isNotSemicolonToken;
    exports.isNotSemicolonToken = isNotSemicolonToken;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/ReferenceTracker.js
var require_ReferenceTracker = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/ReferenceTracker.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReferenceTracker = void 0;
    var eslintUtils = __importStar(require_eslint_utils());
    var ReferenceTrackerREAD = eslintUtils.ReferenceTracker.READ;
    var ReferenceTrackerCALL = eslintUtils.ReferenceTracker.CALL;
    var ReferenceTrackerCONSTRUCT = eslintUtils.ReferenceTracker.CONSTRUCT;
    var ReferenceTrackerESM = eslintUtils.ReferenceTracker.ESM;
    var ReferenceTracker = eslintUtils.ReferenceTracker;
    exports.ReferenceTracker = ReferenceTracker;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/scopeAnalysis.js
var require_scopeAnalysis = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/scopeAnalysis.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInnermostScope = exports.findVariable = void 0;
    var eslintUtils = __importStar(require_eslint_utils());
    var findVariable = eslintUtils.findVariable;
    exports.findVariable = findVariable;
    var getInnermostScope = eslintUtils.getInnermostScope;
    exports.getInnermostScope = getInnermostScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/index.js
var require_eslint_utils2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_astUtilities(), exports);
    __exportStar(require_PatternMatcher(), exports);
    __exportStar(require_predicates(), exports);
    __exportStar(require_ReferenceTracker(), exports);
    __exportStar(require_scopeAnalysis(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.js
var require_helpers = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNotTokenOfTypeWithConditions = exports.isTokenOfTypeWithConditions = exports.isNodeOfTypeWithConditions = exports.isNodeOfTypes = exports.isNodeOfType = void 0;
    var isNodeOfType = (nodeType) => (node) => (node == null ? void 0 : node.type) === nodeType;
    exports.isNodeOfType = isNodeOfType;
    var isNodeOfTypes = (nodeTypes) => (node) => !!node && nodeTypes.includes(node.type);
    exports.isNodeOfTypes = isNodeOfTypes;
    var isNodeOfTypeWithConditions = (nodeType, conditions) => {
      const entries = Object.entries(conditions);
      return (node) => (node == null ? void 0 : node.type) === nodeType && entries.every(([key, value]) => node[key] === value);
    };
    exports.isNodeOfTypeWithConditions = isNodeOfTypeWithConditions;
    var isTokenOfTypeWithConditions = (tokenType, conditions) => {
      const entries = Object.entries(conditions);
      return (token) => (token == null ? void 0 : token.type) === tokenType && entries.every(([key, value]) => token[key] === value);
    };
    exports.isTokenOfTypeWithConditions = isTokenOfTypeWithConditions;
    var isNotTokenOfTypeWithConditions = (tokenType, conditions) => (token) => !(0, exports.isTokenOfTypeWithConditions)(tokenType, conditions)(token);
    exports.isNotTokenOfTypeWithConditions = isNotTokenOfTypeWithConditions;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/misc.js
var require_misc = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LINEBREAK_MATCHER = void 0;
    exports.isTokenOnSameLine = isTokenOnSameLine;
    var LINEBREAK_MATCHER = /\r\n|[\r\n\u2028\u2029]/;
    exports.LINEBREAK_MATCHER = LINEBREAK_MATCHER;
    function isTokenOnSameLine(left, right) {
      return left.loc.end.line === right.loc.start.line;
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/generated/ast-spec.js
var require_ast_spec = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/generated/ast-spec.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AST_TOKEN_TYPES = exports.AST_NODE_TYPES = void 0;
    var AST_NODE_TYPES2;
    (function(AST_NODE_TYPES3) {
      AST_NODE_TYPES3["AccessorProperty"] = "AccessorProperty";
      AST_NODE_TYPES3["ArrayExpression"] = "ArrayExpression";
      AST_NODE_TYPES3["ArrayPattern"] = "ArrayPattern";
      AST_NODE_TYPES3["ArrowFunctionExpression"] = "ArrowFunctionExpression";
      AST_NODE_TYPES3["AssignmentExpression"] = "AssignmentExpression";
      AST_NODE_TYPES3["AssignmentPattern"] = "AssignmentPattern";
      AST_NODE_TYPES3["AwaitExpression"] = "AwaitExpression";
      AST_NODE_TYPES3["BinaryExpression"] = "BinaryExpression";
      AST_NODE_TYPES3["BlockStatement"] = "BlockStatement";
      AST_NODE_TYPES3["BreakStatement"] = "BreakStatement";
      AST_NODE_TYPES3["CallExpression"] = "CallExpression";
      AST_NODE_TYPES3["CatchClause"] = "CatchClause";
      AST_NODE_TYPES3["ChainExpression"] = "ChainExpression";
      AST_NODE_TYPES3["ClassBody"] = "ClassBody";
      AST_NODE_TYPES3["ClassDeclaration"] = "ClassDeclaration";
      AST_NODE_TYPES3["ClassExpression"] = "ClassExpression";
      AST_NODE_TYPES3["ConditionalExpression"] = "ConditionalExpression";
      AST_NODE_TYPES3["ContinueStatement"] = "ContinueStatement";
      AST_NODE_TYPES3["DebuggerStatement"] = "DebuggerStatement";
      AST_NODE_TYPES3["Decorator"] = "Decorator";
      AST_NODE_TYPES3["DoWhileStatement"] = "DoWhileStatement";
      AST_NODE_TYPES3["EmptyStatement"] = "EmptyStatement";
      AST_NODE_TYPES3["ExportAllDeclaration"] = "ExportAllDeclaration";
      AST_NODE_TYPES3["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
      AST_NODE_TYPES3["ExportNamedDeclaration"] = "ExportNamedDeclaration";
      AST_NODE_TYPES3["ExportSpecifier"] = "ExportSpecifier";
      AST_NODE_TYPES3["ExpressionStatement"] = "ExpressionStatement";
      AST_NODE_TYPES3["ForInStatement"] = "ForInStatement";
      AST_NODE_TYPES3["ForOfStatement"] = "ForOfStatement";
      AST_NODE_TYPES3["ForStatement"] = "ForStatement";
      AST_NODE_TYPES3["FunctionDeclaration"] = "FunctionDeclaration";
      AST_NODE_TYPES3["FunctionExpression"] = "FunctionExpression";
      AST_NODE_TYPES3["Identifier"] = "Identifier";
      AST_NODE_TYPES3["IfStatement"] = "IfStatement";
      AST_NODE_TYPES3["ImportAttribute"] = "ImportAttribute";
      AST_NODE_TYPES3["ImportDeclaration"] = "ImportDeclaration";
      AST_NODE_TYPES3["ImportDefaultSpecifier"] = "ImportDefaultSpecifier";
      AST_NODE_TYPES3["ImportExpression"] = "ImportExpression";
      AST_NODE_TYPES3["ImportNamespaceSpecifier"] = "ImportNamespaceSpecifier";
      AST_NODE_TYPES3["ImportSpecifier"] = "ImportSpecifier";
      AST_NODE_TYPES3["JSXAttribute"] = "JSXAttribute";
      AST_NODE_TYPES3["JSXClosingElement"] = "JSXClosingElement";
      AST_NODE_TYPES3["JSXClosingFragment"] = "JSXClosingFragment";
      AST_NODE_TYPES3["JSXElement"] = "JSXElement";
      AST_NODE_TYPES3["JSXEmptyExpression"] = "JSXEmptyExpression";
      AST_NODE_TYPES3["JSXExpressionContainer"] = "JSXExpressionContainer";
      AST_NODE_TYPES3["JSXFragment"] = "JSXFragment";
      AST_NODE_TYPES3["JSXIdentifier"] = "JSXIdentifier";
      AST_NODE_TYPES3["JSXMemberExpression"] = "JSXMemberExpression";
      AST_NODE_TYPES3["JSXNamespacedName"] = "JSXNamespacedName";
      AST_NODE_TYPES3["JSXOpeningElement"] = "JSXOpeningElement";
      AST_NODE_TYPES3["JSXOpeningFragment"] = "JSXOpeningFragment";
      AST_NODE_TYPES3["JSXSpreadAttribute"] = "JSXSpreadAttribute";
      AST_NODE_TYPES3["JSXSpreadChild"] = "JSXSpreadChild";
      AST_NODE_TYPES3["JSXText"] = "JSXText";
      AST_NODE_TYPES3["LabeledStatement"] = "LabeledStatement";
      AST_NODE_TYPES3["Literal"] = "Literal";
      AST_NODE_TYPES3["LogicalExpression"] = "LogicalExpression";
      AST_NODE_TYPES3["MemberExpression"] = "MemberExpression";
      AST_NODE_TYPES3["MetaProperty"] = "MetaProperty";
      AST_NODE_TYPES3["MethodDefinition"] = "MethodDefinition";
      AST_NODE_TYPES3["NewExpression"] = "NewExpression";
      AST_NODE_TYPES3["ObjectExpression"] = "ObjectExpression";
      AST_NODE_TYPES3["ObjectPattern"] = "ObjectPattern";
      AST_NODE_TYPES3["PrivateIdentifier"] = "PrivateIdentifier";
      AST_NODE_TYPES3["Program"] = "Program";
      AST_NODE_TYPES3["Property"] = "Property";
      AST_NODE_TYPES3["PropertyDefinition"] = "PropertyDefinition";
      AST_NODE_TYPES3["RestElement"] = "RestElement";
      AST_NODE_TYPES3["ReturnStatement"] = "ReturnStatement";
      AST_NODE_TYPES3["SequenceExpression"] = "SequenceExpression";
      AST_NODE_TYPES3["SpreadElement"] = "SpreadElement";
      AST_NODE_TYPES3["StaticBlock"] = "StaticBlock";
      AST_NODE_TYPES3["Super"] = "Super";
      AST_NODE_TYPES3["SwitchCase"] = "SwitchCase";
      AST_NODE_TYPES3["SwitchStatement"] = "SwitchStatement";
      AST_NODE_TYPES3["TaggedTemplateExpression"] = "TaggedTemplateExpression";
      AST_NODE_TYPES3["TemplateElement"] = "TemplateElement";
      AST_NODE_TYPES3["TemplateLiteral"] = "TemplateLiteral";
      AST_NODE_TYPES3["ThisExpression"] = "ThisExpression";
      AST_NODE_TYPES3["ThrowStatement"] = "ThrowStatement";
      AST_NODE_TYPES3["TryStatement"] = "TryStatement";
      AST_NODE_TYPES3["UnaryExpression"] = "UnaryExpression";
      AST_NODE_TYPES3["UpdateExpression"] = "UpdateExpression";
      AST_NODE_TYPES3["VariableDeclaration"] = "VariableDeclaration";
      AST_NODE_TYPES3["VariableDeclarator"] = "VariableDeclarator";
      AST_NODE_TYPES3["WhileStatement"] = "WhileStatement";
      AST_NODE_TYPES3["WithStatement"] = "WithStatement";
      AST_NODE_TYPES3["YieldExpression"] = "YieldExpression";
      AST_NODE_TYPES3["TSAbstractAccessorProperty"] = "TSAbstractAccessorProperty";
      AST_NODE_TYPES3["TSAbstractKeyword"] = "TSAbstractKeyword";
      AST_NODE_TYPES3["TSAbstractMethodDefinition"] = "TSAbstractMethodDefinition";
      AST_NODE_TYPES3["TSAbstractPropertyDefinition"] = "TSAbstractPropertyDefinition";
      AST_NODE_TYPES3["TSAnyKeyword"] = "TSAnyKeyword";
      AST_NODE_TYPES3["TSArrayType"] = "TSArrayType";
      AST_NODE_TYPES3["TSAsExpression"] = "TSAsExpression";
      AST_NODE_TYPES3["TSAsyncKeyword"] = "TSAsyncKeyword";
      AST_NODE_TYPES3["TSBigIntKeyword"] = "TSBigIntKeyword";
      AST_NODE_TYPES3["TSBooleanKeyword"] = "TSBooleanKeyword";
      AST_NODE_TYPES3["TSCallSignatureDeclaration"] = "TSCallSignatureDeclaration";
      AST_NODE_TYPES3["TSClassImplements"] = "TSClassImplements";
      AST_NODE_TYPES3["TSConditionalType"] = "TSConditionalType";
      AST_NODE_TYPES3["TSConstructorType"] = "TSConstructorType";
      AST_NODE_TYPES3["TSConstructSignatureDeclaration"] = "TSConstructSignatureDeclaration";
      AST_NODE_TYPES3["TSDeclareFunction"] = "TSDeclareFunction";
      AST_NODE_TYPES3["TSDeclareKeyword"] = "TSDeclareKeyword";
      AST_NODE_TYPES3["TSEmptyBodyFunctionExpression"] = "TSEmptyBodyFunctionExpression";
      AST_NODE_TYPES3["TSEnumBody"] = "TSEnumBody";
      AST_NODE_TYPES3["TSEnumDeclaration"] = "TSEnumDeclaration";
      AST_NODE_TYPES3["TSEnumMember"] = "TSEnumMember";
      AST_NODE_TYPES3["TSExportAssignment"] = "TSExportAssignment";
      AST_NODE_TYPES3["TSExportKeyword"] = "TSExportKeyword";
      AST_NODE_TYPES3["TSExternalModuleReference"] = "TSExternalModuleReference";
      AST_NODE_TYPES3["TSFunctionType"] = "TSFunctionType";
      AST_NODE_TYPES3["TSImportEqualsDeclaration"] = "TSImportEqualsDeclaration";
      AST_NODE_TYPES3["TSImportType"] = "TSImportType";
      AST_NODE_TYPES3["TSIndexedAccessType"] = "TSIndexedAccessType";
      AST_NODE_TYPES3["TSIndexSignature"] = "TSIndexSignature";
      AST_NODE_TYPES3["TSInferType"] = "TSInferType";
      AST_NODE_TYPES3["TSInstantiationExpression"] = "TSInstantiationExpression";
      AST_NODE_TYPES3["TSInterfaceBody"] = "TSInterfaceBody";
      AST_NODE_TYPES3["TSInterfaceDeclaration"] = "TSInterfaceDeclaration";
      AST_NODE_TYPES3["TSInterfaceHeritage"] = "TSInterfaceHeritage";
      AST_NODE_TYPES3["TSIntersectionType"] = "TSIntersectionType";
      AST_NODE_TYPES3["TSIntrinsicKeyword"] = "TSIntrinsicKeyword";
      AST_NODE_TYPES3["TSLiteralType"] = "TSLiteralType";
      AST_NODE_TYPES3["TSMappedType"] = "TSMappedType";
      AST_NODE_TYPES3["TSMethodSignature"] = "TSMethodSignature";
      AST_NODE_TYPES3["TSModuleBlock"] = "TSModuleBlock";
      AST_NODE_TYPES3["TSModuleDeclaration"] = "TSModuleDeclaration";
      AST_NODE_TYPES3["TSNamedTupleMember"] = "TSNamedTupleMember";
      AST_NODE_TYPES3["TSNamespaceExportDeclaration"] = "TSNamespaceExportDeclaration";
      AST_NODE_TYPES3["TSNeverKeyword"] = "TSNeverKeyword";
      AST_NODE_TYPES3["TSNonNullExpression"] = "TSNonNullExpression";
      AST_NODE_TYPES3["TSNullKeyword"] = "TSNullKeyword";
      AST_NODE_TYPES3["TSNumberKeyword"] = "TSNumberKeyword";
      AST_NODE_TYPES3["TSObjectKeyword"] = "TSObjectKeyword";
      AST_NODE_TYPES3["TSOptionalType"] = "TSOptionalType";
      AST_NODE_TYPES3["TSParameterProperty"] = "TSParameterProperty";
      AST_NODE_TYPES3["TSPrivateKeyword"] = "TSPrivateKeyword";
      AST_NODE_TYPES3["TSPropertySignature"] = "TSPropertySignature";
      AST_NODE_TYPES3["TSProtectedKeyword"] = "TSProtectedKeyword";
      AST_NODE_TYPES3["TSPublicKeyword"] = "TSPublicKeyword";
      AST_NODE_TYPES3["TSQualifiedName"] = "TSQualifiedName";
      AST_NODE_TYPES3["TSReadonlyKeyword"] = "TSReadonlyKeyword";
      AST_NODE_TYPES3["TSRestType"] = "TSRestType";
      AST_NODE_TYPES3["TSSatisfiesExpression"] = "TSSatisfiesExpression";
      AST_NODE_TYPES3["TSStaticKeyword"] = "TSStaticKeyword";
      AST_NODE_TYPES3["TSStringKeyword"] = "TSStringKeyword";
      AST_NODE_TYPES3["TSSymbolKeyword"] = "TSSymbolKeyword";
      AST_NODE_TYPES3["TSTemplateLiteralType"] = "TSTemplateLiteralType";
      AST_NODE_TYPES3["TSThisType"] = "TSThisType";
      AST_NODE_TYPES3["TSTupleType"] = "TSTupleType";
      AST_NODE_TYPES3["TSTypeAliasDeclaration"] = "TSTypeAliasDeclaration";
      AST_NODE_TYPES3["TSTypeAnnotation"] = "TSTypeAnnotation";
      AST_NODE_TYPES3["TSTypeAssertion"] = "TSTypeAssertion";
      AST_NODE_TYPES3["TSTypeLiteral"] = "TSTypeLiteral";
      AST_NODE_TYPES3["TSTypeOperator"] = "TSTypeOperator";
      AST_NODE_TYPES3["TSTypeParameter"] = "TSTypeParameter";
      AST_NODE_TYPES3["TSTypeParameterDeclaration"] = "TSTypeParameterDeclaration";
      AST_NODE_TYPES3["TSTypeParameterInstantiation"] = "TSTypeParameterInstantiation";
      AST_NODE_TYPES3["TSTypePredicate"] = "TSTypePredicate";
      AST_NODE_TYPES3["TSTypeQuery"] = "TSTypeQuery";
      AST_NODE_TYPES3["TSTypeReference"] = "TSTypeReference";
      AST_NODE_TYPES3["TSUndefinedKeyword"] = "TSUndefinedKeyword";
      AST_NODE_TYPES3["TSUnionType"] = "TSUnionType";
      AST_NODE_TYPES3["TSUnknownKeyword"] = "TSUnknownKeyword";
      AST_NODE_TYPES3["TSVoidKeyword"] = "TSVoidKeyword";
    })(AST_NODE_TYPES2 || (exports.AST_NODE_TYPES = AST_NODE_TYPES2 = {}));
    var AST_TOKEN_TYPES;
    (function(AST_TOKEN_TYPES2) {
      AST_TOKEN_TYPES2["Boolean"] = "Boolean";
      AST_TOKEN_TYPES2["Identifier"] = "Identifier";
      AST_TOKEN_TYPES2["JSXIdentifier"] = "JSXIdentifier";
      AST_TOKEN_TYPES2["JSXText"] = "JSXText";
      AST_TOKEN_TYPES2["Keyword"] = "Keyword";
      AST_TOKEN_TYPES2["Null"] = "Null";
      AST_TOKEN_TYPES2["Numeric"] = "Numeric";
      AST_TOKEN_TYPES2["Punctuator"] = "Punctuator";
      AST_TOKEN_TYPES2["RegularExpression"] = "RegularExpression";
      AST_TOKEN_TYPES2["String"] = "String";
      AST_TOKEN_TYPES2["Template"] = "Template";
      AST_TOKEN_TYPES2["Block"] = "Block";
      AST_TOKEN_TYPES2["Line"] = "Line";
    })(AST_TOKEN_TYPES || (exports.AST_TOKEN_TYPES = AST_TOKEN_TYPES = {}));
  }
});

// node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/lib.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/lib.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/parser-options.js
var require_parser_options = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/parser-options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/ts-estree.js
var require_ts_estree = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/ts-estree.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSESTree = void 0;
    exports.TSESTree = __importStar(require_ast_spec());
  }
});

// node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+types@8.12.2/node_modules/@typescript-eslint/types/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AST_TOKEN_TYPES = exports.AST_NODE_TYPES = void 0;
    var ast_spec_1 = require_ast_spec();
    Object.defineProperty(exports, "AST_NODE_TYPES", { enumerable: true, get: function() {
      return ast_spec_1.AST_NODE_TYPES;
    } });
    Object.defineProperty(exports, "AST_TOKEN_TYPES", { enumerable: true, get: function() {
      return ast_spec_1.AST_TOKEN_TYPES;
    } });
    __exportStar(require_lib(), exports);
    __exportStar(require_parser_options(), exports);
    __exportStar(require_ts_estree(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-estree.js
var require_ts_estree2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-estree.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSESTree = exports.AST_TOKEN_TYPES = exports.AST_NODE_TYPES = void 0;
    var types_1 = require_dist();
    Object.defineProperty(exports, "AST_NODE_TYPES", { enumerable: true, get: function() {
      return types_1.AST_NODE_TYPES;
    } });
    Object.defineProperty(exports, "AST_TOKEN_TYPES", { enumerable: true, get: function() {
      return types_1.AST_TOKEN_TYPES;
    } });
    Object.defineProperty(exports, "TSESTree", { enumerable: true, get: function() {
      return types_1.TSESTree;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.js
var require_predicates2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/predicates.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isVariableDeclarator = exports.isTypeKeyword = exports.isTypeAssertion = exports.isTSFunctionType = exports.isTSConstructorType = exports.isOptionalChainPunctuator = exports.isOptionalCallExpression = exports.isNotOptionalChainPunctuator = exports.isNotNonNullAssertionPunctuator = exports.isNonNullAssertionPunctuator = exports.isLoop = exports.isLogicalOrOperator = exports.isImportKeyword = exports.isIdentifier = exports.isFunctionType = exports.isFunctionOrFunctionType = exports.isFunction = exports.isConstructor = exports.isClassOrTypeElement = exports.isAwaitKeyword = exports.isAwaitExpression = void 0;
    exports.isSetter = isSetter;
    var ts_estree_1 = require_ts_estree2();
    var helpers_1 = require_helpers();
    var isOptionalChainPunctuator = (0, helpers_1.isTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Punctuator, { value: "?." });
    exports.isOptionalChainPunctuator = isOptionalChainPunctuator;
    var isNotOptionalChainPunctuator = (0, helpers_1.isNotTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Punctuator, { value: "?." });
    exports.isNotOptionalChainPunctuator = isNotOptionalChainPunctuator;
    var isNonNullAssertionPunctuator = (0, helpers_1.isTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Punctuator, { value: "!" });
    exports.isNonNullAssertionPunctuator = isNonNullAssertionPunctuator;
    var isNotNonNullAssertionPunctuator = (0, helpers_1.isNotTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Punctuator, { value: "!" });
    exports.isNotNonNullAssertionPunctuator = isNotNonNullAssertionPunctuator;
    var isOptionalCallExpression = (0, helpers_1.isNodeOfTypeWithConditions)(
      ts_estree_1.AST_NODE_TYPES.CallExpression,
      // this flag means the call expression itself is option
      // i.e. it is foo.bar?.() and not foo?.bar()
      { optional: true }
    );
    exports.isOptionalCallExpression = isOptionalCallExpression;
    var isLogicalOrOperator = (0, helpers_1.isNodeOfTypeWithConditions)(ts_estree_1.AST_NODE_TYPES.LogicalExpression, { operator: "||" });
    exports.isLogicalOrOperator = isLogicalOrOperator;
    var isTypeAssertion = (0, helpers_1.isNodeOfTypes)([
      ts_estree_1.AST_NODE_TYPES.TSAsExpression,
      ts_estree_1.AST_NODE_TYPES.TSTypeAssertion
    ]);
    exports.isTypeAssertion = isTypeAssertion;
    var isVariableDeclarator = (0, helpers_1.isNodeOfType)(ts_estree_1.AST_NODE_TYPES.VariableDeclarator);
    exports.isVariableDeclarator = isVariableDeclarator;
    var functionTypes = [
      ts_estree_1.AST_NODE_TYPES.ArrowFunctionExpression,
      ts_estree_1.AST_NODE_TYPES.FunctionDeclaration,
      ts_estree_1.AST_NODE_TYPES.FunctionExpression
    ];
    var isFunction = (0, helpers_1.isNodeOfTypes)(functionTypes);
    exports.isFunction = isFunction;
    var functionTypeTypes = [
      ts_estree_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
      ts_estree_1.AST_NODE_TYPES.TSConstructorType,
      ts_estree_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
      ts_estree_1.AST_NODE_TYPES.TSDeclareFunction,
      ts_estree_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
      ts_estree_1.AST_NODE_TYPES.TSFunctionType,
      ts_estree_1.AST_NODE_TYPES.TSMethodSignature
    ];
    var isFunctionType = (0, helpers_1.isNodeOfTypes)(functionTypeTypes);
    exports.isFunctionType = isFunctionType;
    var isFunctionOrFunctionType = (0, helpers_1.isNodeOfTypes)([
      ...functionTypes,
      ...functionTypeTypes
    ]);
    exports.isFunctionOrFunctionType = isFunctionOrFunctionType;
    var isTSFunctionType = (0, helpers_1.isNodeOfType)(ts_estree_1.AST_NODE_TYPES.TSFunctionType);
    exports.isTSFunctionType = isTSFunctionType;
    var isTSConstructorType = (0, helpers_1.isNodeOfType)(ts_estree_1.AST_NODE_TYPES.TSConstructorType);
    exports.isTSConstructorType = isTSConstructorType;
    var isClassOrTypeElement = (0, helpers_1.isNodeOfTypes)([
      // ClassElement
      ts_estree_1.AST_NODE_TYPES.PropertyDefinition,
      ts_estree_1.AST_NODE_TYPES.FunctionExpression,
      ts_estree_1.AST_NODE_TYPES.MethodDefinition,
      ts_estree_1.AST_NODE_TYPES.TSAbstractPropertyDefinition,
      ts_estree_1.AST_NODE_TYPES.TSAbstractMethodDefinition,
      ts_estree_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
      ts_estree_1.AST_NODE_TYPES.TSIndexSignature,
      // TypeElement
      ts_estree_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
      ts_estree_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
      // AST_NODE_TYPES.TSIndexSignature,
      ts_estree_1.AST_NODE_TYPES.TSMethodSignature,
      ts_estree_1.AST_NODE_TYPES.TSPropertySignature
    ]);
    exports.isClassOrTypeElement = isClassOrTypeElement;
    var isConstructor = (0, helpers_1.isNodeOfTypeWithConditions)(ts_estree_1.AST_NODE_TYPES.MethodDefinition, { kind: "constructor" });
    exports.isConstructor = isConstructor;
    function isSetter(node) {
      return !!node && (node.type === ts_estree_1.AST_NODE_TYPES.MethodDefinition || node.type === ts_estree_1.AST_NODE_TYPES.Property) && node.kind === "set";
    }
    var isIdentifier = (0, helpers_1.isNodeOfType)(ts_estree_1.AST_NODE_TYPES.Identifier);
    exports.isIdentifier = isIdentifier;
    var isAwaitExpression = (0, helpers_1.isNodeOfType)(ts_estree_1.AST_NODE_TYPES.AwaitExpression);
    exports.isAwaitExpression = isAwaitExpression;
    var isAwaitKeyword = (0, helpers_1.isTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Identifier, {
      value: "await"
    });
    exports.isAwaitKeyword = isAwaitKeyword;
    var isTypeKeyword = (0, helpers_1.isTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Identifier, {
      value: "type"
    });
    exports.isTypeKeyword = isTypeKeyword;
    var isImportKeyword = (0, helpers_1.isTokenOfTypeWithConditions)(ts_estree_1.AST_TOKEN_TYPES.Keyword, {
      value: "import"
    });
    exports.isImportKeyword = isImportKeyword;
    var isLoop = (0, helpers_1.isNodeOfTypes)([
      ts_estree_1.AST_NODE_TYPES.DoWhileStatement,
      ts_estree_1.AST_NODE_TYPES.ForStatement,
      ts_estree_1.AST_NODE_TYPES.ForInStatement,
      ts_estree_1.AST_NODE_TYPES.ForOfStatement,
      ts_estree_1.AST_NODE_TYPES.WhileStatement
    ]);
    exports.isLoop = isLoop;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/index.js
var require_ast_utils = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ast-utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_eslint_utils2(), exports);
    __exportStar(require_helpers(), exports);
    __exportStar(require_misc(), exports);
    __exportStar(require_predicates2(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/deepMerge.js
var require_deepMerge = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/deepMerge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deepMerge = deepMerge;
    exports.isObjectNotArray = isObjectNotArray;
    function isObjectNotArray(obj) {
      return typeof obj === "object" && obj != null && !Array.isArray(obj);
    }
    function deepMerge(first = {}, second = {}) {
      const keys = /* @__PURE__ */ new Set([...Object.keys(first), ...Object.keys(second)]);
      return Object.fromEntries([...keys].map((key) => {
        const firstHasKey = key in first;
        const secondHasKey = key in second;
        const firstValue = first[key];
        const secondValue = second[key];
        let value;
        if (firstHasKey && secondHasKey) {
          if (isObjectNotArray(firstValue) && isObjectNotArray(secondValue)) {
            value = deepMerge(firstValue, secondValue);
          } else {
            value = secondValue;
          }
        } else if (firstHasKey) {
          value = firstValue;
        } else {
          value = secondValue;
        }
        return [key, value];
      }));
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/applyDefault.js
var require_applyDefault = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/applyDefault.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.applyDefault = applyDefault;
    var deepMerge_1 = require_deepMerge();
    function applyDefault(defaultOptions, userOptions) {
      const options = structuredClone(defaultOptions);
      if (userOptions == null) {
        return options;
      }
      options.forEach((opt, i) => {
        if (userOptions[i] !== void 0) {
          const userOpt = userOptions[i];
          if ((0, deepMerge_1.isObjectNotArray)(userOpt) && (0, deepMerge_1.isObjectNotArray)(opt)) {
            options[i] = (0, deepMerge_1.deepMerge)(opt, userOpt);
          } else {
            options[i] = userOpt;
          }
        }
      });
      return options;
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/parserSeemsToBeTSESLint.js
var require_parserSeemsToBeTSESLint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/parserSeemsToBeTSESLint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parserSeemsToBeTSESLint = parserSeemsToBeTSESLint;
    function parserSeemsToBeTSESLint(parser) {
      return !!parser && /(?:typescript-eslint|\.\.)[\w/\\]*parser/.test(parser);
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/getParserServices.js
var require_getParserServices = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/getParserServices.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getParserServices = getParserServices;
    var parserSeemsToBeTSESLint_1 = require_parserSeemsToBeTSESLint();
    var ERROR_MESSAGE_REQUIRES_PARSER_SERVICES = "You have used a rule which requires type information, but don't have parserOptions set to generate type information for this file. See https://typescript-eslint.io/getting-started/typed-linting for enabling linting with type information.";
    var ERROR_MESSAGE_UNKNOWN_PARSER = 'Note: detected a parser other than @typescript-eslint/parser. Make sure the parser is configured to forward "parserOptions.project" to @typescript-eslint/parser.';
    function getParserServices(context, allowWithoutFullTypeInformation = false) {
      var _a, _b, _c;
      const parser = context.parserPath || ((_b = (_a = context.languageOptions.parser) == null ? void 0 : _a.meta) == null ? void 0 : _b.name);
      if (((_c = context.sourceCode.parserServices) == null ? void 0 : _c.esTreeNodeToTSNodeMap) == null || context.sourceCode.parserServices.tsNodeToESTreeNodeMap == null) {
        throwError(parser);
      }
      if (context.sourceCode.parserServices.program == null && !allowWithoutFullTypeInformation) {
        throwError(parser);
      }
      return context.sourceCode.parserServices;
    }
    function throwError(parser) {
      const messages = [
        ERROR_MESSAGE_REQUIRES_PARSER_SERVICES,
        `Parser: ${parser || "(unknown)"}`,
        !(0, parserSeemsToBeTSESLint_1.parserSeemsToBeTSESLint)(parser) && ERROR_MESSAGE_UNKNOWN_PARSER
      ].filter(Boolean);
      throw new Error(messages.join("\n"));
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/InferTypesFromRule.js
var require_InferTypesFromRule = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/InferTypesFromRule.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/nullThrows.js
var require_nullThrows = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/nullThrows.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullThrowsReasons = void 0;
    exports.nullThrows = nullThrows;
    var NullThrowsReasons = {
      MissingParent: "Expected node to have a parent.",
      MissingToken: (token, thing) => `Expected to find a ${token} for the ${thing}.`
    };
    exports.NullThrowsReasons = NullThrowsReasons;
    function nullThrows(value, message) {
      if (value == null) {
        throw new Error(`Non-null Assertion Failed: ${message}`);
      }
      return value;
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/RuleCreator.js
var require_RuleCreator = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/RuleCreator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RuleCreator = RuleCreator;
    var applyDefault_1 = require_applyDefault();
    function RuleCreator(urlCreator) {
      return function createNamedRule({ meta, name: name2, ...rule }) {
        return createRule({
          meta: {
            ...meta,
            docs: {
              ...meta.docs,
              url: urlCreator(name2)
            }
          },
          ...rule
        });
      };
    }
    function createRule({ create, defaultOptions, meta }) {
      return {
        create(context) {
          const optionsWithDefault = (0, applyDefault_1.applyDefault)(defaultOptions, context.options);
          return create(context, optionsWithDefault);
        },
        defaultOptions,
        meta
      };
    }
    RuleCreator.withoutDocs = function withoutDocs(args) {
      return createRule(args);
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/index.js
var require_eslint_utils3 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/eslint-utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_applyDefault(), exports);
    __exportStar(require_deepMerge(), exports);
    __exportStar(require_getParserServices(), exports);
    __exportStar(require_InferTypesFromRule(), exports);
    __exportStar(require_nullThrows(), exports);
    __exportStar(require_RuleCreator(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/json-schema.js
var require_json_schema = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/json-schema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/AST.js
var require_AST = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/AST.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Config.js
var require_Config = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/eslint/FlatESLint.js
var require_FlatESLint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/eslint/FlatESLint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FlatESLint = void 0;
    var use_at_your_own_risk_1 = __require("eslint/use-at-your-own-risk");
    var FlatESLint = class extends use_at_your_own_risk_1.FlatESLint {
    };
    exports.FlatESLint = FlatESLint;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/eslint/LegacyESLint.js
var require_LegacyESLint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/eslint/LegacyESLint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegacyESLint = void 0;
    var use_at_your_own_risk_1 = __require("eslint/use-at-your-own-risk");
    var LegacyESLint = class extends use_at_your_own_risk_1.LegacyESLint {
    };
    exports.LegacyESLint = LegacyESLint;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/ESLint.js
var require_ESLint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/ESLint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegacyESLint = exports.ESLint = exports.FlatESLint = void 0;
    var FlatESLint_1 = require_FlatESLint();
    Object.defineProperty(exports, "FlatESLint", { enumerable: true, get: function() {
      return FlatESLint_1.FlatESLint;
    } });
    var FlatESLint_2 = require_FlatESLint();
    Object.defineProperty(exports, "ESLint", { enumerable: true, get: function() {
      return FlatESLint_2.FlatESLint;
    } });
    var LegacyESLint_1 = require_LegacyESLint();
    Object.defineProperty(exports, "LegacyESLint", { enumerable: true, get: function() {
      return LegacyESLint_1.LegacyESLint;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Linter.js
var require_Linter = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Linter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Linter = void 0;
    var eslint_1 = __require("eslint");
    var Linter = class extends eslint_1.Linter {
    };
    exports.Linter = Linter;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Parser.js
var require_Parser = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Parser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/ParserOptions.js
var require_ParserOptions = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/ParserOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Processor.js
var require_Processor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Processor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Rule.js
var require_Rule = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Rule.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/RuleTester.js
var require_RuleTester = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/RuleTester.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RuleTester = void 0;
    var eslint_1 = __require("eslint");
    var RuleTester = class extends eslint_1.RuleTester {
    };
    exports.RuleTester = RuleTester;
  }
});

// node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/get-keys.js
var require_get_keys = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/get-keys.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getKeys = void 0;
    var eslint_visitor_keys_1 = require_eslint_visitor_keys();
    var getKeys = eslint_visitor_keys_1.getKeys;
    exports.getKeys = getKeys;
  }
});

// node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/visitor-keys.js
var require_visitor_keys = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/visitor-keys.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.visitorKeys = void 0;
    var eslintVisitorKeys = __importStar(require_eslint_visitor_keys());
    var SharedVisitorKeys = (() => {
      const FunctionType = ["typeParameters", "params", "returnType"];
      const AnonymousFunction = [...FunctionType, "body"];
      const AbstractPropertyDefinition = [
        "decorators",
        "key",
        "typeAnnotation"
      ];
      return {
        AbstractPropertyDefinition: ["decorators", "key", "typeAnnotation"],
        AnonymousFunction,
        AsExpression: ["expression", "typeAnnotation"],
        ClassDeclaration: [
          "decorators",
          "id",
          "typeParameters",
          "superClass",
          "superTypeArguments",
          "implements",
          "body"
        ],
        Function: ["id", ...AnonymousFunction],
        FunctionType,
        PropertyDefinition: [...AbstractPropertyDefinition, "value"]
      };
    })();
    var additionalKeys = {
      AccessorProperty: SharedVisitorKeys.PropertyDefinition,
      ArrayPattern: ["decorators", "elements", "typeAnnotation"],
      ArrowFunctionExpression: SharedVisitorKeys.AnonymousFunction,
      AssignmentPattern: ["decorators", "left", "right", "typeAnnotation"],
      CallExpression: ["callee", "typeArguments", "arguments"],
      ClassDeclaration: SharedVisitorKeys.ClassDeclaration,
      ClassExpression: SharedVisitorKeys.ClassDeclaration,
      Decorator: ["expression"],
      ExportAllDeclaration: ["exported", "source", "assertions"],
      ExportNamedDeclaration: ["declaration", "specifiers", "source", "assertions"],
      FunctionDeclaration: SharedVisitorKeys.Function,
      FunctionExpression: SharedVisitorKeys.Function,
      Identifier: ["decorators", "typeAnnotation"],
      ImportAttribute: ["key", "value"],
      ImportDeclaration: ["specifiers", "source", "assertions"],
      ImportExpression: ["source", "attributes"],
      JSXClosingFragment: [],
      JSXOpeningElement: ["name", "typeArguments", "attributes"],
      JSXOpeningFragment: [],
      JSXSpreadChild: ["expression"],
      MethodDefinition: ["decorators", "key", "value"],
      NewExpression: ["callee", "typeArguments", "arguments"],
      ObjectPattern: ["decorators", "properties", "typeAnnotation"],
      PropertyDefinition: SharedVisitorKeys.PropertyDefinition,
      RestElement: ["decorators", "argument", "typeAnnotation"],
      StaticBlock: ["body"],
      TaggedTemplateExpression: ["tag", "typeArguments", "quasi"],
      TSAbstractAccessorProperty: SharedVisitorKeys.AbstractPropertyDefinition,
      TSAbstractKeyword: [],
      TSAbstractMethodDefinition: ["key", "value"],
      TSAbstractPropertyDefinition: SharedVisitorKeys.AbstractPropertyDefinition,
      TSAnyKeyword: [],
      TSArrayType: ["elementType"],
      TSAsExpression: SharedVisitorKeys.AsExpression,
      TSAsyncKeyword: [],
      TSBigIntKeyword: [],
      TSBooleanKeyword: [],
      TSCallSignatureDeclaration: SharedVisitorKeys.FunctionType,
      TSClassImplements: ["expression", "typeArguments"],
      TSConditionalType: ["checkType", "extendsType", "trueType", "falseType"],
      TSConstructorType: SharedVisitorKeys.FunctionType,
      TSConstructSignatureDeclaration: SharedVisitorKeys.FunctionType,
      TSDeclareFunction: SharedVisitorKeys.Function,
      TSDeclareKeyword: [],
      TSEmptyBodyFunctionExpression: ["id", ...SharedVisitorKeys.FunctionType],
      TSEnumBody: ["members"],
      TSEnumDeclaration: ["id", "body"],
      TSEnumMember: ["id", "initializer"],
      TSExportAssignment: ["expression"],
      TSExportKeyword: [],
      TSExternalModuleReference: ["expression"],
      TSFunctionType: SharedVisitorKeys.FunctionType,
      TSImportEqualsDeclaration: ["id", "moduleReference"],
      TSImportType: ["argument", "qualifier", "typeArguments"],
      TSIndexedAccessType: ["indexType", "objectType"],
      TSIndexSignature: ["parameters", "typeAnnotation"],
      TSInferType: ["typeParameter"],
      TSInstantiationExpression: ["expression", "typeArguments"],
      TSInterfaceBody: ["body"],
      TSInterfaceDeclaration: ["id", "typeParameters", "extends", "body"],
      TSInterfaceHeritage: ["expression", "typeArguments"],
      TSIntersectionType: ["types"],
      TSIntrinsicKeyword: [],
      TSLiteralType: ["literal"],
      TSMappedType: ["key", "constraint", "nameType", "typeAnnotation"],
      TSMethodSignature: ["typeParameters", "key", "params", "returnType"],
      TSModuleBlock: ["body"],
      TSModuleDeclaration: ["id", "body"],
      TSNamedTupleMember: ["label", "elementType"],
      TSNamespaceExportDeclaration: ["id"],
      TSNeverKeyword: [],
      TSNonNullExpression: ["expression"],
      TSNullKeyword: [],
      TSNumberKeyword: [],
      TSObjectKeyword: [],
      TSOptionalType: ["typeAnnotation"],
      TSParameterProperty: ["decorators", "parameter"],
      TSPrivateKeyword: [],
      TSPropertySignature: ["typeAnnotation", "key"],
      TSProtectedKeyword: [],
      TSPublicKeyword: [],
      TSQualifiedName: ["left", "right"],
      TSReadonlyKeyword: [],
      TSRestType: ["typeAnnotation"],
      TSSatisfiesExpression: SharedVisitorKeys.AsExpression,
      TSStaticKeyword: [],
      TSStringKeyword: [],
      TSSymbolKeyword: [],
      TSTemplateLiteralType: ["quasis", "types"],
      TSThisType: [],
      TSTupleType: ["elementTypes"],
      TSTypeAliasDeclaration: ["id", "typeParameters", "typeAnnotation"],
      TSTypeAnnotation: ["typeAnnotation"],
      TSTypeAssertion: ["typeAnnotation", "expression"],
      TSTypeLiteral: ["members"],
      TSTypeOperator: ["typeAnnotation"],
      TSTypeParameter: ["name", "constraint", "default"],
      TSTypeParameterDeclaration: ["params"],
      TSTypeParameterInstantiation: ["params"],
      TSTypePredicate: ["typeAnnotation", "parameterName"],
      TSTypeQuery: ["exprName", "typeArguments"],
      TSTypeReference: ["typeName", "typeArguments"],
      TSUndefinedKeyword: [],
      TSUnionType: ["types"],
      TSUnknownKeyword: [],
      TSVoidKeyword: []
    };
    var visitorKeys = eslintVisitorKeys.unionWith(additionalKeys);
    exports.visitorKeys = visitorKeys;
  }
});

// node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+visitor-keys@8.12.2/node_modules/@typescript-eslint/visitor-keys/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.visitorKeys = exports.getKeys = void 0;
    var get_keys_1 = require_get_keys();
    Object.defineProperty(exports, "getKeys", { enumerable: true, get: function() {
      return get_keys_1.getKeys;
    } });
    var visitor_keys_1 = require_visitor_keys();
    Object.defineProperty(exports, "visitorKeys", { enumerable: true, get: function() {
      return visitor_keys_1.visitorKeys;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/assert.js
var require_assert = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assert = assert;
    function assert(value, message) {
      if (value == null) {
        throw new Error(message);
      }
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/ID.js
var require_ID = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/ID.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createIdGenerator = createIdGenerator;
    exports.resetIds = resetIds;
    var ID_CACHE = /* @__PURE__ */ new Map();
    var NEXT_KEY = 0;
    function createIdGenerator() {
      const key = NEXT_KEY += 1;
      ID_CACHE.set(key, 0);
      return () => {
        const current = ID_CACHE.get(key) ?? 0;
        const next = current + 1;
        ID_CACHE.set(key, next);
        return next;
      };
    }
    function resetIds() {
      ID_CACHE.clear();
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/DefinitionBase.js
var require_DefinitionBase = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/DefinitionBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefinitionBase = void 0;
    var ID_1 = require_ID();
    var generator = (0, ID_1.createIdGenerator)();
    var DefinitionBase = class {
      /**
       * A unique ID for this instance - primarily used to help debugging and testing
       */
      $id = generator();
      type;
      /**
       * The `Identifier` node of this definition
       * @public
       */
      name;
      /**
       * The enclosing node of the name.
       * @public
       */
      node;
      /**
       * the enclosing statement node of the identifier.
       * @public
       */
      parent;
      constructor(type, name2, node, parent) {
        this.type = type;
        this.name = name2;
        this.node = node;
        this.parent = parent;
      }
    };
    exports.DefinitionBase = DefinitionBase;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/DefinitionType.js
var require_DefinitionType = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/DefinitionType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefinitionType = void 0;
    var DefinitionType;
    (function(DefinitionType2) {
      DefinitionType2["CatchClause"] = "CatchClause";
      DefinitionType2["ClassName"] = "ClassName";
      DefinitionType2["FunctionName"] = "FunctionName";
      DefinitionType2["ImplicitGlobalVariable"] = "ImplicitGlobalVariable";
      DefinitionType2["ImportBinding"] = "ImportBinding";
      DefinitionType2["Parameter"] = "Parameter";
      DefinitionType2["TSEnumName"] = "TSEnumName";
      DefinitionType2["TSEnumMember"] = "TSEnumMemberName";
      DefinitionType2["TSModuleName"] = "TSModuleName";
      DefinitionType2["Type"] = "Type";
      DefinitionType2["Variable"] = "Variable";
    })(DefinitionType || (exports.DefinitionType = DefinitionType = {}));
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/CatchClauseDefinition.js
var require_CatchClauseDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/CatchClauseDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CatchClauseDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var CatchClauseDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = false;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.CatchClause, name2, node, null);
      }
    };
    exports.CatchClauseDefinition = CatchClauseDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ClassNameDefinition.js
var require_ClassNameDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ClassNameDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassNameDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var ClassNameDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.ClassName, name2, node, null);
      }
    };
    exports.ClassNameDefinition = ClassNameDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/Definition.js
var require_Definition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/Definition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/FunctionNameDefinition.js
var require_FunctionNameDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/FunctionNameDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FunctionNameDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var FunctionNameDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = false;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.FunctionName, name2, node, null);
      }
    };
    exports.FunctionNameDefinition = FunctionNameDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ImplicitGlobalVariableDefinition.js
var require_ImplicitGlobalVariableDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ImplicitGlobalVariableDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImplicitGlobalVariableDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var ImplicitGlobalVariableDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = false;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.ImplicitGlobalVariable, name2, node, null);
      }
    };
    exports.ImplicitGlobalVariableDefinition = ImplicitGlobalVariableDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ImportBindingDefinition.js
var require_ImportBindingDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ImportBindingDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportBindingDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var ImportBindingDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = true;
      constructor(name2, node, decl) {
        super(DefinitionType_1.DefinitionType.ImportBinding, name2, node, decl);
      }
    };
    exports.ImportBindingDefinition = ImportBindingDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ParameterDefinition.js
var require_ParameterDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/ParameterDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParameterDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var ParameterDefinition = class extends DefinitionBase_1.DefinitionBase {
      /**
       * Whether the parameter definition is a part of a rest parameter.
       */
      isTypeDefinition = false;
      isVariableDefinition = true;
      rest;
      constructor(name2, node, rest) {
        super(DefinitionType_1.DefinitionType.Parameter, name2, node, null);
        this.rest = rest;
      }
    };
    exports.ParameterDefinition = ParameterDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSEnumMemberDefinition.js
var require_TSEnumMemberDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSEnumMemberDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSEnumMemberDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var TSEnumMemberDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.TSEnumMember, name2, node, null);
      }
    };
    exports.TSEnumMemberDefinition = TSEnumMemberDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSEnumNameDefinition.js
var require_TSEnumNameDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSEnumNameDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSEnumNameDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var TSEnumNameDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.TSEnumName, name2, node, null);
      }
    };
    exports.TSEnumNameDefinition = TSEnumNameDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSModuleNameDefinition.js
var require_TSModuleNameDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TSModuleNameDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSModuleNameDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var TSModuleNameDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = true;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.TSModuleName, name2, node, null);
      }
    };
    exports.TSModuleNameDefinition = TSModuleNameDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TypeDefinition.js
var require_TypeDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/TypeDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var TypeDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = true;
      isVariableDefinition = false;
      constructor(name2, node) {
        super(DefinitionType_1.DefinitionType.Type, name2, node, null);
      }
    };
    exports.TypeDefinition = TypeDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/VariableDefinition.js
var require_VariableDefinition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/VariableDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VariableDefinition = void 0;
    var DefinitionBase_1 = require_DefinitionBase();
    var DefinitionType_1 = require_DefinitionType();
    var VariableDefinition = class extends DefinitionBase_1.DefinitionBase {
      isTypeDefinition = false;
      isVariableDefinition = true;
      constructor(name2, node, decl) {
        super(DefinitionType_1.DefinitionType.Variable, name2, node, decl);
      }
    };
    exports.VariableDefinition = VariableDefinition;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/index.js
var require_definition = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/definition/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_CatchClauseDefinition(), exports);
    __exportStar(require_ClassNameDefinition(), exports);
    __exportStar(require_Definition(), exports);
    __exportStar(require_DefinitionType(), exports);
    __exportStar(require_FunctionNameDefinition(), exports);
    __exportStar(require_ImplicitGlobalVariableDefinition(), exports);
    __exportStar(require_ImportBindingDefinition(), exports);
    __exportStar(require_ParameterDefinition(), exports);
    __exportStar(require_TSEnumMemberDefinition(), exports);
    __exportStar(require_TSEnumNameDefinition(), exports);
    __exportStar(require_TSModuleNameDefinition(), exports);
    __exportStar(require_TypeDefinition(), exports);
    __exportStar(require_VariableDefinition(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/base-config.js
var require_base_config = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/base-config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TYPE_VALUE = exports.VALUE = exports.TYPE = void 0;
    exports.TYPE = Object.freeze({
      eslintImplicitGlobalSetting: "readonly",
      isTypeVariable: true,
      isValueVariable: false
    });
    exports.VALUE = Object.freeze({
      eslintImplicitGlobalSetting: "readonly",
      isTypeVariable: false,
      isValueVariable: true
    });
    exports.TYPE_VALUE = Object.freeze({
      eslintImplicitGlobalSetting: "readonly",
      isTypeVariable: true,
      isValueVariable: true
    });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/decorators.js
var require_decorators = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/decorators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decorators = void 0;
    var base_config_1 = require_base_config();
    exports.decorators = {
      ClassAccessorDecoratorContext: base_config_1.TYPE,
      ClassAccessorDecoratorResult: base_config_1.TYPE,
      ClassAccessorDecoratorTarget: base_config_1.TYPE,
      ClassDecoratorContext: base_config_1.TYPE,
      ClassFieldDecoratorContext: base_config_1.TYPE,
      ClassGetterDecoratorContext: base_config_1.TYPE,
      ClassMemberDecoratorContext: base_config_1.TYPE,
      ClassMethodDecoratorContext: base_config_1.TYPE,
      ClassSetterDecoratorContext: base_config_1.TYPE,
      DecoratorContext: base_config_1.TYPE,
      DecoratorMetadata: base_config_1.TYPE,
      DecoratorMetadataObject: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/decorators.legacy.js
var require_decorators_legacy = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/decorators.legacy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decorators_legacy = void 0;
    var base_config_1 = require_base_config();
    exports.decorators_legacy = {
      ClassDecorator: base_config_1.TYPE,
      MethodDecorator: base_config_1.TYPE,
      ParameterDecorator: base_config_1.TYPE,
      PropertyDecorator: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.js
var require_dom = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dom = void 0;
    var base_config_1 = require_base_config();
    exports.dom = {
      AbortController: base_config_1.TYPE_VALUE,
      AbortSignal: base_config_1.TYPE_VALUE,
      AbortSignalEventMap: base_config_1.TYPE,
      AbstractRange: base_config_1.TYPE_VALUE,
      AbstractWorker: base_config_1.TYPE,
      AbstractWorkerEventMap: base_config_1.TYPE,
      AddEventListenerOptions: base_config_1.TYPE,
      AesCbcParams: base_config_1.TYPE,
      AesCtrParams: base_config_1.TYPE,
      AesDerivedKeyParams: base_config_1.TYPE,
      AesGcmParams: base_config_1.TYPE,
      AesKeyAlgorithm: base_config_1.TYPE,
      AesKeyGenParams: base_config_1.TYPE,
      Algorithm: base_config_1.TYPE,
      AlgorithmIdentifier: base_config_1.TYPE,
      AlignSetting: base_config_1.TYPE,
      AllowSharedBufferSource: base_config_1.TYPE,
      AlphaOption: base_config_1.TYPE,
      AnalyserNode: base_config_1.TYPE_VALUE,
      AnalyserOptions: base_config_1.TYPE,
      ANGLE_instanced_arrays: base_config_1.TYPE,
      Animatable: base_config_1.TYPE,
      Animation: base_config_1.TYPE_VALUE,
      AnimationEffect: base_config_1.TYPE_VALUE,
      AnimationEvent: base_config_1.TYPE_VALUE,
      AnimationEventInit: base_config_1.TYPE,
      AnimationEventMap: base_config_1.TYPE,
      AnimationFrameProvider: base_config_1.TYPE,
      AnimationPlaybackEvent: base_config_1.TYPE_VALUE,
      AnimationPlaybackEventInit: base_config_1.TYPE,
      AnimationPlayState: base_config_1.TYPE,
      AnimationReplaceState: base_config_1.TYPE,
      AnimationTimeline: base_config_1.TYPE_VALUE,
      AppendMode: base_config_1.TYPE,
      ARIAMixin: base_config_1.TYPE,
      AssignedNodesOptions: base_config_1.TYPE,
      AttestationConveyancePreference: base_config_1.TYPE,
      Attr: base_config_1.TYPE_VALUE,
      AudioBuffer: base_config_1.TYPE_VALUE,
      AudioBufferOptions: base_config_1.TYPE,
      AudioBufferSourceNode: base_config_1.TYPE_VALUE,
      AudioBufferSourceOptions: base_config_1.TYPE,
      AudioConfiguration: base_config_1.TYPE,
      AudioContext: base_config_1.TYPE_VALUE,
      AudioContextLatencyCategory: base_config_1.TYPE,
      AudioContextOptions: base_config_1.TYPE,
      AudioContextState: base_config_1.TYPE,
      AudioDestinationNode: base_config_1.TYPE_VALUE,
      AudioListener: base_config_1.TYPE_VALUE,
      AudioNode: base_config_1.TYPE_VALUE,
      AudioNodeOptions: base_config_1.TYPE,
      AudioParam: base_config_1.TYPE_VALUE,
      AudioParamMap: base_config_1.TYPE_VALUE,
      AudioProcessingEvent: base_config_1.TYPE_VALUE,
      AudioProcessingEventInit: base_config_1.TYPE,
      AudioScheduledSourceNode: base_config_1.TYPE_VALUE,
      AudioScheduledSourceNodeEventMap: base_config_1.TYPE,
      AudioTimestamp: base_config_1.TYPE,
      AudioWorklet: base_config_1.TYPE_VALUE,
      AudioWorkletNode: base_config_1.TYPE_VALUE,
      AudioWorkletNodeEventMap: base_config_1.TYPE,
      AudioWorkletNodeOptions: base_config_1.TYPE,
      AuthenticationExtensionsClientInputs: base_config_1.TYPE,
      AuthenticationExtensionsClientOutputs: base_config_1.TYPE,
      AuthenticatorAssertionResponse: base_config_1.TYPE_VALUE,
      AuthenticatorAttachment: base_config_1.TYPE,
      AuthenticatorAttestationResponse: base_config_1.TYPE_VALUE,
      AuthenticatorResponse: base_config_1.TYPE_VALUE,
      AuthenticatorSelectionCriteria: base_config_1.TYPE,
      AuthenticatorTransport: base_config_1.TYPE,
      AutoFill: base_config_1.TYPE,
      AutoFillAddressKind: base_config_1.TYPE,
      AutoFillBase: base_config_1.TYPE,
      AutoFillContactField: base_config_1.TYPE,
      AutoFillContactKind: base_config_1.TYPE,
      AutoFillCredentialField: base_config_1.TYPE,
      AutoFillField: base_config_1.TYPE,
      AutoFillNormalField: base_config_1.TYPE,
      AutoFillSection: base_config_1.TYPE,
      AutoKeyword: base_config_1.TYPE,
      AutomationRate: base_config_1.TYPE,
      AvcBitstreamFormat: base_config_1.TYPE,
      AvcEncoderConfig: base_config_1.TYPE,
      BarProp: base_config_1.TYPE_VALUE,
      BaseAudioContext: base_config_1.TYPE_VALUE,
      BaseAudioContextEventMap: base_config_1.TYPE,
      BeforeUnloadEvent: base_config_1.TYPE_VALUE,
      BigInteger: base_config_1.TYPE,
      BinaryData: base_config_1.TYPE,
      BinaryType: base_config_1.TYPE,
      BiquadFilterNode: base_config_1.TYPE_VALUE,
      BiquadFilterOptions: base_config_1.TYPE,
      BiquadFilterType: base_config_1.TYPE,
      Blob: base_config_1.TYPE_VALUE,
      BlobCallback: base_config_1.TYPE,
      BlobEvent: base_config_1.TYPE_VALUE,
      BlobEventInit: base_config_1.TYPE,
      BlobPart: base_config_1.TYPE,
      BlobPropertyBag: base_config_1.TYPE,
      Body: base_config_1.TYPE,
      BodyInit: base_config_1.TYPE,
      BroadcastChannel: base_config_1.TYPE_VALUE,
      BroadcastChannelEventMap: base_config_1.TYPE,
      BufferSource: base_config_1.TYPE,
      ByteLengthQueuingStrategy: base_config_1.TYPE_VALUE,
      Cache: base_config_1.TYPE_VALUE,
      CacheQueryOptions: base_config_1.TYPE,
      CacheStorage: base_config_1.TYPE_VALUE,
      CanPlayTypeResult: base_config_1.TYPE,
      CanvasCaptureMediaStreamTrack: base_config_1.TYPE_VALUE,
      CanvasCompositing: base_config_1.TYPE,
      CanvasDirection: base_config_1.TYPE,
      CanvasDrawImage: base_config_1.TYPE,
      CanvasDrawPath: base_config_1.TYPE,
      CanvasFillRule: base_config_1.TYPE,
      CanvasFillStrokeStyles: base_config_1.TYPE,
      CanvasFilters: base_config_1.TYPE,
      CanvasFontKerning: base_config_1.TYPE,
      CanvasFontStretch: base_config_1.TYPE,
      CanvasFontVariantCaps: base_config_1.TYPE,
      CanvasGradient: base_config_1.TYPE_VALUE,
      CanvasImageData: base_config_1.TYPE,
      CanvasImageSmoothing: base_config_1.TYPE,
      CanvasImageSource: base_config_1.TYPE,
      CanvasLineCap: base_config_1.TYPE,
      CanvasLineJoin: base_config_1.TYPE,
      CanvasPath: base_config_1.TYPE,
      CanvasPathDrawingStyles: base_config_1.TYPE,
      CanvasPattern: base_config_1.TYPE_VALUE,
      CanvasRect: base_config_1.TYPE,
      CanvasRenderingContext2D: base_config_1.TYPE_VALUE,
      CanvasRenderingContext2DSettings: base_config_1.TYPE,
      CanvasShadowStyles: base_config_1.TYPE,
      CanvasState: base_config_1.TYPE,
      CanvasText: base_config_1.TYPE,
      CanvasTextAlign: base_config_1.TYPE,
      CanvasTextBaseline: base_config_1.TYPE,
      CanvasTextDrawingStyles: base_config_1.TYPE,
      CanvasTextRendering: base_config_1.TYPE,
      CanvasTransform: base_config_1.TYPE,
      CanvasUserInterface: base_config_1.TYPE,
      CDATASection: base_config_1.TYPE_VALUE,
      ChannelCountMode: base_config_1.TYPE,
      ChannelInterpretation: base_config_1.TYPE,
      ChannelMergerNode: base_config_1.TYPE_VALUE,
      ChannelMergerOptions: base_config_1.TYPE,
      ChannelSplitterNode: base_config_1.TYPE_VALUE,
      ChannelSplitterOptions: base_config_1.TYPE,
      CharacterData: base_config_1.TYPE_VALUE,
      CheckVisibilityOptions: base_config_1.TYPE,
      ChildNode: base_config_1.TYPE,
      ClientQueryOptions: base_config_1.TYPE,
      ClientRect: base_config_1.TYPE,
      ClientTypes: base_config_1.TYPE,
      Clipboard: base_config_1.TYPE_VALUE,
      ClipboardEvent: base_config_1.TYPE_VALUE,
      ClipboardEventInit: base_config_1.TYPE,
      ClipboardItem: base_config_1.TYPE_VALUE,
      ClipboardItemData: base_config_1.TYPE,
      ClipboardItemOptions: base_config_1.TYPE,
      ClipboardItems: base_config_1.TYPE,
      CloseEvent: base_config_1.TYPE_VALUE,
      CloseEventInit: base_config_1.TYPE,
      CodecState: base_config_1.TYPE,
      ColorGamut: base_config_1.TYPE,
      ColorSpaceConversion: base_config_1.TYPE,
      Comment: base_config_1.TYPE_VALUE,
      CompositeOperation: base_config_1.TYPE,
      CompositeOperationOrAuto: base_config_1.TYPE,
      CompositionEvent: base_config_1.TYPE_VALUE,
      CompositionEventInit: base_config_1.TYPE,
      CompressionFormat: base_config_1.TYPE,
      CompressionStream: base_config_1.TYPE_VALUE,
      ComputedEffectTiming: base_config_1.TYPE,
      ComputedKeyframe: base_config_1.TYPE,
      Console: base_config_1.TYPE,
      ConstantSourceNode: base_config_1.TYPE_VALUE,
      ConstantSourceOptions: base_config_1.TYPE,
      ConstrainBoolean: base_config_1.TYPE,
      ConstrainBooleanParameters: base_config_1.TYPE,
      ConstrainDOMString: base_config_1.TYPE,
      ConstrainDOMStringParameters: base_config_1.TYPE,
      ConstrainDouble: base_config_1.TYPE,
      ConstrainDoubleRange: base_config_1.TYPE,
      ConstrainULong: base_config_1.TYPE,
      ConstrainULongRange: base_config_1.TYPE,
      ContentVisibilityAutoStateChangeEvent: base_config_1.TYPE_VALUE,
      ContentVisibilityAutoStateChangeEventInit: base_config_1.TYPE,
      ConvolverNode: base_config_1.TYPE_VALUE,
      ConvolverOptions: base_config_1.TYPE,
      COSEAlgorithmIdentifier: base_config_1.TYPE,
      CountQueuingStrategy: base_config_1.TYPE_VALUE,
      Credential: base_config_1.TYPE_VALUE,
      CredentialCreationOptions: base_config_1.TYPE,
      CredentialMediationRequirement: base_config_1.TYPE,
      CredentialPropertiesOutput: base_config_1.TYPE,
      CredentialRequestOptions: base_config_1.TYPE,
      CredentialsContainer: base_config_1.TYPE_VALUE,
      Crypto: base_config_1.TYPE_VALUE,
      CryptoKey: base_config_1.TYPE_VALUE,
      CryptoKeyPair: base_config_1.TYPE,
      CSS: base_config_1.TYPE_VALUE,
      CSSAnimation: base_config_1.TYPE_VALUE,
      CSSConditionRule: base_config_1.TYPE_VALUE,
      CSSContainerRule: base_config_1.TYPE_VALUE,
      CSSCounterStyleRule: base_config_1.TYPE_VALUE,
      CSSFontFaceRule: base_config_1.TYPE_VALUE,
      CSSFontFeatureValuesRule: base_config_1.TYPE_VALUE,
      CSSFontPaletteValuesRule: base_config_1.TYPE_VALUE,
      CSSGroupingRule: base_config_1.TYPE_VALUE,
      CSSImageValue: base_config_1.TYPE_VALUE,
      CSSImportRule: base_config_1.TYPE_VALUE,
      CSSKeyframeRule: base_config_1.TYPE_VALUE,
      CSSKeyframesRule: base_config_1.TYPE_VALUE,
      CSSKeywordish: base_config_1.TYPE,
      CSSKeywordValue: base_config_1.TYPE_VALUE,
      CSSLayerBlockRule: base_config_1.TYPE_VALUE,
      CSSLayerStatementRule: base_config_1.TYPE_VALUE,
      CSSMathClamp: base_config_1.TYPE_VALUE,
      CSSMathInvert: base_config_1.TYPE_VALUE,
      CSSMathMax: base_config_1.TYPE_VALUE,
      CSSMathMin: base_config_1.TYPE_VALUE,
      CSSMathNegate: base_config_1.TYPE_VALUE,
      CSSMathOperator: base_config_1.TYPE,
      CSSMathProduct: base_config_1.TYPE_VALUE,
      CSSMathSum: base_config_1.TYPE_VALUE,
      CSSMathValue: base_config_1.TYPE_VALUE,
      CSSMatrixComponent: base_config_1.TYPE_VALUE,
      CSSMatrixComponentOptions: base_config_1.TYPE,
      CSSMediaRule: base_config_1.TYPE_VALUE,
      CSSNamespaceRule: base_config_1.TYPE_VALUE,
      CSSNumberish: base_config_1.TYPE,
      CSSNumericArray: base_config_1.TYPE_VALUE,
      CSSNumericBaseType: base_config_1.TYPE,
      CSSNumericType: base_config_1.TYPE,
      CSSNumericValue: base_config_1.TYPE_VALUE,
      CSSPageRule: base_config_1.TYPE_VALUE,
      CSSPerspective: base_config_1.TYPE_VALUE,
      CSSPerspectiveValue: base_config_1.TYPE,
      CSSPropertyRule: base_config_1.TYPE_VALUE,
      CSSRotate: base_config_1.TYPE_VALUE,
      CSSRule: base_config_1.TYPE_VALUE,
      CSSRuleList: base_config_1.TYPE_VALUE,
      CSSScale: base_config_1.TYPE_VALUE,
      CSSScopeRule: base_config_1.TYPE_VALUE,
      CSSSkew: base_config_1.TYPE_VALUE,
      CSSSkewX: base_config_1.TYPE_VALUE,
      CSSSkewY: base_config_1.TYPE_VALUE,
      CSSStartingStyleRule: base_config_1.TYPE_VALUE,
      CSSStyleDeclaration: base_config_1.TYPE_VALUE,
      CSSStyleRule: base_config_1.TYPE_VALUE,
      CSSStyleSheet: base_config_1.TYPE_VALUE,
      CSSStyleSheetInit: base_config_1.TYPE,
      CSSStyleValue: base_config_1.TYPE_VALUE,
      CSSSupportsRule: base_config_1.TYPE_VALUE,
      CSSTransformComponent: base_config_1.TYPE_VALUE,
      CSSTransformValue: base_config_1.TYPE_VALUE,
      CSSTransition: base_config_1.TYPE_VALUE,
      CSSTranslate: base_config_1.TYPE_VALUE,
      CSSUnitValue: base_config_1.TYPE_VALUE,
      CSSUnparsedSegment: base_config_1.TYPE,
      CSSUnparsedValue: base_config_1.TYPE_VALUE,
      CSSVariableReferenceValue: base_config_1.TYPE_VALUE,
      CustomElementConstructor: base_config_1.TYPE,
      CustomElementRegistry: base_config_1.TYPE_VALUE,
      CustomEvent: base_config_1.TYPE_VALUE,
      CustomEventInit: base_config_1.TYPE,
      CustomStateSet: base_config_1.TYPE_VALUE,
      DataTransfer: base_config_1.TYPE_VALUE,
      DataTransferItem: base_config_1.TYPE_VALUE,
      DataTransferItemList: base_config_1.TYPE_VALUE,
      DecodeErrorCallback: base_config_1.TYPE,
      DecodeSuccessCallback: base_config_1.TYPE,
      DecompressionStream: base_config_1.TYPE_VALUE,
      DelayNode: base_config_1.TYPE_VALUE,
      DelayOptions: base_config_1.TYPE,
      DeviceMotionEvent: base_config_1.TYPE_VALUE,
      DeviceMotionEventAcceleration: base_config_1.TYPE,
      DeviceMotionEventAccelerationInit: base_config_1.TYPE,
      DeviceMotionEventInit: base_config_1.TYPE,
      DeviceMotionEventRotationRate: base_config_1.TYPE,
      DeviceMotionEventRotationRateInit: base_config_1.TYPE,
      DeviceOrientationEvent: base_config_1.TYPE_VALUE,
      DeviceOrientationEventInit: base_config_1.TYPE,
      DirectionSetting: base_config_1.TYPE,
      DisplayCaptureSurfaceType: base_config_1.TYPE,
      DisplayMediaStreamOptions: base_config_1.TYPE,
      DistanceModelType: base_config_1.TYPE,
      Document: base_config_1.TYPE_VALUE,
      DocumentEventMap: base_config_1.TYPE,
      DocumentFragment: base_config_1.TYPE_VALUE,
      DocumentOrShadowRoot: base_config_1.TYPE,
      DocumentReadyState: base_config_1.TYPE,
      DocumentTimeline: base_config_1.TYPE_VALUE,
      DocumentTimelineOptions: base_config_1.TYPE,
      DocumentType: base_config_1.TYPE_VALUE,
      DocumentVisibilityState: base_config_1.TYPE,
      DOMException: base_config_1.TYPE_VALUE,
      DOMHighResTimeStamp: base_config_1.TYPE,
      DOMImplementation: base_config_1.TYPE_VALUE,
      DOMMatrix: base_config_1.TYPE_VALUE,
      DOMMatrix2DInit: base_config_1.TYPE,
      DOMMatrixInit: base_config_1.TYPE,
      DOMMatrixReadOnly: base_config_1.TYPE_VALUE,
      DOMParser: base_config_1.TYPE_VALUE,
      DOMParserSupportedType: base_config_1.TYPE,
      DOMPoint: base_config_1.TYPE_VALUE,
      DOMPointInit: base_config_1.TYPE,
      DOMPointReadOnly: base_config_1.TYPE_VALUE,
      DOMQuad: base_config_1.TYPE_VALUE,
      DOMQuadInit: base_config_1.TYPE,
      DOMRect: base_config_1.TYPE_VALUE,
      DOMRectInit: base_config_1.TYPE,
      DOMRectList: base_config_1.TYPE_VALUE,
      DOMRectReadOnly: base_config_1.TYPE_VALUE,
      DOMStringList: base_config_1.TYPE_VALUE,
      DOMStringMap: base_config_1.TYPE_VALUE,
      DOMTokenList: base_config_1.TYPE_VALUE,
      DoubleRange: base_config_1.TYPE,
      DragEvent: base_config_1.TYPE_VALUE,
      DragEventInit: base_config_1.TYPE,
      DynamicsCompressorNode: base_config_1.TYPE_VALUE,
      DynamicsCompressorOptions: base_config_1.TYPE,
      EcdhKeyDeriveParams: base_config_1.TYPE,
      EcdsaParams: base_config_1.TYPE,
      EcKeyAlgorithm: base_config_1.TYPE,
      EcKeyGenParams: base_config_1.TYPE,
      EcKeyImportParams: base_config_1.TYPE,
      EffectTiming: base_config_1.TYPE,
      Element: base_config_1.TYPE_VALUE,
      ElementContentEditable: base_config_1.TYPE,
      ElementCreationOptions: base_config_1.TYPE,
      ElementCSSInlineStyle: base_config_1.TYPE,
      ElementDefinitionOptions: base_config_1.TYPE,
      ElementEventMap: base_config_1.TYPE,
      ElementInternals: base_config_1.TYPE_VALUE,
      ElementTagNameMap: base_config_1.TYPE,
      EncodedVideoChunk: base_config_1.TYPE_VALUE,
      EncodedVideoChunkInit: base_config_1.TYPE,
      EncodedVideoChunkMetadata: base_config_1.TYPE,
      EncodedVideoChunkOutputCallback: base_config_1.TYPE,
      EncodedVideoChunkType: base_config_1.TYPE,
      EndingType: base_config_1.TYPE,
      EndOfStreamError: base_config_1.TYPE,
      EpochTimeStamp: base_config_1.TYPE,
      ErrorCallback: base_config_1.TYPE,
      ErrorEvent: base_config_1.TYPE_VALUE,
      ErrorEventInit: base_config_1.TYPE,
      Event: base_config_1.TYPE_VALUE,
      EventCounts: base_config_1.TYPE_VALUE,
      EventInit: base_config_1.TYPE,
      EventListener: base_config_1.TYPE,
      EventListenerObject: base_config_1.TYPE,
      EventListenerOptions: base_config_1.TYPE,
      EventListenerOrEventListenerObject: base_config_1.TYPE,
      EventModifierInit: base_config_1.TYPE,
      EventSource: base_config_1.TYPE_VALUE,
      EventSourceEventMap: base_config_1.TYPE,
      EventSourceInit: base_config_1.TYPE,
      EventTarget: base_config_1.TYPE_VALUE,
      EXT_blend_minmax: base_config_1.TYPE,
      EXT_color_buffer_float: base_config_1.TYPE,
      EXT_color_buffer_half_float: base_config_1.TYPE,
      EXT_float_blend: base_config_1.TYPE,
      EXT_frag_depth: base_config_1.TYPE,
      EXT_shader_texture_lod: base_config_1.TYPE,
      EXT_sRGB: base_config_1.TYPE,
      EXT_texture_compression_bptc: base_config_1.TYPE,
      EXT_texture_compression_rgtc: base_config_1.TYPE,
      EXT_texture_filter_anisotropic: base_config_1.TYPE,
      EXT_texture_norm16: base_config_1.TYPE,
      External: base_config_1.TYPE_VALUE,
      File: base_config_1.TYPE_VALUE,
      FileCallback: base_config_1.TYPE,
      FileList: base_config_1.TYPE_VALUE,
      FilePropertyBag: base_config_1.TYPE,
      FileReader: base_config_1.TYPE_VALUE,
      FileReaderEventMap: base_config_1.TYPE,
      FileSystem: base_config_1.TYPE_VALUE,
      FileSystemCreateWritableOptions: base_config_1.TYPE,
      FileSystemDirectoryEntry: base_config_1.TYPE_VALUE,
      FileSystemDirectoryHandle: base_config_1.TYPE_VALUE,
      FileSystemDirectoryReader: base_config_1.TYPE_VALUE,
      FileSystemEntriesCallback: base_config_1.TYPE,
      FileSystemEntry: base_config_1.TYPE_VALUE,
      FileSystemEntryCallback: base_config_1.TYPE,
      FileSystemFileEntry: base_config_1.TYPE_VALUE,
      FileSystemFileHandle: base_config_1.TYPE_VALUE,
      FileSystemFlags: base_config_1.TYPE,
      FileSystemGetDirectoryOptions: base_config_1.TYPE,
      FileSystemGetFileOptions: base_config_1.TYPE,
      FileSystemHandle: base_config_1.TYPE_VALUE,
      FileSystemHandleKind: base_config_1.TYPE,
      FileSystemRemoveOptions: base_config_1.TYPE,
      FileSystemWritableFileStream: base_config_1.TYPE_VALUE,
      FileSystemWriteChunkType: base_config_1.TYPE,
      FillMode: base_config_1.TYPE,
      Float32List: base_config_1.TYPE,
      FocusEvent: base_config_1.TYPE_VALUE,
      FocusEventInit: base_config_1.TYPE,
      FocusOptions: base_config_1.TYPE,
      FontDisplay: base_config_1.TYPE,
      FontFace: base_config_1.TYPE_VALUE,
      FontFaceDescriptors: base_config_1.TYPE,
      FontFaceLoadStatus: base_config_1.TYPE,
      FontFaceSet: base_config_1.TYPE_VALUE,
      FontFaceSetEventMap: base_config_1.TYPE,
      FontFaceSetLoadEvent: base_config_1.TYPE_VALUE,
      FontFaceSetLoadEventInit: base_config_1.TYPE,
      FontFaceSetLoadStatus: base_config_1.TYPE,
      FontFaceSource: base_config_1.TYPE,
      FormData: base_config_1.TYPE_VALUE,
      FormDataEntryValue: base_config_1.TYPE,
      FormDataEvent: base_config_1.TYPE_VALUE,
      FormDataEventInit: base_config_1.TYPE,
      FrameRequestCallback: base_config_1.TYPE,
      FullscreenNavigationUI: base_config_1.TYPE,
      FullscreenOptions: base_config_1.TYPE,
      FunctionStringCallback: base_config_1.TYPE,
      GainNode: base_config_1.TYPE_VALUE,
      GainOptions: base_config_1.TYPE,
      Gamepad: base_config_1.TYPE_VALUE,
      GamepadButton: base_config_1.TYPE_VALUE,
      GamepadEffectParameters: base_config_1.TYPE,
      GamepadEvent: base_config_1.TYPE_VALUE,
      GamepadEventInit: base_config_1.TYPE,
      GamepadHapticActuator: base_config_1.TYPE_VALUE,
      GamepadHapticEffectType: base_config_1.TYPE,
      GamepadHapticsResult: base_config_1.TYPE,
      GamepadMappingType: base_config_1.TYPE,
      GenericTransformStream: base_config_1.TYPE,
      Geolocation: base_config_1.TYPE_VALUE,
      GeolocationCoordinates: base_config_1.TYPE_VALUE,
      GeolocationPosition: base_config_1.TYPE_VALUE,
      GeolocationPositionError: base_config_1.TYPE_VALUE,
      GetAnimationsOptions: base_config_1.TYPE,
      GetHTMLOptions: base_config_1.TYPE,
      GetNotificationOptions: base_config_1.TYPE,
      GetRootNodeOptions: base_config_1.TYPE,
      GLbitfield: base_config_1.TYPE,
      GLboolean: base_config_1.TYPE,
      GLclampf: base_config_1.TYPE,
      GLenum: base_config_1.TYPE,
      GLfloat: base_config_1.TYPE,
      GLint: base_config_1.TYPE,
      GLint64: base_config_1.TYPE,
      GLintptr: base_config_1.TYPE,
      GlobalCompositeOperation: base_config_1.TYPE,
      GlobalEventHandlers: base_config_1.TYPE,
      GlobalEventHandlersEventMap: base_config_1.TYPE,
      GLsizei: base_config_1.TYPE,
      GLsizeiptr: base_config_1.TYPE,
      GLuint: base_config_1.TYPE,
      GLuint64: base_config_1.TYPE,
      HardwareAcceleration: base_config_1.TYPE,
      HashAlgorithmIdentifier: base_config_1.TYPE,
      HashChangeEvent: base_config_1.TYPE_VALUE,
      HashChangeEventInit: base_config_1.TYPE,
      HdrMetadataType: base_config_1.TYPE,
      Headers: base_config_1.TYPE_VALUE,
      HeadersInit: base_config_1.TYPE,
      Highlight: base_config_1.TYPE_VALUE,
      HighlightRegistry: base_config_1.TYPE_VALUE,
      HighlightType: base_config_1.TYPE,
      History: base_config_1.TYPE_VALUE,
      HkdfParams: base_config_1.TYPE,
      HmacImportParams: base_config_1.TYPE,
      HmacKeyAlgorithm: base_config_1.TYPE,
      HmacKeyGenParams: base_config_1.TYPE,
      HTMLAllCollection: base_config_1.TYPE_VALUE,
      HTMLAnchorElement: base_config_1.TYPE_VALUE,
      HTMLAreaElement: base_config_1.TYPE_VALUE,
      HTMLAudioElement: base_config_1.TYPE_VALUE,
      HTMLBaseElement: base_config_1.TYPE_VALUE,
      HTMLBodyElement: base_config_1.TYPE_VALUE,
      HTMLBodyElementEventMap: base_config_1.TYPE,
      HTMLBRElement: base_config_1.TYPE_VALUE,
      HTMLButtonElement: base_config_1.TYPE_VALUE,
      HTMLCanvasElement: base_config_1.TYPE_VALUE,
      HTMLCollection: base_config_1.TYPE_VALUE,
      HTMLCollectionBase: base_config_1.TYPE,
      HTMLCollectionOf: base_config_1.TYPE,
      HTMLDataElement: base_config_1.TYPE_VALUE,
      HTMLDataListElement: base_config_1.TYPE_VALUE,
      HTMLDetailsElement: base_config_1.TYPE_VALUE,
      HTMLDialogElement: base_config_1.TYPE_VALUE,
      HTMLDirectoryElement: base_config_1.TYPE_VALUE,
      HTMLDivElement: base_config_1.TYPE_VALUE,
      HTMLDListElement: base_config_1.TYPE_VALUE,
      HTMLDocument: base_config_1.TYPE_VALUE,
      HTMLElement: base_config_1.TYPE_VALUE,
      HTMLElementDeprecatedTagNameMap: base_config_1.TYPE,
      HTMLElementEventMap: base_config_1.TYPE,
      HTMLElementTagNameMap: base_config_1.TYPE,
      HTMLEmbedElement: base_config_1.TYPE_VALUE,
      HTMLFieldSetElement: base_config_1.TYPE_VALUE,
      HTMLFontElement: base_config_1.TYPE_VALUE,
      HTMLFormControlsCollection: base_config_1.TYPE_VALUE,
      HTMLFormElement: base_config_1.TYPE_VALUE,
      HTMLFrameElement: base_config_1.TYPE_VALUE,
      HTMLFrameSetElement: base_config_1.TYPE_VALUE,
      HTMLFrameSetElementEventMap: base_config_1.TYPE,
      HTMLHeadElement: base_config_1.TYPE_VALUE,
      HTMLHeadingElement: base_config_1.TYPE_VALUE,
      HTMLHRElement: base_config_1.TYPE_VALUE,
      HTMLHtmlElement: base_config_1.TYPE_VALUE,
      HTMLHyperlinkElementUtils: base_config_1.TYPE,
      HTMLIFrameElement: base_config_1.TYPE_VALUE,
      HTMLImageElement: base_config_1.TYPE_VALUE,
      HTMLInputElement: base_config_1.TYPE_VALUE,
      HTMLLabelElement: base_config_1.TYPE_VALUE,
      HTMLLegendElement: base_config_1.TYPE_VALUE,
      HTMLLIElement: base_config_1.TYPE_VALUE,
      HTMLLinkElement: base_config_1.TYPE_VALUE,
      HTMLMapElement: base_config_1.TYPE_VALUE,
      HTMLMarqueeElement: base_config_1.TYPE_VALUE,
      HTMLMediaElement: base_config_1.TYPE_VALUE,
      HTMLMediaElementEventMap: base_config_1.TYPE,
      HTMLMenuElement: base_config_1.TYPE_VALUE,
      HTMLMetaElement: base_config_1.TYPE_VALUE,
      HTMLMeterElement: base_config_1.TYPE_VALUE,
      HTMLModElement: base_config_1.TYPE_VALUE,
      HTMLObjectElement: base_config_1.TYPE_VALUE,
      HTMLOListElement: base_config_1.TYPE_VALUE,
      HTMLOptGroupElement: base_config_1.TYPE_VALUE,
      HTMLOptionElement: base_config_1.TYPE_VALUE,
      HTMLOptionsCollection: base_config_1.TYPE_VALUE,
      HTMLOrSVGElement: base_config_1.TYPE,
      HTMLOrSVGImageElement: base_config_1.TYPE,
      HTMLOrSVGScriptElement: base_config_1.TYPE,
      HTMLOutputElement: base_config_1.TYPE_VALUE,
      HTMLParagraphElement: base_config_1.TYPE_VALUE,
      HTMLParamElement: base_config_1.TYPE_VALUE,
      HTMLPictureElement: base_config_1.TYPE_VALUE,
      HTMLPreElement: base_config_1.TYPE_VALUE,
      HTMLProgressElement: base_config_1.TYPE_VALUE,
      HTMLQuoteElement: base_config_1.TYPE_VALUE,
      HTMLScriptElement: base_config_1.TYPE_VALUE,
      HTMLSelectElement: base_config_1.TYPE_VALUE,
      HTMLSlotElement: base_config_1.TYPE_VALUE,
      HTMLSourceElement: base_config_1.TYPE_VALUE,
      HTMLSpanElement: base_config_1.TYPE_VALUE,
      HTMLStyleElement: base_config_1.TYPE_VALUE,
      HTMLTableCaptionElement: base_config_1.TYPE_VALUE,
      HTMLTableCellElement: base_config_1.TYPE_VALUE,
      HTMLTableColElement: base_config_1.TYPE_VALUE,
      HTMLTableDataCellElement: base_config_1.TYPE,
      HTMLTableElement: base_config_1.TYPE_VALUE,
      HTMLTableHeaderCellElement: base_config_1.TYPE,
      HTMLTableRowElement: base_config_1.TYPE_VALUE,
      HTMLTableSectionElement: base_config_1.TYPE_VALUE,
      HTMLTemplateElement: base_config_1.TYPE_VALUE,
      HTMLTextAreaElement: base_config_1.TYPE_VALUE,
      HTMLTimeElement: base_config_1.TYPE_VALUE,
      HTMLTitleElement: base_config_1.TYPE_VALUE,
      HTMLTrackElement: base_config_1.TYPE_VALUE,
      HTMLUListElement: base_config_1.TYPE_VALUE,
      HTMLUnknownElement: base_config_1.TYPE_VALUE,
      HTMLVideoElement: base_config_1.TYPE_VALUE,
      HTMLVideoElementEventMap: base_config_1.TYPE,
      IDBCursor: base_config_1.TYPE_VALUE,
      IDBCursorDirection: base_config_1.TYPE,
      IDBCursorWithValue: base_config_1.TYPE_VALUE,
      IDBDatabase: base_config_1.TYPE_VALUE,
      IDBDatabaseEventMap: base_config_1.TYPE,
      IDBDatabaseInfo: base_config_1.TYPE,
      IDBFactory: base_config_1.TYPE_VALUE,
      IDBIndex: base_config_1.TYPE_VALUE,
      IDBIndexParameters: base_config_1.TYPE,
      IDBKeyRange: base_config_1.TYPE_VALUE,
      IDBObjectStore: base_config_1.TYPE_VALUE,
      IDBObjectStoreParameters: base_config_1.TYPE,
      IDBOpenDBRequest: base_config_1.TYPE_VALUE,
      IDBOpenDBRequestEventMap: base_config_1.TYPE,
      IDBRequest: base_config_1.TYPE_VALUE,
      IDBRequestEventMap: base_config_1.TYPE,
      IDBRequestReadyState: base_config_1.TYPE,
      IDBTransaction: base_config_1.TYPE_VALUE,
      IDBTransactionDurability: base_config_1.TYPE,
      IDBTransactionEventMap: base_config_1.TYPE,
      IDBTransactionMode: base_config_1.TYPE,
      IDBTransactionOptions: base_config_1.TYPE,
      IDBValidKey: base_config_1.TYPE,
      IDBVersionChangeEvent: base_config_1.TYPE_VALUE,
      IDBVersionChangeEventInit: base_config_1.TYPE,
      IdleDeadline: base_config_1.TYPE_VALUE,
      IdleRequestCallback: base_config_1.TYPE,
      IdleRequestOptions: base_config_1.TYPE,
      IIRFilterNode: base_config_1.TYPE_VALUE,
      IIRFilterOptions: base_config_1.TYPE,
      ImageBitmap: base_config_1.TYPE_VALUE,
      ImageBitmapOptions: base_config_1.TYPE,
      ImageBitmapRenderingContext: base_config_1.TYPE_VALUE,
      ImageBitmapRenderingContextSettings: base_config_1.TYPE,
      ImageBitmapSource: base_config_1.TYPE,
      ImageData: base_config_1.TYPE_VALUE,
      ImageDataSettings: base_config_1.TYPE,
      ImageEncodeOptions: base_config_1.TYPE,
      ImageOrientation: base_config_1.TYPE,
      ImageSmoothingQuality: base_config_1.TYPE,
      ImportMeta: base_config_1.TYPE,
      InputDeviceInfo: base_config_1.TYPE_VALUE,
      InputEvent: base_config_1.TYPE_VALUE,
      InputEventInit: base_config_1.TYPE,
      InsertPosition: base_config_1.TYPE,
      Int32List: base_config_1.TYPE,
      IntersectionObserver: base_config_1.TYPE_VALUE,
      IntersectionObserverCallback: base_config_1.TYPE,
      IntersectionObserverEntry: base_config_1.TYPE_VALUE,
      IntersectionObserverEntryInit: base_config_1.TYPE,
      IntersectionObserverInit: base_config_1.TYPE,
      IterationCompositeOperation: base_config_1.TYPE,
      JsonWebKey: base_config_1.TYPE,
      KeyAlgorithm: base_config_1.TYPE,
      KeyboardEvent: base_config_1.TYPE_VALUE,
      KeyboardEventInit: base_config_1.TYPE,
      KeyFormat: base_config_1.TYPE,
      Keyframe: base_config_1.TYPE,
      KeyframeAnimationOptions: base_config_1.TYPE,
      KeyframeEffect: base_config_1.TYPE_VALUE,
      KeyframeEffectOptions: base_config_1.TYPE,
      KeyType: base_config_1.TYPE,
      KeyUsage: base_config_1.TYPE,
      KHR_parallel_shader_compile: base_config_1.TYPE,
      LargestContentfulPaint: base_config_1.TYPE_VALUE,
      LatencyMode: base_config_1.TYPE,
      LineAlignSetting: base_config_1.TYPE,
      LineAndPositionSetting: base_config_1.TYPE,
      LinkStyle: base_config_1.TYPE,
      Location: base_config_1.TYPE_VALUE,
      Lock: base_config_1.TYPE_VALUE,
      LockGrantedCallback: base_config_1.TYPE,
      LockInfo: base_config_1.TYPE,
      LockManager: base_config_1.TYPE_VALUE,
      LockManagerSnapshot: base_config_1.TYPE,
      LockMode: base_config_1.TYPE,
      LockOptions: base_config_1.TYPE,
      MathMLElement: base_config_1.TYPE_VALUE,
      MathMLElementEventMap: base_config_1.TYPE,
      MathMLElementTagNameMap: base_config_1.TYPE,
      MediaCapabilities: base_config_1.TYPE_VALUE,
      MediaCapabilitiesDecodingInfo: base_config_1.TYPE,
      MediaCapabilitiesEncodingInfo: base_config_1.TYPE,
      MediaCapabilitiesInfo: base_config_1.TYPE,
      MediaConfiguration: base_config_1.TYPE,
      MediaDecodingConfiguration: base_config_1.TYPE,
      MediaDecodingType: base_config_1.TYPE,
      MediaDeviceInfo: base_config_1.TYPE_VALUE,
      MediaDeviceKind: base_config_1.TYPE,
      MediaDevices: base_config_1.TYPE_VALUE,
      MediaDevicesEventMap: base_config_1.TYPE,
      MediaElementAudioSourceNode: base_config_1.TYPE_VALUE,
      MediaElementAudioSourceOptions: base_config_1.TYPE,
      MediaEncodingConfiguration: base_config_1.TYPE,
      MediaEncodingType: base_config_1.TYPE,
      MediaEncryptedEvent: base_config_1.TYPE_VALUE,
      MediaEncryptedEventInit: base_config_1.TYPE,
      MediaError: base_config_1.TYPE_VALUE,
      MediaImage: base_config_1.TYPE,
      MediaKeyMessageEvent: base_config_1.TYPE_VALUE,
      MediaKeyMessageEventInit: base_config_1.TYPE,
      MediaKeyMessageType: base_config_1.TYPE,
      MediaKeys: base_config_1.TYPE_VALUE,
      MediaKeySession: base_config_1.TYPE_VALUE,
      MediaKeySessionClosedReason: base_config_1.TYPE,
      MediaKeySessionEventMap: base_config_1.TYPE,
      MediaKeySessionType: base_config_1.TYPE,
      MediaKeysPolicy: base_config_1.TYPE,
      MediaKeysRequirement: base_config_1.TYPE,
      MediaKeyStatus: base_config_1.TYPE,
      MediaKeyStatusMap: base_config_1.TYPE_VALUE,
      MediaKeySystemAccess: base_config_1.TYPE_VALUE,
      MediaKeySystemConfiguration: base_config_1.TYPE,
      MediaKeySystemMediaCapability: base_config_1.TYPE,
      MediaList: base_config_1.TYPE_VALUE,
      MediaMetadata: base_config_1.TYPE_VALUE,
      MediaMetadataInit: base_config_1.TYPE,
      MediaPositionState: base_config_1.TYPE,
      MediaProvider: base_config_1.TYPE,
      MediaQueryList: base_config_1.TYPE_VALUE,
      MediaQueryListEvent: base_config_1.TYPE_VALUE,
      MediaQueryListEventInit: base_config_1.TYPE,
      MediaQueryListEventMap: base_config_1.TYPE,
      MediaRecorder: base_config_1.TYPE_VALUE,
      MediaRecorderEventMap: base_config_1.TYPE,
      MediaRecorderOptions: base_config_1.TYPE,
      MediaSession: base_config_1.TYPE_VALUE,
      MediaSessionAction: base_config_1.TYPE,
      MediaSessionActionDetails: base_config_1.TYPE,
      MediaSessionActionHandler: base_config_1.TYPE,
      MediaSessionPlaybackState: base_config_1.TYPE,
      MediaSource: base_config_1.TYPE_VALUE,
      MediaSourceEventMap: base_config_1.TYPE,
      MediaSourceHandle: base_config_1.TYPE_VALUE,
      MediaStream: base_config_1.TYPE_VALUE,
      MediaStreamAudioDestinationNode: base_config_1.TYPE_VALUE,
      MediaStreamAudioSourceNode: base_config_1.TYPE_VALUE,
      MediaStreamAudioSourceOptions: base_config_1.TYPE,
      MediaStreamConstraints: base_config_1.TYPE,
      MediaStreamEventMap: base_config_1.TYPE,
      MediaStreamTrack: base_config_1.TYPE_VALUE,
      MediaStreamTrackEvent: base_config_1.TYPE_VALUE,
      MediaStreamTrackEventInit: base_config_1.TYPE,
      MediaStreamTrackEventMap: base_config_1.TYPE,
      MediaStreamTrackState: base_config_1.TYPE,
      MediaTrackCapabilities: base_config_1.TYPE,
      MediaTrackConstraints: base_config_1.TYPE,
      MediaTrackConstraintSet: base_config_1.TYPE,
      MediaTrackSettings: base_config_1.TYPE,
      MediaTrackSupportedConstraints: base_config_1.TYPE,
      MessageChannel: base_config_1.TYPE_VALUE,
      MessageEvent: base_config_1.TYPE_VALUE,
      MessageEventInit: base_config_1.TYPE,
      MessageEventSource: base_config_1.TYPE,
      MessagePort: base_config_1.TYPE_VALUE,
      MessagePortEventMap: base_config_1.TYPE,
      MIDIAccess: base_config_1.TYPE_VALUE,
      MIDIAccessEventMap: base_config_1.TYPE,
      MIDIConnectionEvent: base_config_1.TYPE_VALUE,
      MIDIConnectionEventInit: base_config_1.TYPE,
      MIDIInput: base_config_1.TYPE_VALUE,
      MIDIInputEventMap: base_config_1.TYPE,
      MIDIInputMap: base_config_1.TYPE_VALUE,
      MIDIMessageEvent: base_config_1.TYPE_VALUE,
      MIDIMessageEventInit: base_config_1.TYPE,
      MIDIOptions: base_config_1.TYPE,
      MIDIOutput: base_config_1.TYPE_VALUE,
      MIDIOutputMap: base_config_1.TYPE_VALUE,
      MIDIPort: base_config_1.TYPE_VALUE,
      MIDIPortConnectionState: base_config_1.TYPE,
      MIDIPortDeviceState: base_config_1.TYPE,
      MIDIPortEventMap: base_config_1.TYPE,
      MIDIPortType: base_config_1.TYPE,
      MimeType: base_config_1.TYPE_VALUE,
      MimeTypeArray: base_config_1.TYPE_VALUE,
      MouseEvent: base_config_1.TYPE_VALUE,
      MouseEventInit: base_config_1.TYPE,
      MultiCacheQueryOptions: base_config_1.TYPE,
      MutationCallback: base_config_1.TYPE,
      MutationEvent: base_config_1.TYPE_VALUE,
      MutationObserver: base_config_1.TYPE_VALUE,
      MutationObserverInit: base_config_1.TYPE,
      MutationRecord: base_config_1.TYPE_VALUE,
      MutationRecordType: base_config_1.TYPE,
      NamedCurve: base_config_1.TYPE,
      NamedNodeMap: base_config_1.TYPE_VALUE,
      NavigationPreloadManager: base_config_1.TYPE_VALUE,
      NavigationPreloadState: base_config_1.TYPE,
      NavigationTimingType: base_config_1.TYPE,
      Navigator: base_config_1.TYPE_VALUE,
      NavigatorAutomationInformation: base_config_1.TYPE,
      NavigatorBadge: base_config_1.TYPE,
      NavigatorConcurrentHardware: base_config_1.TYPE,
      NavigatorContentUtils: base_config_1.TYPE,
      NavigatorCookies: base_config_1.TYPE,
      NavigatorID: base_config_1.TYPE,
      NavigatorLanguage: base_config_1.TYPE,
      NavigatorLocks: base_config_1.TYPE,
      NavigatorOnLine: base_config_1.TYPE,
      NavigatorPlugins: base_config_1.TYPE,
      NavigatorStorage: base_config_1.TYPE,
      Node: base_config_1.TYPE_VALUE,
      NodeFilter: base_config_1.TYPE_VALUE,
      NodeIterator: base_config_1.TYPE_VALUE,
      NodeList: base_config_1.TYPE_VALUE,
      NodeListOf: base_config_1.TYPE,
      NonDocumentTypeChildNode: base_config_1.TYPE,
      NonElementParentNode: base_config_1.TYPE,
      Notification: base_config_1.TYPE_VALUE,
      NotificationDirection: base_config_1.TYPE,
      NotificationEventMap: base_config_1.TYPE,
      NotificationOptions: base_config_1.TYPE,
      NotificationPermission: base_config_1.TYPE,
      NotificationPermissionCallback: base_config_1.TYPE,
      OES_draw_buffers_indexed: base_config_1.TYPE,
      OES_element_index_uint: base_config_1.TYPE,
      OES_fbo_render_mipmap: base_config_1.TYPE,
      OES_standard_derivatives: base_config_1.TYPE,
      OES_texture_float: base_config_1.TYPE,
      OES_texture_float_linear: base_config_1.TYPE,
      OES_texture_half_float: base_config_1.TYPE,
      OES_texture_half_float_linear: base_config_1.TYPE,
      OES_vertex_array_object: base_config_1.TYPE,
      OfflineAudioCompletionEvent: base_config_1.TYPE_VALUE,
      OfflineAudioCompletionEventInit: base_config_1.TYPE,
      OfflineAudioContext: base_config_1.TYPE_VALUE,
      OfflineAudioContextEventMap: base_config_1.TYPE,
      OfflineAudioContextOptions: base_config_1.TYPE,
      OffscreenCanvas: base_config_1.TYPE_VALUE,
      OffscreenCanvasEventMap: base_config_1.TYPE,
      OffscreenCanvasRenderingContext2D: base_config_1.TYPE_VALUE,
      OffscreenRenderingContext: base_config_1.TYPE,
      OffscreenRenderingContextId: base_config_1.TYPE,
      OnBeforeUnloadEventHandler: base_config_1.TYPE,
      OnBeforeUnloadEventHandlerNonNull: base_config_1.TYPE,
      OnErrorEventHandler: base_config_1.TYPE,
      OnErrorEventHandlerNonNull: base_config_1.TYPE,
      OptionalEffectTiming: base_config_1.TYPE,
      OptionalPostfixToken: base_config_1.TYPE,
      OptionalPrefixToken: base_config_1.TYPE,
      OrientationType: base_config_1.TYPE,
      OscillatorNode: base_config_1.TYPE_VALUE,
      OscillatorOptions: base_config_1.TYPE,
      OscillatorType: base_config_1.TYPE,
      OverconstrainedError: base_config_1.TYPE_VALUE,
      OverSampleType: base_config_1.TYPE,
      OVR_multiview2: base_config_1.TYPE,
      PageTransitionEvent: base_config_1.TYPE_VALUE,
      PageTransitionEventInit: base_config_1.TYPE,
      PannerNode: base_config_1.TYPE_VALUE,
      PannerOptions: base_config_1.TYPE,
      PanningModelType: base_config_1.TYPE,
      ParentNode: base_config_1.TYPE,
      Path2D: base_config_1.TYPE_VALUE,
      PaymentComplete: base_config_1.TYPE,
      PaymentCurrencyAmount: base_config_1.TYPE,
      PaymentDetailsBase: base_config_1.TYPE,
      PaymentDetailsInit: base_config_1.TYPE,
      PaymentDetailsModifier: base_config_1.TYPE,
      PaymentDetailsUpdate: base_config_1.TYPE,
      PaymentItem: base_config_1.TYPE,
      PaymentMethodChangeEvent: base_config_1.TYPE_VALUE,
      PaymentMethodChangeEventInit: base_config_1.TYPE,
      PaymentMethodData: base_config_1.TYPE,
      PaymentRequest: base_config_1.TYPE_VALUE,
      PaymentRequestEventMap: base_config_1.TYPE,
      PaymentRequestUpdateEvent: base_config_1.TYPE_VALUE,
      PaymentRequestUpdateEventInit: base_config_1.TYPE,
      PaymentResponse: base_config_1.TYPE_VALUE,
      PaymentValidationErrors: base_config_1.TYPE,
      Pbkdf2Params: base_config_1.TYPE,
      Performance: base_config_1.TYPE_VALUE,
      PerformanceEntry: base_config_1.TYPE_VALUE,
      PerformanceEntryList: base_config_1.TYPE,
      PerformanceEventMap: base_config_1.TYPE,
      PerformanceEventTiming: base_config_1.TYPE_VALUE,
      PerformanceMark: base_config_1.TYPE_VALUE,
      PerformanceMarkOptions: base_config_1.TYPE,
      PerformanceMeasure: base_config_1.TYPE_VALUE,
      PerformanceMeasureOptions: base_config_1.TYPE,
      PerformanceNavigation: base_config_1.TYPE_VALUE,
      PerformanceNavigationTiming: base_config_1.TYPE_VALUE,
      PerformanceObserver: base_config_1.TYPE_VALUE,
      PerformanceObserverCallback: base_config_1.TYPE,
      PerformanceObserverEntryList: base_config_1.TYPE_VALUE,
      PerformanceObserverInit: base_config_1.TYPE,
      PerformancePaintTiming: base_config_1.TYPE_VALUE,
      PerformanceResourceTiming: base_config_1.TYPE_VALUE,
      PerformanceServerTiming: base_config_1.TYPE_VALUE,
      PerformanceTiming: base_config_1.TYPE_VALUE,
      PeriodicWave: base_config_1.TYPE_VALUE,
      PeriodicWaveConstraints: base_config_1.TYPE,
      PeriodicWaveOptions: base_config_1.TYPE,
      PermissionDescriptor: base_config_1.TYPE,
      PermissionName: base_config_1.TYPE,
      Permissions: base_config_1.TYPE_VALUE,
      PermissionState: base_config_1.TYPE,
      PermissionStatus: base_config_1.TYPE_VALUE,
      PermissionStatusEventMap: base_config_1.TYPE,
      PictureInPictureEvent: base_config_1.TYPE_VALUE,
      PictureInPictureEventInit: base_config_1.TYPE,
      PictureInPictureWindow: base_config_1.TYPE_VALUE,
      PictureInPictureWindowEventMap: base_config_1.TYPE,
      PlaneLayout: base_config_1.TYPE,
      PlaybackDirection: base_config_1.TYPE,
      Plugin: base_config_1.TYPE_VALUE,
      PluginArray: base_config_1.TYPE_VALUE,
      PointerEvent: base_config_1.TYPE_VALUE,
      PointerEventInit: base_config_1.TYPE,
      PointerLockOptions: base_config_1.TYPE,
      PopoverInvokerElement: base_config_1.TYPE,
      PopStateEvent: base_config_1.TYPE_VALUE,
      PopStateEventInit: base_config_1.TYPE,
      PositionAlignSetting: base_config_1.TYPE,
      PositionCallback: base_config_1.TYPE,
      PositionErrorCallback: base_config_1.TYPE,
      PositionOptions: base_config_1.TYPE,
      PredefinedColorSpace: base_config_1.TYPE,
      PremultiplyAlpha: base_config_1.TYPE,
      PresentationStyle: base_config_1.TYPE,
      ProcessingInstruction: base_config_1.TYPE_VALUE,
      ProgressEvent: base_config_1.TYPE_VALUE,
      ProgressEventInit: base_config_1.TYPE,
      PromiseRejectionEvent: base_config_1.TYPE_VALUE,
      PromiseRejectionEventInit: base_config_1.TYPE,
      PropertyDefinition: base_config_1.TYPE,
      PropertyIndexedKeyframes: base_config_1.TYPE,
      PublicKeyCredential: base_config_1.TYPE_VALUE,
      PublicKeyCredentialCreationOptions: base_config_1.TYPE,
      PublicKeyCredentialDescriptor: base_config_1.TYPE,
      PublicKeyCredentialEntity: base_config_1.TYPE,
      PublicKeyCredentialParameters: base_config_1.TYPE,
      PublicKeyCredentialRequestOptions: base_config_1.TYPE,
      PublicKeyCredentialRpEntity: base_config_1.TYPE,
      PublicKeyCredentialType: base_config_1.TYPE,
      PublicKeyCredentialUserEntity: base_config_1.TYPE,
      PushEncryptionKeyName: base_config_1.TYPE,
      PushManager: base_config_1.TYPE_VALUE,
      PushSubscription: base_config_1.TYPE_VALUE,
      PushSubscriptionJSON: base_config_1.TYPE,
      PushSubscriptionOptions: base_config_1.TYPE_VALUE,
      PushSubscriptionOptionsInit: base_config_1.TYPE,
      QueuingStrategy: base_config_1.TYPE,
      QueuingStrategyInit: base_config_1.TYPE,
      QueuingStrategySize: base_config_1.TYPE,
      RadioNodeList: base_config_1.TYPE_VALUE,
      Range: base_config_1.TYPE_VALUE,
      ReadableByteStreamController: base_config_1.TYPE_VALUE,
      ReadableStream: base_config_1.TYPE_VALUE,
      ReadableStreamBYOBReader: base_config_1.TYPE_VALUE,
      ReadableStreamBYOBRequest: base_config_1.TYPE_VALUE,
      ReadableStreamController: base_config_1.TYPE,
      ReadableStreamDefaultController: base_config_1.TYPE_VALUE,
      ReadableStreamDefaultReader: base_config_1.TYPE_VALUE,
      ReadableStreamGenericReader: base_config_1.TYPE,
      ReadableStreamGetReaderOptions: base_config_1.TYPE,
      ReadableStreamIteratorOptions: base_config_1.TYPE,
      ReadableStreamReadDoneResult: base_config_1.TYPE,
      ReadableStreamReader: base_config_1.TYPE,
      ReadableStreamReaderMode: base_config_1.TYPE,
      ReadableStreamReadResult: base_config_1.TYPE,
      ReadableStreamReadValueResult: base_config_1.TYPE,
      ReadableStreamType: base_config_1.TYPE,
      ReadableWritablePair: base_config_1.TYPE,
      ReadyState: base_config_1.TYPE,
      RecordingState: base_config_1.TYPE,
      ReferrerPolicy: base_config_1.TYPE,
      RegistrationOptions: base_config_1.TYPE,
      RemotePlayback: base_config_1.TYPE_VALUE,
      RemotePlaybackAvailabilityCallback: base_config_1.TYPE,
      RemotePlaybackEventMap: base_config_1.TYPE,
      RemotePlaybackState: base_config_1.TYPE,
      RenderingContext: base_config_1.TYPE,
      Report: base_config_1.TYPE_VALUE,
      ReportBody: base_config_1.TYPE_VALUE,
      ReportingObserver: base_config_1.TYPE_VALUE,
      ReportingObserverCallback: base_config_1.TYPE,
      ReportingObserverOptions: base_config_1.TYPE,
      ReportList: base_config_1.TYPE,
      Request: base_config_1.TYPE_VALUE,
      RequestCache: base_config_1.TYPE,
      RequestCredentials: base_config_1.TYPE,
      RequestDestination: base_config_1.TYPE,
      RequestInfo: base_config_1.TYPE,
      RequestInit: base_config_1.TYPE,
      RequestMode: base_config_1.TYPE,
      RequestPriority: base_config_1.TYPE,
      RequestRedirect: base_config_1.TYPE,
      ResidentKeyRequirement: base_config_1.TYPE,
      ResizeObserver: base_config_1.TYPE_VALUE,
      ResizeObserverBoxOptions: base_config_1.TYPE,
      ResizeObserverCallback: base_config_1.TYPE,
      ResizeObserverEntry: base_config_1.TYPE_VALUE,
      ResizeObserverOptions: base_config_1.TYPE,
      ResizeObserverSize: base_config_1.TYPE_VALUE,
      ResizeQuality: base_config_1.TYPE,
      Response: base_config_1.TYPE_VALUE,
      ResponseInit: base_config_1.TYPE,
      ResponseType: base_config_1.TYPE,
      RsaHashedImportParams: base_config_1.TYPE,
      RsaHashedKeyAlgorithm: base_config_1.TYPE,
      RsaHashedKeyGenParams: base_config_1.TYPE,
      RsaKeyAlgorithm: base_config_1.TYPE,
      RsaKeyGenParams: base_config_1.TYPE,
      RsaOaepParams: base_config_1.TYPE,
      RsaOtherPrimesInfo: base_config_1.TYPE,
      RsaPssParams: base_config_1.TYPE,
      RTCAnswerOptions: base_config_1.TYPE,
      RTCBundlePolicy: base_config_1.TYPE,
      RTCCertificate: base_config_1.TYPE_VALUE,
      RTCCertificateExpiration: base_config_1.TYPE,
      RTCConfiguration: base_config_1.TYPE,
      RTCDataChannel: base_config_1.TYPE_VALUE,
      RTCDataChannelEvent: base_config_1.TYPE_VALUE,
      RTCDataChannelEventInit: base_config_1.TYPE,
      RTCDataChannelEventMap: base_config_1.TYPE,
      RTCDataChannelInit: base_config_1.TYPE,
      RTCDataChannelState: base_config_1.TYPE,
      RTCDegradationPreference: base_config_1.TYPE,
      RTCDtlsFingerprint: base_config_1.TYPE,
      RTCDtlsTransport: base_config_1.TYPE_VALUE,
      RTCDtlsTransportEventMap: base_config_1.TYPE,
      RTCDtlsTransportState: base_config_1.TYPE,
      RTCDTMFSender: base_config_1.TYPE_VALUE,
      RTCDTMFSenderEventMap: base_config_1.TYPE,
      RTCDTMFToneChangeEvent: base_config_1.TYPE_VALUE,
      RTCDTMFToneChangeEventInit: base_config_1.TYPE,
      RTCEncodedAudioFrame: base_config_1.TYPE_VALUE,
      RTCEncodedAudioFrameMetadata: base_config_1.TYPE,
      RTCEncodedVideoFrame: base_config_1.TYPE_VALUE,
      RTCEncodedVideoFrameMetadata: base_config_1.TYPE,
      RTCEncodedVideoFrameType: base_config_1.TYPE,
      RTCError: base_config_1.TYPE_VALUE,
      RTCErrorDetailType: base_config_1.TYPE,
      RTCErrorEvent: base_config_1.TYPE_VALUE,
      RTCErrorEventInit: base_config_1.TYPE,
      RTCErrorInit: base_config_1.TYPE,
      RTCIceCandidate: base_config_1.TYPE_VALUE,
      RTCIceCandidateInit: base_config_1.TYPE,
      RTCIceCandidatePair: base_config_1.TYPE,
      RTCIceCandidatePairStats: base_config_1.TYPE,
      RTCIceCandidateType: base_config_1.TYPE,
      RTCIceComponent: base_config_1.TYPE,
      RTCIceConnectionState: base_config_1.TYPE,
      RTCIceGathererState: base_config_1.TYPE,
      RTCIceGatheringState: base_config_1.TYPE,
      RTCIceProtocol: base_config_1.TYPE,
      RTCIceServer: base_config_1.TYPE,
      RTCIceTcpCandidateType: base_config_1.TYPE,
      RTCIceTransport: base_config_1.TYPE_VALUE,
      RTCIceTransportEventMap: base_config_1.TYPE,
      RTCIceTransportPolicy: base_config_1.TYPE,
      RTCIceTransportState: base_config_1.TYPE,
      RTCInboundRtpStreamStats: base_config_1.TYPE,
      RTCLocalSessionDescriptionInit: base_config_1.TYPE,
      RTCOfferAnswerOptions: base_config_1.TYPE,
      RTCOfferOptions: base_config_1.TYPE,
      RTCOutboundRtpStreamStats: base_config_1.TYPE,
      RTCPeerConnection: base_config_1.TYPE_VALUE,
      RTCPeerConnectionErrorCallback: base_config_1.TYPE,
      RTCPeerConnectionEventMap: base_config_1.TYPE,
      RTCPeerConnectionIceErrorEvent: base_config_1.TYPE_VALUE,
      RTCPeerConnectionIceErrorEventInit: base_config_1.TYPE,
      RTCPeerConnectionIceEvent: base_config_1.TYPE_VALUE,
      RTCPeerConnectionIceEventInit: base_config_1.TYPE,
      RTCPeerConnectionState: base_config_1.TYPE,
      RTCPriorityType: base_config_1.TYPE,
      RTCReceivedRtpStreamStats: base_config_1.TYPE,
      RTCRtcpMuxPolicy: base_config_1.TYPE,
      RTCRtcpParameters: base_config_1.TYPE,
      RTCRtpCapabilities: base_config_1.TYPE,
      RTCRtpCodec: base_config_1.TYPE,
      RTCRtpCodecParameters: base_config_1.TYPE,
      RTCRtpCodingParameters: base_config_1.TYPE,
      RTCRtpContributingSource: base_config_1.TYPE,
      RTCRtpEncodingParameters: base_config_1.TYPE,
      RTCRtpHeaderExtensionCapability: base_config_1.TYPE,
      RTCRtpHeaderExtensionParameters: base_config_1.TYPE,
      RTCRtpParameters: base_config_1.TYPE,
      RTCRtpReceiveParameters: base_config_1.TYPE,
      RTCRtpReceiver: base_config_1.TYPE_VALUE,
      RTCRtpScriptTransform: base_config_1.TYPE_VALUE,
      RTCRtpSender: base_config_1.TYPE_VALUE,
      RTCRtpSendParameters: base_config_1.TYPE,
      RTCRtpStreamStats: base_config_1.TYPE,
      RTCRtpSynchronizationSource: base_config_1.TYPE,
      RTCRtpTransceiver: base_config_1.TYPE_VALUE,
      RTCRtpTransceiverDirection: base_config_1.TYPE,
      RTCRtpTransceiverInit: base_config_1.TYPE,
      RTCRtpTransform: base_config_1.TYPE,
      RTCSctpTransport: base_config_1.TYPE_VALUE,
      RTCSctpTransportEventMap: base_config_1.TYPE,
      RTCSctpTransportState: base_config_1.TYPE,
      RTCSdpType: base_config_1.TYPE,
      RTCSentRtpStreamStats: base_config_1.TYPE,
      RTCSessionDescription: base_config_1.TYPE_VALUE,
      RTCSessionDescriptionCallback: base_config_1.TYPE,
      RTCSessionDescriptionInit: base_config_1.TYPE,
      RTCSetParameterOptions: base_config_1.TYPE,
      RTCSignalingState: base_config_1.TYPE,
      RTCStats: base_config_1.TYPE,
      RTCStatsIceCandidatePairState: base_config_1.TYPE,
      RTCStatsReport: base_config_1.TYPE_VALUE,
      RTCStatsType: base_config_1.TYPE,
      RTCTrackEvent: base_config_1.TYPE_VALUE,
      RTCTrackEventInit: base_config_1.TYPE,
      RTCTransportStats: base_config_1.TYPE,
      Screen: base_config_1.TYPE_VALUE,
      ScreenOrientation: base_config_1.TYPE_VALUE,
      ScreenOrientationEventMap: base_config_1.TYPE,
      ScriptProcessorNode: base_config_1.TYPE_VALUE,
      ScriptProcessorNodeEventMap: base_config_1.TYPE,
      ScrollBehavior: base_config_1.TYPE,
      ScrollIntoViewOptions: base_config_1.TYPE,
      ScrollLogicalPosition: base_config_1.TYPE,
      ScrollOptions: base_config_1.TYPE,
      ScrollRestoration: base_config_1.TYPE,
      ScrollSetting: base_config_1.TYPE,
      ScrollToOptions: base_config_1.TYPE,
      SecurityPolicyViolationEvent: base_config_1.TYPE_VALUE,
      SecurityPolicyViolationEventDisposition: base_config_1.TYPE,
      SecurityPolicyViolationEventInit: base_config_1.TYPE,
      Selection: base_config_1.TYPE_VALUE,
      SelectionMode: base_config_1.TYPE,
      ServiceWorker: base_config_1.TYPE_VALUE,
      ServiceWorkerContainer: base_config_1.TYPE_VALUE,
      ServiceWorkerContainerEventMap: base_config_1.TYPE,
      ServiceWorkerEventMap: base_config_1.TYPE,
      ServiceWorkerRegistration: base_config_1.TYPE_VALUE,
      ServiceWorkerRegistrationEventMap: base_config_1.TYPE,
      ServiceWorkerState: base_config_1.TYPE,
      ServiceWorkerUpdateViaCache: base_config_1.TYPE,
      ShadowRoot: base_config_1.TYPE_VALUE,
      ShadowRootEventMap: base_config_1.TYPE,
      ShadowRootInit: base_config_1.TYPE,
      ShadowRootMode: base_config_1.TYPE,
      ShareData: base_config_1.TYPE,
      SharedWorker: base_config_1.TYPE_VALUE,
      SlotAssignmentMode: base_config_1.TYPE,
      Slottable: base_config_1.TYPE,
      SourceBuffer: base_config_1.TYPE_VALUE,
      SourceBufferEventMap: base_config_1.TYPE,
      SourceBufferList: base_config_1.TYPE_VALUE,
      SourceBufferListEventMap: base_config_1.TYPE,
      SpeechRecognitionAlternative: base_config_1.TYPE_VALUE,
      SpeechRecognitionResult: base_config_1.TYPE_VALUE,
      SpeechRecognitionResultList: base_config_1.TYPE_VALUE,
      SpeechSynthesis: base_config_1.TYPE_VALUE,
      SpeechSynthesisErrorCode: base_config_1.TYPE,
      SpeechSynthesisErrorEvent: base_config_1.TYPE_VALUE,
      SpeechSynthesisErrorEventInit: base_config_1.TYPE,
      SpeechSynthesisEvent: base_config_1.TYPE_VALUE,
      SpeechSynthesisEventInit: base_config_1.TYPE,
      SpeechSynthesisEventMap: base_config_1.TYPE,
      SpeechSynthesisUtterance: base_config_1.TYPE_VALUE,
      SpeechSynthesisUtteranceEventMap: base_config_1.TYPE,
      SpeechSynthesisVoice: base_config_1.TYPE_VALUE,
      StaticRange: base_config_1.TYPE_VALUE,
      StaticRangeInit: base_config_1.TYPE,
      StereoPannerNode: base_config_1.TYPE_VALUE,
      StereoPannerOptions: base_config_1.TYPE,
      Storage: base_config_1.TYPE_VALUE,
      StorageEstimate: base_config_1.TYPE,
      StorageEvent: base_config_1.TYPE_VALUE,
      StorageEventInit: base_config_1.TYPE,
      StorageManager: base_config_1.TYPE_VALUE,
      StreamPipeOptions: base_config_1.TYPE,
      StructuredSerializeOptions: base_config_1.TYPE,
      StyleMedia: base_config_1.TYPE,
      StylePropertyMap: base_config_1.TYPE_VALUE,
      StylePropertyMapReadOnly: base_config_1.TYPE_VALUE,
      StyleSheet: base_config_1.TYPE_VALUE,
      StyleSheetList: base_config_1.TYPE_VALUE,
      SubmitEvent: base_config_1.TYPE_VALUE,
      SubmitEventInit: base_config_1.TYPE,
      SubtleCrypto: base_config_1.TYPE_VALUE,
      SVGAElement: base_config_1.TYPE_VALUE,
      SVGAngle: base_config_1.TYPE_VALUE,
      SVGAnimatedAngle: base_config_1.TYPE_VALUE,
      SVGAnimatedBoolean: base_config_1.TYPE_VALUE,
      SVGAnimatedEnumeration: base_config_1.TYPE_VALUE,
      SVGAnimatedInteger: base_config_1.TYPE_VALUE,
      SVGAnimatedLength: base_config_1.TYPE_VALUE,
      SVGAnimatedLengthList: base_config_1.TYPE_VALUE,
      SVGAnimatedNumber: base_config_1.TYPE_VALUE,
      SVGAnimatedNumberList: base_config_1.TYPE_VALUE,
      SVGAnimatedPoints: base_config_1.TYPE,
      SVGAnimatedPreserveAspectRatio: base_config_1.TYPE_VALUE,
      SVGAnimatedRect: base_config_1.TYPE_VALUE,
      SVGAnimatedString: base_config_1.TYPE_VALUE,
      SVGAnimatedTransformList: base_config_1.TYPE_VALUE,
      SVGAnimateElement: base_config_1.TYPE_VALUE,
      SVGAnimateMotionElement: base_config_1.TYPE_VALUE,
      SVGAnimateTransformElement: base_config_1.TYPE_VALUE,
      SVGAnimationElement: base_config_1.TYPE_VALUE,
      SVGBoundingBoxOptions: base_config_1.TYPE,
      SVGCircleElement: base_config_1.TYPE_VALUE,
      SVGClipPathElement: base_config_1.TYPE_VALUE,
      SVGComponentTransferFunctionElement: base_config_1.TYPE_VALUE,
      SVGDefsElement: base_config_1.TYPE_VALUE,
      SVGDescElement: base_config_1.TYPE_VALUE,
      SVGElement: base_config_1.TYPE_VALUE,
      SVGElementEventMap: base_config_1.TYPE,
      SVGElementTagNameMap: base_config_1.TYPE,
      SVGEllipseElement: base_config_1.TYPE_VALUE,
      SVGFEBlendElement: base_config_1.TYPE_VALUE,
      SVGFEColorMatrixElement: base_config_1.TYPE_VALUE,
      SVGFEComponentTransferElement: base_config_1.TYPE_VALUE,
      SVGFECompositeElement: base_config_1.TYPE_VALUE,
      SVGFEConvolveMatrixElement: base_config_1.TYPE_VALUE,
      SVGFEDiffuseLightingElement: base_config_1.TYPE_VALUE,
      SVGFEDisplacementMapElement: base_config_1.TYPE_VALUE,
      SVGFEDistantLightElement: base_config_1.TYPE_VALUE,
      SVGFEDropShadowElement: base_config_1.TYPE_VALUE,
      SVGFEFloodElement: base_config_1.TYPE_VALUE,
      SVGFEFuncAElement: base_config_1.TYPE_VALUE,
      SVGFEFuncBElement: base_config_1.TYPE_VALUE,
      SVGFEFuncGElement: base_config_1.TYPE_VALUE,
      SVGFEFuncRElement: base_config_1.TYPE_VALUE,
      SVGFEGaussianBlurElement: base_config_1.TYPE_VALUE,
      SVGFEImageElement: base_config_1.TYPE_VALUE,
      SVGFEMergeElement: base_config_1.TYPE_VALUE,
      SVGFEMergeNodeElement: base_config_1.TYPE_VALUE,
      SVGFEMorphologyElement: base_config_1.TYPE_VALUE,
      SVGFEOffsetElement: base_config_1.TYPE_VALUE,
      SVGFEPointLightElement: base_config_1.TYPE_VALUE,
      SVGFESpecularLightingElement: base_config_1.TYPE_VALUE,
      SVGFESpotLightElement: base_config_1.TYPE_VALUE,
      SVGFETileElement: base_config_1.TYPE_VALUE,
      SVGFETurbulenceElement: base_config_1.TYPE_VALUE,
      SVGFilterElement: base_config_1.TYPE_VALUE,
      SVGFilterPrimitiveStandardAttributes: base_config_1.TYPE,
      SVGFitToViewBox: base_config_1.TYPE,
      SVGForeignObjectElement: base_config_1.TYPE_VALUE,
      SVGGElement: base_config_1.TYPE_VALUE,
      SVGGeometryElement: base_config_1.TYPE_VALUE,
      SVGGradientElement: base_config_1.TYPE_VALUE,
      SVGGraphicsElement: base_config_1.TYPE_VALUE,
      SVGImageElement: base_config_1.TYPE_VALUE,
      SVGLength: base_config_1.TYPE_VALUE,
      SVGLengthList: base_config_1.TYPE_VALUE,
      SVGLinearGradientElement: base_config_1.TYPE_VALUE,
      SVGLineElement: base_config_1.TYPE_VALUE,
      SVGMarkerElement: base_config_1.TYPE_VALUE,
      SVGMaskElement: base_config_1.TYPE_VALUE,
      SVGMatrix: base_config_1.TYPE_VALUE,
      SVGMetadataElement: base_config_1.TYPE_VALUE,
      SVGMPathElement: base_config_1.TYPE_VALUE,
      SVGNumber: base_config_1.TYPE_VALUE,
      SVGNumberList: base_config_1.TYPE_VALUE,
      SVGPathElement: base_config_1.TYPE_VALUE,
      SVGPatternElement: base_config_1.TYPE_VALUE,
      SVGPoint: base_config_1.TYPE_VALUE,
      SVGPointList: base_config_1.TYPE_VALUE,
      SVGPolygonElement: base_config_1.TYPE_VALUE,
      SVGPolylineElement: base_config_1.TYPE_VALUE,
      SVGPreserveAspectRatio: base_config_1.TYPE_VALUE,
      SVGRadialGradientElement: base_config_1.TYPE_VALUE,
      SVGRect: base_config_1.TYPE_VALUE,
      SVGRectElement: base_config_1.TYPE_VALUE,
      SVGScriptElement: base_config_1.TYPE_VALUE,
      SVGSetElement: base_config_1.TYPE_VALUE,
      SVGStopElement: base_config_1.TYPE_VALUE,
      SVGStringList: base_config_1.TYPE_VALUE,
      SVGStyleElement: base_config_1.TYPE_VALUE,
      SVGSVGElement: base_config_1.TYPE_VALUE,
      SVGSVGElementEventMap: base_config_1.TYPE,
      SVGSwitchElement: base_config_1.TYPE_VALUE,
      SVGSymbolElement: base_config_1.TYPE_VALUE,
      SVGTests: base_config_1.TYPE,
      SVGTextContentElement: base_config_1.TYPE_VALUE,
      SVGTextElement: base_config_1.TYPE_VALUE,
      SVGTextPathElement: base_config_1.TYPE_VALUE,
      SVGTextPositioningElement: base_config_1.TYPE_VALUE,
      SVGTitleElement: base_config_1.TYPE_VALUE,
      SVGTransform: base_config_1.TYPE_VALUE,
      SVGTransformList: base_config_1.TYPE_VALUE,
      SVGTSpanElement: base_config_1.TYPE_VALUE,
      SVGUnitTypes: base_config_1.TYPE_VALUE,
      SVGURIReference: base_config_1.TYPE,
      SVGUseElement: base_config_1.TYPE_VALUE,
      SVGViewElement: base_config_1.TYPE_VALUE,
      TexImageSource: base_config_1.TYPE,
      Text: base_config_1.TYPE_VALUE,
      TextDecodeOptions: base_config_1.TYPE,
      TextDecoder: base_config_1.TYPE_VALUE,
      TextDecoderCommon: base_config_1.TYPE,
      TextDecoderOptions: base_config_1.TYPE,
      TextDecoderStream: base_config_1.TYPE_VALUE,
      TextEncoder: base_config_1.TYPE_VALUE,
      TextEncoderCommon: base_config_1.TYPE,
      TextEncoderEncodeIntoResult: base_config_1.TYPE,
      TextEncoderStream: base_config_1.TYPE_VALUE,
      TextEvent: base_config_1.TYPE_VALUE,
      TextMetrics: base_config_1.TYPE_VALUE,
      TextTrack: base_config_1.TYPE_VALUE,
      TextTrackCue: base_config_1.TYPE_VALUE,
      TextTrackCueEventMap: base_config_1.TYPE,
      TextTrackCueList: base_config_1.TYPE_VALUE,
      TextTrackEventMap: base_config_1.TYPE,
      TextTrackKind: base_config_1.TYPE,
      TextTrackList: base_config_1.TYPE_VALUE,
      TextTrackListEventMap: base_config_1.TYPE,
      TextTrackMode: base_config_1.TYPE,
      TimeRanges: base_config_1.TYPE_VALUE,
      TimerHandler: base_config_1.TYPE,
      ToggleEvent: base_config_1.TYPE_VALUE,
      ToggleEventInit: base_config_1.TYPE,
      Touch: base_config_1.TYPE_VALUE,
      TouchEvent: base_config_1.TYPE_VALUE,
      TouchEventInit: base_config_1.TYPE,
      TouchInit: base_config_1.TYPE,
      TouchList: base_config_1.TYPE_VALUE,
      TouchType: base_config_1.TYPE,
      TrackEvent: base_config_1.TYPE_VALUE,
      TrackEventInit: base_config_1.TYPE,
      Transferable: base_config_1.TYPE,
      TransferFunction: base_config_1.TYPE,
      Transformer: base_config_1.TYPE,
      TransformerFlushCallback: base_config_1.TYPE,
      TransformerStartCallback: base_config_1.TYPE,
      TransformerTransformCallback: base_config_1.TYPE,
      TransformStream: base_config_1.TYPE_VALUE,
      TransformStreamDefaultController: base_config_1.TYPE_VALUE,
      TransitionEvent: base_config_1.TYPE_VALUE,
      TransitionEventInit: base_config_1.TYPE,
      TreeWalker: base_config_1.TYPE_VALUE,
      UIEvent: base_config_1.TYPE_VALUE,
      UIEventInit: base_config_1.TYPE,
      Uint32List: base_config_1.TYPE,
      ULongRange: base_config_1.TYPE,
      UnderlyingByteSource: base_config_1.TYPE,
      UnderlyingDefaultSource: base_config_1.TYPE,
      UnderlyingSink: base_config_1.TYPE,
      UnderlyingSinkAbortCallback: base_config_1.TYPE,
      UnderlyingSinkCloseCallback: base_config_1.TYPE,
      UnderlyingSinkStartCallback: base_config_1.TYPE,
      UnderlyingSinkWriteCallback: base_config_1.TYPE,
      UnderlyingSource: base_config_1.TYPE,
      UnderlyingSourceCancelCallback: base_config_1.TYPE,
      UnderlyingSourcePullCallback: base_config_1.TYPE,
      UnderlyingSourceStartCallback: base_config_1.TYPE,
      UpdateCallback: base_config_1.TYPE,
      URL: base_config_1.TYPE_VALUE,
      URLSearchParams: base_config_1.TYPE_VALUE,
      UserActivation: base_config_1.TYPE_VALUE,
      UserVerificationRequirement: base_config_1.TYPE,
      ValidityState: base_config_1.TYPE_VALUE,
      ValidityStateFlags: base_config_1.TYPE,
      VibratePattern: base_config_1.TYPE,
      VideoColorPrimaries: base_config_1.TYPE,
      VideoColorSpace: base_config_1.TYPE_VALUE,
      VideoColorSpaceInit: base_config_1.TYPE,
      VideoConfiguration: base_config_1.TYPE,
      VideoDecoder: base_config_1.TYPE_VALUE,
      VideoDecoderConfig: base_config_1.TYPE,
      VideoDecoderEventMap: base_config_1.TYPE,
      VideoDecoderInit: base_config_1.TYPE,
      VideoDecoderSupport: base_config_1.TYPE,
      VideoEncoder: base_config_1.TYPE_VALUE,
      VideoEncoderBitrateMode: base_config_1.TYPE,
      VideoEncoderConfig: base_config_1.TYPE,
      VideoEncoderEncodeOptions: base_config_1.TYPE,
      VideoEncoderEventMap: base_config_1.TYPE,
      VideoEncoderInit: base_config_1.TYPE,
      VideoEncoderSupport: base_config_1.TYPE,
      VideoFacingModeEnum: base_config_1.TYPE,
      VideoFrame: base_config_1.TYPE_VALUE,
      VideoFrameBufferInit: base_config_1.TYPE,
      VideoFrameCallbackMetadata: base_config_1.TYPE,
      VideoFrameCopyToOptions: base_config_1.TYPE,
      VideoFrameInit: base_config_1.TYPE,
      VideoFrameOutputCallback: base_config_1.TYPE,
      VideoFrameRequestCallback: base_config_1.TYPE,
      VideoMatrixCoefficients: base_config_1.TYPE,
      VideoPixelFormat: base_config_1.TYPE,
      VideoPlaybackQuality: base_config_1.TYPE_VALUE,
      VideoTransferCharacteristics: base_config_1.TYPE,
      ViewTransition: base_config_1.TYPE_VALUE,
      VisualViewport: base_config_1.TYPE_VALUE,
      VisualViewportEventMap: base_config_1.TYPE,
      VoidFunction: base_config_1.TYPE,
      VTTCue: base_config_1.TYPE_VALUE,
      VTTRegion: base_config_1.TYPE_VALUE,
      WakeLock: base_config_1.TYPE_VALUE,
      WakeLockSentinel: base_config_1.TYPE_VALUE,
      WakeLockSentinelEventMap: base_config_1.TYPE,
      WakeLockType: base_config_1.TYPE,
      WaveShaperNode: base_config_1.TYPE_VALUE,
      WaveShaperOptions: base_config_1.TYPE,
      WebAssembly: base_config_1.TYPE_VALUE,
      WebCodecsErrorCallback: base_config_1.TYPE,
      WEBGL_color_buffer_float: base_config_1.TYPE,
      WEBGL_compressed_texture_astc: base_config_1.TYPE,
      WEBGL_compressed_texture_etc: base_config_1.TYPE,
      WEBGL_compressed_texture_etc1: base_config_1.TYPE,
      WEBGL_compressed_texture_pvrtc: base_config_1.TYPE,
      WEBGL_compressed_texture_s3tc: base_config_1.TYPE,
      WEBGL_compressed_texture_s3tc_srgb: base_config_1.TYPE,
      WEBGL_debug_renderer_info: base_config_1.TYPE,
      WEBGL_debug_shaders: base_config_1.TYPE,
      WEBGL_depth_texture: base_config_1.TYPE,
      WEBGL_draw_buffers: base_config_1.TYPE,
      WEBGL_lose_context: base_config_1.TYPE,
      WEBGL_multi_draw: base_config_1.TYPE,
      WebGL2RenderingContext: base_config_1.TYPE_VALUE,
      WebGL2RenderingContextBase: base_config_1.TYPE,
      WebGL2RenderingContextOverloads: base_config_1.TYPE,
      WebGLActiveInfo: base_config_1.TYPE_VALUE,
      WebGLBuffer: base_config_1.TYPE_VALUE,
      WebGLContextAttributes: base_config_1.TYPE,
      WebGLContextEvent: base_config_1.TYPE_VALUE,
      WebGLContextEventInit: base_config_1.TYPE,
      WebGLFramebuffer: base_config_1.TYPE_VALUE,
      WebGLPowerPreference: base_config_1.TYPE,
      WebGLProgram: base_config_1.TYPE_VALUE,
      WebGLQuery: base_config_1.TYPE_VALUE,
      WebGLRenderbuffer: base_config_1.TYPE_VALUE,
      WebGLRenderingContext: base_config_1.TYPE_VALUE,
      WebGLRenderingContextBase: base_config_1.TYPE,
      WebGLRenderingContextOverloads: base_config_1.TYPE,
      WebGLSampler: base_config_1.TYPE_VALUE,
      WebGLShader: base_config_1.TYPE_VALUE,
      WebGLShaderPrecisionFormat: base_config_1.TYPE_VALUE,
      WebGLSync: base_config_1.TYPE_VALUE,
      WebGLTexture: base_config_1.TYPE_VALUE,
      WebGLTransformFeedback: base_config_1.TYPE_VALUE,
      WebGLUniformLocation: base_config_1.TYPE_VALUE,
      WebGLVertexArrayObject: base_config_1.TYPE_VALUE,
      WebGLVertexArrayObjectOES: base_config_1.TYPE,
      WebKitCSSMatrix: base_config_1.TYPE_VALUE,
      webkitURL: base_config_1.TYPE_VALUE,
      WebSocket: base_config_1.TYPE_VALUE,
      WebSocketEventMap: base_config_1.TYPE,
      WebTransport: base_config_1.TYPE_VALUE,
      WebTransportBidirectionalStream: base_config_1.TYPE_VALUE,
      WebTransportCloseInfo: base_config_1.TYPE,
      WebTransportCongestionControl: base_config_1.TYPE,
      WebTransportDatagramDuplexStream: base_config_1.TYPE_VALUE,
      WebTransportError: base_config_1.TYPE_VALUE,
      WebTransportErrorOptions: base_config_1.TYPE,
      WebTransportErrorSource: base_config_1.TYPE,
      WebTransportHash: base_config_1.TYPE,
      WebTransportOptions: base_config_1.TYPE,
      WebTransportSendStreamOptions: base_config_1.TYPE,
      WheelEvent: base_config_1.TYPE_VALUE,
      WheelEventInit: base_config_1.TYPE,
      Window: base_config_1.TYPE_VALUE,
      WindowEventHandlers: base_config_1.TYPE,
      WindowEventHandlersEventMap: base_config_1.TYPE,
      WindowEventMap: base_config_1.TYPE,
      WindowLocalStorage: base_config_1.TYPE,
      WindowOrWorkerGlobalScope: base_config_1.TYPE,
      WindowPostMessageOptions: base_config_1.TYPE,
      WindowProxy: base_config_1.TYPE,
      WindowSessionStorage: base_config_1.TYPE,
      Worker: base_config_1.TYPE_VALUE,
      WorkerEventMap: base_config_1.TYPE,
      WorkerOptions: base_config_1.TYPE,
      WorkerType: base_config_1.TYPE,
      Worklet: base_config_1.TYPE_VALUE,
      WorkletOptions: base_config_1.TYPE,
      WritableStream: base_config_1.TYPE_VALUE,
      WritableStreamDefaultController: base_config_1.TYPE_VALUE,
      WritableStreamDefaultWriter: base_config_1.TYPE_VALUE,
      WriteCommandType: base_config_1.TYPE,
      WriteParams: base_config_1.TYPE,
      XMLDocument: base_config_1.TYPE_VALUE,
      XMLHttpRequest: base_config_1.TYPE_VALUE,
      XMLHttpRequestBodyInit: base_config_1.TYPE,
      XMLHttpRequestEventMap: base_config_1.TYPE,
      XMLHttpRequestEventTarget: base_config_1.TYPE_VALUE,
      XMLHttpRequestEventTargetEventMap: base_config_1.TYPE,
      XMLHttpRequestResponseType: base_config_1.TYPE,
      XMLHttpRequestUpload: base_config_1.TYPE_VALUE,
      XMLSerializer: base_config_1.TYPE_VALUE,
      XPathEvaluator: base_config_1.TYPE_VALUE,
      XPathEvaluatorBase: base_config_1.TYPE,
      XPathExpression: base_config_1.TYPE_VALUE,
      XPathNSResolver: base_config_1.TYPE,
      XPathResult: base_config_1.TYPE_VALUE,
      XSLTProcessor: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.asynciterable.js
var require_dom_asynciterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.asynciterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dom_asynciterable = void 0;
    var base_config_1 = require_base_config();
    exports.dom_asynciterable = {
      FileSystemDirectoryHandle: base_config_1.TYPE,
      FileSystemDirectoryHandleAsyncIterator: base_config_1.TYPE,
      ReadableStream: base_config_1.TYPE,
      ReadableStreamAsyncIterator: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.iterable.js
var require_dom_iterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/dom.iterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dom_iterable = void 0;
    var base_config_1 = require_base_config();
    exports.dom_iterable = {
      AbortSignal: base_config_1.TYPE,
      AudioParam: base_config_1.TYPE,
      AudioParamMap: base_config_1.TYPE,
      BaseAudioContext: base_config_1.TYPE,
      Cache: base_config_1.TYPE,
      CanvasPath: base_config_1.TYPE,
      CanvasPathDrawingStyles: base_config_1.TYPE,
      CSSKeyframesRule: base_config_1.TYPE,
      CSSNumericArray: base_config_1.TYPE,
      CSSRuleList: base_config_1.TYPE,
      CSSStyleDeclaration: base_config_1.TYPE,
      CSSTransformValue: base_config_1.TYPE,
      CSSUnparsedValue: base_config_1.TYPE,
      CustomStateSet: base_config_1.TYPE,
      DataTransferItemList: base_config_1.TYPE,
      DOMRectList: base_config_1.TYPE,
      DOMStringList: base_config_1.TYPE,
      DOMTokenList: base_config_1.TYPE,
      EventCounts: base_config_1.TYPE,
      FileList: base_config_1.TYPE,
      FontFaceSet: base_config_1.TYPE,
      FormData: base_config_1.TYPE,
      FormDataIterator: base_config_1.TYPE,
      Headers: base_config_1.TYPE,
      HeadersIterator: base_config_1.TYPE,
      Highlight: base_config_1.TYPE,
      HighlightRegistry: base_config_1.TYPE,
      HTMLAllCollection: base_config_1.TYPE,
      HTMLCollectionBase: base_config_1.TYPE,
      HTMLCollectionOf: base_config_1.TYPE,
      HTMLFormElement: base_config_1.TYPE,
      HTMLSelectElement: base_config_1.TYPE,
      IDBDatabase: base_config_1.TYPE,
      IDBObjectStore: base_config_1.TYPE,
      MediaKeyStatusMap: base_config_1.TYPE,
      MediaKeyStatusMapIterator: base_config_1.TYPE,
      MediaList: base_config_1.TYPE,
      MessageEvent: base_config_1.TYPE,
      MIDIInputMap: base_config_1.TYPE,
      MIDIOutput: base_config_1.TYPE,
      MIDIOutputMap: base_config_1.TYPE,
      MimeTypeArray: base_config_1.TYPE,
      NamedNodeMap: base_config_1.TYPE,
      Navigator: base_config_1.TYPE,
      NodeList: base_config_1.TYPE,
      NodeListOf: base_config_1.TYPE,
      Plugin: base_config_1.TYPE,
      PluginArray: base_config_1.TYPE,
      RTCRtpTransceiver: base_config_1.TYPE,
      RTCStatsReport: base_config_1.TYPE,
      SourceBufferList: base_config_1.TYPE,
      SpeechRecognitionResult: base_config_1.TYPE,
      SpeechRecognitionResultList: base_config_1.TYPE,
      StylePropertyMapReadOnly: base_config_1.TYPE,
      StylePropertyMapReadOnlyIterator: base_config_1.TYPE,
      StyleSheetList: base_config_1.TYPE,
      SubtleCrypto: base_config_1.TYPE,
      SVGLengthList: base_config_1.TYPE,
      SVGNumberList: base_config_1.TYPE,
      SVGPointList: base_config_1.TYPE,
      SVGStringList: base_config_1.TYPE,
      SVGTransformList: base_config_1.TYPE,
      TextTrackCueList: base_config_1.TYPE,
      TextTrackList: base_config_1.TYPE,
      TouchList: base_config_1.TYPE,
      URLSearchParams: base_config_1.TYPE,
      URLSearchParamsIterator: base_config_1.TYPE,
      WEBGL_draw_buffers: base_config_1.TYPE,
      WEBGL_multi_draw: base_config_1.TYPE,
      WebGL2RenderingContextBase: base_config_1.TYPE,
      WebGL2RenderingContextOverloads: base_config_1.TYPE,
      WebGLRenderingContextBase: base_config_1.TYPE,
      WebGLRenderingContextOverloads: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.collection.js
var require_es2015_collection = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.collection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_collection = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_collection = {
      Map: base_config_1.TYPE_VALUE,
      MapConstructor: base_config_1.TYPE,
      ReadonlyMap: base_config_1.TYPE,
      ReadonlySet: base_config_1.TYPE,
      Set: base_config_1.TYPE_VALUE,
      SetConstructor: base_config_1.TYPE,
      WeakMap: base_config_1.TYPE_VALUE,
      WeakMapConstructor: base_config_1.TYPE,
      WeakSet: base_config_1.TYPE_VALUE,
      WeakSetConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.core.js
var require_es2015_core = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_core = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_core = {
      Array: base_config_1.TYPE,
      ArrayConstructor: base_config_1.TYPE,
      DateConstructor: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Function: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      Math: base_config_1.TYPE,
      NumberConstructor: base_config_1.TYPE,
      ObjectConstructor: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      RegExp: base_config_1.TYPE,
      RegExpConstructor: base_config_1.TYPE,
      String: base_config_1.TYPE,
      StringConstructor: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.symbol.js
var require_es2015_symbol = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_symbol = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_symbol = {
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.iterable.js
var require_es2015_iterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.iterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_iterable = void 0;
    var base_config_1 = require_base_config();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.es2015_iterable = {
      ...es2015_symbol_1.es2015_symbol,
      Array: base_config_1.TYPE,
      ArrayConstructor: base_config_1.TYPE,
      ArrayIterator: base_config_1.TYPE,
      BuiltinIteratorReturn: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float32ArrayConstructor: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Float64ArrayConstructor: base_config_1.TYPE,
      IArguments: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int16ArrayConstructor: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int32ArrayConstructor: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      Int8ArrayConstructor: base_config_1.TYPE,
      Iterable: base_config_1.TYPE,
      IterableIterator: base_config_1.TYPE,
      Iterator: base_config_1.TYPE,
      IteratorObject: base_config_1.TYPE,
      IteratorResult: base_config_1.TYPE,
      IteratorReturnResult: base_config_1.TYPE,
      IteratorYieldResult: base_config_1.TYPE,
      Map: base_config_1.TYPE,
      MapConstructor: base_config_1.TYPE,
      MapIterator: base_config_1.TYPE,
      Promise: base_config_1.TYPE,
      PromiseConstructor: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      ReadonlyMap: base_config_1.TYPE,
      ReadonlySet: base_config_1.TYPE,
      Set: base_config_1.TYPE,
      SetConstructor: base_config_1.TYPE,
      SetIterator: base_config_1.TYPE,
      String: base_config_1.TYPE,
      StringIterator: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint16ArrayConstructor: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint32ArrayConstructor: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ArrayConstructor: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE,
      Uint8ClampedArrayConstructor: base_config_1.TYPE,
      WeakMap: base_config_1.TYPE,
      WeakMapConstructor: base_config_1.TYPE,
      WeakSet: base_config_1.TYPE,
      WeakSetConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.generator.js
var require_es2015_generator = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.generator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_generator = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    exports.es2015_generator = {
      ...es2015_iterable_1.es2015_iterable,
      Generator: base_config_1.TYPE,
      GeneratorFunction: base_config_1.TYPE,
      GeneratorFunctionConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.promise.js
var require_es2015_promise = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_promise = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_promise = {
      PromiseConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.proxy.js
var require_es2015_proxy = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_proxy = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_proxy = {
      ProxyConstructor: base_config_1.TYPE,
      ProxyHandler: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.reflect.js
var require_es2015_reflect = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.reflect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_reflect = void 0;
    var base_config_1 = require_base_config();
    exports.es2015_reflect = {
      Reflect: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.symbol.wellknown.js
var require_es2015_symbol_wellknown = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.symbol.wellknown.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015_symbol_wellknown = void 0;
    var base_config_1 = require_base_config();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.es2015_symbol_wellknown = {
      ...es2015_symbol_1.es2015_symbol,
      Array: base_config_1.TYPE,
      ArrayBuffer: base_config_1.TYPE,
      ArrayBufferConstructor: base_config_1.TYPE,
      ArrayConstructor: base_config_1.TYPE,
      DataView: base_config_1.TYPE,
      Date: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Function: base_config_1.TYPE,
      GeneratorFunction: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      JSON: base_config_1.TYPE,
      Map: base_config_1.TYPE,
      MapConstructor: base_config_1.TYPE,
      Math: base_config_1.TYPE,
      Promise: base_config_1.TYPE,
      PromiseConstructor: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      RegExp: base_config_1.TYPE,
      RegExpConstructor: base_config_1.TYPE,
      Set: base_config_1.TYPE,
      SetConstructor: base_config_1.TYPE,
      String: base_config_1.TYPE,
      Symbol: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE,
      WeakMap: base_config_1.TYPE,
      WeakSet: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es5.js
var require_es5 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es5 = void 0;
    var base_config_1 = require_base_config();
    var decorators_1 = require_decorators();
    var decorators_legacy_1 = require_decorators_legacy();
    exports.es5 = {
      ...decorators_1.decorators,
      ...decorators_legacy_1.decorators_legacy,
      Array: base_config_1.TYPE_VALUE,
      ArrayBuffer: base_config_1.TYPE_VALUE,
      ArrayBufferConstructor: base_config_1.TYPE,
      ArrayBufferLike: base_config_1.TYPE,
      ArrayBufferTypes: base_config_1.TYPE,
      ArrayBufferView: base_config_1.TYPE,
      ArrayConstructor: base_config_1.TYPE,
      ArrayLike: base_config_1.TYPE,
      Awaited: base_config_1.TYPE,
      Boolean: base_config_1.TYPE_VALUE,
      BooleanConstructor: base_config_1.TYPE,
      CallableFunction: base_config_1.TYPE,
      Capitalize: base_config_1.TYPE,
      ConcatArray: base_config_1.TYPE,
      ConstructorParameters: base_config_1.TYPE,
      DataView: base_config_1.TYPE_VALUE,
      DataViewConstructor: base_config_1.TYPE,
      Date: base_config_1.TYPE_VALUE,
      DateConstructor: base_config_1.TYPE,
      Error: base_config_1.TYPE_VALUE,
      ErrorConstructor: base_config_1.TYPE,
      EvalError: base_config_1.TYPE_VALUE,
      EvalErrorConstructor: base_config_1.TYPE,
      Exclude: base_config_1.TYPE,
      Extract: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE_VALUE,
      Float32ArrayConstructor: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE_VALUE,
      Float64ArrayConstructor: base_config_1.TYPE,
      Function: base_config_1.TYPE_VALUE,
      FunctionConstructor: base_config_1.TYPE,
      IArguments: base_config_1.TYPE,
      ImportAssertions: base_config_1.TYPE,
      ImportAttributes: base_config_1.TYPE,
      ImportCallOptions: base_config_1.TYPE,
      ImportMeta: base_config_1.TYPE,
      InstanceType: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE_VALUE,
      Int16ArrayConstructor: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE_VALUE,
      Int32ArrayConstructor: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE_VALUE,
      Int8ArrayConstructor: base_config_1.TYPE,
      Intl: base_config_1.TYPE_VALUE,
      JSON: base_config_1.TYPE_VALUE,
      Lowercase: base_config_1.TYPE,
      Math: base_config_1.TYPE_VALUE,
      NewableFunction: base_config_1.TYPE,
      NoInfer: base_config_1.TYPE,
      NonNullable: base_config_1.TYPE,
      Number: base_config_1.TYPE_VALUE,
      NumberConstructor: base_config_1.TYPE,
      Object: base_config_1.TYPE_VALUE,
      ObjectConstructor: base_config_1.TYPE,
      Omit: base_config_1.TYPE,
      OmitThisParameter: base_config_1.TYPE,
      Parameters: base_config_1.TYPE,
      Partial: base_config_1.TYPE,
      Pick: base_config_1.TYPE,
      Promise: base_config_1.TYPE,
      PromiseConstructorLike: base_config_1.TYPE,
      PromiseLike: base_config_1.TYPE,
      PropertyDescriptor: base_config_1.TYPE,
      PropertyDescriptorMap: base_config_1.TYPE,
      PropertyKey: base_config_1.TYPE,
      RangeError: base_config_1.TYPE_VALUE,
      RangeErrorConstructor: base_config_1.TYPE,
      Readonly: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      Record: base_config_1.TYPE,
      ReferenceError: base_config_1.TYPE_VALUE,
      ReferenceErrorConstructor: base_config_1.TYPE,
      RegExp: base_config_1.TYPE_VALUE,
      RegExpConstructor: base_config_1.TYPE,
      RegExpExecArray: base_config_1.TYPE,
      RegExpMatchArray: base_config_1.TYPE,
      Required: base_config_1.TYPE,
      ReturnType: base_config_1.TYPE,
      String: base_config_1.TYPE_VALUE,
      StringConstructor: base_config_1.TYPE,
      Symbol: base_config_1.TYPE,
      SyntaxError: base_config_1.TYPE_VALUE,
      SyntaxErrorConstructor: base_config_1.TYPE,
      TemplateStringsArray: base_config_1.TYPE,
      ThisParameterType: base_config_1.TYPE,
      ThisType: base_config_1.TYPE,
      TypedPropertyDescriptor: base_config_1.TYPE,
      TypeError: base_config_1.TYPE_VALUE,
      TypeErrorConstructor: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE_VALUE,
      Uint16ArrayConstructor: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE_VALUE,
      Uint32ArrayConstructor: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE_VALUE,
      Uint8ArrayConstructor: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE_VALUE,
      Uint8ClampedArrayConstructor: base_config_1.TYPE,
      Uncapitalize: base_config_1.TYPE,
      Uppercase: base_config_1.TYPE,
      URIError: base_config_1.TYPE_VALUE,
      URIErrorConstructor: base_config_1.TYPE,
      WeakKey: base_config_1.TYPE,
      WeakKeyTypes: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.js
var require_es2015 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2015.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2015 = void 0;
    var es2015_collection_1 = require_es2015_collection();
    var es2015_core_1 = require_es2015_core();
    var es2015_generator_1 = require_es2015_generator();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_promise_1 = require_es2015_promise();
    var es2015_proxy_1 = require_es2015_proxy();
    var es2015_reflect_1 = require_es2015_reflect();
    var es2015_symbol_1 = require_es2015_symbol();
    var es2015_symbol_wellknown_1 = require_es2015_symbol_wellknown();
    var es5_1 = require_es5();
    exports.es2015 = {
      ...es5_1.es5,
      ...es2015_core_1.es2015_core,
      ...es2015_collection_1.es2015_collection,
      ...es2015_iterable_1.es2015_iterable,
      ...es2015_generator_1.es2015_generator,
      ...es2015_promise_1.es2015_promise,
      ...es2015_proxy_1.es2015_proxy,
      ...es2015_reflect_1.es2015_reflect,
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_symbol_wellknown_1.es2015_symbol_wellknown
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.array.include.js
var require_es2016_array_include = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.array.include.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2016_array_include = void 0;
    var base_config_1 = require_base_config();
    exports.es2016_array_include = {
      Array: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.intl.js
var require_es2016_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2016_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2016_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.js
var require_es2016 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2016 = void 0;
    var es2015_1 = require_es2015();
    var es2016_array_include_1 = require_es2016_array_include();
    var es2016_intl_1 = require_es2016_intl();
    exports.es2016 = {
      ...es2015_1.es2015,
      ...es2016_array_include_1.es2016_array_include,
      ...es2016_intl_1.es2016_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/scripthost.js
var require_scripthost = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/scripthost.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scripthost = void 0;
    var base_config_1 = require_base_config();
    exports.scripthost = {
      ActiveXObject: base_config_1.TYPE_VALUE,
      Date: base_config_1.TYPE,
      DateConstructor: base_config_1.TYPE,
      Enumerator: base_config_1.TYPE_VALUE,
      EnumeratorConstructor: base_config_1.TYPE,
      ITextWriter: base_config_1.TYPE,
      SafeArray: base_config_1.TYPE_VALUE,
      TextStreamBase: base_config_1.TYPE,
      TextStreamReader: base_config_1.TYPE,
      TextStreamWriter: base_config_1.TYPE,
      VarDate: base_config_1.TYPE_VALUE,
      VBArray: base_config_1.TYPE_VALUE,
      VBArrayConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.importscripts.js
var require_webworker_importscripts = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.importscripts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.webworker_importscripts = void 0;
    exports.webworker_importscripts = {};
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.full.js
var require_es2016_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2016.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2016_full = void 0;
    var dom_1 = require_dom();
    var dom_iterable_1 = require_dom_iterable();
    var es2016_1 = require_es2016();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2016_full = {
      ...es2016_1.es2016,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.date.js
var require_es2017_date = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.date.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_date = void 0;
    var base_config_1 = require_base_config();
    exports.es2017_date = {
      DateConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.intl.js
var require_es2017_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2017_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.object.js
var require_es2017_object = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_object = void 0;
    var base_config_1 = require_base_config();
    exports.es2017_object = {
      ObjectConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.sharedmemory.js
var require_es2017_sharedmemory = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.sharedmemory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_sharedmemory = void 0;
    var base_config_1 = require_base_config();
    var es2015_symbol_1 = require_es2015_symbol();
    var es2015_symbol_wellknown_1 = require_es2015_symbol_wellknown();
    exports.es2017_sharedmemory = {
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_symbol_wellknown_1.es2015_symbol_wellknown,
      ArrayBufferTypes: base_config_1.TYPE,
      Atomics: base_config_1.TYPE_VALUE,
      SharedArrayBuffer: base_config_1.TYPE_VALUE,
      SharedArrayBufferConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.string.js
var require_es2017_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_string = void 0;
    var base_config_1 = require_base_config();
    exports.es2017_string = {
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.typedarrays.js
var require_es2017_typedarrays = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.typedarrays.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_typedarrays = void 0;
    var base_config_1 = require_base_config();
    exports.es2017_typedarrays = {
      Float32ArrayConstructor: base_config_1.TYPE,
      Float64ArrayConstructor: base_config_1.TYPE,
      Int16ArrayConstructor: base_config_1.TYPE,
      Int32ArrayConstructor: base_config_1.TYPE,
      Int8ArrayConstructor: base_config_1.TYPE,
      Uint16ArrayConstructor: base_config_1.TYPE,
      Uint32ArrayConstructor: base_config_1.TYPE,
      Uint8ArrayConstructor: base_config_1.TYPE,
      Uint8ClampedArrayConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.js
var require_es2017 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017 = void 0;
    var es2016_1 = require_es2016();
    var es2017_date_1 = require_es2017_date();
    var es2017_intl_1 = require_es2017_intl();
    var es2017_object_1 = require_es2017_object();
    var es2017_sharedmemory_1 = require_es2017_sharedmemory();
    var es2017_string_1 = require_es2017_string();
    var es2017_typedarrays_1 = require_es2017_typedarrays();
    exports.es2017 = {
      ...es2016_1.es2016,
      ...es2017_object_1.es2017_object,
      ...es2017_sharedmemory_1.es2017_sharedmemory,
      ...es2017_string_1.es2017_string,
      ...es2017_intl_1.es2017_intl,
      ...es2017_typedarrays_1.es2017_typedarrays,
      ...es2017_date_1.es2017_date
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.full.js
var require_es2017_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2017.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2017_full = void 0;
    var dom_1 = require_dom();
    var dom_iterable_1 = require_dom_iterable();
    var es2017_1 = require_es2017();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2017_full = {
      ...es2017_1.es2017,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.asynciterable.js
var require_es2018_asynciterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.asynciterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_asynciterable = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.es2018_asynciterable = {
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_iterable_1.es2015_iterable,
      AsyncIterable: base_config_1.TYPE,
      AsyncIterableIterator: base_config_1.TYPE,
      AsyncIterator: base_config_1.TYPE,
      AsyncIteratorObject: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.asyncgenerator.js
var require_es2018_asyncgenerator = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.asyncgenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_asyncgenerator = void 0;
    var base_config_1 = require_base_config();
    var es2018_asynciterable_1 = require_es2018_asynciterable();
    exports.es2018_asyncgenerator = {
      ...es2018_asynciterable_1.es2018_asynciterable,
      AsyncGenerator: base_config_1.TYPE,
      AsyncGeneratorFunction: base_config_1.TYPE,
      AsyncGeneratorFunctionConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.intl.js
var require_es2018_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2018_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.promise.js
var require_es2018_promise = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_promise = void 0;
    var base_config_1 = require_base_config();
    exports.es2018_promise = {
      Promise: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.regexp.js
var require_es2018_regexp = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.regexp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_regexp = void 0;
    var base_config_1 = require_base_config();
    exports.es2018_regexp = {
      RegExp: base_config_1.TYPE,
      RegExpExecArray: base_config_1.TYPE,
      RegExpMatchArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.js
var require_es2018 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018 = void 0;
    var es2017_1 = require_es2017();
    var es2018_asyncgenerator_1 = require_es2018_asyncgenerator();
    var es2018_asynciterable_1 = require_es2018_asynciterable();
    var es2018_intl_1 = require_es2018_intl();
    var es2018_promise_1 = require_es2018_promise();
    var es2018_regexp_1 = require_es2018_regexp();
    exports.es2018 = {
      ...es2017_1.es2017,
      ...es2018_asynciterable_1.es2018_asynciterable,
      ...es2018_asyncgenerator_1.es2018_asyncgenerator,
      ...es2018_promise_1.es2018_promise,
      ...es2018_regexp_1.es2018_regexp,
      ...es2018_intl_1.es2018_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.full.js
var require_es2018_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2018.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2018_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2018_1 = require_es2018();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2018_full = {
      ...es2018_1.es2018,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.array.js
var require_es2019_array = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_array = void 0;
    var base_config_1 = require_base_config();
    exports.es2019_array = {
      Array: base_config_1.TYPE,
      FlatArray: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.intl.js
var require_es2019_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2019_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.object.js
var require_es2019_object = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_object = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    exports.es2019_object = {
      ...es2015_iterable_1.es2015_iterable,
      ObjectConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.string.js
var require_es2019_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_string = void 0;
    var base_config_1 = require_base_config();
    exports.es2019_string = {
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.symbol.js
var require_es2019_symbol = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_symbol = void 0;
    var base_config_1 = require_base_config();
    exports.es2019_symbol = {
      Symbol: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.js
var require_es2019 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019 = void 0;
    var es2018_1 = require_es2018();
    var es2019_array_1 = require_es2019_array();
    var es2019_intl_1 = require_es2019_intl();
    var es2019_object_1 = require_es2019_object();
    var es2019_string_1 = require_es2019_string();
    var es2019_symbol_1 = require_es2019_symbol();
    exports.es2019 = {
      ...es2018_1.es2018,
      ...es2019_array_1.es2019_array,
      ...es2019_object_1.es2019_object,
      ...es2019_string_1.es2019_string,
      ...es2019_symbol_1.es2019_symbol,
      ...es2019_intl_1.es2019_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.full.js
var require_es2019_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2019.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2019_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2019_1 = require_es2019();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2019_full = {
      ...es2019_1.es2019,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.intl.js
var require_es2020_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_intl = void 0;
    var base_config_1 = require_base_config();
    var es2018_intl_1 = require_es2018_intl();
    exports.es2020_intl = {
      ...es2018_intl_1.es2018_intl,
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.bigint.js
var require_es2020_bigint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.bigint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_bigint = void 0;
    var base_config_1 = require_base_config();
    var es2020_intl_1 = require_es2020_intl();
    exports.es2020_bigint = {
      ...es2020_intl_1.es2020_intl,
      BigInt: base_config_1.TYPE_VALUE,
      BigInt64Array: base_config_1.TYPE_VALUE,
      BigInt64ArrayConstructor: base_config_1.TYPE,
      BigIntConstructor: base_config_1.TYPE,
      BigIntToLocaleStringOptions: base_config_1.TYPE,
      BigUint64Array: base_config_1.TYPE_VALUE,
      BigUint64ArrayConstructor: base_config_1.TYPE,
      DataView: base_config_1.TYPE,
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.date.js
var require_es2020_date = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.date.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_date = void 0;
    var base_config_1 = require_base_config();
    var es2020_intl_1 = require_es2020_intl();
    exports.es2020_date = {
      ...es2020_intl_1.es2020_intl,
      Date: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.number.js
var require_es2020_number = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_number = void 0;
    var base_config_1 = require_base_config();
    var es2020_intl_1 = require_es2020_intl();
    exports.es2020_number = {
      ...es2020_intl_1.es2020_intl,
      Number: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.promise.js
var require_es2020_promise = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_promise = void 0;
    var base_config_1 = require_base_config();
    exports.es2020_promise = {
      PromiseConstructor: base_config_1.TYPE,
      PromiseFulfilledResult: base_config_1.TYPE,
      PromiseRejectedResult: base_config_1.TYPE,
      PromiseSettledResult: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.sharedmemory.js
var require_es2020_sharedmemory = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.sharedmemory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_sharedmemory = void 0;
    var base_config_1 = require_base_config();
    exports.es2020_sharedmemory = {
      Atomics: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.symbol.wellknown.js
var require_es2020_symbol_wellknown = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.symbol.wellknown.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_symbol_wellknown = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.es2020_symbol_wellknown = {
      ...es2015_iterable_1.es2015_iterable,
      ...es2015_symbol_1.es2015_symbol,
      RegExp: base_config_1.TYPE,
      RegExpStringIterator: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.string.js
var require_es2020_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_string = void 0;
    var base_config_1 = require_base_config();
    var es2020_symbol_wellknown_1 = require_es2020_symbol_wellknown();
    exports.es2020_string = {
      ...es2020_symbol_wellknown_1.es2020_symbol_wellknown,
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.js
var require_es2020 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020 = void 0;
    var es2019_1 = require_es2019();
    var es2020_bigint_1 = require_es2020_bigint();
    var es2020_date_1 = require_es2020_date();
    var es2020_intl_1 = require_es2020_intl();
    var es2020_number_1 = require_es2020_number();
    var es2020_promise_1 = require_es2020_promise();
    var es2020_sharedmemory_1 = require_es2020_sharedmemory();
    var es2020_string_1 = require_es2020_string();
    var es2020_symbol_wellknown_1 = require_es2020_symbol_wellknown();
    exports.es2020 = {
      ...es2019_1.es2019,
      ...es2020_bigint_1.es2020_bigint,
      ...es2020_date_1.es2020_date,
      ...es2020_number_1.es2020_number,
      ...es2020_promise_1.es2020_promise,
      ...es2020_sharedmemory_1.es2020_sharedmemory,
      ...es2020_string_1.es2020_string,
      ...es2020_symbol_wellknown_1.es2020_symbol_wellknown,
      ...es2020_intl_1.es2020_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.full.js
var require_es2020_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2020.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2020_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2020_1 = require_es2020();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2020_full = {
      ...es2020_1.es2020,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.intl.js
var require_es2021_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2021_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.promise.js
var require_es2021_promise = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021_promise = void 0;
    var base_config_1 = require_base_config();
    exports.es2021_promise = {
      AggregateError: base_config_1.TYPE_VALUE,
      AggregateErrorConstructor: base_config_1.TYPE,
      PromiseConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.string.js
var require_es2021_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021_string = void 0;
    var base_config_1 = require_base_config();
    exports.es2021_string = {
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.weakref.js
var require_es2021_weakref = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.weakref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021_weakref = void 0;
    var base_config_1 = require_base_config();
    exports.es2021_weakref = {
      FinalizationRegistry: base_config_1.TYPE_VALUE,
      FinalizationRegistryConstructor: base_config_1.TYPE,
      WeakRef: base_config_1.TYPE_VALUE,
      WeakRefConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.js
var require_es2021 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021 = void 0;
    var es2020_1 = require_es2020();
    var es2021_intl_1 = require_es2021_intl();
    var es2021_promise_1 = require_es2021_promise();
    var es2021_string_1 = require_es2021_string();
    var es2021_weakref_1 = require_es2021_weakref();
    exports.es2021 = {
      ...es2020_1.es2020,
      ...es2021_promise_1.es2021_promise,
      ...es2021_string_1.es2021_string,
      ...es2021_weakref_1.es2021_weakref,
      ...es2021_intl_1.es2021_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.full.js
var require_es2021_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2021.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2021_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2021_1 = require_es2021();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2021_full = {
      ...es2021_1.es2021,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.array.js
var require_es2022_array = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_array = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_array = {
      Array: base_config_1.TYPE,
      BigInt64Array: base_config_1.TYPE,
      BigUint64Array: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.error.js
var require_es2022_error = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_error = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_error = {
      AggregateErrorConstructor: base_config_1.TYPE,
      Error: base_config_1.TYPE,
      ErrorConstructor: base_config_1.TYPE,
      ErrorOptions: base_config_1.TYPE,
      EvalErrorConstructor: base_config_1.TYPE,
      RangeErrorConstructor: base_config_1.TYPE,
      ReferenceErrorConstructor: base_config_1.TYPE,
      SyntaxErrorConstructor: base_config_1.TYPE,
      TypeErrorConstructor: base_config_1.TYPE,
      URIErrorConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.intl.js
var require_es2022_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.object.js
var require_es2022_object = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_object = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_object = {
      ObjectConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.regexp.js
var require_es2022_regexp = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.regexp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_regexp = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_regexp = {
      RegExp: base_config_1.TYPE,
      RegExpExecArray: base_config_1.TYPE,
      RegExpIndicesArray: base_config_1.TYPE,
      RegExpMatchArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.sharedmemory.js
var require_es2022_sharedmemory = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.sharedmemory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_sharedmemory = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_sharedmemory = {
      Atomics: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.string.js
var require_es2022_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_string = void 0;
    var base_config_1 = require_base_config();
    exports.es2022_string = {
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.js
var require_es2022 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022 = void 0;
    var es2021_1 = require_es2021();
    var es2022_array_1 = require_es2022_array();
    var es2022_error_1 = require_es2022_error();
    var es2022_intl_1 = require_es2022_intl();
    var es2022_object_1 = require_es2022_object();
    var es2022_regexp_1 = require_es2022_regexp();
    var es2022_sharedmemory_1 = require_es2022_sharedmemory();
    var es2022_string_1 = require_es2022_string();
    exports.es2022 = {
      ...es2021_1.es2021,
      ...es2022_array_1.es2022_array,
      ...es2022_error_1.es2022_error,
      ...es2022_intl_1.es2022_intl,
      ...es2022_object_1.es2022_object,
      ...es2022_sharedmemory_1.es2022_sharedmemory,
      ...es2022_string_1.es2022_string,
      ...es2022_regexp_1.es2022_regexp
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.full.js
var require_es2022_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2022.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2022_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2022_1 = require_es2022();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2022_full = {
      ...es2022_1.es2022,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.array.js
var require_es2023_array = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2023_array = void 0;
    var base_config_1 = require_base_config();
    exports.es2023_array = {
      Array: base_config_1.TYPE,
      BigInt64Array: base_config_1.TYPE,
      BigUint64Array: base_config_1.TYPE,
      Float32Array: base_config_1.TYPE,
      Float64Array: base_config_1.TYPE,
      Int16Array: base_config_1.TYPE,
      Int32Array: base_config_1.TYPE,
      Int8Array: base_config_1.TYPE,
      ReadonlyArray: base_config_1.TYPE,
      Uint16Array: base_config_1.TYPE,
      Uint32Array: base_config_1.TYPE,
      Uint8Array: base_config_1.TYPE,
      Uint8ClampedArray: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.collection.js
var require_es2023_collection = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.collection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2023_collection = void 0;
    var base_config_1 = require_base_config();
    exports.es2023_collection = {
      WeakKeyTypes: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.intl.js
var require_es2023_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2023_intl = void 0;
    var base_config_1 = require_base_config();
    exports.es2023_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.js
var require_es2023 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2023 = void 0;
    var es2022_1 = require_es2022();
    var es2023_array_1 = require_es2023_array();
    var es2023_collection_1 = require_es2023_collection();
    var es2023_intl_1 = require_es2023_intl();
    exports.es2023 = {
      ...es2022_1.es2022,
      ...es2023_array_1.es2023_array,
      ...es2023_collection_1.es2023_collection,
      ...es2023_intl_1.es2023_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.full.js
var require_es2023_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es2023.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es2023_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2023_1 = require_es2023();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.es2023_full = {
      ...es2023_1.es2023,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es6.js
var require_es6 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es6.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es6 = void 0;
    var es2015_collection_1 = require_es2015_collection();
    var es2015_core_1 = require_es2015_core();
    var es2015_generator_1 = require_es2015_generator();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_promise_1 = require_es2015_promise();
    var es2015_proxy_1 = require_es2015_proxy();
    var es2015_reflect_1 = require_es2015_reflect();
    var es2015_symbol_1 = require_es2015_symbol();
    var es2015_symbol_wellknown_1 = require_es2015_symbol_wellknown();
    var es5_1 = require_es5();
    exports.es6 = {
      ...es5_1.es5,
      ...es2015_core_1.es2015_core,
      ...es2015_collection_1.es2015_collection,
      ...es2015_iterable_1.es2015_iterable,
      ...es2015_generator_1.es2015_generator,
      ...es2015_promise_1.es2015_promise,
      ...es2015_proxy_1.es2015_proxy,
      ...es2015_reflect_1.es2015_reflect,
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_symbol_wellknown_1.es2015_symbol_wellknown
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es7.js
var require_es7 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/es7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.es7 = void 0;
    var es2015_1 = require_es2015();
    var es2016_array_include_1 = require_es2016_array_include();
    var es2016_intl_1 = require_es2016_intl();
    exports.es7 = {
      ...es2015_1.es2015,
      ...es2016_array_include_1.es2016_array_include,
      ...es2016_intl_1.es2016_intl
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.array.js
var require_esnext_array = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_array = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_array = {
      ArrayConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.collection.js
var require_esnext_collection = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.collection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_collection = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_collection = {
      MapConstructor: base_config_1.TYPE,
      ReadonlySet: base_config_1.TYPE,
      ReadonlySetLike: base_config_1.TYPE,
      Set: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.decorators.js
var require_esnext_decorators = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.decorators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_decorators = void 0;
    var base_config_1 = require_base_config();
    var decorators_1 = require_decorators();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.esnext_decorators = {
      ...es2015_symbol_1.es2015_symbol,
      ...decorators_1.decorators,
      Function: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.disposable.js
var require_esnext_disposable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.disposable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_disposable = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_symbol_1 = require_es2015_symbol();
    var es2018_asynciterable_1 = require_es2018_asynciterable();
    exports.esnext_disposable = {
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_iterable_1.es2015_iterable,
      ...es2018_asynciterable_1.es2018_asynciterable,
      AsyncDisposable: base_config_1.TYPE,
      AsyncDisposableStack: base_config_1.TYPE_VALUE,
      AsyncDisposableStackConstructor: base_config_1.TYPE,
      AsyncIteratorObject: base_config_1.TYPE,
      Disposable: base_config_1.TYPE,
      DisposableStack: base_config_1.TYPE_VALUE,
      DisposableStackConstructor: base_config_1.TYPE,
      IteratorObject: base_config_1.TYPE,
      SuppressedError: base_config_1.TYPE_VALUE,
      SuppressedErrorConstructor: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.intl.js
var require_esnext_intl = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.intl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_intl = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_intl = {
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.iterator.js
var require_esnext_iterator = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.iterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_iterator = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    exports.esnext_iterator = {
      ...es2015_iterable_1.es2015_iterable,
      Iterator: base_config_1.TYPE_VALUE,
      IteratorObjectConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.object.js
var require_esnext_object = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_object = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_object = {
      ObjectConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.promise.js
var require_esnext_promise = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_promise = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_promise = {
      PromiseConstructor: base_config_1.TYPE,
      PromiseWithResolvers: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.regexp.js
var require_esnext_regexp = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.regexp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_regexp = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_regexp = {
      RegExp: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.string.js
var require_esnext_string = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_string = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_string = {
      String: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.js
var require_esnext = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext = void 0;
    var es2023_1 = require_es2023();
    var esnext_array_1 = require_esnext_array();
    var esnext_collection_1 = require_esnext_collection();
    var esnext_decorators_1 = require_esnext_decorators();
    var esnext_disposable_1 = require_esnext_disposable();
    var esnext_intl_1 = require_esnext_intl();
    var esnext_iterator_1 = require_esnext_iterator();
    var esnext_object_1 = require_esnext_object();
    var esnext_promise_1 = require_esnext_promise();
    var esnext_regexp_1 = require_esnext_regexp();
    var esnext_string_1 = require_esnext_string();
    exports.esnext = {
      ...es2023_1.es2023,
      ...esnext_intl_1.esnext_intl,
      ...esnext_decorators_1.esnext_decorators,
      ...esnext_disposable_1.esnext_disposable,
      ...esnext_promise_1.esnext_promise,
      ...esnext_object_1.esnext_object,
      ...esnext_collection_1.esnext_collection,
      ...esnext_array_1.esnext_array,
      ...esnext_regexp_1.esnext_regexp,
      ...esnext_string_1.esnext_string,
      ...esnext_iterator_1.esnext_iterator
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.asynciterable.js
var require_esnext_asynciterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.asynciterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_asynciterable = void 0;
    var base_config_1 = require_base_config();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_symbol_1 = require_es2015_symbol();
    exports.esnext_asynciterable = {
      ...es2015_symbol_1.es2015_symbol,
      ...es2015_iterable_1.es2015_iterable,
      AsyncIterable: base_config_1.TYPE,
      AsyncIterableIterator: base_config_1.TYPE,
      AsyncIterator: base_config_1.TYPE,
      AsyncIteratorObject: base_config_1.TYPE,
      SymbolConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.bigint.js
var require_esnext_bigint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.bigint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_bigint = void 0;
    var base_config_1 = require_base_config();
    var es2020_intl_1 = require_es2020_intl();
    exports.esnext_bigint = {
      ...es2020_intl_1.es2020_intl,
      BigInt: base_config_1.TYPE_VALUE,
      BigInt64Array: base_config_1.TYPE_VALUE,
      BigInt64ArrayConstructor: base_config_1.TYPE,
      BigIntConstructor: base_config_1.TYPE,
      BigIntToLocaleStringOptions: base_config_1.TYPE,
      BigUint64Array: base_config_1.TYPE_VALUE,
      BigUint64ArrayConstructor: base_config_1.TYPE,
      DataView: base_config_1.TYPE,
      Intl: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.full.js
var require_esnext_full = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.full.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_full = void 0;
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var esnext_1 = require_esnext();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.esnext_full = {
      ...esnext_1.esnext,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost,
      ...dom_iterable_1.dom_iterable,
      ...dom_asynciterable_1.dom_asynciterable
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.symbol.js
var require_esnext_symbol = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_symbol = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_symbol = {
      Symbol: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.weakref.js
var require_esnext_weakref = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/esnext.weakref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.esnext_weakref = void 0;
    var base_config_1 = require_base_config();
    exports.esnext_weakref = {
      FinalizationRegistry: base_config_1.TYPE_VALUE,
      FinalizationRegistryConstructor: base_config_1.TYPE,
      WeakRef: base_config_1.TYPE_VALUE,
      WeakRefConstructor: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/lib.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/lib.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lib = void 0;
    var dom_1 = require_dom();
    var es5_1 = require_es5();
    var scripthost_1 = require_scripthost();
    var webworker_importscripts_1 = require_webworker_importscripts();
    exports.lib = {
      ...es5_1.es5,
      ...dom_1.dom,
      ...webworker_importscripts_1.webworker_importscripts,
      ...scripthost_1.scripthost
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.js
var require_webworker = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.webworker = void 0;
    var base_config_1 = require_base_config();
    exports.webworker = {
      AbortController: base_config_1.TYPE_VALUE,
      AbortSignal: base_config_1.TYPE_VALUE,
      AbortSignalEventMap: base_config_1.TYPE,
      AbstractWorker: base_config_1.TYPE,
      AbstractWorkerEventMap: base_config_1.TYPE,
      AddEventListenerOptions: base_config_1.TYPE,
      AesCbcParams: base_config_1.TYPE,
      AesCtrParams: base_config_1.TYPE,
      AesDerivedKeyParams: base_config_1.TYPE,
      AesGcmParams: base_config_1.TYPE,
      AesKeyAlgorithm: base_config_1.TYPE,
      AesKeyGenParams: base_config_1.TYPE,
      Algorithm: base_config_1.TYPE,
      AlgorithmIdentifier: base_config_1.TYPE,
      AllowSharedBufferSource: base_config_1.TYPE,
      AlphaOption: base_config_1.TYPE,
      ANGLE_instanced_arrays: base_config_1.TYPE,
      AnimationFrameProvider: base_config_1.TYPE,
      AudioConfiguration: base_config_1.TYPE,
      AvcBitstreamFormat: base_config_1.TYPE,
      AvcEncoderConfig: base_config_1.TYPE,
      BigInteger: base_config_1.TYPE,
      BinaryData: base_config_1.TYPE,
      BinaryType: base_config_1.TYPE,
      Blob: base_config_1.TYPE_VALUE,
      BlobPart: base_config_1.TYPE,
      BlobPropertyBag: base_config_1.TYPE,
      Body: base_config_1.TYPE,
      BodyInit: base_config_1.TYPE,
      BroadcastChannel: base_config_1.TYPE_VALUE,
      BroadcastChannelEventMap: base_config_1.TYPE,
      BufferSource: base_config_1.TYPE,
      ByteLengthQueuingStrategy: base_config_1.TYPE_VALUE,
      Cache: base_config_1.TYPE_VALUE,
      CacheQueryOptions: base_config_1.TYPE,
      CacheStorage: base_config_1.TYPE_VALUE,
      CanvasCompositing: base_config_1.TYPE,
      CanvasDirection: base_config_1.TYPE,
      CanvasDrawImage: base_config_1.TYPE,
      CanvasDrawPath: base_config_1.TYPE,
      CanvasFillRule: base_config_1.TYPE,
      CanvasFillStrokeStyles: base_config_1.TYPE,
      CanvasFilters: base_config_1.TYPE,
      CanvasFontKerning: base_config_1.TYPE,
      CanvasFontStretch: base_config_1.TYPE,
      CanvasFontVariantCaps: base_config_1.TYPE,
      CanvasGradient: base_config_1.TYPE_VALUE,
      CanvasImageData: base_config_1.TYPE,
      CanvasImageSmoothing: base_config_1.TYPE,
      CanvasImageSource: base_config_1.TYPE,
      CanvasLineCap: base_config_1.TYPE,
      CanvasLineJoin: base_config_1.TYPE,
      CanvasPath: base_config_1.TYPE,
      CanvasPathDrawingStyles: base_config_1.TYPE,
      CanvasPattern: base_config_1.TYPE_VALUE,
      CanvasRect: base_config_1.TYPE,
      CanvasShadowStyles: base_config_1.TYPE,
      CanvasState: base_config_1.TYPE,
      CanvasText: base_config_1.TYPE,
      CanvasTextAlign: base_config_1.TYPE,
      CanvasTextBaseline: base_config_1.TYPE,
      CanvasTextDrawingStyles: base_config_1.TYPE,
      CanvasTextRendering: base_config_1.TYPE,
      CanvasTransform: base_config_1.TYPE,
      Client: base_config_1.TYPE_VALUE,
      ClientQueryOptions: base_config_1.TYPE,
      Clients: base_config_1.TYPE_VALUE,
      ClientTypes: base_config_1.TYPE,
      CloseEvent: base_config_1.TYPE_VALUE,
      CloseEventInit: base_config_1.TYPE,
      CodecState: base_config_1.TYPE,
      ColorGamut: base_config_1.TYPE,
      ColorSpaceConversion: base_config_1.TYPE,
      CompressionFormat: base_config_1.TYPE,
      CompressionStream: base_config_1.TYPE_VALUE,
      Console: base_config_1.TYPE,
      CountQueuingStrategy: base_config_1.TYPE_VALUE,
      Crypto: base_config_1.TYPE_VALUE,
      CryptoKey: base_config_1.TYPE_VALUE,
      CryptoKeyPair: base_config_1.TYPE,
      CSSImageValue: base_config_1.TYPE_VALUE,
      CSSKeywordish: base_config_1.TYPE,
      CSSKeywordValue: base_config_1.TYPE_VALUE,
      CSSMathClamp: base_config_1.TYPE_VALUE,
      CSSMathInvert: base_config_1.TYPE_VALUE,
      CSSMathMax: base_config_1.TYPE_VALUE,
      CSSMathMin: base_config_1.TYPE_VALUE,
      CSSMathNegate: base_config_1.TYPE_VALUE,
      CSSMathOperator: base_config_1.TYPE,
      CSSMathProduct: base_config_1.TYPE_VALUE,
      CSSMathSum: base_config_1.TYPE_VALUE,
      CSSMathValue: base_config_1.TYPE_VALUE,
      CSSMatrixComponent: base_config_1.TYPE_VALUE,
      CSSMatrixComponentOptions: base_config_1.TYPE,
      CSSNumberish: base_config_1.TYPE,
      CSSNumericArray: base_config_1.TYPE_VALUE,
      CSSNumericBaseType: base_config_1.TYPE,
      CSSNumericType: base_config_1.TYPE,
      CSSNumericValue: base_config_1.TYPE_VALUE,
      CSSPerspective: base_config_1.TYPE_VALUE,
      CSSPerspectiveValue: base_config_1.TYPE,
      CSSRotate: base_config_1.TYPE_VALUE,
      CSSScale: base_config_1.TYPE_VALUE,
      CSSSkew: base_config_1.TYPE_VALUE,
      CSSSkewX: base_config_1.TYPE_VALUE,
      CSSSkewY: base_config_1.TYPE_VALUE,
      CSSStyleValue: base_config_1.TYPE_VALUE,
      CSSTransformComponent: base_config_1.TYPE_VALUE,
      CSSTransformValue: base_config_1.TYPE_VALUE,
      CSSTranslate: base_config_1.TYPE_VALUE,
      CSSUnitValue: base_config_1.TYPE_VALUE,
      CSSUnparsedSegment: base_config_1.TYPE,
      CSSUnparsedValue: base_config_1.TYPE_VALUE,
      CSSVariableReferenceValue: base_config_1.TYPE_VALUE,
      CustomEvent: base_config_1.TYPE_VALUE,
      CustomEventInit: base_config_1.TYPE,
      DecompressionStream: base_config_1.TYPE_VALUE,
      DedicatedWorkerGlobalScope: base_config_1.TYPE_VALUE,
      DedicatedWorkerGlobalScopeEventMap: base_config_1.TYPE,
      DocumentVisibilityState: base_config_1.TYPE,
      DOMException: base_config_1.TYPE_VALUE,
      DOMHighResTimeStamp: base_config_1.TYPE,
      DOMMatrix: base_config_1.TYPE_VALUE,
      DOMMatrix2DInit: base_config_1.TYPE,
      DOMMatrixInit: base_config_1.TYPE,
      DOMMatrixReadOnly: base_config_1.TYPE_VALUE,
      DOMPoint: base_config_1.TYPE_VALUE,
      DOMPointInit: base_config_1.TYPE,
      DOMPointReadOnly: base_config_1.TYPE_VALUE,
      DOMQuad: base_config_1.TYPE_VALUE,
      DOMQuadInit: base_config_1.TYPE,
      DOMRect: base_config_1.TYPE_VALUE,
      DOMRectInit: base_config_1.TYPE,
      DOMRectReadOnly: base_config_1.TYPE_VALUE,
      DOMStringList: base_config_1.TYPE_VALUE,
      EcdhKeyDeriveParams: base_config_1.TYPE,
      EcdsaParams: base_config_1.TYPE,
      EcKeyGenParams: base_config_1.TYPE,
      EcKeyImportParams: base_config_1.TYPE,
      EncodedVideoChunk: base_config_1.TYPE_VALUE,
      EncodedVideoChunkInit: base_config_1.TYPE,
      EncodedVideoChunkMetadata: base_config_1.TYPE,
      EncodedVideoChunkOutputCallback: base_config_1.TYPE,
      EncodedVideoChunkType: base_config_1.TYPE,
      EndingType: base_config_1.TYPE,
      EpochTimeStamp: base_config_1.TYPE,
      ErrorEvent: base_config_1.TYPE_VALUE,
      ErrorEventInit: base_config_1.TYPE,
      Event: base_config_1.TYPE_VALUE,
      EventInit: base_config_1.TYPE,
      EventListener: base_config_1.TYPE,
      EventListenerObject: base_config_1.TYPE,
      EventListenerOptions: base_config_1.TYPE,
      EventListenerOrEventListenerObject: base_config_1.TYPE,
      EventSource: base_config_1.TYPE_VALUE,
      EventSourceEventMap: base_config_1.TYPE,
      EventSourceInit: base_config_1.TYPE,
      EventTarget: base_config_1.TYPE_VALUE,
      EXT_blend_minmax: base_config_1.TYPE,
      EXT_color_buffer_float: base_config_1.TYPE,
      EXT_color_buffer_half_float: base_config_1.TYPE,
      EXT_float_blend: base_config_1.TYPE,
      EXT_frag_depth: base_config_1.TYPE,
      EXT_shader_texture_lod: base_config_1.TYPE,
      EXT_sRGB: base_config_1.TYPE,
      EXT_texture_compression_bptc: base_config_1.TYPE,
      EXT_texture_compression_rgtc: base_config_1.TYPE,
      EXT_texture_filter_anisotropic: base_config_1.TYPE,
      EXT_texture_norm16: base_config_1.TYPE,
      ExtendableEvent: base_config_1.TYPE_VALUE,
      ExtendableEventInit: base_config_1.TYPE,
      ExtendableMessageEvent: base_config_1.TYPE_VALUE,
      ExtendableMessageEventInit: base_config_1.TYPE,
      FetchEvent: base_config_1.TYPE_VALUE,
      FetchEventInit: base_config_1.TYPE,
      File: base_config_1.TYPE_VALUE,
      FileList: base_config_1.TYPE_VALUE,
      FilePropertyBag: base_config_1.TYPE,
      FileReader: base_config_1.TYPE_VALUE,
      FileReaderEventMap: base_config_1.TYPE,
      FileReaderSync: base_config_1.TYPE_VALUE,
      FileSystemCreateWritableOptions: base_config_1.TYPE,
      FileSystemDirectoryHandle: base_config_1.TYPE_VALUE,
      FileSystemFileHandle: base_config_1.TYPE_VALUE,
      FileSystemGetDirectoryOptions: base_config_1.TYPE,
      FileSystemGetFileOptions: base_config_1.TYPE,
      FileSystemHandle: base_config_1.TYPE_VALUE,
      FileSystemHandleKind: base_config_1.TYPE,
      FileSystemReadWriteOptions: base_config_1.TYPE,
      FileSystemRemoveOptions: base_config_1.TYPE,
      FileSystemSyncAccessHandle: base_config_1.TYPE_VALUE,
      FileSystemWritableFileStream: base_config_1.TYPE_VALUE,
      FileSystemWriteChunkType: base_config_1.TYPE,
      Float32List: base_config_1.TYPE,
      FontDisplay: base_config_1.TYPE,
      FontFace: base_config_1.TYPE_VALUE,
      FontFaceDescriptors: base_config_1.TYPE,
      FontFaceLoadStatus: base_config_1.TYPE,
      FontFaceSet: base_config_1.TYPE_VALUE,
      FontFaceSetEventMap: base_config_1.TYPE,
      FontFaceSetLoadEvent: base_config_1.TYPE_VALUE,
      FontFaceSetLoadEventInit: base_config_1.TYPE,
      FontFaceSetLoadStatus: base_config_1.TYPE,
      FontFaceSource: base_config_1.TYPE,
      FormData: base_config_1.TYPE_VALUE,
      FormDataEntryValue: base_config_1.TYPE,
      FrameRequestCallback: base_config_1.TYPE,
      FrameType: base_config_1.TYPE,
      GenericTransformStream: base_config_1.TYPE,
      GetNotificationOptions: base_config_1.TYPE,
      GLbitfield: base_config_1.TYPE,
      GLboolean: base_config_1.TYPE,
      GLclampf: base_config_1.TYPE,
      GLenum: base_config_1.TYPE,
      GLfloat: base_config_1.TYPE,
      GLint: base_config_1.TYPE,
      GLint64: base_config_1.TYPE,
      GLintptr: base_config_1.TYPE,
      GlobalCompositeOperation: base_config_1.TYPE,
      GLsizei: base_config_1.TYPE,
      GLsizeiptr: base_config_1.TYPE,
      GLuint: base_config_1.TYPE,
      GLuint64: base_config_1.TYPE,
      HardwareAcceleration: base_config_1.TYPE,
      HashAlgorithmIdentifier: base_config_1.TYPE,
      HdrMetadataType: base_config_1.TYPE,
      Headers: base_config_1.TYPE_VALUE,
      HeadersInit: base_config_1.TYPE,
      HkdfParams: base_config_1.TYPE,
      HmacImportParams: base_config_1.TYPE,
      HmacKeyGenParams: base_config_1.TYPE,
      IDBCursor: base_config_1.TYPE_VALUE,
      IDBCursorDirection: base_config_1.TYPE,
      IDBCursorWithValue: base_config_1.TYPE_VALUE,
      IDBDatabase: base_config_1.TYPE_VALUE,
      IDBDatabaseEventMap: base_config_1.TYPE,
      IDBDatabaseInfo: base_config_1.TYPE,
      IDBFactory: base_config_1.TYPE_VALUE,
      IDBIndex: base_config_1.TYPE_VALUE,
      IDBIndexParameters: base_config_1.TYPE,
      IDBKeyRange: base_config_1.TYPE_VALUE,
      IDBObjectStore: base_config_1.TYPE_VALUE,
      IDBObjectStoreParameters: base_config_1.TYPE,
      IDBOpenDBRequest: base_config_1.TYPE_VALUE,
      IDBOpenDBRequestEventMap: base_config_1.TYPE,
      IDBRequest: base_config_1.TYPE_VALUE,
      IDBRequestEventMap: base_config_1.TYPE,
      IDBRequestReadyState: base_config_1.TYPE,
      IDBTransaction: base_config_1.TYPE_VALUE,
      IDBTransactionDurability: base_config_1.TYPE,
      IDBTransactionEventMap: base_config_1.TYPE,
      IDBTransactionMode: base_config_1.TYPE,
      IDBTransactionOptions: base_config_1.TYPE,
      IDBValidKey: base_config_1.TYPE,
      IDBVersionChangeEvent: base_config_1.TYPE_VALUE,
      IDBVersionChangeEventInit: base_config_1.TYPE,
      ImageBitmap: base_config_1.TYPE_VALUE,
      ImageBitmapOptions: base_config_1.TYPE,
      ImageBitmapRenderingContext: base_config_1.TYPE_VALUE,
      ImageBitmapRenderingContextSettings: base_config_1.TYPE,
      ImageBitmapSource: base_config_1.TYPE,
      ImageData: base_config_1.TYPE_VALUE,
      ImageDataSettings: base_config_1.TYPE,
      ImageEncodeOptions: base_config_1.TYPE,
      ImageOrientation: base_config_1.TYPE,
      ImageSmoothingQuality: base_config_1.TYPE,
      ImportMeta: base_config_1.TYPE,
      Int32List: base_config_1.TYPE,
      JsonWebKey: base_config_1.TYPE,
      KeyAlgorithm: base_config_1.TYPE,
      KeyFormat: base_config_1.TYPE,
      KeyType: base_config_1.TYPE,
      KeyUsage: base_config_1.TYPE,
      KHR_parallel_shader_compile: base_config_1.TYPE,
      LatencyMode: base_config_1.TYPE,
      Lock: base_config_1.TYPE_VALUE,
      LockGrantedCallback: base_config_1.TYPE,
      LockInfo: base_config_1.TYPE,
      LockManager: base_config_1.TYPE_VALUE,
      LockManagerSnapshot: base_config_1.TYPE,
      LockMode: base_config_1.TYPE,
      LockOptions: base_config_1.TYPE,
      MediaCapabilities: base_config_1.TYPE_VALUE,
      MediaCapabilitiesDecodingInfo: base_config_1.TYPE,
      MediaCapabilitiesEncodingInfo: base_config_1.TYPE,
      MediaCapabilitiesInfo: base_config_1.TYPE,
      MediaConfiguration: base_config_1.TYPE,
      MediaDecodingConfiguration: base_config_1.TYPE,
      MediaDecodingType: base_config_1.TYPE,
      MediaEncodingConfiguration: base_config_1.TYPE,
      MediaEncodingType: base_config_1.TYPE,
      MediaSourceHandle: base_config_1.TYPE_VALUE,
      MediaStreamTrackProcessor: base_config_1.TYPE_VALUE,
      MediaStreamTrackProcessorInit: base_config_1.TYPE,
      MessageChannel: base_config_1.TYPE_VALUE,
      MessageEvent: base_config_1.TYPE_VALUE,
      MessageEventInit: base_config_1.TYPE,
      MessageEventSource: base_config_1.TYPE,
      MessagePort: base_config_1.TYPE_VALUE,
      MessagePortEventMap: base_config_1.TYPE,
      MultiCacheQueryOptions: base_config_1.TYPE,
      NamedCurve: base_config_1.TYPE,
      NavigationPreloadManager: base_config_1.TYPE_VALUE,
      NavigationPreloadState: base_config_1.TYPE,
      NavigatorBadge: base_config_1.TYPE,
      NavigatorConcurrentHardware: base_config_1.TYPE,
      NavigatorID: base_config_1.TYPE,
      NavigatorLanguage: base_config_1.TYPE,
      NavigatorLocks: base_config_1.TYPE,
      NavigatorOnLine: base_config_1.TYPE,
      NavigatorStorage: base_config_1.TYPE,
      Notification: base_config_1.TYPE_VALUE,
      NotificationDirection: base_config_1.TYPE,
      NotificationEvent: base_config_1.TYPE_VALUE,
      NotificationEventInit: base_config_1.TYPE,
      NotificationEventMap: base_config_1.TYPE,
      NotificationOptions: base_config_1.TYPE,
      NotificationPermission: base_config_1.TYPE,
      OES_draw_buffers_indexed: base_config_1.TYPE,
      OES_element_index_uint: base_config_1.TYPE,
      OES_fbo_render_mipmap: base_config_1.TYPE,
      OES_standard_derivatives: base_config_1.TYPE,
      OES_texture_float: base_config_1.TYPE,
      OES_texture_float_linear: base_config_1.TYPE,
      OES_texture_half_float: base_config_1.TYPE,
      OES_texture_half_float_linear: base_config_1.TYPE,
      OES_vertex_array_object: base_config_1.TYPE,
      OffscreenCanvas: base_config_1.TYPE_VALUE,
      OffscreenCanvasEventMap: base_config_1.TYPE,
      OffscreenCanvasRenderingContext2D: base_config_1.TYPE_VALUE,
      OffscreenRenderingContext: base_config_1.TYPE,
      OffscreenRenderingContextId: base_config_1.TYPE,
      OnErrorEventHandler: base_config_1.TYPE,
      OnErrorEventHandlerNonNull: base_config_1.TYPE,
      OVR_multiview2: base_config_1.TYPE,
      Path2D: base_config_1.TYPE_VALUE,
      Pbkdf2Params: base_config_1.TYPE,
      Performance: base_config_1.TYPE_VALUE,
      PerformanceEntry: base_config_1.TYPE_VALUE,
      PerformanceEntryList: base_config_1.TYPE,
      PerformanceEventMap: base_config_1.TYPE,
      PerformanceMark: base_config_1.TYPE_VALUE,
      PerformanceMarkOptions: base_config_1.TYPE,
      PerformanceMeasure: base_config_1.TYPE_VALUE,
      PerformanceMeasureOptions: base_config_1.TYPE,
      PerformanceObserver: base_config_1.TYPE_VALUE,
      PerformanceObserverCallback: base_config_1.TYPE,
      PerformanceObserverEntryList: base_config_1.TYPE_VALUE,
      PerformanceObserverInit: base_config_1.TYPE,
      PerformanceResourceTiming: base_config_1.TYPE_VALUE,
      PerformanceServerTiming: base_config_1.TYPE_VALUE,
      PermissionDescriptor: base_config_1.TYPE,
      PermissionName: base_config_1.TYPE,
      Permissions: base_config_1.TYPE_VALUE,
      PermissionState: base_config_1.TYPE,
      PermissionStatus: base_config_1.TYPE_VALUE,
      PermissionStatusEventMap: base_config_1.TYPE,
      PlaneLayout: base_config_1.TYPE,
      PredefinedColorSpace: base_config_1.TYPE,
      PremultiplyAlpha: base_config_1.TYPE,
      ProgressEvent: base_config_1.TYPE_VALUE,
      ProgressEventInit: base_config_1.TYPE,
      PromiseRejectionEvent: base_config_1.TYPE_VALUE,
      PromiseRejectionEventInit: base_config_1.TYPE,
      PushEncryptionKeyName: base_config_1.TYPE,
      PushEvent: base_config_1.TYPE_VALUE,
      PushEventInit: base_config_1.TYPE,
      PushManager: base_config_1.TYPE_VALUE,
      PushMessageData: base_config_1.TYPE_VALUE,
      PushMessageDataInit: base_config_1.TYPE,
      PushSubscription: base_config_1.TYPE_VALUE,
      PushSubscriptionJSON: base_config_1.TYPE,
      PushSubscriptionOptions: base_config_1.TYPE_VALUE,
      PushSubscriptionOptionsInit: base_config_1.TYPE,
      QueuingStrategy: base_config_1.TYPE,
      QueuingStrategyInit: base_config_1.TYPE,
      QueuingStrategySize: base_config_1.TYPE,
      ReadableByteStreamController: base_config_1.TYPE_VALUE,
      ReadableStream: base_config_1.TYPE_VALUE,
      ReadableStreamBYOBReader: base_config_1.TYPE_VALUE,
      ReadableStreamBYOBRequest: base_config_1.TYPE_VALUE,
      ReadableStreamController: base_config_1.TYPE,
      ReadableStreamDefaultController: base_config_1.TYPE_VALUE,
      ReadableStreamDefaultReader: base_config_1.TYPE_VALUE,
      ReadableStreamGenericReader: base_config_1.TYPE,
      ReadableStreamGetReaderOptions: base_config_1.TYPE,
      ReadableStreamIteratorOptions: base_config_1.TYPE,
      ReadableStreamReadDoneResult: base_config_1.TYPE,
      ReadableStreamReader: base_config_1.TYPE,
      ReadableStreamReaderMode: base_config_1.TYPE,
      ReadableStreamReadResult: base_config_1.TYPE,
      ReadableStreamReadValueResult: base_config_1.TYPE,
      ReadableStreamType: base_config_1.TYPE,
      ReadableWritablePair: base_config_1.TYPE,
      ReferrerPolicy: base_config_1.TYPE,
      RegistrationOptions: base_config_1.TYPE,
      Report: base_config_1.TYPE_VALUE,
      ReportBody: base_config_1.TYPE_VALUE,
      ReportingObserver: base_config_1.TYPE_VALUE,
      ReportingObserverCallback: base_config_1.TYPE,
      ReportingObserverOptions: base_config_1.TYPE,
      ReportList: base_config_1.TYPE,
      Request: base_config_1.TYPE_VALUE,
      RequestCache: base_config_1.TYPE,
      RequestCredentials: base_config_1.TYPE,
      RequestDestination: base_config_1.TYPE,
      RequestInfo: base_config_1.TYPE,
      RequestInit: base_config_1.TYPE,
      RequestMode: base_config_1.TYPE,
      RequestPriority: base_config_1.TYPE,
      RequestRedirect: base_config_1.TYPE,
      ResizeQuality: base_config_1.TYPE,
      Response: base_config_1.TYPE_VALUE,
      ResponseInit: base_config_1.TYPE,
      ResponseType: base_config_1.TYPE,
      RsaHashedImportParams: base_config_1.TYPE,
      RsaHashedKeyGenParams: base_config_1.TYPE,
      RsaKeyGenParams: base_config_1.TYPE,
      RsaOaepParams: base_config_1.TYPE,
      RsaOtherPrimesInfo: base_config_1.TYPE,
      RsaPssParams: base_config_1.TYPE,
      RTCEncodedAudioFrame: base_config_1.TYPE_VALUE,
      RTCEncodedAudioFrameMetadata: base_config_1.TYPE,
      RTCEncodedVideoFrame: base_config_1.TYPE_VALUE,
      RTCEncodedVideoFrameMetadata: base_config_1.TYPE,
      RTCEncodedVideoFrameType: base_config_1.TYPE,
      RTCRtpScriptTransformer: base_config_1.TYPE_VALUE,
      RTCTransformEvent: base_config_1.TYPE_VALUE,
      SecurityPolicyViolationEvent: base_config_1.TYPE_VALUE,
      SecurityPolicyViolationEventDisposition: base_config_1.TYPE,
      SecurityPolicyViolationEventInit: base_config_1.TYPE,
      ServiceWorker: base_config_1.TYPE_VALUE,
      ServiceWorkerContainer: base_config_1.TYPE_VALUE,
      ServiceWorkerContainerEventMap: base_config_1.TYPE,
      ServiceWorkerEventMap: base_config_1.TYPE,
      ServiceWorkerGlobalScope: base_config_1.TYPE_VALUE,
      ServiceWorkerGlobalScopeEventMap: base_config_1.TYPE,
      ServiceWorkerRegistration: base_config_1.TYPE_VALUE,
      ServiceWorkerRegistrationEventMap: base_config_1.TYPE,
      ServiceWorkerState: base_config_1.TYPE,
      ServiceWorkerUpdateViaCache: base_config_1.TYPE,
      SharedWorkerGlobalScope: base_config_1.TYPE_VALUE,
      SharedWorkerGlobalScopeEventMap: base_config_1.TYPE,
      StorageEstimate: base_config_1.TYPE,
      StorageManager: base_config_1.TYPE_VALUE,
      StreamPipeOptions: base_config_1.TYPE,
      StructuredSerializeOptions: base_config_1.TYPE,
      StylePropertyMapReadOnly: base_config_1.TYPE_VALUE,
      SubtleCrypto: base_config_1.TYPE_VALUE,
      TexImageSource: base_config_1.TYPE,
      TextDecodeOptions: base_config_1.TYPE,
      TextDecoder: base_config_1.TYPE_VALUE,
      TextDecoderCommon: base_config_1.TYPE,
      TextDecoderOptions: base_config_1.TYPE,
      TextDecoderStream: base_config_1.TYPE_VALUE,
      TextEncoder: base_config_1.TYPE_VALUE,
      TextEncoderCommon: base_config_1.TYPE,
      TextEncoderEncodeIntoResult: base_config_1.TYPE,
      TextEncoderStream: base_config_1.TYPE_VALUE,
      TextMetrics: base_config_1.TYPE_VALUE,
      TimerHandler: base_config_1.TYPE,
      Transferable: base_config_1.TYPE,
      TransferFunction: base_config_1.TYPE,
      Transformer: base_config_1.TYPE,
      TransformerFlushCallback: base_config_1.TYPE,
      TransformerStartCallback: base_config_1.TYPE,
      TransformerTransformCallback: base_config_1.TYPE,
      TransformStream: base_config_1.TYPE_VALUE,
      TransformStreamDefaultController: base_config_1.TYPE_VALUE,
      Uint32List: base_config_1.TYPE,
      UnderlyingByteSource: base_config_1.TYPE,
      UnderlyingDefaultSource: base_config_1.TYPE,
      UnderlyingSink: base_config_1.TYPE,
      UnderlyingSinkAbortCallback: base_config_1.TYPE,
      UnderlyingSinkCloseCallback: base_config_1.TYPE,
      UnderlyingSinkStartCallback: base_config_1.TYPE,
      UnderlyingSinkWriteCallback: base_config_1.TYPE,
      UnderlyingSource: base_config_1.TYPE,
      UnderlyingSourceCancelCallback: base_config_1.TYPE,
      UnderlyingSourcePullCallback: base_config_1.TYPE,
      UnderlyingSourceStartCallback: base_config_1.TYPE,
      URL: base_config_1.TYPE_VALUE,
      URLSearchParams: base_config_1.TYPE_VALUE,
      VideoColorPrimaries: base_config_1.TYPE,
      VideoColorSpace: base_config_1.TYPE_VALUE,
      VideoColorSpaceInit: base_config_1.TYPE,
      VideoConfiguration: base_config_1.TYPE,
      VideoDecoder: base_config_1.TYPE_VALUE,
      VideoDecoderConfig: base_config_1.TYPE,
      VideoDecoderEventMap: base_config_1.TYPE,
      VideoDecoderInit: base_config_1.TYPE,
      VideoDecoderSupport: base_config_1.TYPE,
      VideoEncoder: base_config_1.TYPE_VALUE,
      VideoEncoderBitrateMode: base_config_1.TYPE,
      VideoEncoderConfig: base_config_1.TYPE,
      VideoEncoderEncodeOptions: base_config_1.TYPE,
      VideoEncoderEventMap: base_config_1.TYPE,
      VideoEncoderInit: base_config_1.TYPE,
      VideoEncoderSupport: base_config_1.TYPE,
      VideoFrame: base_config_1.TYPE_VALUE,
      VideoFrameBufferInit: base_config_1.TYPE,
      VideoFrameCopyToOptions: base_config_1.TYPE,
      VideoFrameInit: base_config_1.TYPE,
      VideoFrameOutputCallback: base_config_1.TYPE,
      VideoMatrixCoefficients: base_config_1.TYPE,
      VideoPixelFormat: base_config_1.TYPE,
      VideoTransferCharacteristics: base_config_1.TYPE,
      VoidFunction: base_config_1.TYPE,
      WebAssembly: base_config_1.TYPE_VALUE,
      WebCodecsErrorCallback: base_config_1.TYPE,
      WEBGL_color_buffer_float: base_config_1.TYPE,
      WEBGL_compressed_texture_astc: base_config_1.TYPE,
      WEBGL_compressed_texture_etc: base_config_1.TYPE,
      WEBGL_compressed_texture_etc1: base_config_1.TYPE,
      WEBGL_compressed_texture_pvrtc: base_config_1.TYPE,
      WEBGL_compressed_texture_s3tc: base_config_1.TYPE,
      WEBGL_compressed_texture_s3tc_srgb: base_config_1.TYPE,
      WEBGL_debug_renderer_info: base_config_1.TYPE,
      WEBGL_debug_shaders: base_config_1.TYPE,
      WEBGL_depth_texture: base_config_1.TYPE,
      WEBGL_draw_buffers: base_config_1.TYPE,
      WEBGL_lose_context: base_config_1.TYPE,
      WEBGL_multi_draw: base_config_1.TYPE,
      WebGL2RenderingContext: base_config_1.TYPE_VALUE,
      WebGL2RenderingContextBase: base_config_1.TYPE,
      WebGL2RenderingContextOverloads: base_config_1.TYPE,
      WebGLActiveInfo: base_config_1.TYPE_VALUE,
      WebGLBuffer: base_config_1.TYPE_VALUE,
      WebGLContextAttributes: base_config_1.TYPE,
      WebGLContextEvent: base_config_1.TYPE_VALUE,
      WebGLContextEventInit: base_config_1.TYPE,
      WebGLFramebuffer: base_config_1.TYPE_VALUE,
      WebGLPowerPreference: base_config_1.TYPE,
      WebGLProgram: base_config_1.TYPE_VALUE,
      WebGLQuery: base_config_1.TYPE_VALUE,
      WebGLRenderbuffer: base_config_1.TYPE_VALUE,
      WebGLRenderingContext: base_config_1.TYPE_VALUE,
      WebGLRenderingContextBase: base_config_1.TYPE,
      WebGLRenderingContextOverloads: base_config_1.TYPE,
      WebGLSampler: base_config_1.TYPE_VALUE,
      WebGLShader: base_config_1.TYPE_VALUE,
      WebGLShaderPrecisionFormat: base_config_1.TYPE_VALUE,
      WebGLSync: base_config_1.TYPE_VALUE,
      WebGLTexture: base_config_1.TYPE_VALUE,
      WebGLTransformFeedback: base_config_1.TYPE_VALUE,
      WebGLUniformLocation: base_config_1.TYPE_VALUE,
      WebGLVertexArrayObject: base_config_1.TYPE_VALUE,
      WebGLVertexArrayObjectOES: base_config_1.TYPE,
      WebSocket: base_config_1.TYPE_VALUE,
      WebSocketEventMap: base_config_1.TYPE,
      WebTransport: base_config_1.TYPE_VALUE,
      WebTransportBidirectionalStream: base_config_1.TYPE_VALUE,
      WebTransportCloseInfo: base_config_1.TYPE,
      WebTransportCongestionControl: base_config_1.TYPE,
      WebTransportDatagramDuplexStream: base_config_1.TYPE_VALUE,
      WebTransportError: base_config_1.TYPE_VALUE,
      WebTransportErrorOptions: base_config_1.TYPE,
      WebTransportErrorSource: base_config_1.TYPE,
      WebTransportHash: base_config_1.TYPE,
      WebTransportOptions: base_config_1.TYPE,
      WebTransportSendStreamOptions: base_config_1.TYPE,
      WindowClient: base_config_1.TYPE_VALUE,
      WindowOrWorkerGlobalScope: base_config_1.TYPE,
      Worker: base_config_1.TYPE_VALUE,
      WorkerEventMap: base_config_1.TYPE,
      WorkerGlobalScope: base_config_1.TYPE_VALUE,
      WorkerGlobalScopeEventMap: base_config_1.TYPE,
      WorkerLocation: base_config_1.TYPE_VALUE,
      WorkerNavigator: base_config_1.TYPE_VALUE,
      WorkerOptions: base_config_1.TYPE,
      WorkerType: base_config_1.TYPE,
      WritableStream: base_config_1.TYPE_VALUE,
      WritableStreamDefaultController: base_config_1.TYPE_VALUE,
      WritableStreamDefaultWriter: base_config_1.TYPE_VALUE,
      WriteCommandType: base_config_1.TYPE,
      WriteParams: base_config_1.TYPE,
      XMLHttpRequest: base_config_1.TYPE_VALUE,
      XMLHttpRequestBodyInit: base_config_1.TYPE,
      XMLHttpRequestEventMap: base_config_1.TYPE,
      XMLHttpRequestEventTarget: base_config_1.TYPE_VALUE,
      XMLHttpRequestEventTargetEventMap: base_config_1.TYPE,
      XMLHttpRequestResponseType: base_config_1.TYPE,
      XMLHttpRequestUpload: base_config_1.TYPE_VALUE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.asynciterable.js
var require_webworker_asynciterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.asynciterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.webworker_asynciterable = void 0;
    var base_config_1 = require_base_config();
    exports.webworker_asynciterable = {
      FileSystemDirectoryHandle: base_config_1.TYPE,
      FileSystemDirectoryHandleAsyncIterator: base_config_1.TYPE,
      ReadableStream: base_config_1.TYPE,
      ReadableStreamAsyncIterator: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.iterable.js
var require_webworker_iterable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/webworker.iterable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.webworker_iterable = void 0;
    var base_config_1 = require_base_config();
    exports.webworker_iterable = {
      AbortSignal: base_config_1.TYPE,
      Cache: base_config_1.TYPE,
      CanvasPath: base_config_1.TYPE,
      CanvasPathDrawingStyles: base_config_1.TYPE,
      CSSNumericArray: base_config_1.TYPE,
      CSSTransformValue: base_config_1.TYPE,
      CSSUnparsedValue: base_config_1.TYPE,
      DOMStringList: base_config_1.TYPE,
      FileList: base_config_1.TYPE,
      FontFaceSet: base_config_1.TYPE,
      FormData: base_config_1.TYPE,
      FormDataIterator: base_config_1.TYPE,
      Headers: base_config_1.TYPE,
      HeadersIterator: base_config_1.TYPE,
      IDBDatabase: base_config_1.TYPE,
      IDBObjectStore: base_config_1.TYPE,
      MessageEvent: base_config_1.TYPE,
      StylePropertyMapReadOnly: base_config_1.TYPE,
      StylePropertyMapReadOnlyIterator: base_config_1.TYPE,
      SubtleCrypto: base_config_1.TYPE,
      URLSearchParams: base_config_1.TYPE,
      URLSearchParamsIterator: base_config_1.TYPE,
      WEBGL_draw_buffers: base_config_1.TYPE,
      WEBGL_multi_draw: base_config_1.TYPE,
      WebGL2RenderingContextBase: base_config_1.TYPE,
      WebGL2RenderingContextOverloads: base_config_1.TYPE,
      WebGLRenderingContextBase: base_config_1.TYPE,
      WebGLRenderingContextOverloads: base_config_1.TYPE
    };
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lib = void 0;
    var decorators_1 = require_decorators();
    var decorators_legacy_1 = require_decorators_legacy();
    var dom_1 = require_dom();
    var dom_asynciterable_1 = require_dom_asynciterable();
    var dom_iterable_1 = require_dom_iterable();
    var es2015_1 = require_es2015();
    var es2015_collection_1 = require_es2015_collection();
    var es2015_core_1 = require_es2015_core();
    var es2015_generator_1 = require_es2015_generator();
    var es2015_iterable_1 = require_es2015_iterable();
    var es2015_promise_1 = require_es2015_promise();
    var es2015_proxy_1 = require_es2015_proxy();
    var es2015_reflect_1 = require_es2015_reflect();
    var es2015_symbol_1 = require_es2015_symbol();
    var es2015_symbol_wellknown_1 = require_es2015_symbol_wellknown();
    var es2016_1 = require_es2016();
    var es2016_array_include_1 = require_es2016_array_include();
    var es2016_full_1 = require_es2016_full();
    var es2016_intl_1 = require_es2016_intl();
    var es2017_1 = require_es2017();
    var es2017_date_1 = require_es2017_date();
    var es2017_full_1 = require_es2017_full();
    var es2017_intl_1 = require_es2017_intl();
    var es2017_object_1 = require_es2017_object();
    var es2017_sharedmemory_1 = require_es2017_sharedmemory();
    var es2017_string_1 = require_es2017_string();
    var es2017_typedarrays_1 = require_es2017_typedarrays();
    var es2018_1 = require_es2018();
    var es2018_asyncgenerator_1 = require_es2018_asyncgenerator();
    var es2018_asynciterable_1 = require_es2018_asynciterable();
    var es2018_full_1 = require_es2018_full();
    var es2018_intl_1 = require_es2018_intl();
    var es2018_promise_1 = require_es2018_promise();
    var es2018_regexp_1 = require_es2018_regexp();
    var es2019_1 = require_es2019();
    var es2019_array_1 = require_es2019_array();
    var es2019_full_1 = require_es2019_full();
    var es2019_intl_1 = require_es2019_intl();
    var es2019_object_1 = require_es2019_object();
    var es2019_string_1 = require_es2019_string();
    var es2019_symbol_1 = require_es2019_symbol();
    var es2020_1 = require_es2020();
    var es2020_bigint_1 = require_es2020_bigint();
    var es2020_date_1 = require_es2020_date();
    var es2020_full_1 = require_es2020_full();
    var es2020_intl_1 = require_es2020_intl();
    var es2020_number_1 = require_es2020_number();
    var es2020_promise_1 = require_es2020_promise();
    var es2020_sharedmemory_1 = require_es2020_sharedmemory();
    var es2020_string_1 = require_es2020_string();
    var es2020_symbol_wellknown_1 = require_es2020_symbol_wellknown();
    var es2021_1 = require_es2021();
    var es2021_full_1 = require_es2021_full();
    var es2021_intl_1 = require_es2021_intl();
    var es2021_promise_1 = require_es2021_promise();
    var es2021_string_1 = require_es2021_string();
    var es2021_weakref_1 = require_es2021_weakref();
    var es2022_1 = require_es2022();
    var es2022_array_1 = require_es2022_array();
    var es2022_error_1 = require_es2022_error();
    var es2022_full_1 = require_es2022_full();
    var es2022_intl_1 = require_es2022_intl();
    var es2022_object_1 = require_es2022_object();
    var es2022_regexp_1 = require_es2022_regexp();
    var es2022_sharedmemory_1 = require_es2022_sharedmemory();
    var es2022_string_1 = require_es2022_string();
    var es2023_1 = require_es2023();
    var es2023_array_1 = require_es2023_array();
    var es2023_collection_1 = require_es2023_collection();
    var es2023_full_1 = require_es2023_full();
    var es2023_intl_1 = require_es2023_intl();
    var es5_1 = require_es5();
    var es6_1 = require_es6();
    var es7_1 = require_es7();
    var esnext_1 = require_esnext();
    var esnext_array_1 = require_esnext_array();
    var esnext_asynciterable_1 = require_esnext_asynciterable();
    var esnext_bigint_1 = require_esnext_bigint();
    var esnext_collection_1 = require_esnext_collection();
    var esnext_decorators_1 = require_esnext_decorators();
    var esnext_disposable_1 = require_esnext_disposable();
    var esnext_full_1 = require_esnext_full();
    var esnext_intl_1 = require_esnext_intl();
    var esnext_iterator_1 = require_esnext_iterator();
    var esnext_object_1 = require_esnext_object();
    var esnext_promise_1 = require_esnext_promise();
    var esnext_regexp_1 = require_esnext_regexp();
    var esnext_string_1 = require_esnext_string();
    var esnext_symbol_1 = require_esnext_symbol();
    var esnext_weakref_1 = require_esnext_weakref();
    var lib_1 = require_lib2();
    var scripthost_1 = require_scripthost();
    var webworker_1 = require_webworker();
    var webworker_asynciterable_1 = require_webworker_asynciterable();
    var webworker_importscripts_1 = require_webworker_importscripts();
    var webworker_iterable_1 = require_webworker_iterable();
    var lib = {
      decorators: decorators_1.decorators,
      "decorators.legacy": decorators_legacy_1.decorators_legacy,
      dom: dom_1.dom,
      "dom.asynciterable": dom_asynciterable_1.dom_asynciterable,
      "dom.iterable": dom_iterable_1.dom_iterable,
      es2015: es2015_1.es2015,
      "es2015.collection": es2015_collection_1.es2015_collection,
      "es2015.core": es2015_core_1.es2015_core,
      "es2015.generator": es2015_generator_1.es2015_generator,
      "es2015.iterable": es2015_iterable_1.es2015_iterable,
      "es2015.promise": es2015_promise_1.es2015_promise,
      "es2015.proxy": es2015_proxy_1.es2015_proxy,
      "es2015.reflect": es2015_reflect_1.es2015_reflect,
      "es2015.symbol": es2015_symbol_1.es2015_symbol,
      "es2015.symbol.wellknown": es2015_symbol_wellknown_1.es2015_symbol_wellknown,
      es2016: es2016_1.es2016,
      "es2016.array.include": es2016_array_include_1.es2016_array_include,
      "es2016.full": es2016_full_1.es2016_full,
      "es2016.intl": es2016_intl_1.es2016_intl,
      es2017: es2017_1.es2017,
      "es2017.date": es2017_date_1.es2017_date,
      "es2017.full": es2017_full_1.es2017_full,
      "es2017.intl": es2017_intl_1.es2017_intl,
      "es2017.object": es2017_object_1.es2017_object,
      "es2017.sharedmemory": es2017_sharedmemory_1.es2017_sharedmemory,
      "es2017.string": es2017_string_1.es2017_string,
      "es2017.typedarrays": es2017_typedarrays_1.es2017_typedarrays,
      es2018: es2018_1.es2018,
      "es2018.asyncgenerator": es2018_asyncgenerator_1.es2018_asyncgenerator,
      "es2018.asynciterable": es2018_asynciterable_1.es2018_asynciterable,
      "es2018.full": es2018_full_1.es2018_full,
      "es2018.intl": es2018_intl_1.es2018_intl,
      "es2018.promise": es2018_promise_1.es2018_promise,
      "es2018.regexp": es2018_regexp_1.es2018_regexp,
      es2019: es2019_1.es2019,
      "es2019.array": es2019_array_1.es2019_array,
      "es2019.full": es2019_full_1.es2019_full,
      "es2019.intl": es2019_intl_1.es2019_intl,
      "es2019.object": es2019_object_1.es2019_object,
      "es2019.string": es2019_string_1.es2019_string,
      "es2019.symbol": es2019_symbol_1.es2019_symbol,
      es2020: es2020_1.es2020,
      "es2020.bigint": es2020_bigint_1.es2020_bigint,
      "es2020.date": es2020_date_1.es2020_date,
      "es2020.full": es2020_full_1.es2020_full,
      "es2020.intl": es2020_intl_1.es2020_intl,
      "es2020.number": es2020_number_1.es2020_number,
      "es2020.promise": es2020_promise_1.es2020_promise,
      "es2020.sharedmemory": es2020_sharedmemory_1.es2020_sharedmemory,
      "es2020.string": es2020_string_1.es2020_string,
      "es2020.symbol.wellknown": es2020_symbol_wellknown_1.es2020_symbol_wellknown,
      es2021: es2021_1.es2021,
      "es2021.full": es2021_full_1.es2021_full,
      "es2021.intl": es2021_intl_1.es2021_intl,
      "es2021.promise": es2021_promise_1.es2021_promise,
      "es2021.string": es2021_string_1.es2021_string,
      "es2021.weakref": es2021_weakref_1.es2021_weakref,
      es2022: es2022_1.es2022,
      "es2022.array": es2022_array_1.es2022_array,
      "es2022.error": es2022_error_1.es2022_error,
      "es2022.full": es2022_full_1.es2022_full,
      "es2022.intl": es2022_intl_1.es2022_intl,
      "es2022.object": es2022_object_1.es2022_object,
      "es2022.regexp": es2022_regexp_1.es2022_regexp,
      "es2022.sharedmemory": es2022_sharedmemory_1.es2022_sharedmemory,
      "es2022.string": es2022_string_1.es2022_string,
      es2023: es2023_1.es2023,
      "es2023.array": es2023_array_1.es2023_array,
      "es2023.collection": es2023_collection_1.es2023_collection,
      "es2023.full": es2023_full_1.es2023_full,
      "es2023.intl": es2023_intl_1.es2023_intl,
      es5: es5_1.es5,
      es6: es6_1.es6,
      es7: es7_1.es7,
      esnext: esnext_1.esnext,
      "esnext.array": esnext_array_1.esnext_array,
      "esnext.asynciterable": esnext_asynciterable_1.esnext_asynciterable,
      "esnext.bigint": esnext_bigint_1.esnext_bigint,
      "esnext.collection": esnext_collection_1.esnext_collection,
      "esnext.decorators": esnext_decorators_1.esnext_decorators,
      "esnext.disposable": esnext_disposable_1.esnext_disposable,
      "esnext.full": esnext_full_1.esnext_full,
      "esnext.intl": esnext_intl_1.esnext_intl,
      "esnext.iterator": esnext_iterator_1.esnext_iterator,
      "esnext.object": esnext_object_1.esnext_object,
      "esnext.promise": esnext_promise_1.esnext_promise,
      "esnext.regexp": esnext_regexp_1.esnext_regexp,
      "esnext.string": esnext_string_1.esnext_string,
      "esnext.symbol": esnext_symbol_1.esnext_symbol,
      "esnext.weakref": esnext_weakref_1.esnext_weakref,
      lib: lib_1.lib,
      scripthost: scripthost_1.scripthost,
      webworker: webworker_1.webworker,
      "webworker.asynciterable": webworker_asynciterable_1.webworker_asynciterable,
      "webworker.importscripts": webworker_importscripts_1.webworker_importscripts,
      "webworker.iterable": webworker_iterable_1.webworker_iterable
    };
    exports.lib = lib;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Reference.js
var require_Reference = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Reference.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReferenceTypeFlag = exports.ReferenceFlag = exports.Reference = void 0;
    var ID_1 = require_ID();
    var ReferenceFlag;
    (function(ReferenceFlag2) {
      ReferenceFlag2[ReferenceFlag2["Read"] = 1] = "Read";
      ReferenceFlag2[ReferenceFlag2["Write"] = 2] = "Write";
      ReferenceFlag2[ReferenceFlag2["ReadWrite"] = 3] = "ReadWrite";
    })(ReferenceFlag || (exports.ReferenceFlag = ReferenceFlag = {}));
    var generator = (0, ID_1.createIdGenerator)();
    var ReferenceTypeFlag;
    (function(ReferenceTypeFlag2) {
      ReferenceTypeFlag2[ReferenceTypeFlag2["Value"] = 1] = "Value";
      ReferenceTypeFlag2[ReferenceTypeFlag2["Type"] = 2] = "Type";
    })(ReferenceTypeFlag || (exports.ReferenceTypeFlag = ReferenceTypeFlag = {}));
    var Reference = class {
      /**
       * A unique ID for this instance - primarily used to help debugging and testing
       */
      $id = generator();
      /**
       * The read-write mode of the reference.
       */
      #flag;
      /**
       * Reference to the enclosing Scope.
       * @public
       */
      from;
      /**
       * Identifier syntax node.
       * @public
       */
      identifier;
      /**
       * `true` if this writing reference is a variable initializer or a default value.
       * @public
       */
      init;
      maybeImplicitGlobal;
      /**
       * The {@link Variable} object that this reference refers to. If such variable was not defined, this is `null`.
       * @public
       */
      resolved;
      /**
       * If reference is writeable, this is the node being written to it.
       * @public
       */
      writeExpr;
      /**
       * In some cases, a reference may be a type, value or both a type and value reference.
       */
      #referenceType;
      constructor(identifier, scope, flag, writeExpr, maybeImplicitGlobal, init, referenceType = ReferenceTypeFlag.Value) {
        this.identifier = identifier;
        this.from = scope;
        this.resolved = null;
        this.#flag = flag;
        if (this.isWrite()) {
          this.writeExpr = writeExpr;
          this.init = init;
        }
        this.maybeImplicitGlobal = maybeImplicitGlobal;
        this.#referenceType = referenceType;
      }
      /**
       * True if this reference can reference types
       */
      get isTypeReference() {
        return (this.#referenceType & ReferenceTypeFlag.Type) !== 0;
      }
      /**
       * True if this reference can reference values
       */
      get isValueReference() {
        return (this.#referenceType & ReferenceTypeFlag.Value) !== 0;
      }
      /**
       * Whether the reference is writeable.
       * @public
       */
      isWrite() {
        return !!(this.#flag & ReferenceFlag.Write);
      }
      /**
       * Whether the reference is readable.
       * @public
       */
      isRead() {
        return !!(this.#flag & ReferenceFlag.Read);
      }
      /**
       * Whether the reference is read-only.
       * @public
       */
      isReadOnly() {
        return this.#flag === ReferenceFlag.Read;
      }
      /**
       * Whether the reference is write-only.
       * @public
       */
      isWriteOnly() {
        return this.#flag === ReferenceFlag.Write;
      }
      /**
       * Whether the reference is read-write.
       * @public
       */
      isReadWrite() {
        return this.#flag === ReferenceFlag.ReadWrite;
      }
    };
    exports.Reference = Reference;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/VariableBase.js
var require_VariableBase = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/VariableBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VariableBase = void 0;
    var ID_1 = require_ID();
    var generator = (0, ID_1.createIdGenerator)();
    var VariableBase = class {
      /**
       * A unique ID for this instance - primarily used to help debugging and testing
       */
      $id = generator();
      /**
       * The array of the definitions of this variable.
       * @public
       */
      defs = [];
      /**
       * True if the variable is considered used for the purposes of `no-unused-vars`, false otherwise.
       * @public
       */
      eslintUsed = false;
      /**
       * The array of `Identifier` nodes which define this variable.
       * If this variable is redeclared, this array includes two or more nodes.
       * @public
       */
      identifiers = [];
      /**
       * The variable name, as given in the source code.
       * @public
       */
      name;
      /**
       * List of {@link Reference} of this variable (excluding parameter entries)  in its defining scope and all nested scopes.
       * For defining occurrences only see {@link Variable#defs}.
       * @public
       */
      references = [];
      /**
       * Reference to the enclosing Scope.
       */
      scope;
      constructor(name2, scope) {
        this.name = name2;
        this.scope = scope;
      }
    };
    exports.VariableBase = VariableBase;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/ESLintScopeVariable.js
var require_ESLintScopeVariable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/ESLintScopeVariable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ESLintScopeVariable = void 0;
    var VariableBase_1 = require_VariableBase();
    var ESLintScopeVariable = class extends VariableBase_1.VariableBase {
      /**
       * Written to by ESLint.
       * If this key exists, this variable is a global variable added by ESLint.
       * If this is `true`, this variable can be assigned arbitrary values.
       * If this is `false`, this variable is readonly.
       */
      writeable;
      // note that this isn't a typo - ESlint uses this spelling here
      /**
       * Written to by ESLint.
       * This property is undefined if there are no globals directive comments.
       * The array of globals directive comments which defined this global variable in the source code file.
       */
      eslintExplicitGlobal;
      /**
       * Written to by ESLint.
       * The configured value in config files. This can be different from `variable.writeable` if there are globals directive comments.
       */
      eslintImplicitGlobalSetting;
      /**
       * Written to by ESLint.
       * If this key exists, it is a global variable added by ESLint.
       * If `true`, this global variable was defined by a globals directive comment in the source code file.
       */
      eslintExplicitGlobalComments;
    };
    exports.ESLintScopeVariable = ESLintScopeVariable;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/ImplicitLibVariable.js
var require_ImplicitLibVariable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/ImplicitLibVariable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImplicitLibVariable = void 0;
    var ESLintScopeVariable_1 = require_ESLintScopeVariable();
    var ImplicitLibVariable = class extends ESLintScopeVariable_1.ESLintScopeVariable {
      /**
       * `true` if the variable is valid in a type context, false otherwise
       */
      isTypeVariable;
      /**
       * `true` if the variable is valid in a value context, false otherwise
       */
      isValueVariable;
      constructor(scope, name2, { eslintImplicitGlobalSetting, isTypeVariable, isValueVariable, writeable }) {
        super(name2, scope);
        this.isTypeVariable = isTypeVariable ?? false;
        this.isValueVariable = isValueVariable ?? false;
        this.writeable = writeable ?? false;
        this.eslintImplicitGlobalSetting = eslintImplicitGlobalSetting ?? "readonly";
      }
    };
    exports.ImplicitLibVariable = ImplicitLibVariable;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/Variable.js
var require_Variable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/Variable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Variable = void 0;
    var VariableBase_1 = require_VariableBase();
    var Variable = class extends VariableBase_1.VariableBase {
      /**
       * `true` if the variable is valid in a type context, false otherwise
       * @public
       */
      get isTypeVariable() {
        if (this.defs.length === 0) {
          return true;
        }
        return this.defs.some((def) => def.isTypeDefinition);
      }
      /**
       * `true` if the variable is valid in a value context, false otherwise
       * @public
       */
      get isValueVariable() {
        if (this.defs.length === 0) {
          return true;
        }
        return this.defs.some((def) => def.isVariableDefinition);
      }
    };
    exports.Variable = Variable;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/index.js
var require_variable = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/variable/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Variable = exports.ImplicitLibVariable = exports.ESLintScopeVariable = void 0;
    var ESLintScopeVariable_1 = require_ESLintScopeVariable();
    Object.defineProperty(exports, "ESLintScopeVariable", { enumerable: true, get: function() {
      return ESLintScopeVariable_1.ESLintScopeVariable;
    } });
    var ImplicitLibVariable_1 = require_ImplicitLibVariable();
    Object.defineProperty(exports, "ImplicitLibVariable", { enumerable: true, get: function() {
      return ImplicitLibVariable_1.ImplicitLibVariable;
    } });
    var Variable_1 = require_Variable();
    Object.defineProperty(exports, "Variable", { enumerable: true, get: function() {
      return Variable_1.Variable;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ScopeType.js
var require_ScopeType = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ScopeType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScopeType = void 0;
    var ScopeType;
    (function(ScopeType2) {
      ScopeType2["block"] = "block";
      ScopeType2["catch"] = "catch";
      ScopeType2["class"] = "class";
      ScopeType2["classFieldInitializer"] = "class-field-initializer";
      ScopeType2["classStaticBlock"] = "class-static-block";
      ScopeType2["conditionalType"] = "conditionalType";
      ScopeType2["for"] = "for";
      ScopeType2["function"] = "function";
      ScopeType2["functionExpressionName"] = "function-expression-name";
      ScopeType2["functionType"] = "functionType";
      ScopeType2["global"] = "global";
      ScopeType2["mappedType"] = "mappedType";
      ScopeType2["module"] = "module";
      ScopeType2["switch"] = "switch";
      ScopeType2["tsEnum"] = "tsEnum";
      ScopeType2["tsModule"] = "tsModule";
      ScopeType2["type"] = "type";
      ScopeType2["with"] = "with";
    })(ScopeType || (exports.ScopeType = ScopeType = {}));
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ScopeBase.js
var require_ScopeBase = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ScopeBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScopeBase = void 0;
    var types_1 = require_dist();
    var assert_1 = require_assert();
    var definition_1 = require_definition();
    var ID_1 = require_ID();
    var Reference_1 = require_Reference();
    var variable_1 = require_variable();
    var ScopeType_1 = require_ScopeType();
    function isStrictScope(scope, block, isMethodDefinition) {
      var _a;
      let body;
      if ((_a = scope.upper) == null ? void 0 : _a.isStrict) {
        return true;
      }
      if (isMethodDefinition) {
        return true;
      }
      if (scope.type === ScopeType_1.ScopeType.class || scope.type === ScopeType_1.ScopeType.conditionalType || scope.type === ScopeType_1.ScopeType.functionType || scope.type === ScopeType_1.ScopeType.mappedType || scope.type === ScopeType_1.ScopeType.module || scope.type === ScopeType_1.ScopeType.tsEnum || scope.type === ScopeType_1.ScopeType.tsModule || scope.type === ScopeType_1.ScopeType.type) {
        return true;
      }
      if (scope.type === ScopeType_1.ScopeType.block || scope.type === ScopeType_1.ScopeType.switch) {
        return false;
      }
      if (scope.type === ScopeType_1.ScopeType.function) {
        const functionBody = block;
        switch (functionBody.type) {
          case types_1.AST_NODE_TYPES.ArrowFunctionExpression:
            if (functionBody.body.type !== types_1.AST_NODE_TYPES.BlockStatement) {
              return false;
            }
            body = functionBody.body;
            break;
          case types_1.AST_NODE_TYPES.Program:
            body = functionBody;
            break;
          default:
            body = functionBody.body;
        }
        if (!body) {
          return false;
        }
      } else if (scope.type === ScopeType_1.ScopeType.global) {
        body = block;
      } else {
        return false;
      }
      for (const stmt of body.body) {
        if (stmt.type !== types_1.AST_NODE_TYPES.ExpressionStatement) {
          break;
        }
        if (stmt.directive === "use strict") {
          return true;
        }
        const expr = stmt.expression;
        if (expr.type !== types_1.AST_NODE_TYPES.Literal) {
          break;
        }
        if (expr.raw === '"use strict"' || expr.raw === "'use strict'") {
          return true;
        }
        if (expr.value === "use strict") {
          return true;
        }
      }
      return false;
    }
    function registerScope(scopeManager, scope) {
      scopeManager.scopes.push(scope);
      const scopes = scopeManager.nodeToScope.get(scope.block);
      if (scopes) {
        scopes.push(scope);
      } else {
        scopeManager.nodeToScope.set(scope.block, [scope]);
      }
    }
    var generator = (0, ID_1.createIdGenerator)();
    var VARIABLE_SCOPE_TYPES = /* @__PURE__ */ new Set([
      ScopeType_1.ScopeType.classFieldInitializer,
      ScopeType_1.ScopeType.classStaticBlock,
      ScopeType_1.ScopeType.function,
      ScopeType_1.ScopeType.global,
      ScopeType_1.ScopeType.module,
      ScopeType_1.ScopeType.tsModule
    ]);
    var ScopeBase = class {
      /**
       * A unique ID for this instance - primarily used to help debugging and testing
       */
      $id = generator();
      /**
       * The AST node which created this scope.
       * @public
       */
      block;
      /**
       * The array of child scopes. This does not include grandchild scopes.
       * @public
       */
      childScopes = [];
      /**
       * A map of the variables for each node in this scope.
       * This is map is a pointer to the one in the parent ScopeManager instance
       */
      #declaredVariables;
      /**
       * Generally, through the lexical scoping of JS you can always know which variable an identifier in the source code
       * refers to. There are a few exceptions to this rule. With `global` and `with` scopes you can only decide at runtime
       * which variable a reference refers to.
       * All those scopes are considered "dynamic".
       */
      #dynamic;
      /**
       * Whether this scope is created by a FunctionExpression.
       * @public
       */
      functionExpressionScope = false;
      /**
       * Whether 'use strict' is in effect in this scope.
       * @public
       */
      isStrict;
      /**
       * List of {@link Reference}s that are left to be resolved (i.e. which
       * need to be linked to the variable they refer to).
       */
      leftToResolve = [];
      /**
       * Any variable {@link Reference} found in this scope.
       * This includes occurrences of local variables as well as variables from parent scopes (including the global scope).
       * For local variables this also includes defining occurrences (like in a 'var' statement).
       * In a 'function' scope this does not include the occurrences of the formal parameter in the parameter list.
       * @public
       */
      references = [];
      /**
       * The map from variable names to variable objects.
       * @public
       */
      set = /* @__PURE__ */ new Map();
      /**
       * The {@link Reference}s that are not resolved with this scope.
       * @public
       */
      through = [];
      type;
      /**
       * Reference to the parent {@link Scope}.
       * @public
       */
      upper;
      /**
       * The scoped {@link Variable}s of this scope.
       * In the case of a 'function' scope this includes the automatic argument `arguments` as its first element, as well
       * as all further formal arguments.
       * This does not include variables which are defined in child scopes.
       * @public
       */
      variables = [];
      /**
       * For scopes that can contain variable declarations, this is a self-reference.
       * For other scope types this is the *variableScope* value of the parent scope.
       * @public
       */
      #dynamicCloseRef = (ref) => {
        let current = this;
        do {
          current.through.push(ref);
          current = current.upper;
        } while (current);
      };
      #globalCloseRef = (ref, scopeManager) => {
        if (this.shouldStaticallyCloseForGlobal(ref, scopeManager)) {
          this.#staticCloseRef(ref);
        } else {
          this.#dynamicCloseRef(ref);
        }
      };
      #staticCloseRef = (ref) => {
        const resolve = () => {
          const name2 = ref.identifier.name;
          const variable = this.set.get(name2);
          if (!variable) {
            return false;
          }
          if (!this.isValidResolution(ref, variable)) {
            return false;
          }
          const isValidTypeReference = ref.isTypeReference && variable.isTypeVariable;
          const isValidValueReference = ref.isValueReference && variable.isValueVariable;
          if (!isValidTypeReference && !isValidValueReference) {
            return false;
          }
          variable.references.push(ref);
          ref.resolved = variable;
          return true;
        };
        if (!resolve()) {
          this.delegateToUpperScope(ref);
        }
      };
      variableScope;
      constructor(scopeManager, type, upperScope, block, isMethodDefinition) {
        const upperScopeAsScopeBase = upperScope;
        this.type = type;
        this.#dynamic = this.type === ScopeType_1.ScopeType.global || this.type === ScopeType_1.ScopeType.with;
        this.block = block;
        this.variableScope = this.isVariableScope() ? this : (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          upperScopeAsScopeBase.variableScope
        );
        this.upper = upperScope;
        this.isStrict = isStrictScope(this, block, isMethodDefinition);
        upperScopeAsScopeBase == null ? void 0 : upperScopeAsScopeBase.childScopes.push(this);
        this.#declaredVariables = scopeManager.declaredVariables;
        registerScope(scopeManager, this);
      }
      isVariableScope() {
        return VARIABLE_SCOPE_TYPES.has(this.type);
      }
      shouldStaticallyCloseForGlobal(ref, scopeManager) {
        const name2 = ref.identifier.name;
        const variable = this.set.get(name2);
        if (!variable) {
          return false;
        }
        if (scopeManager.isModule()) {
          return true;
        }
        const defs = variable.defs;
        return defs.length > 0 && defs.every((def) => {
          if (def.type === definition_1.DefinitionType.Variable && def.parent.kind === "var") {
            return false;
          }
          return true;
        });
      }
      close(scopeManager) {
        let closeRef;
        if (this.shouldStaticallyClose()) {
          closeRef = this.#staticCloseRef;
        } else if (this.type !== "global") {
          closeRef = this.#dynamicCloseRef;
        } else {
          closeRef = this.#globalCloseRef;
        }
        (0, assert_1.assert)(this.leftToResolve);
        this.leftToResolve.forEach((ref) => closeRef(ref, scopeManager));
        this.leftToResolve = null;
        return this.upper;
      }
      shouldStaticallyClose() {
        return !this.#dynamic;
      }
      /**
       * To override by function scopes.
       * References in default parameters isn't resolved to variables which are in their function body.
       */
      defineVariable(nameOrVariable, set, variables, node, def) {
        const name2 = typeof nameOrVariable === "string" ? nameOrVariable : nameOrVariable.name;
        let variable = set.get(name2);
        if (!variable) {
          variable = typeof nameOrVariable === "string" ? new variable_1.Variable(name2, this) : nameOrVariable;
          set.set(name2, variable);
          variables.push(variable);
        }
        if (def) {
          variable.defs.push(def);
          this.addDeclaredVariablesOfNode(variable, def.node);
          this.addDeclaredVariablesOfNode(variable, def.parent);
        }
        if (node) {
          variable.identifiers.push(node);
        }
      }
      delegateToUpperScope(ref) {
        var _a, _b;
        (_b = (_a = this.upper) == null ? void 0 : _a.leftToResolve) == null ? void 0 : _b.push(ref);
        this.through.push(ref);
      }
      isValidResolution(_ref, _variable) {
        return true;
      }
      addDeclaredVariablesOfNode(variable, node) {
        if (node == null) {
          return;
        }
        let variables = this.#declaredVariables.get(node);
        if (variables == null) {
          variables = [];
          this.#declaredVariables.set(node, variables);
        }
        if (!variables.includes(variable)) {
          variables.push(variable);
        }
      }
      defineIdentifier(node, def) {
        this.defineVariable(node.name, this.set, this.variables, node, def);
      }
      defineLiteralIdentifier(node, def) {
        this.defineVariable(node.value, this.set, this.variables, null, def);
      }
      referenceDualValueType(node) {
        var _a;
        const ref = new Reference_1.Reference(node, this, Reference_1.ReferenceFlag.Read, null, null, false, Reference_1.ReferenceTypeFlag.Type | Reference_1.ReferenceTypeFlag.Value);
        this.references.push(ref);
        (_a = this.leftToResolve) == null ? void 0 : _a.push(ref);
      }
      referenceType(node) {
        var _a;
        const ref = new Reference_1.Reference(node, this, Reference_1.ReferenceFlag.Read, null, null, false, Reference_1.ReferenceTypeFlag.Type);
        this.references.push(ref);
        (_a = this.leftToResolve) == null ? void 0 : _a.push(ref);
      }
      referenceValue(node, assign = Reference_1.ReferenceFlag.Read, writeExpr, maybeImplicitGlobal, init = false) {
        var _a;
        const ref = new Reference_1.Reference(node, this, assign, writeExpr, maybeImplicitGlobal, init, Reference_1.ReferenceTypeFlag.Value);
        this.references.push(ref);
        (_a = this.leftToResolve) == null ? void 0 : _a.push(ref);
      }
    };
    exports.ScopeBase = ScopeBase;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/BlockScope.js
var require_BlockScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/BlockScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var BlockScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.block, upperScope, block, false);
      }
    };
    exports.BlockScope = BlockScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/CatchScope.js
var require_CatchScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/CatchScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CatchScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var CatchScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.catch, upperScope, block, false);
      }
    };
    exports.CatchScope = CatchScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassFieldInitializerScope.js
var require_ClassFieldInitializerScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassFieldInitializerScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassFieldInitializerScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ClassFieldInitializerScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.classFieldInitializer, upperScope, block, false);
      }
    };
    exports.ClassFieldInitializerScope = ClassFieldInitializerScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassScope.js
var require_ClassScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ClassScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.class, upperScope, block, false);
      }
    };
    exports.ClassScope = ClassScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ConditionalTypeScope.js
var require_ConditionalTypeScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ConditionalTypeScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConditionalTypeScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ConditionalTypeScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.conditionalType, upperScope, block, false);
      }
    };
    exports.ConditionalTypeScope = ConditionalTypeScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ForScope.js
var require_ForScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ForScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ForScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.for, upperScope, block, false);
      }
    };
    exports.ForScope = ForScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionExpressionNameScope.js
var require_FunctionExpressionNameScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionExpressionNameScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FunctionExpressionNameScope = void 0;
    var definition_1 = require_definition();
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var FunctionExpressionNameScope = class extends ScopeBase_1.ScopeBase {
      functionExpressionScope;
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.functionExpressionName, upperScope, block, false);
        if (block.id) {
          this.defineIdentifier(block.id, new definition_1.FunctionNameDefinition(block.id, block));
        }
        this.functionExpressionScope = true;
      }
    };
    exports.FunctionExpressionNameScope = FunctionExpressionNameScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionScope.js
var require_FunctionScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FunctionScope = void 0;
    var types_1 = require_dist();
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var FunctionScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block, isMethodDefinition) {
        super(scopeManager, ScopeType_1.ScopeType.function, upperScope, block, isMethodDefinition);
        if (this.block.type !== types_1.AST_NODE_TYPES.ArrowFunctionExpression) {
          this.defineVariable("arguments", this.set, this.variables, null, null);
        }
      }
      // References in default parameters isn't resolved to variables which are in their function body.
      //     const x = 1
      //     function f(a = x) { // This `x` is resolved to the `x` in the outer scope.
      //         const x = 2
      //         console.log(a)
      //     }
      isValidResolution(ref, variable) {
        var _a;
        if (this.block.type === types_1.AST_NODE_TYPES.Program) {
          return true;
        }
        const bodyStart = ((_a = this.block.body) == null ? void 0 : _a.range[0]) ?? -1;
        return !(variable.scope === this && ref.identifier.range[0] < bodyStart && // the reference is in the parameter part.
        variable.defs.every((d) => d.name.range[0] >= bodyStart));
      }
    };
    exports.FunctionScope = FunctionScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionTypeScope.js
var require_FunctionTypeScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/FunctionTypeScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FunctionTypeScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var FunctionTypeScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.functionType, upperScope, block, false);
      }
    };
    exports.FunctionTypeScope = FunctionTypeScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/GlobalScope.js
var require_GlobalScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/GlobalScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalScope = void 0;
    var types_1 = require_dist();
    var assert_1 = require_assert();
    var ImplicitGlobalVariableDefinition_1 = require_ImplicitGlobalVariableDefinition();
    var variable_1 = require_variable();
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var GlobalScope = class extends ScopeBase_1.ScopeBase {
      // note this is accessed in used in the legacy eslint-scope tests, so it can't be true private
      implicit;
      constructor(scopeManager, block) {
        super(scopeManager, ScopeType_1.ScopeType.global, null, block, false);
        this.implicit = {
          leftToBeResolved: [],
          set: /* @__PURE__ */ new Map(),
          variables: []
        };
      }
      close(scopeManager) {
        (0, assert_1.assert)(this.leftToResolve);
        for (const ref of this.leftToResolve) {
          if (ref.maybeImplicitGlobal && !this.set.has(ref.identifier.name)) {
            const info = ref.maybeImplicitGlobal;
            const node = info.pattern;
            if (node.type === types_1.AST_NODE_TYPES.Identifier) {
              this.defineVariable(node.name, this.implicit.set, this.implicit.variables, node, new ImplicitGlobalVariableDefinition_1.ImplicitGlobalVariableDefinition(info.pattern, info.node));
            }
          }
        }
        this.implicit.leftToBeResolved = this.leftToResolve;
        return super.close(scopeManager);
      }
      defineImplicitVariable(name2, options) {
        this.defineVariable(new variable_1.ImplicitLibVariable(this, name2, options), this.set, this.variables, null, null);
      }
    };
    exports.GlobalScope = GlobalScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/MappedTypeScope.js
var require_MappedTypeScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/MappedTypeScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MappedTypeScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var MappedTypeScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.mappedType, upperScope, block, false);
      }
    };
    exports.MappedTypeScope = MappedTypeScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ModuleScope.js
var require_ModuleScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ModuleScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModuleScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ModuleScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.module, upperScope, block, false);
      }
    };
    exports.ModuleScope = ModuleScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/Scope.js
var require_Scope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/Scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/SwitchScope.js
var require_SwitchScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/SwitchScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SwitchScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var SwitchScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.switch, upperScope, block, false);
      }
    };
    exports.SwitchScope = SwitchScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TSEnumScope.js
var require_TSEnumScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TSEnumScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSEnumScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var TSEnumScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.tsEnum, upperScope, block, false);
      }
    };
    exports.TSEnumScope = TSEnumScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TSModuleScope.js
var require_TSModuleScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TSModuleScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSModuleScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var TSModuleScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.tsModule, upperScope, block, false);
      }
    };
    exports.TSModuleScope = TSModuleScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TypeScope.js
var require_TypeScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/TypeScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var TypeScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.type, upperScope, block, false);
      }
    };
    exports.TypeScope = TypeScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/WithScope.js
var require_WithScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/WithScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WithScope = void 0;
    var assert_1 = require_assert();
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var WithScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.with, upperScope, block, false);
      }
      close(scopeManager) {
        if (this.shouldStaticallyClose()) {
          return super.close(scopeManager);
        }
        (0, assert_1.assert)(this.leftToResolve);
        this.leftToResolve.forEach((ref) => this.delegateToUpperScope(ref));
        this.leftToResolve = null;
        return this.upper;
      }
    };
    exports.WithScope = WithScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/index.js
var require_scope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_BlockScope(), exports);
    __exportStar(require_CatchScope(), exports);
    __exportStar(require_ClassFieldInitializerScope(), exports);
    __exportStar(require_ClassScope(), exports);
    __exportStar(require_ConditionalTypeScope(), exports);
    __exportStar(require_ForScope(), exports);
    __exportStar(require_FunctionExpressionNameScope(), exports);
    __exportStar(require_FunctionScope(), exports);
    __exportStar(require_FunctionTypeScope(), exports);
    __exportStar(require_GlobalScope(), exports);
    __exportStar(require_MappedTypeScope(), exports);
    __exportStar(require_ModuleScope(), exports);
    __exportStar(require_Scope(), exports);
    __exportStar(require_ScopeType(), exports);
    __exportStar(require_SwitchScope(), exports);
    __exportStar(require_TSEnumScope(), exports);
    __exportStar(require_TSModuleScope(), exports);
    __exportStar(require_TypeScope(), exports);
    __exportStar(require_WithScope(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/VisitorBase.js
var require_VisitorBase = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/VisitorBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VisitorBase = void 0;
    var visitor_keys_1 = require_dist2();
    function isObject(obj) {
      return typeof obj === "object" && obj != null;
    }
    function isNode(node) {
      return isObject(node) && typeof node.type === "string";
    }
    var VisitorBase = class {
      #childVisitorKeys;
      #visitChildrenEvenIfSelectorExists;
      constructor(options) {
        this.#childVisitorKeys = options.childVisitorKeys ?? visitor_keys_1.visitorKeys;
        this.#visitChildrenEvenIfSelectorExists = options.visitChildrenEvenIfSelectorExists ?? false;
      }
      /**
       * Default method for visiting children.
       * @param node the node whose children should be visited
       * @param excludeArr a list of keys to not visit
       */
      visitChildren(node, excludeArr = []) {
        if ((node == null ? void 0 : node.type) == null) {
          return;
        }
        const exclude = /* @__PURE__ */ new Set([...excludeArr, "parent"]);
        const children = this.#childVisitorKeys[node.type] ?? Object.keys(node);
        for (const key of children) {
          if (exclude.has(key)) {
            continue;
          }
          const child = node[key];
          if (!child) {
            continue;
          }
          if (Array.isArray(child)) {
            for (const subChild of child) {
              if (isNode(subChild)) {
                this.visit(subChild);
              }
            }
          } else if (isNode(child)) {
            this.visit(child);
          }
        }
      }
      /**
       * Dispatching node.
       */
      visit(node) {
        if ((node == null ? void 0 : node.type) == null) {
          return;
        }
        const visitor = this[node.type];
        if (visitor) {
          visitor.call(this, node);
          if (!this.#visitChildrenEvenIfSelectorExists) {
            return;
          }
        }
        this.visitChildren(node);
      }
    };
    exports.VisitorBase = VisitorBase;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/PatternVisitor.js
var require_PatternVisitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/PatternVisitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatternVisitor = void 0;
    var types_1 = require_dist();
    var VisitorBase_1 = require_VisitorBase();
    var PatternVisitor = class extends VisitorBase_1.VisitorBase {
      #assignments = [];
      #callback;
      #restElements = [];
      #rootPattern;
      rightHandNodes = [];
      constructor(options, rootPattern, callback) {
        super(options);
        this.#rootPattern = rootPattern;
        this.#callback = callback;
      }
      static isPattern(node) {
        const nodeType = node.type;
        return nodeType === types_1.AST_NODE_TYPES.Identifier || nodeType === types_1.AST_NODE_TYPES.ObjectPattern || nodeType === types_1.AST_NODE_TYPES.ArrayPattern || nodeType === types_1.AST_NODE_TYPES.SpreadElement || nodeType === types_1.AST_NODE_TYPES.RestElement || nodeType === types_1.AST_NODE_TYPES.AssignmentPattern;
      }
      ArrayExpression(node) {
        node.elements.forEach(this.visit, this);
      }
      ArrayPattern(pattern) {
        for (const element of pattern.elements) {
          this.visit(element);
        }
      }
      AssignmentExpression(node) {
        this.#assignments.push(node);
        this.visit(node.left);
        this.rightHandNodes.push(node.right);
        this.#assignments.pop();
      }
      AssignmentPattern(pattern) {
        this.#assignments.push(pattern);
        this.visit(pattern.left);
        this.rightHandNodes.push(pattern.right);
        this.#assignments.pop();
      }
      CallExpression(node) {
        node.arguments.forEach((a) => {
          this.rightHandNodes.push(a);
        });
        this.visit(node.callee);
      }
      Decorator() {
      }
      Identifier(pattern) {
        const lastRestElement = this.#restElements.at(-1);
        this.#callback(pattern, {
          assignments: this.#assignments,
          rest: (lastRestElement == null ? void 0 : lastRestElement.argument) === pattern,
          topLevel: pattern === this.#rootPattern
        });
      }
      MemberExpression(node) {
        if (node.computed) {
          this.rightHandNodes.push(node.property);
        }
        this.rightHandNodes.push(node.object);
      }
      Property(property) {
        if (property.computed) {
          this.rightHandNodes.push(property.key);
        }
        this.visit(property.value);
      }
      RestElement(pattern) {
        this.#restElements.push(pattern);
        this.visit(pattern.argument);
        this.#restElements.pop();
      }
      SpreadElement(node) {
        this.visit(node.argument);
      }
      TSTypeAnnotation() {
      }
    };
    exports.PatternVisitor = PatternVisitor;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Visitor.js
var require_Visitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Visitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VisitorBase = exports.Visitor = void 0;
    var PatternVisitor_1 = require_PatternVisitor();
    var VisitorBase_1 = require_VisitorBase();
    var Visitor = class _Visitor extends VisitorBase_1.VisitorBase {
      #options;
      constructor(optionsOrVisitor) {
        super(optionsOrVisitor instanceof _Visitor ? optionsOrVisitor.#options : optionsOrVisitor);
        this.#options = optionsOrVisitor instanceof _Visitor ? optionsOrVisitor.#options : optionsOrVisitor;
      }
      visitPattern(node, callback, options = { processRightHandNodes: false }) {
        const visitor = new PatternVisitor_1.PatternVisitor(this.#options, node, callback);
        visitor.visit(node);
        if (options.processRightHandNodes) {
          visitor.rightHandNodes.forEach(this.visit, this);
        }
      }
    };
    exports.Visitor = Visitor;
    var VisitorBase_2 = require_VisitorBase();
    Object.defineProperty(exports, "VisitorBase", { enumerable: true, get: function() {
      return VisitorBase_2.VisitorBase;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/TypeVisitor.js
var require_TypeVisitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/TypeVisitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeVisitor = void 0;
    var types_1 = require_dist();
    var definition_1 = require_definition();
    var scope_1 = require_scope();
    var Visitor_1 = require_Visitor();
    var TypeVisitor = class _TypeVisitor extends Visitor_1.Visitor {
      #referencer;
      constructor(referencer) {
        super(referencer);
        this.#referencer = referencer;
      }
      static visit(referencer, node) {
        const typeReferencer = new _TypeVisitor(referencer);
        typeReferencer.visit(node);
      }
      ///////////////////
      // Visit helpers //
      ///////////////////
      visitFunctionType(node) {
        this.#referencer.scopeManager.nestFunctionTypeScope(node);
        this.visit(node.typeParameters);
        for (const param of node.params) {
          let didVisitAnnotation = false;
          this.visitPattern(param, (pattern, info) => {
            this.#referencer.currentScope().defineIdentifier(pattern, new definition_1.ParameterDefinition(pattern, node, info.rest));
            if (pattern.typeAnnotation) {
              this.visit(pattern.typeAnnotation);
              didVisitAnnotation = true;
            }
          });
          if (!didVisitAnnotation && "typeAnnotation" in param) {
            this.visit(param.typeAnnotation);
          }
        }
        this.visit(node.returnType);
        this.#referencer.close(node);
      }
      visitPropertyKey(node) {
        if (!node.computed) {
          return;
        }
        this.#referencer.visit(node.key);
      }
      /////////////////////
      // Visit selectors //
      /////////////////////
      Identifier(node) {
        this.#referencer.currentScope().referenceType(node);
      }
      MemberExpression(node) {
        this.visit(node.object);
      }
      TSCallSignatureDeclaration(node) {
        this.visitFunctionType(node);
      }
      TSConditionalType(node) {
        this.#referencer.scopeManager.nestConditionalTypeScope(node);
        this.visitChildren(node, ["falseType"]);
        this.#referencer.close(node);
        this.visit(node.falseType);
      }
      TSConstructorType(node) {
        this.visitFunctionType(node);
      }
      TSConstructSignatureDeclaration(node) {
        this.visitFunctionType(node);
      }
      TSFunctionType(node) {
        this.visitFunctionType(node);
      }
      TSImportType(node) {
        this.visit(node.typeArguments);
      }
      TSIndexSignature(node) {
        for (const param of node.parameters) {
          if (param.type === types_1.AST_NODE_TYPES.Identifier) {
            this.visit(param.typeAnnotation);
          }
        }
        this.visit(node.typeAnnotation);
      }
      TSInferType(node) {
        const typeParameter = node.typeParameter;
        let scope = this.#referencer.currentScope();
        if (scope.type === scope_1.ScopeType.functionType || scope.type === scope_1.ScopeType.mappedType) {
          let currentScope = scope.upper;
          while (currentScope) {
            if (currentScope.type === scope_1.ScopeType.functionType || currentScope.type === scope_1.ScopeType.mappedType) {
              currentScope = currentScope.upper;
              continue;
            }
            if (currentScope.type === scope_1.ScopeType.conditionalType) {
              scope = currentScope;
              break;
            }
            break;
          }
        }
        scope.defineIdentifier(typeParameter.name, new definition_1.TypeDefinition(typeParameter.name, typeParameter));
        this.visit(typeParameter.constraint);
      }
      TSInterfaceDeclaration(node) {
        this.#referencer.currentScope().defineIdentifier(node.id, new definition_1.TypeDefinition(node.id, node));
        if (node.typeParameters) {
          this.#referencer.scopeManager.nestTypeScope(node);
          this.visit(node.typeParameters);
        }
        node.extends.forEach(this.visit, this);
        this.visit(node.body);
        if (node.typeParameters) {
          this.#referencer.close(node);
        }
      }
      TSMappedType(node) {
        this.#referencer.scopeManager.nestMappedTypeScope(node);
        this.#referencer.currentScope().defineIdentifier(node.key, new definition_1.TypeDefinition(node.key, node));
        this.visit(node.constraint);
        this.visit(node.nameType);
        this.visit(node.typeAnnotation);
        this.#referencer.close(node);
      }
      TSMethodSignature(node) {
        this.visitPropertyKey(node);
        this.visitFunctionType(node);
      }
      TSNamedTupleMember(node) {
        this.visit(node.elementType);
      }
      TSPropertySignature(node) {
        this.visitPropertyKey(node);
        this.visit(node.typeAnnotation);
      }
      TSQualifiedName(node) {
        this.visit(node.left);
      }
      TSTypeAliasDeclaration(node) {
        this.#referencer.currentScope().defineIdentifier(node.id, new definition_1.TypeDefinition(node.id, node));
        if (node.typeParameters) {
          this.#referencer.scopeManager.nestTypeScope(node);
          this.visit(node.typeParameters);
        }
        this.visit(node.typeAnnotation);
        if (node.typeParameters) {
          this.#referencer.close(node);
        }
      }
      TSTypeParameter(node) {
        this.#referencer.currentScope().defineIdentifier(node.name, new definition_1.TypeDefinition(node.name, node));
        this.visit(node.constraint);
        this.visit(node.default);
      }
      TSTypePredicate(node) {
        if (node.parameterName.type !== types_1.AST_NODE_TYPES.TSThisType) {
          this.#referencer.currentScope().referenceValue(node.parameterName);
        }
        this.visit(node.typeAnnotation);
      }
      // a type query `typeof foo` is a special case that references a _non-type_ variable,
      TSTypeAnnotation(node) {
        this.visitChildren(node);
      }
      TSTypeQuery(node) {
        let entityName;
        if (node.exprName.type === types_1.AST_NODE_TYPES.TSQualifiedName) {
          let iter = node.exprName;
          while (iter.left.type === types_1.AST_NODE_TYPES.TSQualifiedName) {
            iter = iter.left;
          }
          entityName = iter.left;
        } else {
          entityName = node.exprName;
          if (node.exprName.type === types_1.AST_NODE_TYPES.TSImportType) {
            this.visit(node.exprName);
          }
        }
        if (entityName.type === types_1.AST_NODE_TYPES.Identifier) {
          this.#referencer.currentScope().referenceValue(entityName);
        }
        this.visit(node.typeArguments);
      }
    };
    exports.TypeVisitor = TypeVisitor;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ClassVisitor.js
var require_ClassVisitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ClassVisitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassVisitor = void 0;
    var types_1 = require_dist();
    var definition_1 = require_definition();
    var TypeVisitor_1 = require_TypeVisitor();
    var Visitor_1 = require_Visitor();
    var ClassVisitor = class _ClassVisitor extends Visitor_1.Visitor {
      #classNode;
      #referencer;
      constructor(referencer, node) {
        super(referencer);
        this.#referencer = referencer;
        this.#classNode = node;
      }
      static visit(referencer, node) {
        const classVisitor = new _ClassVisitor(referencer, node);
        classVisitor.visitClass(node);
      }
      visit(node) {
        if (node && node.type in this) {
          super.visit(node);
        } else {
          this.#referencer.visit(node);
        }
      }
      ///////////////////
      // Visit helpers //
      ///////////////////
      visitClass(node) {
        if (node.type === types_1.AST_NODE_TYPES.ClassDeclaration && node.id) {
          this.#referencer.currentScope().defineIdentifier(node.id, new definition_1.ClassNameDefinition(node.id, node));
        }
        node.decorators.forEach((d) => this.#referencer.visit(d));
        this.#referencer.scopeManager.nestClassScope(node);
        if (node.id) {
          this.#referencer.currentScope().defineIdentifier(node.id, new definition_1.ClassNameDefinition(node.id, node));
        }
        this.#referencer.visit(node.superClass);
        this.visitType(node.typeParameters);
        this.visitType(node.superTypeArguments);
        node.implements.forEach((imp) => this.visitType(imp));
        this.visit(node.body);
        this.#referencer.close(node);
      }
      visitFunctionParameterTypeAnnotation(node) {
        switch (node.type) {
          case types_1.AST_NODE_TYPES.AssignmentPattern:
            this.visitType(node.left.typeAnnotation);
            break;
          case types_1.AST_NODE_TYPES.TSParameterProperty:
            this.visitFunctionParameterTypeAnnotation(node.parameter);
            break;
          default:
            this.visitType(node.typeAnnotation);
        }
      }
      visitMethod(node) {
        if (node.computed) {
          this.#referencer.visit(node.key);
        }
        if (node.value.type === types_1.AST_NODE_TYPES.FunctionExpression) {
          this.visitMethodFunction(node.value, node);
        } else {
          this.#referencer.visit(node.value);
        }
        node.decorators.forEach((d) => this.#referencer.visit(d));
      }
      visitMethodFunction(node, methodNode) {
        var _a;
        if (node.id) {
          this.#referencer.scopeManager.nestFunctionExpressionNameScope(node);
        }
        this.#referencer.scopeManager.nestFunctionScope(node, true);
        let withMethodDecorators = !!methodNode.decorators.length;
        withMethodDecorators ||= methodNode.kind !== "set" && node.params.some((param) => param.decorators.length);
        if (!withMethodDecorators && methodNode.kind === "set") {
          const keyName = getLiteralMethodKeyName(methodNode);
          if (keyName != null && ((_a = this.#classNode.body.body.find((node2) => node2 !== methodNode && node2.type === types_1.AST_NODE_TYPES.MethodDefinition && // Node must both be static or not
          node2.static === methodNode.static && getLiteralMethodKeyName(node2) === keyName)) == null ? void 0 : _a.decorators.length)) {
            withMethodDecorators = true;
          }
        }
        if (!withMethodDecorators && methodNode.kind === "constructor" && this.#classNode.decorators.length) {
          withMethodDecorators = true;
        }
        for (const param of node.params) {
          this.visitPattern(param, (pattern, info) => {
            this.#referencer.currentScope().defineIdentifier(pattern, new definition_1.ParameterDefinition(pattern, node, info.rest));
            this.#referencer.referencingDefaultValue(pattern, info.assignments, null, true);
          }, { processRightHandNodes: true });
          this.visitFunctionParameterTypeAnnotation(param);
          param.decorators.forEach((d) => this.visit(d));
        }
        this.visitType(node.returnType);
        this.visitType(node.typeParameters);
        this.#referencer.visitChildren(node.body);
        this.#referencer.close(node);
      }
      visitPropertyBase(node) {
        if (node.computed) {
          this.#referencer.visit(node.key);
        }
        if (node.value) {
          if (node.type === types_1.AST_NODE_TYPES.PropertyDefinition || node.type === types_1.AST_NODE_TYPES.AccessorProperty) {
            this.#referencer.scopeManager.nestClassFieldInitializerScope(node.value);
          }
          this.#referencer.visit(node.value);
          if (node.type === types_1.AST_NODE_TYPES.PropertyDefinition || node.type === types_1.AST_NODE_TYPES.AccessorProperty) {
            this.#referencer.close(node.value);
          }
        }
        node.decorators.forEach((d) => this.#referencer.visit(d));
      }
      visitPropertyDefinition(node) {
        this.visitPropertyBase(node);
        this.visitType(node.typeAnnotation);
      }
      visitType(node) {
        if (!node) {
          return;
        }
        TypeVisitor_1.TypeVisitor.visit(this.#referencer, node);
      }
      /////////////////////
      // Visit selectors //
      /////////////////////
      AccessorProperty(node) {
        this.visitPropertyDefinition(node);
      }
      ClassBody(node) {
        this.visitChildren(node);
      }
      Identifier(node) {
        this.#referencer.visit(node);
      }
      MethodDefinition(node) {
        this.visitMethod(node);
      }
      PrivateIdentifier() {
      }
      PropertyDefinition(node) {
        this.visitPropertyDefinition(node);
      }
      StaticBlock(node) {
        this.#referencer.scopeManager.nestClassStaticBlockScope(node);
        node.body.forEach((b) => this.visit(b));
        this.#referencer.close(node);
      }
      TSAbstractAccessorProperty(node) {
        this.visitPropertyDefinition(node);
      }
      TSAbstractMethodDefinition(node) {
        this.visitPropertyBase(node);
      }
      TSAbstractPropertyDefinition(node) {
        this.visitPropertyDefinition(node);
      }
      TSIndexSignature(node) {
        this.visitType(node);
      }
    };
    exports.ClassVisitor = ClassVisitor;
    function getLiteralMethodKeyName(node) {
      if (node.computed && node.key.type === types_1.AST_NODE_TYPES.Literal) {
        if (typeof node.key.value === "string" || typeof node.key.value === "number") {
          return node.key.value;
        }
      } else if (!node.computed && node.key.type === types_1.AST_NODE_TYPES.Identifier) {
        return node.key.name;
      }
      return null;
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ExportVisitor.js
var require_ExportVisitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ExportVisitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportVisitor = void 0;
    var types_1 = require_dist();
    var Visitor_1 = require_Visitor();
    var ExportVisitor = class _ExportVisitor extends Visitor_1.Visitor {
      #exportNode;
      #referencer;
      constructor(node, referencer) {
        super(referencer);
        this.#exportNode = node;
        this.#referencer = referencer;
      }
      static visit(referencer, node) {
        const exportReferencer = new _ExportVisitor(node, referencer);
        exportReferencer.visit(node);
      }
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === types_1.AST_NODE_TYPES.Identifier) {
          this.visit(node.declaration);
        } else {
        }
      }
      ExportNamedDeclaration(node) {
        if (node.source) {
          return;
        }
        if (!node.declaration) {
          this.visitChildren(node);
        } else {
        }
      }
      ExportSpecifier(node) {
        if (node.exportKind === "type" && node.local.type === types_1.AST_NODE_TYPES.Identifier) {
          this.#referencer.currentScope().referenceType(node.local);
        } else {
          this.visit(node.local);
        }
      }
      Identifier(node) {
        if (this.#exportNode.exportKind === "type") {
          this.#referencer.currentScope().referenceType(node);
        } else {
          this.#referencer.currentScope().referenceDualValueType(node);
        }
      }
    };
    exports.ExportVisitor = ExportVisitor;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ImportVisitor.js
var require_ImportVisitor = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/ImportVisitor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportVisitor = void 0;
    var definition_1 = require_definition();
    var Visitor_1 = require_Visitor();
    var ImportVisitor = class _ImportVisitor extends Visitor_1.Visitor {
      #declaration;
      #referencer;
      constructor(declaration, referencer) {
        super(referencer);
        this.#declaration = declaration;
        this.#referencer = referencer;
      }
      static visit(referencer, declaration) {
        const importReferencer = new _ImportVisitor(declaration, referencer);
        importReferencer.visit(declaration);
      }
      ImportDefaultSpecifier(node) {
        const local = node.local;
        this.visitImport(local, node);
      }
      ImportNamespaceSpecifier(node) {
        const local = node.local;
        this.visitImport(local, node);
      }
      ImportSpecifier(node) {
        const local = node.local;
        this.visitImport(local, node);
      }
      visitImport(id, specifier) {
        this.#referencer.currentScope().defineIdentifier(id, new definition_1.ImportBindingDefinition(id, specifier, this.#declaration));
      }
    };
    exports.ImportVisitor = ImportVisitor;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Referencer.js
var require_Referencer = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/Referencer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Referencer = void 0;
    var types_1 = require_dist();
    var assert_1 = require_assert();
    var definition_1 = require_definition();
    var lib_1 = require_lib3();
    var ClassVisitor_1 = require_ClassVisitor();
    var ExportVisitor_1 = require_ExportVisitor();
    var ImportVisitor_1 = require_ImportVisitor();
    var PatternVisitor_1 = require_PatternVisitor();
    var Reference_1 = require_Reference();
    var TypeVisitor_1 = require_TypeVisitor();
    var Visitor_1 = require_Visitor();
    var Referencer = class extends Visitor_1.Visitor {
      #hasReferencedJsxFactory = false;
      #hasReferencedJsxFragmentFactory = false;
      #jsxFragmentName;
      #jsxPragma;
      #lib;
      scopeManager;
      constructor(options, scopeManager) {
        super(options);
        this.scopeManager = scopeManager;
        this.#jsxPragma = options.jsxPragma;
        this.#jsxFragmentName = options.jsxFragmentName;
        this.#lib = options.lib;
      }
      populateGlobalsFromLib(globalScope) {
        for (const lib of this.#lib) {
          const variables = lib_1.lib[lib];
          if (!variables) {
            throw new Error(`Invalid value for lib provided: ${lib}`);
          }
          for (const [name2, variable] of Object.entries(variables)) {
            globalScope.defineImplicitVariable(name2, variable);
          }
        }
        globalScope.defineImplicitVariable("const", {
          eslintImplicitGlobalSetting: "readonly",
          isTypeVariable: true,
          isValueVariable: false
        });
      }
      close(node) {
        while (this.currentScope(true) && node === this.currentScope().block) {
          this.scopeManager.currentScope = this.currentScope().close(this.scopeManager);
        }
      }
      currentScope(dontThrowOnNull) {
        if (!dontThrowOnNull) {
          (0, assert_1.assert)(this.scopeManager.currentScope, "aaa");
        }
        return this.scopeManager.currentScope;
      }
      referencingDefaultValue(pattern, assignments, maybeImplicitGlobal, init) {
        assignments.forEach((assignment) => {
          this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.Write, assignment.right, maybeImplicitGlobal, init);
        });
      }
      /**
       * Searches for a variable named "name" in the upper scopes and adds a pseudo-reference from itself to itself
       */
      referenceInSomeUpperScope(name2) {
        let scope = this.scopeManager.currentScope;
        while (scope) {
          const variable = scope.set.get(name2);
          if (!variable) {
            scope = scope.upper;
            continue;
          }
          scope.referenceValue(variable.identifiers[0]);
          return true;
        }
        return false;
      }
      referenceJsxFragment() {
        if (this.#jsxFragmentName == null || this.#hasReferencedJsxFragmentFactory) {
          return;
        }
        this.#hasReferencedJsxFragmentFactory = this.referenceInSomeUpperScope(this.#jsxFragmentName);
      }
      referenceJsxPragma() {
        if (this.#jsxPragma == null || this.#hasReferencedJsxFactory) {
          return;
        }
        this.#hasReferencedJsxFactory = this.referenceInSomeUpperScope(this.#jsxPragma);
      }
      ///////////////////
      // Visit helpers //
      ///////////////////
      visitClass(node) {
        ClassVisitor_1.ClassVisitor.visit(this, node);
      }
      visitForIn(node) {
        if (node.left.type === types_1.AST_NODE_TYPES.VariableDeclaration && node.left.kind !== "var") {
          this.scopeManager.nestForScope(node);
        }
        if (node.left.type === types_1.AST_NODE_TYPES.VariableDeclaration) {
          this.visit(node.left);
          this.visitPattern(node.left.declarations[0].id, (pattern) => {
            this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.Write, node.right, null, true);
          });
        } else {
          this.visitPattern(node.left, (pattern, info) => {
            const maybeImplicitGlobal = !this.currentScope().isStrict ? {
              node,
              pattern
            } : null;
            this.referencingDefaultValue(pattern, info.assignments, maybeImplicitGlobal, false);
            this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.Write, node.right, maybeImplicitGlobal, false);
          }, { processRightHandNodes: true });
        }
        this.visit(node.right);
        this.visit(node.body);
        this.close(node);
      }
      visitFunction(node) {
        if (node.type === types_1.AST_NODE_TYPES.FunctionExpression) {
          if (node.id) {
            this.scopeManager.nestFunctionExpressionNameScope(node);
          }
        } else if (node.id) {
          this.currentScope().defineIdentifier(node.id, new definition_1.FunctionNameDefinition(node.id, node));
        }
        this.scopeManager.nestFunctionScope(node, false);
        for (const param of node.params) {
          this.visitPattern(param, (pattern, info) => {
            this.currentScope().defineIdentifier(pattern, new definition_1.ParameterDefinition(pattern, node, info.rest));
            this.referencingDefaultValue(pattern, info.assignments, null, true);
          }, { processRightHandNodes: true });
          this.visitFunctionParameterTypeAnnotation(param);
          param.decorators.forEach((d) => this.visit(d));
        }
        this.visitType(node.returnType);
        this.visitType(node.typeParameters);
        if (node.body) {
          if (node.body.type === types_1.AST_NODE_TYPES.BlockStatement) {
            this.visitChildren(node.body);
          } else {
            this.visit(node.body);
          }
        }
        this.close(node);
      }
      visitFunctionParameterTypeAnnotation(node) {
        switch (node.type) {
          case types_1.AST_NODE_TYPES.AssignmentPattern:
            this.visitType(node.left.typeAnnotation);
            break;
          case types_1.AST_NODE_TYPES.TSParameterProperty:
            this.visitFunctionParameterTypeAnnotation(node.parameter);
            break;
          default:
            this.visitType(node.typeAnnotation);
            break;
        }
      }
      visitProperty(node) {
        if (node.computed) {
          this.visit(node.key);
        }
        this.visit(node.value);
      }
      visitType(node) {
        if (!node) {
          return;
        }
        TypeVisitor_1.TypeVisitor.visit(this, node);
      }
      visitTypeAssertion(node) {
        this.visit(node.expression);
        this.visitType(node.typeAnnotation);
      }
      /////////////////////
      // Visit selectors //
      /////////////////////
      ArrowFunctionExpression(node) {
        this.visitFunction(node);
      }
      AssignmentExpression(node) {
        let left = node.left;
        switch (left.type) {
          case types_1.AST_NODE_TYPES.TSAsExpression:
          case types_1.AST_NODE_TYPES.TSTypeAssertion:
            this.visitType(left.typeAnnotation);
          // intentional fallthrough
          case types_1.AST_NODE_TYPES.TSNonNullExpression:
            left = left.expression;
        }
        if (PatternVisitor_1.PatternVisitor.isPattern(left)) {
          if (node.operator === "=") {
            this.visitPattern(left, (pattern, info) => {
              const maybeImplicitGlobal = !this.currentScope().isStrict ? {
                node,
                pattern
              } : null;
              this.referencingDefaultValue(pattern, info.assignments, maybeImplicitGlobal, false);
              this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.Write, node.right, maybeImplicitGlobal, false);
            }, { processRightHandNodes: true });
          } else if (left.type === types_1.AST_NODE_TYPES.Identifier) {
            this.currentScope().referenceValue(left, Reference_1.ReferenceFlag.ReadWrite, node.right);
          }
        } else {
          this.visit(left);
        }
        this.visit(node.right);
      }
      BlockStatement(node) {
        this.scopeManager.nestBlockScope(node);
        this.visitChildren(node);
        this.close(node);
      }
      BreakStatement() {
      }
      CallExpression(node) {
        this.visitChildren(node, ["typeArguments"]);
        this.visitType(node.typeArguments);
      }
      CatchClause(node) {
        this.scopeManager.nestCatchScope(node);
        if (node.param) {
          const param = node.param;
          this.visitPattern(param, (pattern, info) => {
            this.currentScope().defineIdentifier(pattern, new definition_1.CatchClauseDefinition(param, node));
            this.referencingDefaultValue(pattern, info.assignments, null, true);
          }, { processRightHandNodes: true });
        }
        this.visit(node.body);
        this.close(node);
      }
      ClassDeclaration(node) {
        this.visitClass(node);
      }
      ClassExpression(node) {
        this.visitClass(node);
      }
      ContinueStatement() {
      }
      ExportAllDeclaration() {
      }
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === types_1.AST_NODE_TYPES.Identifier) {
          ExportVisitor_1.ExportVisitor.visit(this, node);
        } else {
          this.visit(node.declaration);
        }
      }
      ExportNamedDeclaration(node) {
        if (node.declaration) {
          this.visit(node.declaration);
        } else {
          ExportVisitor_1.ExportVisitor.visit(this, node);
        }
      }
      ForInStatement(node) {
        this.visitForIn(node);
      }
      ForOfStatement(node) {
        this.visitForIn(node);
      }
      ForStatement(node) {
        if (node.init && node.init.type === types_1.AST_NODE_TYPES.VariableDeclaration && node.init.kind !== "var") {
          this.scopeManager.nestForScope(node);
        }
        this.visitChildren(node);
        this.close(node);
      }
      FunctionDeclaration(node) {
        this.visitFunction(node);
      }
      FunctionExpression(node) {
        this.visitFunction(node);
      }
      Identifier(node) {
        this.currentScope().referenceValue(node);
        this.visitType(node.typeAnnotation);
      }
      ImportAttribute() {
      }
      ImportDeclaration(node) {
        (0, assert_1.assert)(this.scopeManager.isModule(), "ImportDeclaration should appear when the mode is ES6 and in the module context.");
        ImportVisitor_1.ImportVisitor.visit(this, node);
      }
      JSXAttribute(node) {
        this.visit(node.value);
      }
      JSXClosingElement() {
      }
      JSXFragment(node) {
        this.referenceJsxPragma();
        this.referenceJsxFragment();
        this.visitChildren(node);
      }
      JSXIdentifier(node) {
        this.currentScope().referenceValue(node);
      }
      JSXMemberExpression(node) {
        if (node.object.type !== types_1.AST_NODE_TYPES.JSXIdentifier || node.object.name !== "this") {
          this.visit(node.object);
        }
      }
      JSXOpeningElement(node) {
        this.referenceJsxPragma();
        if (node.name.type === types_1.AST_NODE_TYPES.JSXIdentifier) {
          if (node.name.name[0].toUpperCase() === node.name.name[0] || node.name.name === "this") {
            this.visit(node.name);
          }
        } else {
          this.visit(node.name);
        }
        this.visitType(node.typeArguments);
        for (const attr of node.attributes) {
          this.visit(attr);
        }
      }
      LabeledStatement(node) {
        this.visit(node.body);
      }
      MemberExpression(node) {
        this.visit(node.object);
        if (node.computed) {
          this.visit(node.property);
        }
      }
      MetaProperty() {
      }
      NewExpression(node) {
        this.visitChildren(node, ["typeArguments"]);
        this.visitType(node.typeArguments);
      }
      PrivateIdentifier() {
      }
      Program(node) {
        const globalScope = this.scopeManager.nestGlobalScope(node);
        this.populateGlobalsFromLib(globalScope);
        if (this.scopeManager.isGlobalReturn()) {
          this.currentScope().isStrict = false;
          this.scopeManager.nestFunctionScope(node, false);
        }
        if (this.scopeManager.isModule()) {
          this.scopeManager.nestModuleScope(node);
        }
        if (this.scopeManager.isImpliedStrict()) {
          this.currentScope().isStrict = true;
        }
        this.visitChildren(node);
        this.close(node);
      }
      Property(node) {
        this.visitProperty(node);
      }
      SwitchStatement(node) {
        this.visit(node.discriminant);
        this.scopeManager.nestSwitchScope(node);
        for (const switchCase of node.cases) {
          this.visit(switchCase);
        }
        this.close(node);
      }
      TaggedTemplateExpression(node) {
        this.visit(node.tag);
        this.visit(node.quasi);
        this.visitType(node.typeArguments);
      }
      TSAsExpression(node) {
        this.visitTypeAssertion(node);
      }
      TSDeclareFunction(node) {
        this.visitFunction(node);
      }
      TSEmptyBodyFunctionExpression(node) {
        this.visitFunction(node);
      }
      TSEnumDeclaration(node) {
        this.currentScope().defineIdentifier(node.id, new definition_1.TSEnumNameDefinition(node.id, node));
        this.scopeManager.nestTSEnumScope(node);
        for (const member of node.body.members) {
          if (member.id.type === types_1.AST_NODE_TYPES.Literal && typeof member.id.value === "string") {
            const name2 = member.id;
            this.currentScope().defineLiteralIdentifier(name2, new definition_1.TSEnumMemberDefinition(name2, member));
          } else if (!member.computed && member.id.type === types_1.AST_NODE_TYPES.Identifier) {
            this.currentScope().defineIdentifier(member.id, new definition_1.TSEnumMemberDefinition(member.id, member));
          }
          this.visit(member.initializer);
        }
        this.close(node);
      }
      TSExportAssignment(node) {
        if (node.expression.type === types_1.AST_NODE_TYPES.Identifier) {
          this.currentScope().referenceDualValueType(node.expression);
        } else {
          this.visit(node.expression);
        }
      }
      TSImportEqualsDeclaration(node) {
        this.currentScope().defineIdentifier(node.id, new definition_1.ImportBindingDefinition(node.id, node, node));
        if (node.moduleReference.type === types_1.AST_NODE_TYPES.TSQualifiedName) {
          let moduleIdentifier = node.moduleReference.left;
          while (moduleIdentifier.type === types_1.AST_NODE_TYPES.TSQualifiedName) {
            moduleIdentifier = moduleIdentifier.left;
          }
          this.visit(moduleIdentifier);
        } else {
          this.visit(node.moduleReference);
        }
      }
      TSInstantiationExpression(node) {
        this.visitChildren(node, ["typeArguments"]);
        this.visitType(node.typeArguments);
      }
      TSInterfaceDeclaration(node) {
        this.visitType(node);
      }
      TSModuleDeclaration(node) {
        if (node.id.type === types_1.AST_NODE_TYPES.Identifier && node.kind !== "global") {
          this.currentScope().defineIdentifier(node.id, new definition_1.TSModuleNameDefinition(node.id, node));
        }
        this.scopeManager.nestTSModuleScope(node);
        this.visit(node.body);
        this.close(node);
      }
      TSSatisfiesExpression(node) {
        this.visitTypeAssertion(node);
      }
      TSTypeAliasDeclaration(node) {
        this.visitType(node);
      }
      TSTypeAssertion(node) {
        this.visitTypeAssertion(node);
      }
      UpdateExpression(node) {
        if (PatternVisitor_1.PatternVisitor.isPattern(node.argument)) {
          this.visitPattern(node.argument, (pattern) => {
            this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.ReadWrite, null);
          });
        } else {
          this.visitChildren(node);
        }
      }
      VariableDeclaration(node) {
        const variableTargetScope = node.kind === "var" ? this.currentScope().variableScope : this.currentScope();
        for (const decl of node.declarations) {
          const init = decl.init;
          this.visitPattern(decl.id, (pattern, info) => {
            variableTargetScope.defineIdentifier(pattern, new definition_1.VariableDefinition(pattern, decl, node));
            this.referencingDefaultValue(pattern, info.assignments, null, true);
            if (init) {
              this.currentScope().referenceValue(pattern, Reference_1.ReferenceFlag.Write, init, null, true);
            }
          }, { processRightHandNodes: true });
          this.visit(decl.init);
          this.visitType(decl.id.typeAnnotation);
        }
      }
      WithStatement(node) {
        this.visit(node.object);
        this.scopeManager.nestWithScope(node);
        this.visit(node.body);
        this.close(node);
      }
    };
    exports.Referencer = Referencer;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/index.js
var require_referencer = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/referencer/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Referencer = void 0;
    var Referencer_1 = require_Referencer();
    Object.defineProperty(exports, "Referencer", { enumerable: true, get: function() {
      return Referencer_1.Referencer;
    } });
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassStaticBlockScope.js
var require_ClassStaticBlockScope = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/scope/ClassStaticBlockScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassStaticBlockScope = void 0;
    var ScopeBase_1 = require_ScopeBase();
    var ScopeType_1 = require_ScopeType();
    var ClassStaticBlockScope = class extends ScopeBase_1.ScopeBase {
      constructor(scopeManager, upperScope, block) {
        super(scopeManager, ScopeType_1.ScopeType.classStaticBlock, upperScope, block, false);
      }
    };
    exports.ClassStaticBlockScope = ClassStaticBlockScope;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/ScopeManager.js
var require_ScopeManager = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/ScopeManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScopeManager = void 0;
    var assert_1 = require_assert();
    var scope_1 = require_scope();
    var ClassFieldInitializerScope_1 = require_ClassFieldInitializerScope();
    var ClassStaticBlockScope_1 = require_ClassStaticBlockScope();
    var ScopeManager = class {
      #options;
      currentScope;
      declaredVariables;
      /**
       * The root scope
       */
      globalScope;
      nodeToScope;
      /**
       * All scopes
       * @public
       */
      scopes;
      constructor(options) {
        this.scopes = [];
        this.globalScope = null;
        this.nodeToScope = /* @__PURE__ */ new WeakMap();
        this.currentScope = null;
        this.#options = options;
        this.declaredVariables = /* @__PURE__ */ new WeakMap();
      }
      isES6() {
        return true;
      }
      isGlobalReturn() {
        return this.#options.globalReturn === true;
      }
      isImpliedStrict() {
        return this.#options.impliedStrict === true;
      }
      isModule() {
        return this.#options.sourceType === "module";
      }
      isStrictModeSupported() {
        return true;
      }
      get variables() {
        const variables = /* @__PURE__ */ new Set();
        function recurse(scope) {
          scope.variables.forEach((v) => variables.add(v));
          scope.childScopes.forEach(recurse);
        }
        this.scopes.forEach(recurse);
        return [...variables].sort((a, b) => a.$id - b.$id);
      }
      /**
       * Get the variables that a given AST node defines. The gotten variables' `def[].node`/`def[].parent` property is the node.
       * If the node does not define any variable, this returns an empty array.
       * @param node An AST node to get their variables.
       */
      getDeclaredVariables(node) {
        return this.declaredVariables.get(node) ?? [];
      }
      /**
       * Get the scope of a given AST node. The gotten scope's `block` property is the node.
       * This method never returns `function-expression-name` scope. If the node does not have their scope, this returns `null`.
       *
       * @param node An AST node to get their scope.
       * @param inner If the node has multiple scopes, this returns the outermost scope normally.
       *                If `inner` is `true` then this returns the innermost scope.
       */
      acquire(node, inner = false) {
        function predicate(testScope) {
          if (testScope.type === scope_1.ScopeType.function && testScope.functionExpressionScope) {
            return false;
          }
          return true;
        }
        const scopes = this.nodeToScope.get(node);
        if (!scopes || scopes.length === 0) {
          return null;
        }
        if (scopes.length === 1) {
          return scopes[0];
        }
        if (inner) {
          for (let i = scopes.length - 1; i >= 0; --i) {
            const scope = scopes[i];
            if (predicate(scope)) {
              return scope;
            }
          }
          return null;
        }
        return scopes.find(predicate) ?? null;
      }
      nestBlockScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.BlockScope(this, this.currentScope, node));
      }
      nestCatchScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.CatchScope(this, this.currentScope, node));
      }
      nestClassFieldInitializerScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new ClassFieldInitializerScope_1.ClassFieldInitializerScope(this, this.currentScope, node));
      }
      nestClassScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.ClassScope(this, this.currentScope, node));
      }
      nestClassStaticBlockScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new ClassStaticBlockScope_1.ClassStaticBlockScope(this, this.currentScope, node));
      }
      nestConditionalTypeScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.ConditionalTypeScope(this, this.currentScope, node));
      }
      nestForScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.ForScope(this, this.currentScope, node));
      }
      nestFunctionExpressionNameScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.FunctionExpressionNameScope(this, this.currentScope, node));
      }
      nestFunctionScope(node, isMethodDefinition) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.FunctionScope(this, this.currentScope, node, isMethodDefinition));
      }
      nestFunctionTypeScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.FunctionTypeScope(this, this.currentScope, node));
      }
      nestGlobalScope(node) {
        return this.nestScope(new scope_1.GlobalScope(this, node));
      }
      nestMappedTypeScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.MappedTypeScope(this, this.currentScope, node));
      }
      nestModuleScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.ModuleScope(this, this.currentScope, node));
      }
      nestSwitchScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.SwitchScope(this, this.currentScope, node));
      }
      nestTSEnumScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.TSEnumScope(this, this.currentScope, node));
      }
      nestTSModuleScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.TSModuleScope(this, this.currentScope, node));
      }
      nestTypeScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.TypeScope(this, this.currentScope, node));
      }
      nestWithScope(node) {
        (0, assert_1.assert)(this.currentScope);
        return this.nestScope(new scope_1.WithScope(this, this.currentScope, node));
      }
      nestScope(scope) {
        if (scope instanceof scope_1.GlobalScope) {
          (0, assert_1.assert)(this.currentScope == null);
          this.globalScope = scope;
        }
        this.currentScope = scope;
        return scope;
      }
    };
    exports.ScopeManager = ScopeManager;
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/analyze.js
var require_analyze = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/analyze.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.analyze = analyze;
    var visitor_keys_1 = require_dist2();
    var referencer_1 = require_referencer();
    var ScopeManager_1 = require_ScopeManager();
    var DEFAULT_OPTIONS = {
      childVisitorKeys: visitor_keys_1.visitorKeys,
      emitDecoratorMetadata: false,
      globalReturn: false,
      impliedStrict: false,
      jsxFragmentName: null,
      jsxPragma: "React",
      lib: ["es2018"],
      sourceType: "script"
    };
    function analyze(tree, providedOptions) {
      const options = {
        childVisitorKeys: (providedOptions == null ? void 0 : providedOptions.childVisitorKeys) ?? DEFAULT_OPTIONS.childVisitorKeys,
        emitDecoratorMetadata: false,
        globalReturn: (providedOptions == null ? void 0 : providedOptions.globalReturn) ?? DEFAULT_OPTIONS.globalReturn,
        impliedStrict: (providedOptions == null ? void 0 : providedOptions.impliedStrict) ?? DEFAULT_OPTIONS.impliedStrict,
        jsxFragmentName: (providedOptions == null ? void 0 : providedOptions.jsxFragmentName) ?? DEFAULT_OPTIONS.jsxFragmentName,
        jsxPragma: (providedOptions == null ? void 0 : providedOptions.jsxPragma) === void 0 ? DEFAULT_OPTIONS.jsxPragma : providedOptions.jsxPragma,
        lib: (providedOptions == null ? void 0 : providedOptions.lib) ?? ["esnext"],
        sourceType: (providedOptions == null ? void 0 : providedOptions.sourceType) ?? DEFAULT_OPTIONS.sourceType
      };
      options.lib = options.lib.map((l) => l.toLowerCase());
      const scopeManager = new ScopeManager_1.ScopeManager(options);
      const referencer = new referencer_1.Referencer(options, scopeManager);
      referencer.visit(tree);
      return scopeManager;
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+scope-manager@8.12.2/node_modules/@typescript-eslint/scope-manager/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScopeManager = exports.Visitor = exports.Reference = exports.PatternVisitor = exports.analyze = void 0;
    var analyze_1 = require_analyze();
    Object.defineProperty(exports, "analyze", { enumerable: true, get: function() {
      return analyze_1.analyze;
    } });
    __exportStar(require_definition(), exports);
    var PatternVisitor_1 = require_PatternVisitor();
    Object.defineProperty(exports, "PatternVisitor", { enumerable: true, get: function() {
      return PatternVisitor_1.PatternVisitor;
    } });
    var Reference_1 = require_Reference();
    Object.defineProperty(exports, "Reference", { enumerable: true, get: function() {
      return Reference_1.Reference;
    } });
    var Visitor_1 = require_Visitor();
    Object.defineProperty(exports, "Visitor", { enumerable: true, get: function() {
      return Visitor_1.Visitor;
    } });
    __exportStar(require_scope(), exports);
    var ScopeManager_1 = require_ScopeManager();
    Object.defineProperty(exports, "ScopeManager", { enumerable: true, get: function() {
      return ScopeManager_1.ScopeManager;
    } });
    __exportStar(require_variable(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Scope.js
var require_Scope2 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/Scope.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scope = void 0;
    var scopeManager = __importStar(require_dist3());
    var Scope;
    (function(Scope2) {
      Scope2.ScopeType = scopeManager.ScopeType;
      Scope2.DefinitionType = scopeManager.DefinitionType;
    })(Scope || (exports.Scope = Scope = {}));
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/SourceCode.js
var require_SourceCode = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/SourceCode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceCode = void 0;
    var eslint_1 = __require("eslint");
    var SourceCode = class extends eslint_1.SourceCode {
    };
    exports.SourceCode = SourceCode;
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/index.js
var require_ts_eslint = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-eslint/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_AST(), exports);
    __exportStar(require_Config(), exports);
    __exportStar(require_ESLint(), exports);
    __exportStar(require_Linter(), exports);
    __exportStar(require_Parser(), exports);
    __exportStar(require_ParserOptions(), exports);
    __exportStar(require_Processor(), exports);
    __exportStar(require_Rule(), exports);
    __exportStar(require_RuleTester(), exports);
    __exportStar(require_Scope2(), exports);
    __exportStar(require_SourceCode(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-utils/isArray.js
var require_isArray = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-utils/isArray.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArray = isArray;
    function isArray(arg) {
      return Array.isArray(arg);
    }
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-utils/index.js
var require_ts_utils = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/ts-utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_isArray(), exports);
  }
});

// node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/.pnpm/@typescript-eslint+utils@8.12.2_eslint@9.13.0_typescript@4.9.5/node_modules/@typescript-eslint/utils/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TSUtils = exports.TSESLint = exports.JSONSchema = exports.ESLintUtils = exports.ASTUtils = void 0;
    exports.ASTUtils = __importStar(require_ast_utils());
    exports.ESLintUtils = __importStar(require_eslint_utils3());
    exports.JSONSchema = __importStar(require_json_schema());
    exports.TSESLint = __importStar(require_ts_eslint());
    __exportStar(require_ts_estree2(), exports);
    exports.TSUtils = __importStar(require_ts_utils());
  }
});

// node_modules/.pnpm/natural-compare-lite@1.4.0/node_modules/natural-compare-lite/index.js
var require_natural_compare_lite = __commonJS({
  "node_modules/.pnpm/natural-compare-lite@1.4.0/node_modules/natural-compare-lite/index.js"(exports, module) {
    var naturalCompare2 = function(a, b) {
      var i, codeA, codeB = 1, posA = 0, posB = 0, alphabet = String.alphabet;
      function getCode(str, pos, code) {
        if (code) {
          for (i = pos; code = getCode(str, i), code < 76 && code > 65; ) ++i;
          return +str.slice(pos - 1, i);
        }
        code = alphabet && alphabet.indexOf(str.charAt(pos));
        return code > -1 ? code + 76 : (code = str.charCodeAt(pos) || 0, code < 45 || code > 127) ? code : code < 46 ? 65 : code < 48 ? code - 1 : code < 58 ? code + 18 : code < 65 ? code - 11 : code < 91 ? code + 11 : code < 97 ? code - 37 : code < 123 ? code + 5 : code - 63;
      }
      if ((a += "") != (b += "")) for (; codeB; ) {
        codeA = getCode(a, posA++);
        codeB = getCode(b, posB++);
        if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
          codeA = getCode(a, posA, posA);
          codeB = getCode(b, posB, posA = i);
          posB = i;
        }
        if (codeA != codeB) return codeA < codeB ? -1 : 1;
      }
      return 0;
    };
    try {
      module.exports = naturalCompare2;
    } catch (e) {
      String.naturalCompare = naturalCompare2;
    }
  }
});

// src/base-rule.ts
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import stylisticPluginJs from "@stylistic/eslint-plugin-js";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/sort-nodes-by-dependencies.mjs
var sortNodesByDependencies = (nodes) => {
  let result = [];
  let visitedNodes = /* @__PURE__ */ new Set();
  let inProcessNodes = /* @__PURE__ */ new Set();
  let visitNode = (node) => {
    if (visitedNodes.has(node)) {
      return;
    }
    if (inProcessNodes.has(node)) {
      return;
    }
    inProcessNodes.add(node);
    let dependentNodes = nodes.filter(
      (n) => node.dependencies.includes(n.dependencyName ?? n.name)
    );
    for (let dependentNode of dependentNodes) {
      visitNode(dependentNode);
    }
    visitedNodes.add(node);
    inProcessNodes.delete(node);
    result.push(node);
  };
  for (let node of nodes) {
    visitNode(node);
  }
  return result;
};
var getFirstUnorderedNodeDependentOn = (node, currentlyOrderedNodes) => {
  let nodesDependentOnNode = currentlyOrderedNodes.filter(
    (currentlyOrderedNode) => currentlyOrderedNode.dependencies.includes(
      node.dependencyName ?? node.name
    )
  );
  return nodesDependentOnNode.find((firstNodeDependentOnNode) => {
    let currentIndexOfNode = currentlyOrderedNodes.indexOf(node);
    let currentIndexOfFirstNodeDependentOnNode = currentlyOrderedNodes.indexOf(
      firstNodeDependentOnNode
    );
    return currentIndexOfFirstNodeDependentOnNode < currentIndexOfNode;
  });
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/index.js
var import_brace_expansion = __toESM(require_brace_expansion(), 1);

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/assert-valid-pattern.js
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/brace-expressions.js
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob, position) => {
  const pos = position;
  if (glob.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob.length) {
    const c = glob.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/unescape.js
var unescape2 = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/ast.js
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c) => types.has(c);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var AST = class _AST {
  type;
  #root;
  #hasMagic;
  #uflag = false;
  #parts = [];
  #parent;
  #parentIndex;
  #negs;
  #filledNegs = false;
  #options;
  #toString;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #emptyExt = false;
  constructor(type, parent, options = {}) {
    this.type = type;
    if (type)
      this.#hasMagic = true;
    this.#parent = parent;
    this.#root = this.#parent ? this.#parent.#root : this;
    this.#options = this.#root === this ? options : this.#root.#options;
    this.#negs = this.#root === this ? [] : this.#root.#negs;
    if (type === "!" && !this.#root.#filledNegs)
      this.#negs.push(this);
    this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
  }
  get hasMagic() {
    if (this.#hasMagic !== void 0)
      return this.#hasMagic;
    for (const p of this.#parts) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return this.#hasMagic = true;
    }
    return this.#hasMagic;
  }
  // reconstructs the pattern
  toString() {
    if (this.#toString !== void 0)
      return this.#toString;
    if (!this.type) {
      return this.#toString = this.#parts.map((p) => String(p)).join("");
    } else {
      return this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
    }
  }
  #fillNegs() {
    if (this !== this.#root)
      throw new Error("should only call on root");
    if (this.#filledNegs)
      return this;
    this.toString();
    this.#filledNegs = true;
    let n;
    while (n = this.#negs.pop()) {
      if (n.type !== "!")
        continue;
      let p = n;
      let pp = p.#parent;
      while (pp) {
        for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
          for (const part of n.#parts) {
            if (typeof part === "string") {
              throw new Error("string part in extglob AST??");
            }
            part.copyIn(pp.#parts[i]);
          }
        }
        p = pp;
        pp = p.#parent;
      }
    }
    return this;
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && p.#parent === this)) {
        throw new Error("invalid part: " + p);
      }
      this.#parts.push(p);
    }
  }
  toJSON() {
    var _a;
    const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && ((_a = this.#parent) == null ? void 0 : _a.type) === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    var _a;
    if (this.#root === this)
      return true;
    if (!((_a = this.#parent) == null ? void 0 : _a.isStart()))
      return false;
    if (this.#parentIndex === 0)
      return true;
    const p = this.#parent;
    for (let i = 0; i < this.#parentIndex; i++) {
      const pp = p.#parts[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    var _a, _b, _c;
    if (this.#root === this)
      return true;
    if (((_a = this.#parent) == null ? void 0 : _a.type) === "!")
      return true;
    if (!((_b = this.#parent) == null ? void 0 : _b.isEnd()))
      return false;
    if (!this.type)
      return (_c = this.#parent) == null ? void 0 : _c.isEnd();
    const pl = this.#parent ? this.#parent.#parts.length : 0;
    return this.#parentIndex === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _AST(this.type, parent);
    for (const p of this.#parts) {
      c.copyIn(p);
    }
    return c;
  }
  static #parseAST(str, ast, pos, opt) {
    let escaping = false;
    let inBrace = false;
    let braceStart = -1;
    let braceNeg = false;
    if (ast.type === null) {
      let i2 = pos;
      let acc2 = "";
      while (i2 < str.length) {
        const c = str.charAt(i2++);
        if (escaping || c === "\\") {
          escaping = !escaping;
          acc2 += c;
          continue;
        }
        if (inBrace) {
          if (i2 === braceStart + 1) {
            if (c === "^" || c === "!") {
              braceNeg = true;
            }
          } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
            inBrace = false;
          }
          acc2 += c;
          continue;
        } else if (c === "[") {
          inBrace = true;
          braceStart = i2;
          braceNeg = false;
          acc2 += c;
          continue;
        }
        if (!opt.noext && isExtglobType(c) && str.charAt(i2) === "(") {
          ast.push(acc2);
          acc2 = "";
          const ext2 = new _AST(c, ast);
          i2 = _AST.#parseAST(str, ext2, i2, opt);
          ast.push(ext2);
          continue;
        }
        acc2 += c;
      }
      ast.push(acc2);
      return i2;
    }
    let i = pos + 1;
    let part = new _AST(null, ast);
    const parts = [];
    let acc = "";
    while (i < str.length) {
      const c = str.charAt(i++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc += c;
        continue;
      }
      if (inBrace) {
        if (i === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i;
        braceNeg = false;
        acc += c;
        continue;
      }
      if (isExtglobType(c) && str.charAt(i) === "(") {
        part.push(acc);
        acc = "";
        const ext2 = new _AST(c, part);
        part.push(ext2);
        i = _AST.#parseAST(str, ext2, i, opt);
        continue;
      }
      if (c === "|") {
        part.push(acc);
        acc = "";
        parts.push(part);
        part = new _AST(null, ast);
        continue;
      }
      if (c === ")") {
        if (acc === "" && ast.#parts.length === 0) {
          ast.#emptyExt = true;
        }
        part.push(acc);
        acc = "";
        ast.push(...parts, part);
        return i;
      }
      acc += c;
    }
    ast.type = null;
    ast.#hasMagic = void 0;
    ast.#parts = [str.substring(pos - 1)];
    return i;
  }
  static fromGlob(pattern, options = {}) {
    const ast = new _AST(null, void 0, options);
    _AST.#parseAST(pattern, ast, 0, options);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#root)
      return this.#root.toMMPattern();
    const glob = this.toString();
    const [re, body, hasMagic, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob
    });
  }
  get options() {
    return this.#options;
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    var _a;
    const dot = allowDot ?? !!this.#options.dot;
    if (this.#root === this)
      this.#fillNegs();
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = this.#parts.map((p) => {
        const [re, _, hasMagic, uflag] = typeof p === "string" ? _AST.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
        this.#hasMagic = this.#hasMagic || hasMagic;
        this.#uflag = this.#uflag || uflag;
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof this.#parts[0] === "string") {
          const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && this.#root.#filledNegs && ((_a = this.#parent) == null ? void 0 : _a.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape2(src),
        this.#hasMagic = !!this.#hasMagic,
        this.#uflag
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = this.#partsToRegExp(dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      this.#parts = [s];
      this.type = null;
      this.#hasMagic = void 0;
      return [s, unescape2(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && this.#emptyExt) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape2(body),
      this.#hasMagic = !!this.#hasMagic,
      this.#uflag
    ];
  }
  #partsToRegExp(dot) {
    return this.#parts.map((p) => {
      if (typeof p === "string") {
        throw new Error("string type in extglob ast??");
      }
      const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
      this.#uflag = this.#uflag || uflag;
      return re;
    }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
  }
  static #parseGlob(glob, hasMagic, noEmpty = false) {
    let escaping = false;
    let re = "";
    let uflag = false;
    for (let i = 0; i < glob.length; i++) {
      const c = glob.charAt(i);
      if (escaping) {
        escaping = false;
        re += (reSpecials.has(c) ? "\\" : "") + c;
        continue;
      }
      if (c === "\\") {
        if (i === glob.length - 1) {
          re += "\\\\";
        } else {
          escaping = true;
        }
        continue;
      }
      if (c === "[") {
        const [src, needUflag, consumed, magic] = parseClass(glob, i);
        if (consumed) {
          re += src;
          uflag = uflag || needUflag;
          i += consumed - 1;
          hasMagic = hasMagic || magic;
          continue;
        }
      }
      if (c === "*") {
        if (noEmpty && glob === "*")
          re += starNoEmpty;
        else
          re += star;
        hasMagic = true;
        continue;
      }
      if (c === "?") {
        re += qmark;
        hasMagic = true;
        continue;
      }
      re += regExpEscape(c);
    }
    return [re, unescape2(glob), !!hasMagic, uflag];
  }
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/escape.js
var escape2 = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/.pnpm/minimatch@9.0.5/node_modules/minimatch/dist/esm/index.js
var minimatch = (p, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
};
var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f) => f.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f) => f.length !== 0 && !f.startsWith(".");
var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && !f.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f) => f.length === len && f !== "." && f !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
var ext = (a, b = {}) => Object.assign({}, a, b);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
  return Object.assign(m, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options = {}) {
        super(type, parent, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return (0, import_brace_expansion.default)(pattern);
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Minimatch = class {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(pattern, options = {}) {
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _, __) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
        }
      }
      return s.map((ss) => this.parse(ss));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p = this.set[i];
        if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
          p[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (let i = 0; i < globParts.length; i++) {
        for (let j = 0; j < globParts[i].length; j++) {
          if (globParts[i][j] === "**") {
            globParts[i][j] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs = -1;
      while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
        let i = gs;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs) {
          parts.splice(gs, i - gs);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p = parts[i];
          if (i === 1 && p === "" && parts[0] === "")
            continue;
          if (p === "." || p === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p = parts[dd - 1];
        if (p && p !== "." && p !== ".." && p !== "**") {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let gss = gs;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs) {
            parts.splice(gs + 1, gss - gs);
          }
          let next = parts[gs + 1];
          const p = parts[gs + 2];
          const p2 = parts[gs + 3];
          if (next !== "..")
            continue;
          if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs, 1);
          const other = parts.slice(0);
          other[gs] = "**";
          globParts.push(other);
          gs--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j = i + 1; j < globParts.length; j++) {
        const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
          globParts[j] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs) => gs.length);
  }
  partsMatch(a, b, emptyGSMatch = false) {
    let ai = 0;
    let bi = 0;
    let result = [];
    let which = "";
    while (ai < a.length && bi < b.length) {
      if (a[ai] === b[bi]) {
        result.push(which === "b" ? b[bi] : a[ai]);
        ai++;
        bi++;
      } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
        result.push(a[ai]);
        ai++;
      } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
        result.push(b[bi]);
        bi++;
      } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai]);
        ai++;
        bi++;
      } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b[bi]);
        ai++;
        bi++;
      } else {
        return false;
      }
    }
    return a.length === b.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    const options = this.options;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [file[fdi], pattern[pdi]];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          if (pdi > fdi) {
            pattern = pattern.slice(pdi);
          } else if (fdi > pdi) {
            file = file.slice(fdi);
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    this.debug("matchOne", this, { file, pattern });
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false) {
        return false;
      }
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl) {
            return true;
          }
        }
        return false;
      }
      let hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = p.test(f);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file[fi] === "";
    } else {
      throw new Error("wtf?");
    }
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m;
    let fastTest = null;
    if (m = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
    } else if (m = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
    } else if (m = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re === "object") {
      Reflect.defineProperty(re, "test", { value: fastTest });
    }
    return re;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re = set.map((pattern) => {
      const pp = pattern.map((p) => {
        if (p instanceof RegExp) {
          for (const f of p.flags.split(""))
            flags.add(f);
        }
        return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
      });
      pp.forEach((p, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      return pp.filter((p) => p !== GLOBSTAR).join("/");
    }).join("|");
    const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re = "^" + open + re + close + "$";
    if (this.negate)
      re = "^(?!" + re + ").+$";
    try {
      this.regexp = new RegExp(re, [...flags].join(""));
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p) {
    if (this.preserveMultipleSlashes) {
      return p.split("/");
    } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
      return ["", ...p.split(/\/+/)];
    } else {
      return p.split(/\/+/);
    }
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f === "";
    }
    if (f === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f = f.split("\\").join("/");
    }
    const ff = this.slashSplit(f);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (let i = 0; i < set.length; i++) {
      const pattern = set[i];
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape2;
minimatch.unescape = unescape2;

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/matches.mjs
var matches = (value, pattern, type) => {
  switch (type) {
    case "regex":
      return new RegExp(pattern).test(value);
    case "minimatch":
    default:
      return minimatch(value, pattern, {
        nocomment: true
      });
  }
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/is-partition-comment.mjs
var isPartitionComment = (partitionComment, comment, matcher) => Array.isArray(partitionComment) && partitionComment.some(
  (pattern) => matches(comment.trim(), pattern, matcher)
) || typeof partitionComment === "string" && matches(comment.trim(), partitionComment, matcher) || partitionComment === true;
var hasPartitionComment = (partitionComment, comments, matcher) => comments.some(
  (comment) => isPartitionComment(partitionComment, comment.value, matcher)
);

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-comments-before.mjs
var getCommentsBefore = (node, source) => source.getCommentsBefore(node).filter((comment) => {
  let tokenBeforeComment = source.getTokenBefore(comment);
  return (tokenBeforeComment == null ? void 0 : tokenBeforeComment.loc.end.line) !== comment.loc.end.line;
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/create-eslint-rule.mjs
var import_utils = __toESM(require_dist4(), 1);
var createEslintRule = import_utils.ESLintUtils.RuleCreator(
  (ruleName) => `https://perfectionist.dev/rules/${ruleName}`
);

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-lines-between.mjs
var getLinesBetween = (source, left, right) => {
  let linesBetween = source.lines.slice(
    left.node.loc.end.line,
    right.node.loc.start.line - 1
  );
  return linesBetween.filter((line) => !line.trim().length).length;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-source-code.mjs
var getSourceCode = (context) => (
  /* v8 ignore next 2 */
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  context.sourceCode ?? context.getSourceCode()
);

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/to-single-line.mjs
var toSingleLine = (string) => string.replaceAll(/\s\s+/g, " ").trim();

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/range-to-diff.mjs
var rangeToDiff = (range) => {
  let [from, to] = range;
  return to - from;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-settings.mjs
var getSettings = (settings = {}) => {
  if (!settings.perfectionist) {
    return {};
  }
  let getInvalidOptions = (object) => {
    let allowedOptions = [
      "partitionByComment",
      "partitionByNewLine",
      "specialCharacters",
      "ignorePattern",
      "ignoreCase",
      "matcher",
      "order",
      "type"
    ];
    return Object.keys(object).filter((key) => !allowedOptions.includes(key));
  };
  let perfectionistSettings = settings.perfectionist;
  let invalidOptions = getInvalidOptions(perfectionistSettings);
  if (invalidOptions.length) {
    throw new Error(
      "Invalid Perfectionist setting(s): " + invalidOptions.join(", ")
    );
  }
  return settings.perfectionist;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/compare.mjs
var import_natural_compare_lite = __toESM(require_natural_compare_lite(), 1);
var compare = (a, b, options) => {
  let orderCoefficient = options.order === "asc" ? 1 : -1;
  let sortingFunction;
  let nodeValueGetter = options.nodeValueGetter ?? ((node) => node.name);
  if (options.type === "alphabetical") {
    let formatString = getFormatStringFunc(
      options.ignoreCase,
      options.specialCharacters
    );
    sortingFunction = (aNode, bNode) => formatString(nodeValueGetter(aNode)).localeCompare(
      formatString(nodeValueGetter(bNode))
    );
  } else if (options.type === "natural") {
    let prepareNumeric = (string) => {
      let formattedNumberPattern = /^[+-]?[\d ,_]+(\.[\d ,_]+)?$/;
      if (formattedNumberPattern.test(string)) {
        return string.replaceAll(/[ ,_]/g, "");
      }
      return string;
    };
    sortingFunction = (aNode, bNode) => {
      let formatString = getFormatStringFunc(
        options.ignoreCase,
        options.specialCharacters
      );
      return (0, import_natural_compare_lite.default)(
        prepareNumeric(formatString(nodeValueGetter(aNode))),
        prepareNumeric(formatString(nodeValueGetter(bNode)))
      );
    };
  } else {
    sortingFunction = (aNode, bNode) => {
      let aSize = aNode.size;
      let bSize = bNode.size;
      let { maxLineLength } = options;
      if (maxLineLength) {
        let isTooLong = (size, node) => size > maxLineLength && node.hasMultipleImportDeclarations;
        if (isTooLong(aSize, aNode)) {
          aSize = nodeValueGetter(aNode).length + 10;
        }
        if (isTooLong(bSize, bNode)) {
          bSize = nodeValueGetter(bNode).length + 10;
        }
      }
      return aSize - bSize;
    };
  }
  return orderCoefficient * sortingFunction(a, b);
};
var getFormatStringFunc = (ignoreCase, specialCharacters) => (value) => {
  let valueToCompare = value;
  if (ignoreCase) {
    valueToCompare = valueToCompare.toLowerCase();
  }
  switch (specialCharacters) {
    case "remove":
      valueToCompare = valueToCompare.replaceAll(/[^A-Za-zÀ-ž]+/g, "");
      break;
    case "trim":
      valueToCompare = valueToCompare.replaceAll(/^[^A-Za-zÀ-ž]+/g, "");
      break;
  }
  return valueToCompare.replaceAll(/\s/g, "");
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/sort-nodes.mjs
var sortNodes = (nodes, options) => [...nodes].sort((a, b) => compare(a, b, options));

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-comment-after.mjs
var getCommentAfter = (node, source) => {
  let token = source.getTokenAfter(node, {
    filter: ({ value, type }) => !(type === "Punctuator" && [",", ";"].includes(value)),
    includeComments: true
  });
  if (((token == null ? void 0 : token.type) === "Block" || (token == null ? void 0 : token.type) === "Line") && node.loc.end.line === token.loc.end.line) {
    return token;
  }
  return null;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-node-range.mjs
var import_utils2 = __toESM(require_dist4(), 1);
var getNodeRange = (node, sourceCode, additionalOptions) => {
  var _a;
  let start = node.range.at(0);
  let end = node.range.at(1);
  let raw = sourceCode.text.slice(start, end);
  if (import_utils2.ASTUtils.isParenthesized(node, sourceCode)) {
    let bodyOpeningParen = sourceCode.getTokenBefore(
      node,
      import_utils2.ASTUtils.isOpeningParenToken
    );
    let bodyClosingParen = sourceCode.getTokenAfter(
      node,
      import_utils2.ASTUtils.isClosingParenToken
    );
    start = bodyOpeningParen.range.at(0);
    end = bodyClosingParen.range.at(1);
  }
  if (raw.endsWith(";") || raw.endsWith(",")) {
    let tokensAfter = sourceCode.getTokensAfter(node, {
      includeComments: true,
      count: 2
    });
    if (node.loc.start.line === ((_a = tokensAfter.at(1)) == null ? void 0 : _a.loc.start.line)) {
      end -= 1;
    }
  }
  let comments = getCommentsBefore(node, sourceCode);
  let partitionComment = (additionalOptions == null ? void 0 : additionalOptions.partitionByComment) ?? false;
  let partitionCommentMatcher = (additionalOptions == null ? void 0 : additionalOptions.matcher) ?? "minimatch";
  let relevantTopComment;
  for (let i = comments.length - 1; i >= 0; i--) {
    let comment = comments[i];
    if (isPartitionComment(
      partitionComment,
      comment.value,
      partitionCommentMatcher
    )) {
      break;
    }
    let previousCommentOrNodeStartLine = i === comments.length - 1 ? node.loc.start.line : comments[i + 1].loc.start.line;
    if (comment.loc.end.line !== previousCommentOrNodeStartLine - 1) {
      break;
    }
    relevantTopComment = comment;
  }
  if (relevantTopComment) {
    start = relevantTopComment.range.at(0);
  }
  return [start, end];
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/make-fixes.mjs
var makeFixes = (fixer, nodes, sortedNodes, source, additionalOptions) => {
  var _a, _b;
  let fixes = [];
  let isSingleline = ((_a = nodes.at(0)) == null ? void 0 : _a.node.loc.start.line) === ((_b = nodes.at(-1)) == null ? void 0 : _b.node.loc.end.line);
  for (let max = nodes.length, i = 0; i < max; i++) {
    let { node } = nodes.at(i);
    fixes.push(
      fixer.replaceTextRange(
        getNodeRange(node, source, additionalOptions),
        source.text.slice(
          ...getNodeRange(sortedNodes.at(i).node, source, additionalOptions)
        )
      )
    );
    let commentAfter = getCommentAfter(sortedNodes.at(i).node, source);
    if (commentAfter && !isSingleline) {
      let tokenBefore = source.getTokenBefore(commentAfter);
      let range = [tokenBefore.range.at(1), commentAfter.range.at(1)];
      fixes.push(fixer.replaceTextRange(range, ""));
      let tokenAfterNode = source.getTokenAfter(node);
      fixes.push(
        fixer.insertTextAfter(
          (tokenAfterNode == null ? void 0 : tokenAfterNode.loc.end.line) === node.loc.end.line ? tokenAfterNode : node,
          source.text.slice(...range)
        )
      );
    }
  }
  return fixes;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/complete.mjs
var complete = (options = {}, settings = {}, defaults2) => Object.assign(defaults2, settings, options);

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/pairwise.mjs
var pairwise = (nodes, callback) => {
  if (nodes.length > 1) {
    for (let i = 1; i < nodes.length; i++) {
      let left = nodes.at(i - 1);
      let right = nodes.at(i);
      if (left && right) {
        callback(left, right, i - 1);
      }
    }
  }
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-variable-declarations.mjs
var sortVariableDeclarations = createEslintRule({
  name: "sort-variable-declarations",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted variable declarations."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the variable declarations into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedVariableDeclarationsOrder: 'Expected "{{right}}" to come before "{{left}}".',
      unexpectedVariableDeclarationsDependencyOrder: 'Expected dependency "{{right}}" to come before "{{nodeDependentOnRight}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false
    }
  ],
  create: (context) => ({
    VariableDeclaration: (node) => {
      if (node.declarations.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          type: "alphabetical",
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByNewLine: false,
          matcher: "minimatch",
          partitionByComment: false,
          order: "asc"
        });
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        let extractDependencies = (init) => {
          let dependencies = [];
          let checkNode = (nodeValue) => {
            if (nodeValue.type === "ArrowFunctionExpression" || nodeValue.type === "FunctionExpression") {
              return;
            }
            if (nodeValue.type === "Identifier") {
              dependencies.push(nodeValue.name);
            }
            if (nodeValue.type === "Property") {
              traverseNode(nodeValue.key);
              traverseNode(nodeValue.value);
            }
            if (nodeValue.type === "ConditionalExpression") {
              traverseNode(nodeValue.test);
              traverseNode(nodeValue.consequent);
              traverseNode(nodeValue.alternate);
            }
            if ("expression" in nodeValue && typeof nodeValue.expression !== "boolean") {
              traverseNode(nodeValue.expression);
            }
            if ("object" in nodeValue) {
              traverseNode(nodeValue.object);
            }
            if ("callee" in nodeValue) {
              traverseNode(nodeValue.callee);
            }
            if ("left" in nodeValue) {
              traverseNode(nodeValue.left);
            }
            if ("right" in nodeValue) {
              traverseNode(nodeValue.right);
            }
            if ("elements" in nodeValue) {
              nodeValue.elements.filter((currentNode) => currentNode !== null).forEach(traverseNode);
            }
            if ("argument" in nodeValue && nodeValue.argument) {
              traverseNode(nodeValue.argument);
            }
            if ("arguments" in nodeValue) {
              nodeValue.arguments.forEach(traverseNode);
            }
            if ("properties" in nodeValue) {
              nodeValue.properties.forEach(traverseNode);
            }
            if ("expressions" in nodeValue) {
              nodeValue.expressions.forEach(traverseNode);
            }
          };
          let traverseNode = (nodeValue) => {
            checkNode(nodeValue);
          };
          traverseNode(init);
          return dependencies;
        };
        let formattedMembers = node.declarations.reduce(
          (accumulator, declaration) => {
            var _a, _b;
            let name2;
            if (declaration.id.type === "ArrayPattern" || declaration.id.type === "ObjectPattern") {
              name2 = sourceCode.text.slice(...declaration.id.range);
            } else {
              ;
              ({ name: name2 } = declaration.id);
            }
            let dependencies = [];
            if (declaration.init) {
              dependencies = extractDependencies(declaration.init);
            }
            let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
            let sortingNode = {
              size: rangeToDiff(declaration.range),
              node: declaration,
              dependencies,
              name: name2
            };
            if (partitionComment && hasPartitionComment(
              partitionComment,
              getCommentsBefore(declaration, sourceCode),
              options.matcher
            ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
              accumulator.push([]);
            }
            ;
            (_b = accumulator.at(-1)) == null ? void 0 : _b.push(sortingNode);
            return accumulator;
          },
          [[]]
        );
        let sortedNodes = sortNodesByDependencies(
          formattedMembers.map((nodes2) => sortNodes(nodes2, options)).flat()
        );
        let nodes = formattedMembers.flat();
        pairwise(nodes, (left, right) => {
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          if (indexOfLeft > indexOfRight) {
            let firstUnorderedNodeDependentOnRight = getFirstUnorderedNodeDependentOn(right, nodes);
            context.report({
              messageId: firstUnorderedNodeDependentOnRight ? "unexpectedVariableDeclarationsDependencyOrder" : "unexpectedVariableDeclarationsOrder",
              data: {
                left: toSingleLine(left.name),
                right: toSingleLine(right.name),
                nodeDependentOnRight: firstUnorderedNodeDependentOnRight == null ? void 0 : firstUnorderedNodeDependentOnRight.name
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/validate-groups-configuration.mjs
var validateGroupsConfiguration = (groups, allowedPredefinedGroups, allowedCustomGroups) => {
  let allowedGroupsSet = /* @__PURE__ */ new Set([
    ...allowedPredefinedGroups,
    ...allowedCustomGroups
  ]);
  let invalidGroups = groups.flat().filter((group) => !allowedGroupsSet.has(group));
  if (invalidGroups.length) {
    throw new Error("Invalid group(s): " + invalidGroups.join(", "));
  }
  validateNoDuplicatedGroups(groups);
};
var validateNoDuplicatedGroups = (groups) => {
  let flattenGroups = groups.flat();
  let duplicatedGroups = flattenGroups.filter(
    (group, index2) => flattenGroups.indexOf(group) !== index2
  );
  if (duplicatedGroups.length) {
    throw new Error("Duplicated group(s): " + duplicatedGroups.join(", "));
  }
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-group-number.mjs
var getGroupNumber = (groups, node) => {
  for (let max = groups.length, i = 0; i < max; i++) {
    let currentGroup = groups[i];
    if (node.group === currentGroup || Array.isArray(currentGroup) && typeof node.group === "string" && currentGroup.includes(node.group)) {
      return i;
    }
  }
  return groups.length;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/sort-nodes-by-groups.mjs
var sortNodesByGroups = (nodes, options, extraOptions) => {
  var _a;
  let nodesByNonIgnoredGroupNumber = {};
  let ignoredNodeIndices = [];
  for (let [index2, sortingNode] of nodes.entries()) {
    if ((_a = extraOptions == null ? void 0 : extraOptions.isNodeIgnored) == null ? void 0 : _a.call(extraOptions, sortingNode)) {
      ignoredNodeIndices.push(index2);
      continue;
    }
    let groupNum = getGroupNumber(options.groups, sortingNode);
    nodesByNonIgnoredGroupNumber[groupNum] = nodesByNonIgnoredGroupNumber[groupNum] ?? [];
    nodesByNonIgnoredGroupNumber[groupNum].push(sortingNode);
  }
  let sortedNodes = [];
  for (let groupNumber of Object.keys(nodesByNonIgnoredGroupNumber).sort(
    (a, b) => Number(a) - Number(b)
  )) {
    let compareOptions = (extraOptions == null ? void 0 : extraOptions.getGroupCompareOptions) ? extraOptions.getGroupCompareOptions(Number(groupNumber)) : options;
    if (!compareOptions) {
      sortedNodes.push(...nodesByNonIgnoredGroupNumber[Number(groupNumber)]);
      continue;
    }
    sortedNodes.push(
      ...sortNodes(
        nodesByNonIgnoredGroupNumber[Number(groupNumber)],
        compareOptions
      )
    );
  }
  for (let ignoredIndex of ignoredNodeIndices) {
    sortedNodes.splice(ignoredIndex, 0, nodes[ignoredIndex]);
  }
  return sortedNodes;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/use-groups.mjs
var useGroups = ({ matcher, groups }) => {
  let group;
  let groupsSet = new Set(groups.flat());
  let defineGroup = (value, override = false) => {
    if ((!group || override) && groupsSet.has(value)) {
      group = value;
    }
  };
  let setCustomGroups = (customGroups, name2, params = {}) => {
    if (customGroups) {
      for (let [key, pattern] of Object.entries(customGroups)) {
        if (Array.isArray(pattern) && pattern.some((patternValue) => matches(name2, patternValue, matcher))) {
          defineGroup(key, params.override);
        }
        if (typeof pattern === "string" && matches(name2, pattern, matcher)) {
          defineGroup(key, params.override);
        }
      }
    }
  };
  return {
    getGroup: () => group ?? "unknown",
    setCustomGroups,
    defineGroup
  };
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-intersection-types.mjs
var sortIntersectionTypes = createEslintRule({
  name: "sort-intersection-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted intersection types."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the intersection types members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedIntersectionTypesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedIntersectionTypesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByNewLine: false,
      partitionByComment: false,
      groups: []
    }
  ],
  create: (context) => ({
    TSIntersectionType: (node) => {
      let settings = getSettings(context.settings);
      let options = complete(context.options.at(0), settings, {
        type: "alphabetical",
        ignoreCase: true,
        specialCharacters: "keep",
        order: "asc",
        matcher: "minimatch",
        partitionByComment: false,
        partitionByNewLine: false,
        groups: []
      });
      validateGroupsConfiguration(
        options.groups,
        [
          "intersection",
          "conditional",
          "function",
          "operator",
          "keyword",
          "literal",
          "nullish",
          "unknown",
          "import",
          "object",
          "named",
          "tuple",
          "union"
        ],
        []
      );
      let sourceCode = getSourceCode(context);
      let partitionComment = options.partitionByComment;
      let formattedMembers = node.types.reduce(
        (accumulator, type) => {
          var _a, _b;
          let { getGroup, defineGroup } = useGroups(options);
          switch (type.type) {
            case "TSConditionalType":
              defineGroup("conditional");
              break;
            case "TSConstructorType":
            case "TSFunctionType":
              defineGroup("function");
              break;
            case "TSImportType":
              defineGroup("import");
              break;
            case "TSIntersectionType":
              defineGroup("intersection");
              break;
            case "TSAnyKeyword":
            case "TSBigIntKeyword":
            case "TSBooleanKeyword":
            case "TSNeverKeyword":
            case "TSNumberKeyword":
            case "TSObjectKeyword":
            case "TSStringKeyword":
            case "TSSymbolKeyword":
            case "TSThisType":
            case "TSUnknownKeyword":
            case "TSIntrinsicKeyword":
              defineGroup("keyword");
              break;
            case "TSLiteralType":
            case "TSTemplateLiteralType":
              defineGroup("literal");
              break;
            case "TSArrayType":
            case "TSIndexedAccessType":
            case "TSInferType":
            case "TSTypeReference":
            case "TSQualifiedName":
              defineGroup("named");
              break;
            case "TSMappedType":
            case "TSTypeLiteral":
              defineGroup("object");
              break;
            case "TSTypeQuery":
            case "TSTypeOperator":
              defineGroup("operator");
              break;
            case "TSTupleType":
              defineGroup("tuple");
              break;
            case "TSUnionType":
              defineGroup("union");
              break;
            case "TSNullKeyword":
            case "TSUndefinedKeyword":
            case "TSVoidKeyword":
              defineGroup("nullish");
              break;
          }
          let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
          let sortingNode = {
            name: sourceCode.text.slice(...type.range),
            size: rangeToDiff(type.range),
            group: getGroup(),
            node: type
          };
          if (partitionComment && hasPartitionComment(
            partitionComment,
            getCommentsBefore(type, sourceCode),
            options.matcher
          ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
            accumulator.push([]);
          }
          ;
          (_b = accumulator.at(-1)) == null ? void 0 : _b.push(sortingNode);
          return accumulator;
        },
        [[]]
      );
      for (let nodes of formattedMembers) {
        let sortedNodes = sortNodesByGroups(nodes, options);
        pairwise(nodes, (left, right) => {
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          if (indexOfLeft > indexOfRight) {
            let leftNum = getGroupNumber(options.groups, left);
            let rightNum = getGroupNumber(options.groups, right);
            context.report({
              messageId: leftNum !== rightNum ? "unexpectedIntersectionTypesGroupOrder" : "unexpectedIntersectionTypesOrder",
              data: {
                left: toSingleLine(left.name),
                leftGroup: left.group,
                right: toSingleLine(right.name),
                rightGroup: right.group
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-svelte-attributes.mjs
import path2 from "node:path";
var sortSvelteAttributes = createEslintRule({
  name: "sort-svelte-attributes",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted Svelte attributes."
    },
    fixable: "code",
    deprecated: true,
    replacedBy: ["svelte/sort-attributes"],
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedSvelteAttributesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedSvelteAttributesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => {
    if (path2.extname(context.filename) !== ".svelte") {
      return {};
    }
    return {
      SvelteStartTag: (node) => {
        if (node.attributes.length > 1) {
          let settings = getSettings(context.settings);
          let options = complete(context.options.at(0), settings, {
            type: "alphabetical",
            ignoreCase: true,
            specialCharacters: "keep",
            customGroups: {},
            matcher: "minimatch",
            order: "asc",
            groups: []
          });
          validateGroupsConfiguration(
            options.groups,
            ["svelte-shorthand", "multiline", "shorthand", "unknown"],
            Object.keys(options.customGroups)
          );
          let sourceCode = getSourceCode(context);
          let parts = node.attributes.reduce(
            (accumulator, attribute) => {
              if (attribute.type === "SvelteSpreadAttribute") {
                accumulator.push([]);
                return accumulator;
              }
              let name2;
              let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
              if (attribute.key.type === "SvelteSpecialDirectiveKey") {
                name2 = sourceCode.text.slice(...attribute.key.range);
              } else if (typeof attribute.key.name === "string") {
                ;
                ({ name: name2 } = attribute.key);
              } else {
                name2 = sourceCode.text.slice(...attribute.key.range);
              }
              setCustomGroups(options.customGroups, name2);
              if (attribute.type === "SvelteShorthandAttribute") {
                defineGroup("svelte-shorthand");
                defineGroup("shorthand");
              }
              if (!("value" in attribute) || Array.isArray(attribute.value) && !attribute.value.at(0)) {
                defineGroup("shorthand");
              }
              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup("multiline");
              }
              accumulator.at(-1).push({
                node: attribute,
                size: rangeToDiff(attribute.range),
                group: getGroup(),
                name: name2
              });
              return accumulator;
            },
            [[]]
          );
          for (let nodes of parts) {
            let sortedNodes = sortNodesByGroups(nodes, options);
            pairwise(nodes, (left, right) => {
              let indexOfLeft = sortedNodes.indexOf(left);
              let indexOfRight = sortedNodes.indexOf(right);
              if (indexOfLeft > indexOfRight) {
                let leftNum = getGroupNumber(options.groups, left);
                let rightNum = getGroupNumber(options.groups, right);
                context.report({
                  messageId: leftNum !== rightNum ? "unexpectedSvelteAttributesGroupOrder" : "unexpectedSvelteAttributesOrder",
                  data: {
                    left: left.name,
                    leftGroup: left.group,
                    right: right.name,
                    rightGroup: right.group
                  },
                  node: right.node,
                  fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode)
                });
              }
            });
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-astro-attributes.mjs
import path3 from "node:path";
var sortAstroAttributes = createEslintRule({
  name: "sort-astro-attributes",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted Astro attributes."
    },
    fixable: "code",
    deprecated: true,
    replacedBy: ["astro/sort-attributes"],
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedAstroAttributesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedAstroAttributesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      groups: [],
      customGroups: {}
    }
  ],
  // @ts-ignore
  create: (context) => {
    if (path3.extname(context.filename) !== ".astro") {
      return {};
    }
    return {
      JSXElement: (node) => {
        let { attributes } = node.openingElement;
        if (attributes.length > 1) {
          let settings = getSettings(context.settings);
          let options = complete(context.options.at(0), settings, {
            type: "alphabetical",
            ignoreCase: true,
            specialCharacters: "keep",
            matcher: "minimatch",
            customGroups: {},
            order: "asc",
            groups: []
          });
          validateGroupsConfiguration(
            options.groups,
            ["astro-shorthand", "multiline", "shorthand", "unknown"],
            Object.keys(options.customGroups)
          );
          let sourceCode = getSourceCode(context);
          let parts = attributes.reduce(
            (accumulator, attribute) => {
              if (attribute.type === "JSXSpreadAttribute") {
                accumulator.push([]);
                return accumulator;
              }
              let name2 = typeof attribute.name.name === "string" ? attribute.name.name : sourceCode.text.slice(...attribute.name.range);
              let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
              setCustomGroups(options.customGroups, name2);
              if (attribute.type === "AstroShorthandAttribute") {
                defineGroup("astro-shorthand");
                defineGroup("shorthand");
              }
              if (attribute.value === null) {
                defineGroup("shorthand");
              }
              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup("multiline");
              }
              accumulator.at(-1).push({
                size: rangeToDiff(attribute.range),
                node: attribute,
                group: getGroup(),
                name: name2
              });
              return accumulator;
            },
            [[]]
          );
          for (let nodes of parts) {
            let sortedNodes = sortNodesByGroups(nodes, options);
            pairwise(nodes, (left, right) => {
              let indexOfLeft = sortedNodes.indexOf(left);
              let indexOfRight = sortedNodes.indexOf(right);
              if (indexOfLeft > indexOfRight) {
                let leftNum = getGroupNumber(options.groups, left);
                let rightNum = getGroupNumber(options.groups, right);
                context.report({
                  messageId: leftNum !== rightNum ? "unexpectedAstroAttributesGroupOrder" : "unexpectedAstroAttributesOrder",
                  data: {
                    left: left.name,
                    right: right.name,
                    leftGroup: left.group,
                    rightGroup: right.group
                  },
                  node: right.node,
                  fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode)
                });
              }
            });
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/is-positive.mjs
var isPositive = (number) => number > 0;

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-array-includes.mjs
var jsonSchema = {
  type: "object",
  properties: {
    type: {
      description: "Specifies the sorting method.",
      type: "string",
      enum: ["alphabetical", "natural", "line-length"]
    },
    order: {
      description: "Determines whether the sorted items should be in ascending or descending order.",
      type: "string",
      enum: ["asc", "desc"]
    },
    matcher: {
      description: "Specifies the string matcher.",
      type: "string",
      enum: ["minimatch", "regex"]
    },
    ignoreCase: {
      description: "Controls whether sorting should be case-sensitive or not.",
      type: "boolean"
    },
    specialCharacters: {
      description: "Controls how special characters should be handled before sorting.",
      type: "string",
      enum: ["remove", "trim", "keep"]
    },
    groupKind: {
      description: "Specifies top-level groups.",
      enum: ["mixed", "literals-first", "spreads-first"],
      type: "string"
    },
    partitionByComment: {
      description: "Allows you to use comments to separate the array members into logical groups.",
      anyOf: [
        {
          type: "array",
          items: {
            type: "string"
          }
        },
        {
          type: "boolean"
        },
        {
          type: "string"
        }
      ]
    },
    partitionByNewLine: {
      description: "Allows to use spaces to separate the nodes into logical groups.",
      type: "boolean"
    }
  },
  additionalProperties: false
};
var sortArrayIncludes = createEslintRule({
  name: "sort-array-includes",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted arrays before include method."
    },
    fixable: "code",
    schema: [jsonSchema],
    messages: {
      unexpectedArrayIncludesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      groupKind: "literals-first",
      partitionByComment: false,
      partitionByNewLine: false
    }
  ],
  create: (context) => ({
    MemberExpression: (node) => {
      if ((node.object.type === "ArrayExpression" || node.object.type === "NewExpression") && node.property.type === "Identifier" && node.property.name === "includes") {
        let elements = node.object.type === "ArrayExpression" ? node.object.elements : node.object.arguments;
        sortArray(context, "unexpectedArrayIncludesOrder", elements);
      }
    }
  })
});
var sortArray = (context, messageId, elements) => {
  let settings = getSettings(context.settings);
  if (elements.length > 1) {
    let options = complete(context.options.at(0), settings, {
      groupKind: "literals-first",
      type: "alphabetical",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      order: "asc",
      partitionByComment: false,
      partitionByNewLine: false
    });
    let sourceCode = getSourceCode(context);
    let partitionComment = options.partitionByComment;
    let formattedMembers = elements.reduce(
      (accumulator, element) => {
        var _a;
        if (element !== null) {
          let group = "unknown";
          if (typeof options.groupKind === "string") {
            group = element.type === "SpreadElement" ? "spread" : "literal";
          }
          let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
          let sortingNode = {
            name: element.type === "Literal" ? `${element.value}` : sourceCode.text.slice(...element.range),
            size: rangeToDiff(element.range),
            node: element,
            group
          };
          if (partitionComment && hasPartitionComment(
            partitionComment,
            getCommentsBefore(element, sourceCode),
            options.matcher
          ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
            accumulator.push([]);
          }
          accumulator.at(-1).push(sortingNode);
        }
        return accumulator;
      },
      [[]]
    );
    for (let nodes of formattedMembers) {
      pairwise(nodes, (left, right) => {
        let groupKindOrder = ["unknown"];
        if (typeof options.groupKind === "string") {
          groupKindOrder = options.groupKind === "literals-first" ? ["literal", "spread"] : ["spread", "literal"];
        }
        let leftNum = getGroupNumber(groupKindOrder, left);
        let rightNum = getGroupNumber(groupKindOrder, right);
        if (options.groupKind !== "mixed" && leftNum > rightNum || (options.groupKind === "mixed" || leftNum === rightNum) && isPositive(compare(left, right, options))) {
          context.report({
            messageId,
            data: {
              left: toSingleLine(left.name),
              right: toSingleLine(right.name)
            },
            node: right.node,
            fix: (fixer) => {
              let sortedNodes = options.groupKind !== "mixed" ? groupKindOrder.map((group) => nodes.filter((n) => n.group === group)).map((groupedNodes) => sortNodes(groupedNodes, options)).flat() : sortNodes(nodes, options);
              return makeFixes(fixer, nodes, sortedNodes, sourceCode, options);
            }
          });
        }
      });
    }
  }
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-vue-attributes.mjs
import path4 from "node:path";
var sortVueAttributes = createEslintRule({
  name: "sort-vue-attributes",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted Vue attributes."
    },
    fixable: "code",
    deprecated: true,
    replacedBy: ["vue/attributes-order"],
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedVueAttributesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedVueAttributesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => {
    let sourceCode = getSourceCode(context);
    if (path4.extname(context.filename) !== ".vue") {
      return {};
    }
    if (!("defineTemplateBodyVisitor" in sourceCode.parserServices)) {
      return {};
    }
    let { defineTemplateBodyVisitor } = sourceCode.parserServices;
    return defineTemplateBodyVisitor({
      VStartTag: (node) => {
        if (node.attributes.length > 1) {
          let settings = context.settings.perfectionist;
          let options = complete(context.options.at(0), settings, {
            type: "alphabetical",
            ignoreCase: true,
            specialCharacters: "keep",
            customGroups: {},
            matcher: "minimatch",
            order: "asc",
            groups: []
          });
          validateGroupsConfiguration(
            options.groups,
            ["multiline", "shorthand", "unknown"],
            Object.keys(options.customGroups)
          );
          let parts = node.attributes.reduce(
            (accumulator, attribute) => {
              if (attribute.key.type === "VDirectiveKey" && attribute.key.name.rawName === "bind") {
                accumulator.push([]);
                return accumulator;
              }
              let name2;
              let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
              if (typeof attribute.key.name === "string" && attribute.key.type !== "VDirectiveKey") {
                name2 = attribute.key.rawName;
              } else {
                name2 = sourceCode.text.slice(...attribute.key.range);
              }
              setCustomGroups(options.customGroups, name2);
              if (attribute.value === null) {
                defineGroup("shorthand");
              }
              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup("multiline");
              }
              accumulator.at(-1).push({
                node: attribute,
                size: rangeToDiff(attribute.range),
                group: getGroup(),
                name: name2
              });
              return accumulator;
            },
            [[]]
          );
          for (let nodes of parts) {
            let sortedNodes = sortNodesByGroups(nodes, options);
            pairwise(nodes, (left, right) => {
              let indexOfLeft = sortedNodes.indexOf(left);
              let indexOfRight = sortedNodes.indexOf(right);
              if (indexOfLeft > indexOfRight) {
                let leftNum = getGroupNumber(options.groups, left);
                let rightNum = getGroupNumber(options.groups, right);
                context.report({
                  messageId: leftNum !== rightNum ? "unexpectedVueAttributesGroupOrder" : "unexpectedVueAttributesOrder",
                  data: {
                    left: left.name,
                    leftGroup: left.group,
                    right: right.name,
                    rightGroup: right.group
                  },
                  node: right.node,
                  fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode)
                });
              }
            });
          }
        }
      }
    });
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-named-imports.mjs
var sortNamedImports = createEslintRule({
  name: "sort-named-imports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted named imports."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          ignoreAlias: {
            description: "Controls whether to ignore alias names.",
            type: "boolean"
          },
          groupKind: {
            description: "Specifies top-level groups.",
            enum: ["mixed", "values-first", "types-first"],
            type: "string"
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the named imports members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedNamedImportsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreAlias: false,
      ignoreCase: true,
      specialCharacters: "keep",
      partitionByNewLine: false,
      partitionByComment: false,
      groupKind: "mixed"
    }
  ],
  create: (context) => ({
    ImportDeclaration: (node) => {
      var _a;
      let specifiers = node.specifiers.filter(
        ({ type }) => type === "ImportSpecifier"
      );
      if (specifiers.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          type: "alphabetical",
          ignoreAlias: false,
          groupKind: "mixed",
          ignoreCase: true,
          specialCharacters: "keep",
          matcher: "minimatch",
          partitionByNewLine: false,
          partitionByComment: false,
          order: "asc"
        });
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        let formattedMembers = [[]];
        for (let specifier of specifiers) {
          let group;
          let { name: name2 } = specifier.local;
          if (specifier.type === "ImportSpecifier" && options.ignoreAlias) {
            ;
            ({ name: name2 } = specifier.imported);
          }
          if (specifier.type === "ImportSpecifier" && specifier.importKind === "type") {
            group = "type";
          } else {
            group = "value";
          }
          let lastSortingNode = (_a = formattedMembers.at(-1)) == null ? void 0 : _a.at(-1);
          let sortingNode = {
            size: rangeToDiff(specifier.range),
            node: specifier,
            group,
            name: name2
          };
          if (partitionComment && hasPartitionComment(
            partitionComment,
            getCommentsBefore(specifier, sourceCode),
            options.matcher
          ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
            formattedMembers.push([]);
          }
          formattedMembers.at(-1).push(sortingNode);
        }
        let shouldGroupByKind = options.groupKind !== "mixed";
        let groupKindOrder = options.groupKind === "values-first" ? ["value", "type"] : ["type", "value"];
        for (let nodes of formattedMembers) {
          pairwise(nodes, (left, right) => {
            let leftNum = getGroupNumber(groupKindOrder, left);
            let rightNum = getGroupNumber(groupKindOrder, right);
            if (shouldGroupByKind && leftNum > rightNum || (!shouldGroupByKind || leftNum === rightNum) && isPositive(compare(left, right, options))) {
              let sortedNodes = shouldGroupByKind ? groupKindOrder.map((group) => nodes.filter((n) => n.group === group)).map((groupedNodes) => sortNodes(groupedNodes, options)).flat() : sortNodes(nodes, options);
              context.report({
                messageId: "unexpectedNamedImportsOrder",
                data: {
                  left: left.name,
                  right: right.name
                },
                node: right.node,
                fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
              });
            }
          });
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-named-exports.mjs
var sortNamedExports = createEslintRule({
  name: "sort-named-exports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted named exports."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groupKind: {
            description: "Specifies top-level groups.",
            enum: ["mixed", "values-first", "types-first"],
            type: "string"
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the named exports members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedNamedExportsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByNewLine: false,
      partitionByComment: false,
      groupKind: "mixed"
    }
  ],
  create: (context) => ({
    ExportNamedDeclaration: (node) => {
      var _a;
      if (node.specifiers.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          type: "alphabetical",
          groupKind: "mixed",
          ignoreCase: true,
          specialCharacters: "keep",
          matcher: "minimatch",
          partitionByNewLine: false,
          partitionByComment: false,
          order: "asc"
        });
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        let formattedMembers = [[]];
        for (let specifier of node.specifiers) {
          let group;
          if (specifier.exportKind === "type") {
            group = "type";
          } else {
            group = "value";
          }
          let lastSortingNode = (_a = formattedMembers.at(-1)) == null ? void 0 : _a.at(-1);
          let sortingNode = {
            size: rangeToDiff(specifier.range),
            name: specifier.local.name,
            node: specifier,
            group
          };
          if (partitionComment && hasPartitionComment(
            partitionComment,
            getCommentsBefore(specifier, sourceCode),
            options.matcher
          ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
            formattedMembers.push([]);
          }
          formattedMembers.at(-1).push(sortingNode);
        }
        let shouldGroupByKind = options.groupKind !== "mixed";
        let groupKindOrder = options.groupKind === "values-first" ? ["value", "type"] : ["type", "value"];
        for (let nodes of formattedMembers) {
          pairwise(nodes, (left, right) => {
            let leftNum = getGroupNumber(groupKindOrder, left);
            let rightNum = getGroupNumber(groupKindOrder, right);
            if (shouldGroupByKind && leftNum > rightNum || (!shouldGroupByKind || leftNum === rightNum) && isPositive(compare(left, right, options))) {
              let sortedNodes = shouldGroupByKind ? groupKindOrder.map((group) => nodes.filter((n) => n.group === group)).map((groupedNodes) => sortNodes(groupedNodes, options)).flat() : sortNodes(nodes, options);
              context.report({
                messageId: "unexpectedNamedExportsOrder",
                data: {
                  left: left.name,
                  right: right.name
                },
                node: right.node,
                fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
              });
            }
          });
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-object-types.mjs
var sortObjectTypes = createEslintRule({
  name: "sort-object-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted object types."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the type members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          },
          groupKind: {
            description: "Specifies top-level groups.",
            type: "string",
            enum: ["mixed", "required-first", "optional-first"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedObjectTypesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedObjectTypesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false,
      groupKind: "mixed",
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => ({
    TSTypeLiteral: (node) => {
      if (node.members.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          partitionByComment: false,
          partitionByNewLine: false,
          type: "alphabetical",
          groupKind: "mixed",
          matcher: "minimatch",
          ignoreCase: true,
          specialCharacters: "keep",
          customGroups: {},
          order: "asc",
          groups: []
        });
        validateGroupsConfiguration(
          options.groups,
          ["multiline", "method", "unknown"],
          Object.keys(options.customGroups)
        );
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        let formattedMembers = node.members.reduce(
          (accumulator, member) => {
            var _a, _b, _c, _d, _e;
            let name2;
            let raw = sourceCode.text.slice(
              member.range.at(0),
              member.range.at(1)
            );
            let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
            let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
            let formatName = (value) => value.replace(/([,;])$/, "");
            if (member.type === "TSPropertySignature") {
              if (member.key.type === "Identifier") {
                ;
                ({ name: name2 } = member.key);
              } else if (member.key.type === "Literal") {
                name2 = `${member.key.value}`;
              } else {
                name2 = sourceCode.text.slice(
                  member.range.at(0),
                  (_b = member.typeAnnotation) == null ? void 0 : _b.range.at(0)
                );
              }
            } else if (member.type === "TSIndexSignature") {
              let endIndex = ((_c = member.typeAnnotation) == null ? void 0 : _c.range.at(0)) ?? member.range.at(1);
              name2 = formatName(
                sourceCode.text.slice(member.range.at(0), endIndex)
              );
            } else {
              name2 = formatName(
                sourceCode.text.slice(member.range.at(0), member.range.at(1))
              );
            }
            setCustomGroups(options.customGroups, name2);
            if (member.type === "TSMethodSignature" || member.type === "TSPropertySignature" && ((_d = member.typeAnnotation) == null ? void 0 : _d.typeAnnotation.type) === "TSFunctionType") {
              defineGroup("method");
            }
            if (member.loc.start.line !== member.loc.end.line) {
              defineGroup("multiline");
            }
            let endsWithComma = raw.endsWith(";") || raw.endsWith(",");
            let endSize = endsWithComma ? 1 : 0;
            let sortingNode = {
              size: rangeToDiff(member.range) - endSize,
              group: getGroup(),
              node: member,
              name: name2
            };
            if (partitionComment && hasPartitionComment(
              partitionComment,
              getCommentsBefore(member, sourceCode),
              options.matcher
            ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
              accumulator.push([]);
            }
            ;
            (_e = accumulator.at(-1)) == null ? void 0 : _e.push(sortingNode);
            return accumulator;
          },
          [[]]
        );
        for (let nodes of formattedMembers) {
          let groupedByKind;
          if (options.groupKind !== "mixed") {
            groupedByKind = nodes.reduce(
              (accumulator, currentNode) => {
                let requiredIndex = options.groupKind === "required-first" ? 0 : 1;
                let optionalIndex = options.groupKind === "required-first" ? 1 : 0;
                if ("optional" in currentNode.node && currentNode.node.optional) {
                  accumulator[optionalIndex].push(currentNode);
                } else {
                  accumulator[requiredIndex].push(currentNode);
                }
                return accumulator;
              },
              [[], []]
            );
          } else {
            groupedByKind = [nodes];
          }
          let sortedNodes = [];
          for (let nodesByKind of groupedByKind) {
            sortedNodes.push(...sortNodesByGroups(nodesByKind, options));
          }
          pairwise(nodes, (left, right) => {
            let indexOfLeft = sortedNodes.indexOf(left);
            let indexOfRight = sortedNodes.indexOf(right);
            if (indexOfLeft > indexOfRight) {
              let leftNum = getGroupNumber(options.groups, left);
              let rightNum = getGroupNumber(options.groups, right);
              context.report({
                messageId: leftNum !== rightNum ? "unexpectedObjectTypesGroupOrder" : "unexpectedObjectTypesOrder",
                data: {
                  left: toSingleLine(left.name),
                  leftGroup: left.group,
                  right: toSingleLine(right.name),
                  rightGroup: right.group
                },
                node: right.node,
                fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
              });
            }
          });
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-switch-case.mjs
var sortSwitchCase = createEslintRule({
  name: "sort-switch-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted switch cases."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedSwitchCaseOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep"
    }
  ],
  create: (context) => ({
    SwitchStatement: (node) => {
      let settings = getSettings(context.settings);
      let options = complete(context.options.at(0), settings, {
        type: "alphabetical",
        ignoreCase: true,
        specialCharacters: "keep",
        order: "asc"
      });
      let sourceCode = getSourceCode(context);
      let isDiscriminantTrue = node.discriminant.type === "Literal" && node.discriminant.value === true;
      let isCasesHasBreak = node.cases.filter((caseNode) => caseNode.test !== null).every(
        (caseNode) => caseNode.consequent.length === 0 || caseNode.consequent.some(
          (currentConsequent) => currentConsequent.type === "BreakStatement" || currentConsequent.type === "ReturnStatement" || currentConsequent.type === "BlockStatement"
        )
      );
      if (!isDiscriminantTrue && isCasesHasBreak) {
        let nodes = node.cases.map((caseNode) => {
          var _a, _b;
          let name2;
          let isDefaultClause = false;
          if (((_a = caseNode.test) == null ? void 0 : _a.type) === "Literal") {
            name2 = `${caseNode.test.value}`;
          } else if (caseNode.test === null) {
            name2 = "default";
            isDefaultClause = true;
          } else {
            name2 = sourceCode.text.slice(...caseNode.test.range);
          }
          return {
            size: rangeToDiff(
              ((_b = caseNode.test) == null ? void 0 : _b.range) ?? caseNode.range
            ),
            node: caseNode,
            isDefaultClause,
            name: name2
          };
        });
        pairwise(nodes, (left, right, iteration) => {
          let compareValue;
          let lefter = nodes.at(iteration - 1);
          let isCaseGrouped = (lefter == null ? void 0 : lefter.node.consequent.length) === 0 && left.node.consequent.length !== 0;
          let isGroupContainsDefault = (group) => group.some((currentNode) => currentNode.isDefaultClause);
          let leftCaseGroup = [left];
          let rightCaseGroup = [right];
          for (let i = iteration - 1; i >= 0; i--) {
            if (nodes.at(i).node.consequent.length === 0) {
              leftCaseGroup.unshift(nodes.at(i));
            } else {
              break;
            }
          }
          if (right.node.consequent.length === 0) {
            for (let i = iteration + 1; i < nodes.length; i++) {
              if (nodes.at(i).node.consequent.length === 0) {
                rightCaseGroup.push(nodes.at(i));
              } else {
                rightCaseGroup.push(nodes.at(i));
                break;
              }
            }
          }
          if (isGroupContainsDefault(leftCaseGroup)) {
            compareValue = true;
          } else if (isGroupContainsDefault(rightCaseGroup)) {
            compareValue = false;
          } else if (isCaseGrouped) {
            compareValue = isPositive(compare(leftCaseGroup[0], right, options));
          } else {
            compareValue = isPositive(compare(left, right, options));
          }
          if (compareValue) {
            context.report({
              messageId: "unexpectedSwitchCaseOrder",
              data: {
                left: left.name,
                right: right.name
              },
              node: right.node,
              fix: (fixer) => {
                let additionalFixes = [];
                let nodeGroups = nodes.reduce(
                  (accumulator, currentNode, index2) => {
                    var _a;
                    if (index2 === 0) {
                      accumulator.at(-1).push(currentNode);
                    } else if (((_a = accumulator.at(-1).at(-1)) == null ? void 0 : _a.node.consequent.length) === 0) {
                      accumulator.at(-1).push(currentNode);
                    } else {
                      accumulator.push([currentNode]);
                    }
                    return accumulator;
                  },
                  [[]]
                );
                let sortedNodeGroups = nodeGroups.map((group) => {
                  var _a, _b;
                  let sortedGroup = sortNodes(group, options).sort((a, b) => {
                    if (b.isDefaultClause) {
                      return -1;
                    }
                    return 1;
                  });
                  if (group.at(-1).name !== sortedGroup.at(-1).name) {
                    let consequentNodeIndex = sortedGroup.findIndex(
                      (currentNode) => currentNode.node.consequent.length !== 0
                    );
                    let firstSortedNodeConsequent = sortedGroup.at(consequentNodeIndex).node.consequent;
                    let consequentStart = (_a = firstSortedNodeConsequent.at(0)) == null ? void 0 : _a.range.at(0);
                    let consequentEnd = (_b = firstSortedNodeConsequent.at(-1)) == null ? void 0 : _b.range.at(1);
                    let lastNode = group.at(-1).node;
                    if (consequentStart && consequentEnd && lastNode.test) {
                      lastNode.range = [
                        lastNode.range.at(0),
                        lastNode.test.range.at(1) + 1
                      ];
                      additionalFixes.push(
                        ...makeFixes(fixer, group, sortedGroup, sourceCode),
                        fixer.removeRange([
                          lastNode.range.at(1),
                          consequentEnd
                        ]),
                        fixer.insertTextAfter(
                          lastNode,
                          sourceCode.text.slice(
                            lastNode.range.at(1),
                            consequentEnd
                          )
                        )
                      );
                    }
                  }
                  return sortedGroup;
                }).sort((a, b) => {
                  if (isGroupContainsDefault(a)) {
                    return 1;
                  } else if (isGroupContainsDefault(b)) {
                    return -1;
                  }
                  return compare(a.at(0), b.at(0), options);
                });
                let sortedNodes = sortedNodeGroups.flat();
                for (let max = sortedNodes.length, i = 0; i < max; i++) {
                  if (sortedNodes.at(i).isDefaultClause) {
                    sortedNodes.push(sortedNodes.splice(i, 1).at(0));
                  }
                }
                if (additionalFixes.length) {
                  return additionalFixes;
                }
                return makeFixes(fixer, nodes, sortedNodes, sourceCode);
              }
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-union-types.mjs
var sortUnionTypes = createEslintRule({
  name: "sort-union-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted union types."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the union types into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedUnionTypesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedUnionTypesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByNewLine: false,
      partitionByComment: false,
      groups: []
    }
  ],
  create: (context) => ({
    TSUnionType: (node) => {
      let settings = getSettings(context.settings);
      let options = complete(context.options.at(0), settings, {
        type: "alphabetical",
        ignoreCase: true,
        specialCharacters: "keep",
        order: "asc",
        groups: [],
        matcher: "minimatch",
        partitionByNewLine: false,
        partitionByComment: false
      });
      validateGroupsConfiguration(
        options.groups,
        [
          "intersection",
          "conditional",
          "function",
          "operator",
          "keyword",
          "literal",
          "nullish",
          "unknown",
          "import",
          "object",
          "named",
          "tuple",
          "union"
        ],
        []
      );
      let sourceCode = getSourceCode(context);
      let partitionComment = options.partitionByComment;
      let formattedMembers = node.types.reduce(
        (accumulator, type) => {
          var _a, _b;
          let { getGroup, defineGroup } = useGroups(options);
          switch (type.type) {
            case "TSConditionalType":
              defineGroup("conditional");
              break;
            case "TSConstructorType":
            case "TSFunctionType":
              defineGroup("function");
              break;
            case "TSImportType":
              defineGroup("import");
              break;
            case "TSIntersectionType":
              defineGroup("intersection");
              break;
            case "TSAnyKeyword":
            case "TSBigIntKeyword":
            case "TSBooleanKeyword":
            case "TSNeverKeyword":
            case "TSNumberKeyword":
            case "TSObjectKeyword":
            case "TSStringKeyword":
            case "TSSymbolKeyword":
            case "TSThisType":
            case "TSUnknownKeyword":
            case "TSIntrinsicKeyword":
              defineGroup("keyword");
              break;
            case "TSLiteralType":
            case "TSTemplateLiteralType":
              defineGroup("literal");
              break;
            case "TSArrayType":
            case "TSIndexedAccessType":
            case "TSInferType":
            case "TSTypeReference":
            case "TSQualifiedName":
              defineGroup("named");
              break;
            case "TSMappedType":
            case "TSTypeLiteral":
              defineGroup("object");
              break;
            case "TSTypeQuery":
            case "TSTypeOperator":
              defineGroup("operator");
              break;
            case "TSTupleType":
              defineGroup("tuple");
              break;
            case "TSUnionType":
              defineGroup("union");
              break;
            case "TSNullKeyword":
            case "TSUndefinedKeyword":
            case "TSVoidKeyword":
              defineGroup("nullish");
              break;
          }
          let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
          let sortingNode = {
            name: sourceCode.text.slice(...type.range),
            size: rangeToDiff(type.range),
            group: getGroup(),
            node: type
          };
          if (partitionComment && hasPartitionComment(
            partitionComment,
            getCommentsBefore(type, sourceCode),
            options.matcher
          ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
            accumulator.push([]);
          }
          ;
          (_b = accumulator.at(-1)) == null ? void 0 : _b.push(sortingNode);
          return accumulator;
        },
        [[]]
      );
      for (let nodes of formattedMembers) {
        let sortedNodes = sortNodesByGroups(nodes, options);
        pairwise(nodes, (left, right) => {
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          if (indexOfLeft > indexOfRight) {
            let leftNum = getGroupNumber(options.groups, left);
            let rightNum = getGroupNumber(options.groups, right);
            context.report({
              messageId: leftNum !== rightNum ? "unexpectedUnionTypesGroupOrder" : "unexpectedUnionTypesOrder",
              data: {
                left: toSingleLine(left.name),
                leftGroup: left.group,
                right: toSingleLine(right.name),
                rightGroup: right.group
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/is-member-optional.mjs
var import_types = __toESM(require_dist(), 1);
var isMemberOptional = (node) => {
  switch (node.type) {
    case import_types.AST_NODE_TYPES.TSMethodSignature:
    case import_types.AST_NODE_TYPES.TSPropertySignature:
      return node.optional;
  }
  return false;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-interfaces.mjs
var sortInterfaces = createEslintRule({
  name: "sort-interfaces",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted interface properties."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          ignorePattern: {
            description: "Specifies names or patterns for nodes that should be ignored by rule.",
            items: {
              type: "string"
            },
            type: "array"
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the interface properties into logical groups.",
            anyOf: [
              {
                type: "boolean"
              },
              {
                type: "string"
              },
              {
                type: "array",
                items: {
                  type: "string"
                }
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          },
          groupKind: {
            description: "Specifies the order of optional and required nodes.",
            enum: ["mixed", "optional-first", "required-first"],
            type: "string"
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedInterfacePropertiesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedInterfacePropertiesOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      ignorePattern: [],
      partitionByComment: false,
      partitionByNewLine: false,
      groupKind: "mixed",
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => ({
    TSInterfaceDeclaration: (node) => {
      if (node.body.body.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          partitionByComment: false,
          partitionByNewLine: false,
          type: "alphabetical",
          groupKind: "mixed",
          matcher: "minimatch",
          ignorePattern: [],
          ignoreCase: true,
          specialCharacters: "keep",
          customGroups: {},
          order: "asc",
          groups: []
        });
        validateGroupsConfiguration(
          options.groups,
          ["multiline", "method", "unknown"],
          Object.keys(options.customGroups)
        );
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        if (!options.ignorePattern.some(
          (pattern) => matches(node.id.name, pattern, options.matcher)
        )) {
          let formattedMembers = node.body.body.reduce(
            (accumulator, element) => {
              var _a, _b, _c, _d, _e;
              if (element.type === "TSCallSignatureDeclaration") {
                accumulator.push([]);
                return accumulator;
              }
              let lastElement = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
              let name2;
              let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
              if (element.type === "TSPropertySignature") {
                if (element.key.type === "Identifier") {
                  ;
                  ({ name: name2 } = element.key);
                } else if (element.key.type === "Literal") {
                  name2 = `${element.key.value}`;
                } else {
                  let end = ((_b = element.typeAnnotation) == null ? void 0 : _b.range.at(0)) ?? element.range.at(1) - (element.optional ? "?".length : 0);
                  name2 = sourceCode.text.slice(element.range.at(0), end);
                }
              } else if (element.type === "TSIndexSignature") {
                let endIndex = ((_c = element.typeAnnotation) == null ? void 0 : _c.range.at(0)) ?? element.range.at(1);
                name2 = sourceCode.text.slice(element.range.at(0), endIndex);
              } else {
                let endIndex = ((_d = element.returnType) == null ? void 0 : _d.range.at(0)) ?? element.range.at(1);
                name2 = sourceCode.text.slice(element.range.at(0), endIndex);
              }
              setCustomGroups(options.customGroups, name2);
              if (element.type === "TSMethodSignature" || element.type === "TSPropertySignature" && ((_e = element.typeAnnotation) == null ? void 0 : _e.typeAnnotation.type) === "TSFunctionType") {
                defineGroup("method");
              }
              if (element.loc.start.line !== element.loc.end.line) {
                defineGroup("multiline");
              }
              let elementSortingNode = {
                size: rangeToDiff(element.range),
                node: element,
                group: getGroup(),
                name: name2
              };
              if (partitionComment && hasPartitionComment(
                partitionComment,
                getCommentsBefore(element, sourceCode),
                options.matcher
              ) || options.partitionByNewLine && lastElement && getLinesBetween(sourceCode, lastElement, elementSortingNode)) {
                accumulator.push([]);
              }
              accumulator.at(-1).push(elementSortingNode);
              return accumulator;
            },
            [[]]
          );
          let { groupKind } = options;
          for (let nodes of formattedMembers) {
            let sortedNodes;
            if (groupKind !== "mixed") {
              let optionalNodes = nodes.filter(
                (member) => isMemberOptional(member.node)
              );
              let requiredNodes = nodes.filter(
                (member) => !isMemberOptional(member.node)
              );
              sortedNodes = groupKind === "optional-first" ? [
                ...sortNodesByGroups(optionalNodes, options),
                ...sortNodesByGroups(requiredNodes, options)
              ] : [
                ...sortNodesByGroups(requiredNodes, options),
                ...sortNodesByGroups(optionalNodes, options)
              ];
            } else {
              sortedNodes = sortNodesByGroups(nodes, options);
            }
            pairwise(nodes, (left, right) => {
              let indexOfLeft = sortedNodes.indexOf(left);
              let indexOfRight = sortedNodes.indexOf(right);
              if (indexOfLeft > indexOfRight) {
                let leftNum = getGroupNumber(options.groups, left);
                let rightNum = getGroupNumber(options.groups, right);
                context.report({
                  messageId: leftNum !== rightNum ? "unexpectedInterfacePropertiesGroupOrder" : "unexpectedInterfacePropertiesOrder",
                  data: {
                    left: toSingleLine(left.name),
                    leftGroup: left.group,
                    right: toSingleLine(right.name),
                    rightGroup: right.group
                  },
                  node: right.node,
                  fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
                });
              }
            });
          }
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-jsx-props.mjs
var sortJsxProps = createEslintRule({
  name: "sort-jsx-props",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted JSX props."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          ignorePattern: {
            description: "Specifies names or patterns for nodes that should be ignored by rule.",
            items: {
              type: "string"
            },
            type: "array"
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedJSXPropsGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedJSXPropsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      ignorePattern: [],
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => ({
    JSXElement: (node) => {
      if (node.openingElement.attributes.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          type: "alphabetical",
          ignorePattern: [],
          ignoreCase: true,
          specialCharacters: "keep",
          matcher: "minimatch",
          customGroups: {},
          order: "asc",
          groups: []
        });
        validateGroupsConfiguration(
          options.groups,
          ["multiline", "shorthand", "unknown"],
          Object.keys(options.customGroups)
        );
        let sourceCode = getSourceCode(context);
        let shouldIgnore = false;
        if (options.ignorePattern.length) {
          let tagName = sourceCode.text.slice(...node.openingElement.name.range);
          shouldIgnore = options.ignorePattern.some(
            (pattern) => matches(tagName, pattern, options.matcher)
          );
        }
        if (!shouldIgnore && node.openingElement.attributes.length > 1) {
          let parts = node.openingElement.attributes.reduce(
            (accumulator, attribute) => {
              if (attribute.type === "JSXSpreadAttribute") {
                accumulator.push([]);
                return accumulator;
              }
              let name2 = attribute.name.type === "JSXNamespacedName" ? `${attribute.name.namespace.name}:${attribute.name.name.name}` : attribute.name.name;
              let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
              setCustomGroups(options.customGroups, name2);
              if (attribute.value === null) {
                defineGroup("shorthand");
              }
              if (attribute.loc.start.line !== attribute.loc.end.line) {
                defineGroup("multiline");
              }
              let jsxNode = {
                size: rangeToDiff(attribute.range),
                group: getGroup(),
                node: attribute,
                name: name2
              };
              accumulator.at(-1).push(jsxNode);
              return accumulator;
            },
            [[]]
          );
          for (let nodes of parts) {
            let sortedNodes = sortNodesByGroups(nodes, options);
            pairwise(nodes, (left, right) => {
              let indexOfLeft = sortedNodes.indexOf(left);
              let indexOfRight = sortedNodes.indexOf(right);
              if (indexOfLeft > indexOfRight) {
                let leftNum = getGroupNumber(options.groups, left);
                let rightNum = getGroupNumber(options.groups, right);
                context.report({
                  messageId: leftNum !== rightNum ? "unexpectedJSXPropsGroupOrder" : "unexpectedJSXPropsOrder",
                  data: {
                    left: left.name,
                    leftGroup: left.group,
                    right: right.name,
                    rightGroup: right.group
                  },
                  node: right.node,
                  fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode)
                });
              }
            });
          }
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-classes.types.mjs
var allSelectors = [
  "accessor-property",
  "index-signature",
  "constructor",
  "static-block",
  "get-method",
  "set-method",
  "function-property",
  "property",
  "method"
];
var allModifiers = [
  "protected",
  "private",
  "public",
  "static",
  "abstract",
  "override",
  "readonly",
  "decorated",
  "declare",
  "optional"
];
var customGroupSortJsonSchema = {
  type: {
    description: "Custom group sort type.",
    type: "string",
    enum: ["alphabetical", "line-length", "natural", "unsorted"]
  },
  order: {
    description: "Custom group sort order.",
    type: "string",
    enum: ["desc", "asc"]
  }
};
var customGroupNameJsonSchema = {
  groupName: {
    description: "Custom group name.",
    type: "string"
  }
};
var singleCustomGroupJsonSchema = {
  selector: {
    description: "Selector filter.",
    type: "string",
    enum: allSelectors
  },
  modifiers: {
    description: "Modifier filters.",
    type: "array",
    items: {
      type: "string",
      enum: allModifiers
    }
  },
  elementNamePattern: {
    description: "Element name pattern filter.",
    type: "string"
  },
  elementValuePattern: {
    description: "Element value pattern filter for properties.",
    type: "string"
  },
  decoratorNamePattern: {
    description: "Decorator name pattern filter.",
    type: "string"
  }
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-classes-utils.mjs
var cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map();
var generateOfficialGroups = (modifiers, selectors) => {
  let modifiersAndSelectorsKey = modifiers.join("&") + "/" + selectors.join("&");
  let cachedValue = cachedGroupsByModifiersAndSelectors.get(
    modifiersAndSelectorsKey
  );
  if (cachedValue) {
    return cachedValue;
  }
  let allModifiersCombinations = [];
  for (let i = modifiers.length; i > 0; i--) {
    allModifiersCombinations = [
      ...allModifiersCombinations,
      ...getCombinations(modifiers, i)
    ];
  }
  let allModifiersCombinationPermutations = allModifiersCombinations.flatMap(
    (result) => getPermutations(result)
  );
  let returnValue = [];
  for (let selector of selectors) {
    returnValue = [
      ...returnValue,
      ...allModifiersCombinationPermutations.map(
        (modifiersCombinationPermutation) => [...modifiersCombinationPermutation, selector].join("-")
      ),
      selector
    ];
  }
  cachedGroupsByModifiersAndSelectors.set(modifiersAndSelectorsKey, returnValue);
  return returnValue;
};
var getCombinations = (array, n) => {
  let result = [];
  let backtrack = (start, comb) => {
    if (comb.length === n) {
      result.push([...comb]);
      return;
    }
    for (let i = start; i < array.length; i++) {
      comb.push(array[i]);
      backtrack(i + 1, comb);
      comb.pop();
    }
  };
  backtrack(0, []);
  return result;
};
var getPermutations = (elements) => {
  let result = [];
  let backtrack = (first) => {
    if (first === elements.length) {
      result.push([...elements]);
      return;
    }
    for (let i = first; i < elements.length; i++) {
      ;
      [elements[first], elements[i]] = [elements[i], elements[first]];
      backtrack(first + 1);
      [elements[first], elements[i]] = [elements[i], elements[first]];
    }
  };
  backtrack(0);
  return result;
};
var getOverloadSignatureGroups = (members) => {
  let methods = members.filter(
    (member) => member.type === "MethodDefinition" || member.type === "TSAbstractMethodDefinition"
  ).filter((member) => member.kind === "method");
  let staticOverloadSignaturesByName = /* @__PURE__ */ new Map();
  let overloadSignaturesByName = /* @__PURE__ */ new Map();
  for (let method of methods) {
    if (method.key.type !== "Identifier") {
      continue;
    }
    let { name: name2 } = method.key;
    let mapToUse = method.static ? staticOverloadSignaturesByName : overloadSignaturesByName;
    let signatureOverloadsGroup = mapToUse.get(name2);
    if (!signatureOverloadsGroup) {
      signatureOverloadsGroup = [];
      mapToUse.set(name2, signatureOverloadsGroup);
    }
    signatureOverloadsGroup.push(method);
  }
  return [
    ...overloadSignaturesByName.values(),
    ...staticOverloadSignaturesByName.values()
  ].filter((group) => group.length > 1);
};
var customGroupMatches = (props) => {
  if ("anyOf" in props.customGroup) {
    return props.customGroup.anyOf.some(
      (subgroup) => customGroupMatches({ ...props, customGroup: subgroup })
    );
  }
  if (props.customGroup.selector && !props.selectors.includes(props.customGroup.selector)) {
    return false;
  }
  if (props.customGroup.modifiers) {
    for (let modifier of props.customGroup.modifiers) {
      if (!props.modifiers.includes(modifier)) {
        return false;
      }
    }
  }
  if ("elementNamePattern" in props.customGroup && props.customGroup.elementNamePattern) {
    let matchesElementNamePattern = matches(
      props.elementName,
      props.customGroup.elementNamePattern,
      props.matcher
    );
    if (!matchesElementNamePattern) {
      return false;
    }
  }
  if ("elementValuePattern" in props.customGroup && props.customGroup.elementValuePattern) {
    let matchesElementValuePattern = matches(
      props.elementValue ?? "",
      props.customGroup.elementValuePattern,
      props.matcher
    );
    if (!matchesElementValuePattern) {
      return false;
    }
  }
  if ("decoratorNamePattern" in props.customGroup && props.customGroup.decoratorNamePattern) {
    let decoratorPattern = props.customGroup.decoratorNamePattern;
    let matchesDecoratorNamePattern = props.decorators.some(
      (decorator) => matches(decorator, decoratorPattern, props.matcher)
    );
    if (!matchesDecoratorNamePattern) {
      return false;
    }
  }
  return true;
};
var getCompareOptions = (options, groupNumber) => {
  let group = options.groups[groupNumber];
  let customGroup = typeof group === "string" && Array.isArray(options.customGroups) ? options.customGroups.find((g) => group === g.groupName) : null;
  if ((customGroup == null ? void 0 : customGroup.type) === "unsorted") {
    return null;
  }
  return {
    type: (customGroup == null ? void 0 : customGroup.type) ?? options.type,
    order: customGroup && "order" in customGroup && customGroup.order ? customGroup.order : options.order,
    specialCharacters: options.specialCharacters,
    ignoreCase: options.ignoreCase
  };
};
var validateGroupsConfiguration2 = (groups, customGroups) => {
  let availableCustomGroupNames = Array.isArray(customGroups) ? customGroups.map((customGroup) => customGroup.groupName) : Object.keys(customGroups);
  let invalidGroups = groups.flat().filter(
    (group) => !isPredefinedGroup(group) && !availableCustomGroupNames.includes(group)
  );
  if (invalidGroups.length) {
    throw new Error("Invalid group(s): " + invalidGroups.join(", "));
  }
  validateNoDuplicatedGroups(groups);
};
var isPredefinedGroup = (input) => {
  if (input === "unknown") {
    return true;
  }
  let singleWordSelector = input.split("-").at(-1);
  if (!singleWordSelector) {
    return false;
  }
  let twoWordsSelector = input.split("-").slice(-2).join("-");
  let isTwoWordSelectorValid = allSelectors.includes(twoWordsSelector);
  if (!allSelectors.includes(singleWordSelector) && !isTwoWordSelectorValid) {
    return false;
  }
  let modifiers = input.split("-").slice(0, isTwoWordSelectorValid ? -2 : -1);
  return new Set(modifiers).size === modifiers.length && modifiers.every((modifier) => allModifiers.includes(modifier));
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-classes.mjs
var sortClasses = createEslintRule({
  name: "sort-classes",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted classes."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows to use comments to separate the class members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            oneOf: [
              {
                type: "object",
                additionalProperties: {
                  oneOf: [
                    {
                      type: "string"
                    },
                    {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    }
                  ]
                }
              },
              {
                type: "array",
                items: {
                  description: "Advanced custom groups.",
                  oneOf: [
                    {
                      description: "Custom group block.",
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        ...customGroupNameJsonSchema,
                        ...customGroupSortJsonSchema,
                        anyOf: {
                          type: "array",
                          items: {
                            description: "Custom group.",
                            type: "object",
                            additionalProperties: false,
                            properties: {
                              ...singleCustomGroupJsonSchema
                            }
                          }
                        }
                      }
                    },
                    {
                      description: "Custom group.",
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        ...customGroupNameJsonSchema,
                        ...customGroupSortJsonSchema,
                        ...singleCustomGroupJsonSchema
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedClassesGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedClassesOrder: 'Expected "{{right}}" to come before "{{left}}".',
      unexpectedClassesDependencyOrder: 'Expected dependency "{{right}}" to come before "{{nodeDependentOnRight}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      groups: [
        "index-signature",
        "static-property",
        "static-block",
        ["protected-property", "protected-accessor-property"],
        ["private-property", "private-accessor-property"],
        ["property", "accessor-property"],
        "constructor",
        "static-method",
        "protected-method",
        "private-method",
        "method",
        ["get-method", "set-method"],
        "unknown"
      ],
      customGroups: []
    }
  ],
  create: (context) => ({
    ClassBody: (node) => {
      var _a;
      if (node.body.length > 1) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          groups: [
            "index-signature",
            "static-property",
            "static-block",
            ["protected-property", "protected-accessor-property"],
            ["private-property", "private-accessor-property"],
            ["property", "accessor-property"],
            "constructor",
            "static-method",
            "protected-method",
            "private-method",
            "method",
            ["get-method", "set-method"],
            "unknown"
          ],
          matcher: "minimatch",
          partitionByComment: false,
          type: "alphabetical",
          ignoreCase: true,
          specialCharacters: "keep",
          customGroups: [],
          order: "asc"
        });
        validateGroupsConfiguration2(options.groups, options.customGroups);
        let sourceCode = getSourceCode(context);
        let className = (_a = node.parent.id) == null ? void 0 : _a.name;
        let getDependencyName = (nodeName, isStatic) => `${isStatic ? "static " : ""}${nodeName}`;
        let classMethodsDependencyNames = new Set(
          node.body.map((member) => {
            if ((member.type === "MethodDefinition" || member.type === "TSAbstractMethodDefinition") && "name" in member.key) {
              return getDependencyName(member.key.name, member.static);
            }
            return null;
          }).filter((m) => m !== null)
        );
        let extractDependencies = (expression, isMemberStatic) => {
          let dependencies = [];
          let checkNode = (nodeValue) => {
            if (nodeValue.type === "MemberExpression" && (nodeValue.object.type === "ThisExpression" || nodeValue.object.type === "Identifier" && nodeValue.object.name === className) && nodeValue.property.type === "Identifier") {
              let isStaticDependency = isMemberStatic || nodeValue.object.type === "Identifier";
              let dependencyName = getDependencyName(
                nodeValue.property.name,
                isStaticDependency
              );
              if (!classMethodsDependencyNames.has(dependencyName)) {
                dependencies.push(dependencyName);
              }
            }
            if (nodeValue.type === "Property") {
              traverseNode(nodeValue.key);
              traverseNode(nodeValue.value);
            }
            if (nodeValue.type === "ConditionalExpression") {
              traverseNode(nodeValue.test);
              traverseNode(nodeValue.consequent);
              traverseNode(nodeValue.alternate);
            }
            if ("expression" in nodeValue && typeof nodeValue.expression !== "boolean") {
              traverseNode(nodeValue.expression);
            }
            if ("object" in nodeValue) {
              traverseNode(nodeValue.object);
            }
            if ("callee" in nodeValue) {
              traverseNode(nodeValue.callee);
            }
            if ("init" in nodeValue && nodeValue.init) {
              traverseNode(nodeValue.init);
            }
            if ("body" in nodeValue && nodeValue.body) {
              traverseNode(nodeValue.body);
            }
            if ("left" in nodeValue) {
              traverseNode(nodeValue.left);
            }
            if ("right" in nodeValue) {
              traverseNode(nodeValue.right);
            }
            if ("elements" in nodeValue) {
              nodeValue.elements.filter((currentNode) => currentNode !== null).forEach(traverseNode);
            }
            if ("argument" in nodeValue && nodeValue.argument) {
              traverseNode(nodeValue.argument);
            }
            if ("arguments" in nodeValue) {
              nodeValue.arguments.forEach(traverseNode);
            }
            if ("declarations" in nodeValue) {
              nodeValue.declarations.forEach(traverseNode);
            }
            if ("properties" in nodeValue) {
              nodeValue.properties.forEach(traverseNode);
            }
            if ("expressions" in nodeValue) {
              nodeValue.expressions.forEach(traverseNode);
            }
          };
          let traverseNode = (nodeValue) => {
            if (Array.isArray(nodeValue)) {
              nodeValue.forEach(traverseNode);
            } else {
              checkNode(nodeValue);
            }
          };
          traverseNode(expression);
          return dependencies;
        };
        let overloadSignatureGroups = getOverloadSignatureGroups(node.body);
        let formattedNodes = node.body.reduce(
          (accumulator, member) => {
            var _a2, _b, _c, _d;
            let comments = getCommentsBefore(member, sourceCode);
            if (options.partitionByComment && hasPartitionComment(
              options.partitionByComment,
              comments,
              options.matcher
            )) {
              accumulator.push([]);
            }
            let name2;
            let dependencies = [];
            let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
            if (member.type === "StaticBlock") {
              name2 = "static";
            } else if (member.type === "TSIndexSignature") {
              name2 = sourceCode.text.slice(
                member.range.at(0),
                ((_a2 = member.typeAnnotation) == null ? void 0 : _a2.range.at(0)) ?? member.range.at(1)
              );
            } else if (member.key.type === "Identifier") {
              ;
              ({ name: name2 } = member.key);
            } else {
              name2 = sourceCode.text.slice(...member.key.range);
            }
            let isPrivateHash = "key" in member && member.key.type === "PrivateIdentifier";
            let decorated = false;
            let decorators = [];
            if ("decorators" in member) {
              decorated = member.decorators.length > 0;
              for (let decorator of member.decorators) {
                if (decorator.expression.type === "Identifier") {
                  decorators.push(decorator.expression.name);
                } else if (decorator.expression.type === "CallExpression" && decorator.expression.callee.type === "Identifier") {
                  decorators.push(decorator.expression.callee.name);
                }
              }
            }
            let memberValue;
            let modifiers = [];
            let selectors = [];
            if (member.type === "MethodDefinition" || member.type === "TSAbstractMethodDefinition") {
              if (member.static) {
                modifiers.push("static");
              }
              if (member.type === "TSAbstractMethodDefinition") {
                modifiers.push("abstract");
              }
              if (decorated) {
                modifiers.push("decorated");
              }
              if (member.override) {
                modifiers.push("override");
              }
              if (member.accessibility === "protected") {
                modifiers.push("protected");
              } else if (member.accessibility === "private" || isPrivateHash) {
                modifiers.push("private");
              } else {
                modifiers.push("public");
              }
              if (member.optional) {
                modifiers.push("optional");
              }
              if (member.kind === "constructor") {
                selectors.push("constructor");
              }
              if (member.kind === "get") {
                selectors.push("get-method");
              }
              if (member.kind === "set") {
                selectors.push("set-method");
              }
              selectors.push("method");
            } else if (member.type === "TSIndexSignature") {
              if (member.static) {
                modifiers.push("static");
              }
              if (member.readonly) {
                modifiers.push("readonly");
              }
              selectors.push("index-signature");
            } else if (member.type === "StaticBlock") {
              selectors.push("static-block");
              dependencies = extractDependencies(member, true);
            } else if (member.type === "AccessorProperty" || member.type === "TSAbstractAccessorProperty") {
              if (member.static) {
                modifiers.push("static");
              }
              if (member.type === "TSAbstractAccessorProperty") {
                modifiers.push("abstract");
              }
              if (decorated) {
                modifiers.push("decorated");
              }
              if (member.override) {
                modifiers.push("override");
              }
              if (member.accessibility === "protected") {
                modifiers.push("protected");
              } else if (member.accessibility === "private" || isPrivateHash) {
                modifiers.push("private");
              } else {
                modifiers.push("public");
              }
              selectors.push("accessor-property");
            } else {
              if (member.static) {
                modifiers.push("static");
              }
              if (member.declare) {
                modifiers.push("declare");
              }
              if (member.type === "TSAbstractPropertyDefinition") {
                modifiers.push("abstract");
              }
              if (decorated) {
                modifiers.push("decorated");
              }
              if (member.override) {
                modifiers.push("override");
              }
              if (member.readonly) {
                modifiers.push("readonly");
              }
              if (member.accessibility === "protected") {
                modifiers.push("protected");
              } else if (member.accessibility === "private" || isPrivateHash) {
                modifiers.push("private");
              } else {
                modifiers.push("public");
              }
              if (member.optional) {
                modifiers.push("optional");
              }
              let isFunctionProperty = ((_b = member.value) == null ? void 0 : _b.type) === "ArrowFunctionExpression" || ((_c = member.value) == null ? void 0 : _c.type) === "FunctionExpression";
              if (isFunctionProperty) {
                selectors.push("function-property");
              }
              if (!isFunctionProperty && member.value) {
                memberValue = sourceCode.getText(member.value);
              }
              selectors.push("property");
              if (member.type === "PropertyDefinition" && member.value && !isFunctionProperty) {
                dependencies = extractDependencies(member.value, member.static);
              }
            }
            for (let officialGroup of generateOfficialGroups(
              modifiers,
              selectors
            )) {
              defineGroup(officialGroup);
            }
            if (Array.isArray(options.customGroups)) {
              for (let customGroup of options.customGroups) {
                if (customGroupMatches({
                  customGroup,
                  elementName: name2,
                  elementValue: memberValue,
                  modifiers,
                  selectors,
                  decorators,
                  matcher: options.matcher
                })) {
                  defineGroup(customGroup.groupName, true);
                  if (getGroup() === customGroup.groupName) {
                    break;
                  }
                }
              }
            } else {
              setCustomGroups(options.customGroups, name2, {
                override: true
              });
            }
            let overloadSignatureGroupMember = (_d = overloadSignatureGroups.find(
              (overloadSignatures) => overloadSignatures.includes(member)
            )) == null ? void 0 : _d.at(-1);
            let sortingNode = {
              size: overloadSignatureGroupMember ? rangeToDiff(overloadSignatureGroupMember.range) : rangeToDiff(member.range),
              group: getGroup(),
              node: member,
              dependencies,
              name: name2,
              dependencyName: getDependencyName(
                name2,
                modifiers.includes("static")
              )
            };
            accumulator.at(-1).push(sortingNode);
            return accumulator;
          },
          [[]]
        );
        let sortedNodes = formattedNodes.map(
          (nodes2) => sortNodesByGroups(nodes2, options, {
            getGroupCompareOptions: (groupNumber) => getCompareOptions(options, groupNumber),
            isNodeIgnored: (sortingNode) => getGroupNumber(options.groups, sortingNode) === options.groups.length
          })
        ).flat();
        sortedNodes = sortNodesByDependencies(sortedNodes);
        let nodes = formattedNodes.flat();
        pairwise(nodes, (left, right) => {
          let leftNum = getGroupNumber(options.groups, left);
          let rightNum = getGroupNumber(options.groups, right);
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          let firstUnorderedNodeDependentOnRight = getFirstUnorderedNodeDependentOn(right, nodes);
          if (firstUnorderedNodeDependentOnRight || indexOfLeft > indexOfRight) {
            let messageId;
            if (firstUnorderedNodeDependentOnRight) {
              messageId = "unexpectedClassesDependencyOrder";
            } else {
              messageId = leftNum !== rightNum ? "unexpectedClassesGroupOrder" : "unexpectedClassesOrder";
            }
            context.report({
              messageId,
              data: {
                left: toSingleLine(left.name),
                leftGroup: left.group,
                right: toSingleLine(right.name),
                rightGroup: right.group,
                nodeDependentOnRight: firstUnorderedNodeDependentOnRight == null ? void 0 : firstUnorderedNodeDependentOnRight.name
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-imports.mjs
import { builtinModules } from "node:module";

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-options-with-clean-groups.mjs
var getOptionsWithCleanGroups = (options) => ({
  ...options,
  groups: options.groups.filter((group) => group.length > 0).map(
    (group) => typeof group === "string" ? group : getCleanedNestedGroups(group)
  )
});
var getCleanedNestedGroups = (nestedGroup) => nestedGroup.length === 1 ? nestedGroup[0] : nestedGroup;

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-imports.mjs
var sortImports = createEslintRule({
  name: "sort-imports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted imports."
    },
    fixable: "code",
    schema: [
      {
        id: "sort-imports",
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          internalPattern: {
            description: "Specifies the pattern for internal modules.",
            items: {
              type: "string"
            },
            type: "array"
          },
          sortSideEffects: {
            description: "Controls whether side-effect imports should be sorted.",
            type: "boolean"
          },
          newlinesBetween: {
            description: "Specifies how new lines should be handled between import groups.",
            enum: ["ignore", "always", "never"],
            type: "string"
          },
          maxLineLength: {
            description: "Specifies the maximum line length.",
            type: "integer",
            minimum: 0,
            exclusiveMinimum: true
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            properties: {
              type: {
                type: "object"
              },
              value: {
                type: "object"
              }
            },
            additionalProperties: false
          },
          environment: {
            description: "Specifies the environment.",
            enum: ["node", "bun"],
            type: "string"
          }
        },
        allOf: [
          {
            $ref: "#/definitions/max-line-length-requires-line-length-type"
          }
        ],
        additionalProperties: false,
        dependencies: {
          maxLineLength: ["type"]
        },
        definitions: {
          "is-line-length": {
            properties: {
              type: { enum: ["line-length"], type: "string" }
            },
            required: ["type"],
            type: "object"
          },
          "max-line-length-requires-line-length-type": {
            anyOf: [
              {
                not: {
                  required: ["maxLineLength"],
                  type: "object"
                },
                type: "object"
              },
              {
                $ref: "#/definitions/is-line-length"
              }
            ]
          }
        }
      }
    ],
    messages: {
      unexpectedImportsGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedImportsOrder: 'Expected "{{right}}" to come before "{{left}}".',
      missedSpacingBetweenImports: 'Missed spacing between "{{left}}" and "{{right}}" imports.',
      extraSpacingBetweenImports: 'Extra spacing between "{{left}}" and "{{right}}" imports.'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      internalPattern: ["~/**"],
      sortSideEffects: false,
      newlinesBetween: "always",
      maxLineLength: void 0,
      matcher: "minimatch",
      groups: [
        "type",
        ["builtin", "external"],
        "internal-type",
        "internal",
        ["parent-type", "sibling-type", "index-type"],
        ["parent", "sibling", "index"],
        "object",
        "unknown"
      ],
      customGroups: { type: {}, value: {} },
      environment: "node"
    }
  ],
  create: (context) => {
    let settings = getSettings(context.settings);
    let userOptions = context.options.at(0);
    let options = getOptionsWithCleanGroups(
      complete(userOptions, settings, {
        groups: [
          "type",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "object",
          "unknown"
        ],
        matcher: "minimatch",
        customGroups: { type: {}, value: {} },
        internalPattern: (userOptions == null ? void 0 : userOptions.matcher) === "regex" ? ["^~/.*"] : ["~/**"],
        newlinesBetween: "always",
        sortSideEffects: false,
        type: "alphabetical",
        environment: "node",
        ignoreCase: true,
        specialCharacters: "keep",
        order: "asc"
      })
    );
    validateGroupsConfiguration(
      options.groups,
      [
        "side-effect-style",
        "external-type",
        "internal-type",
        "builtin-type",
        "sibling-type",
        "parent-type",
        "side-effect",
        "index-type",
        "internal",
        "external",
        "sibling",
        "unknown",
        "builtin",
        "parent",
        "object",
        "index",
        "style",
        "type"
      ],
      [
        ...Object.keys(options.customGroups.type ?? {}),
        ...Object.keys(options.customGroups.value ?? {})
      ]
    );
    let isSideEffectOnlyGroup = (group) => {
      if (!group) {
        return false;
      }
      if (typeof group === "string") {
        return group === "side-effect" || group === "side-effect-style";
      }
      return group.every(isSideEffectOnlyGroup);
    };
    if (!options.sortSideEffects) {
      let hasInvalidGroup = options.groups.filter((group) => Array.isArray(group)).some(
        (nestedGroup) => !isSideEffectOnlyGroup(nestedGroup) && nestedGroup.some(
          (subGroup) => subGroup === "side-effect" || subGroup === "side-effect-style"
        )
      );
      if (hasInvalidGroup) {
        throw new Error(
          "Side effect groups cannot be nested with non side effect groups when 'sortSideEffects' is 'false'."
        );
      }
    }
    let sourceCode = getSourceCode(context);
    let nodes = [];
    let isSideEffectImport = (node) => node.type === "ImportDeclaration" && node.specifiers.length === 0 && !/}\s*from\s+/.test(sourceCode.getText(node));
    let isStyle = (value) => [".less", ".scss", ".sass", ".styl", ".pcss", ".css", ".sss"].some(
      (extension) => value.endsWith(extension)
    );
    let hasMultipleImportDeclarations = (node) => node.specifiers.length > 1;
    let flatGroups = options.groups.flat();
    let shouldRegroupSideEffectNodes = flatGroups.includes("side-effect");
    let shouldRegroupSideEffectStyleNodes = flatGroups.includes("side-effect-style");
    let registerNode = (node) => {
      let name2;
      if (node.type === "ImportDeclaration") {
        name2 = node.source.value;
      } else if (node.type === "TSImportEqualsDeclaration") {
        if (node.moduleReference.type === "TSExternalModuleReference") {
          name2 = `${node.moduleReference.expression.value}`;
        } else {
          name2 = sourceCode.text.slice(...node.moduleReference.range);
        }
      } else {
        let decl = node.declarations[0].init;
        let { value } = decl.arguments[0];
        name2 = value.toString();
      }
      let isIndex = (value) => [
        "./index.d.js",
        "./index.d.ts",
        "./index.js",
        "./index.ts",
        "./index",
        "./",
        "."
      ].includes(value);
      let isParent = (value) => value.startsWith("..");
      let isSibling = (value) => value.startsWith("./");
      let { getGroup, defineGroup, setCustomGroups } = useGroups(options);
      let isInternal = (value) => options.internalPattern.length && options.internalPattern.some(
        (pattern) => matches(value, pattern, options.matcher)
      );
      let isCoreModule = (value) => {
        let bunModules = [
          "bun",
          "bun:ffi",
          "bun:jsc",
          "bun:sqlite",
          "bun:test",
          "bun:wrap",
          "detect-libc",
          "undici",
          "ws"
        ];
        let builtinPrefixOnlyModules = ["sea", "sqlite", "test"];
        return builtinModules.includes(
          value.startsWith("node:") ? value.split("node:")[1] : value
        ) || builtinPrefixOnlyModules.some((module) => `node:${module}` === value) || (options.environment === "bun" ? bunModules.includes(value) : false);
      };
      let isExternal = (value) => !(value.startsWith(".") || value.startsWith("/"));
      if (node.type !== "VariableDeclaration" && node.importKind === "type") {
        if (node.type === "ImportDeclaration") {
          setCustomGroups(options.customGroups.type, node.source.value);
          if (isIndex(node.source.value)) {
            defineGroup("index-type");
          }
          if (isSibling(node.source.value)) {
            defineGroup("sibling-type");
          }
          if (isParent(node.source.value)) {
            defineGroup("parent-type");
          }
          if (isInternal(node.source.value)) {
            defineGroup("internal-type");
          }
          if (isCoreModule(node.source.value)) {
            defineGroup("builtin-type");
          }
          if (isExternal(node.source.value)) {
            defineGroup("external-type");
          }
        }
        defineGroup("type");
      }
      let isSideEffect = isSideEffectImport(node);
      let isStyleSideEffect = false;
      if (node.type === "ImportDeclaration" || node.type === "VariableDeclaration") {
        let value;
        if (node.type === "ImportDeclaration") {
          ;
          ({ value } = node.source);
        } else {
          let decl = node.declarations[0].init;
          let declValue = decl.arguments[0].value;
          value = declValue.toString();
        }
        let isStyleValue = isStyle(value);
        isStyleSideEffect = isSideEffect && isStyleValue;
        setCustomGroups(options.customGroups.value, value);
        if (isStyleSideEffect) {
          defineGroup("side-effect-style");
        }
        if (isSideEffect) {
          defineGroup("side-effect");
        }
        if (isStyleValue) {
          defineGroup("style");
        }
        if (isIndex(value)) {
          defineGroup("index");
        }
        if (isSibling(value)) {
          defineGroup("sibling");
        }
        if (isParent(value)) {
          defineGroup("parent");
        }
        if (isInternal(value)) {
          defineGroup("internal");
        }
        if (isCoreModule(value)) {
          defineGroup("builtin");
        }
        if (isExternal(value)) {
          defineGroup("external");
        }
      }
      nodes.push({
        size: rangeToDiff(node.range),
        group: getGroup(),
        node,
        isIgnored: !options.sortSideEffects && isSideEffect && !shouldRegroupSideEffectNodes && (!isStyleSideEffect || !shouldRegroupSideEffectStyleNodes),
        name: name2,
        ...options.type === "line-length" && options.maxLineLength && {
          hasMultipleImportDeclarations: hasMultipleImportDeclarations(node)
        }
      });
    };
    return {
      TSImportEqualsDeclaration: registerNode,
      ImportDeclaration: registerNode,
      VariableDeclaration: (node) => {
        var _a;
        if (node.declarations[0].init && node.declarations[0].init.type === "CallExpression" && node.declarations[0].init.callee.type === "Identifier" && node.declarations[0].init.callee.name === "require" && ((_a = node.declarations[0].init.arguments[0]) == null ? void 0 : _a.type) === "Literal") {
          registerNode(node);
        }
      },
      "Program:exit": () => {
        var _a;
        let hasContentBetweenNodes = (left, right) => getCommentsBefore(right.node, sourceCode).length > 0 || !!sourceCode.getTokensBetween(left.node, right.node, {
          includeComments: false
        }).length;
        let splitNodes = [[]];
        for (let node of nodes) {
          let lastNode = (_a = splitNodes.at(-1)) == null ? void 0 : _a.at(-1);
          if (lastNode && hasContentBetweenNodes(lastNode, node)) {
            splitNodes.push([node]);
          } else {
            splitNodes.at(-1).push(node);
          }
        }
        for (let nodeList of splitNodes) {
          let sortedNodes = sortNodesByGroups(nodeList, options, {
            isNodeIgnored: (node) => node.isIgnored,
            getGroupCompareOptions: (groupNumber) => {
              if (options.sortSideEffects) {
                return options;
              }
              let group = options.groups[groupNumber];
              return isSideEffectOnlyGroup(group) ? null : options;
            }
          });
          pairwise(nodeList, (left, right) => {
            let leftNum = getGroupNumber(options.groups, left);
            let rightNum = getGroupNumber(options.groups, right);
            let indexOfLeft = sortedNodes.indexOf(left);
            let indexOfRight = sortedNodes.indexOf(right);
            let messageIds = [];
            if (indexOfLeft > indexOfRight) {
              messageIds.push(
                leftNum !== rightNum ? "unexpectedImportsGroupOrder" : "unexpectedImportsOrder"
              );
            }
            let numberOfEmptyLinesBetween = getLinesBetween(
              sourceCode,
              left,
              right
            );
            if (options.newlinesBetween === "never" && numberOfEmptyLinesBetween > 0) {
              messageIds.push("extraSpacingBetweenImports");
            }
            if (options.newlinesBetween === "always") {
              if (leftNum < rightNum && numberOfEmptyLinesBetween === 0) {
                messageIds.push("missedSpacingBetweenImports");
              } else if (numberOfEmptyLinesBetween > 1 || leftNum === rightNum && numberOfEmptyLinesBetween > 0) {
                messageIds.push("extraSpacingBetweenImports");
              }
            }
            for (let messageId of messageIds) {
              context.report({
                messageId,
                data: {
                  left: left.name,
                  leftGroup: left.group,
                  right: right.name,
                  rightGroup: right.group
                },
                node: right.node,
                fix: (fixer) => {
                  let newlinesFixes = [];
                  for (let max = sortedNodes.length, i = 0; i < max; i++) {
                    let node = sortedNodes.at(i);
                    let nextNode = sortedNodes.at(i + 1);
                    if (options.newlinesBetween === "ignore" || !nextNode) {
                      continue;
                    }
                    let nodeGroupNumber = getGroupNumber(options.groups, node);
                    let nextNodeGroupNumber = getGroupNumber(
                      options.groups,
                      nextNode
                    );
                    let currentNodeRange = getNodeRange(
                      nodeList.at(i).node,
                      sourceCode,
                      options
                    );
                    let nextNodeRange = getNodeRange(
                      nodeList.at(i + 1).node,
                      sourceCode,
                      options
                    ).at(0) - 1;
                    let linesBetweenImports = getLinesBetween(
                      sourceCode,
                      nodeList.at(i),
                      nodeList.at(i + 1)
                    );
                    if (options.newlinesBetween === "always" && nodeGroupNumber === nextNodeGroupNumber && linesBetweenImports !== 0 || options.newlinesBetween === "never" && linesBetweenImports > 0) {
                      newlinesFixes.push(
                        fixer.removeRange([
                          currentNodeRange.at(1),
                          nextNodeRange
                        ])
                      );
                    }
                    if (options.newlinesBetween === "always" && nodeGroupNumber !== nextNodeGroupNumber) {
                      if (linesBetweenImports > 1) {
                        newlinesFixes.push(
                          fixer.replaceTextRange(
                            [currentNodeRange.at(1), nextNodeRange],
                            "\n"
                          )
                        );
                      } else if (linesBetweenImports === 0) {
                        newlinesFixes.push(
                          fixer.insertTextAfterRange(currentNodeRange, "\n")
                        );
                      }
                    }
                  }
                  return [
                    ...makeFixes(fixer, nodeList, sortedNodes, sourceCode),
                    ...newlinesFixes
                  ];
                }
              });
            }
          });
        }
      }
    };
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-exports.mjs
var sortExports = createEslintRule({
  name: "sort-exports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted exports."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the exports into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          },
          groupKind: {
            description: "Specifies top-level groups.",
            type: "string",
            enum: ["mixed", "values-first", "types-first"]
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedExportsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false,
      groupKind: "mixed"
    }
  ],
  create: (context) => {
    let settings = getSettings(context.settings);
    let options = complete(context.options.at(0), settings, {
      type: "alphabetical",
      ignoreCase: true,
      specialCharacters: "keep",
      order: "asc",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false,
      groupKind: "mixed"
    });
    let sourceCode = getSourceCode(context);
    let partitionComment = options.partitionByComment;
    let parts = [[]];
    let registerNode = (node) => {
      var _a;
      let sortingNode = {
        size: rangeToDiff(node.range),
        name: node.source.value,
        node
      };
      let lastNode = (_a = parts.at(-1)) == null ? void 0 : _a.at(-1);
      if (partitionComment && hasPartitionComment(
        partitionComment,
        getCommentsBefore(node, sourceCode),
        options.matcher
      ) || options.partitionByNewLine && lastNode && getLinesBetween(sourceCode, lastNode, sortingNode)) {
        parts.push([]);
      }
      parts.at(-1).push(sortingNode);
    };
    return {
      ExportAllDeclaration: registerNode,
      ExportNamedDeclaration: (node) => {
        if (node.source !== null) {
          registerNode(node);
        }
      },
      "Program:exit": () => {
        for (let nodes of parts) {
          let groupedByKind;
          if (options.groupKind !== "mixed") {
            groupedByKind = nodes.reduce(
              (accumulator, currentNode) => {
                let exportTypeIndex = options.groupKind === "types-first" ? 0 : 1;
                let exportIndex = options.groupKind === "types-first" ? 1 : 0;
                if (currentNode.node.exportKind === "value") {
                  accumulator[exportIndex].push(currentNode);
                } else {
                  accumulator[exportTypeIndex].push(currentNode);
                }
                return accumulator;
              },
              [[], []]
            );
          } else {
            groupedByKind = [nodes];
          }
          let sortedNodes = [];
          for (let nodesByKind of groupedByKind) {
            sortedNodes = [...sortedNodes, ...sortNodes(nodesByKind, options)];
          }
          pairwise(nodes, (left, right) => {
            let indexOfLeft = sortedNodes.indexOf(left);
            let indexOfRight = sortedNodes.indexOf(right);
            if (indexOfLeft > indexOfRight) {
              context.report({
                messageId: "unexpectedExportsOrder",
                data: {
                  left: left.name,
                  right: right.name
                },
                node: right.node,
                fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
              });
            }
          });
        }
      }
    };
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/utils/get-node-parent.mjs
var getNodeParent = (node, type) => {
  let types2 = type;
  let { parent } = node;
  while (parent) {
    if (types2.includes(parent.type)) {
      return parent;
    }
    ;
    ({ parent } = parent);
  }
  return null;
};

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-objects.mjs
var sortObjects = createEslintRule({
  name: "sort-objects",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted objects."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the keys of objects into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          },
          styledComponents: {
            description: "Controls whether to sort styled components.",
            type: "boolean"
          },
          destructureOnly: {
            description: "Controls whether to sort only destructured objects.",
            type: "boolean"
          },
          ignorePattern: {
            description: "Specifies names or patterns for nodes that should be ignored by rule.",
            items: {
              type: "string"
            },
            type: "array"
          },
          groups: {
            description: "Specifies the order of the groups.",
            type: "array",
            items: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          },
          customGroups: {
            description: "Specifies custom groups.",
            type: "object",
            additionalProperties: {
              oneOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              ]
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedObjectsGroupOrder: 'Expected "{{right}}" ({{rightGroup}}) to come before "{{left}}" ({{leftGroup}}).',
      unexpectedObjectsOrder: 'Expected "{{right}}" to come before "{{left}}".',
      unexpectedObjectsDependencyOrder: 'Expected dependency "{{right}}" to come before "{{nodeDependentOnRight}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false,
      styledComponents: true,
      destructureOnly: false,
      ignorePattern: [],
      groups: [],
      customGroups: {}
    }
  ],
  create: (context) => {
    let sortObject = (node) => {
      let settings = getSettings(context.settings);
      let options = complete(context.options.at(0), settings, {
        partitionByNewLine: false,
        partitionByComment: false,
        styledComponents: true,
        destructureOnly: false,
        type: "alphabetical",
        ignorePattern: [],
        matcher: "minimatch",
        ignoreCase: true,
        specialCharacters: "keep",
        customGroups: {},
        order: "asc",
        groups: []
      });
      validateGroupsConfiguration(
        options.groups,
        ["unknown"],
        Object.keys(options.customGroups)
      );
      let shouldIgnore = false;
      if (options.destructureOnly) {
        shouldIgnore = node.type !== "ObjectPattern";
      }
      if (!shouldIgnore && options.ignorePattern.length) {
        let varParent = getNodeParent(node, ["VariableDeclarator", "Property"]);
        let parentId = (varParent == null ? void 0 : varParent.type) === "VariableDeclarator" ? varParent.id : varParent == null ? void 0 : varParent.key;
        let varIdentifier = (parentId == null ? void 0 : parentId.type) === "Identifier" ? parentId.name : null;
        let checkMatch = (identifier) => options.ignorePattern.some(
          (pattern) => matches(identifier, pattern, options.matcher)
        );
        if (typeof varIdentifier === "string" && checkMatch(varIdentifier)) {
          shouldIgnore = true;
        }
        let callParent = getNodeParent(node, ["CallExpression"]);
        let callIdentifier = (callParent == null ? void 0 : callParent.type) === "CallExpression" && callParent.callee.type === "Identifier" ? callParent.callee.name : null;
        if (callIdentifier && checkMatch(callIdentifier)) {
          shouldIgnore = true;
        }
      }
      if (!shouldIgnore && node.properties.length > 1) {
        let isStyledCallExpression = (identifier) => identifier.type === "Identifier" && identifier.name === "styled";
        let isCssCallExpression = (identifier) => identifier.type === "Identifier" && identifier.name === "css";
        let isStyledComponents = (styledNode) => styledNode !== void 0 && (styledNode.type === "CallExpression" && (isCssCallExpression(styledNode.callee) || styledNode.callee.type === "MemberExpression" && isStyledCallExpression(styledNode.callee.object) || styledNode.callee.type === "CallExpression" && isStyledCallExpression(styledNode.callee.callee)) || styledNode.type === "JSXExpressionContainer" && styledNode.parent.type === "JSXAttribute" && styledNode.parent.name.name === "style");
        if (!options.styledComponents && (isStyledComponents(node.parent) || node.parent.type === "ArrowFunctionExpression" && isStyledComponents(node.parent.parent))) {
          return;
        }
        let sourceCode = getSourceCode(context);
        let extractDependencies = (init) => {
          let dependencies = [];
          let checkNode = (nodeValue) => {
            if (nodeValue.type === "ArrowFunctionExpression" || nodeValue.type === "FunctionExpression") {
              return;
            }
            if (nodeValue.type === "Identifier") {
              dependencies.push(nodeValue.name);
            }
            if (nodeValue.type === "Property") {
              traverseNode(nodeValue.key);
              traverseNode(nodeValue.value);
            }
            if (nodeValue.type === "ConditionalExpression") {
              traverseNode(nodeValue.test);
              traverseNode(nodeValue.consequent);
              traverseNode(nodeValue.alternate);
            }
            if ("expression" in nodeValue && typeof nodeValue.expression !== "boolean") {
              traverseNode(nodeValue.expression);
            }
            if ("object" in nodeValue) {
              traverseNode(nodeValue.object);
            }
            if ("callee" in nodeValue) {
              traverseNode(nodeValue.callee);
            }
            if ("left" in nodeValue) {
              traverseNode(nodeValue.left);
            }
            if ("right" in nodeValue) {
              traverseNode(nodeValue.right);
            }
            if ("elements" in nodeValue) {
              nodeValue.elements.filter((currentNode) => currentNode !== null).forEach(traverseNode);
            }
            if ("argument" in nodeValue && nodeValue.argument) {
              traverseNode(nodeValue.argument);
            }
            if ("arguments" in nodeValue) {
              nodeValue.arguments.forEach(traverseNode);
            }
            if ("properties" in nodeValue) {
              nodeValue.properties.forEach(traverseNode);
            }
            if ("expressions" in nodeValue) {
              nodeValue.expressions.forEach(traverseNode);
            }
          };
          let traverseNode = (nodeValue) => {
            checkNode(nodeValue);
          };
          traverseNode(init);
          return dependencies;
        };
        let formatProperties = (props) => props.reduce(
          (accumulator, prop) => {
            var _a;
            if (prop.type === "SpreadElement" || prop.type === "RestElement") {
              accumulator.push([]);
              return accumulator;
            }
            let comments = getCommentsBefore(prop, sourceCode);
            let lastProp = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
            if (options.partitionByComment && hasPartitionComment(
              options.partitionByComment,
              comments,
              options.matcher
            )) {
              accumulator.push([]);
            }
            let name2;
            let position = "ignore";
            let dependencies = [];
            let { getGroup, setCustomGroups } = useGroups(options);
            if (prop.key.type === "Identifier") {
              ;
              ({ name: name2 } = prop.key);
            } else if (prop.key.type === "Literal") {
              name2 = `${prop.key.value}`;
            } else {
              name2 = sourceCode.text.slice(...prop.key.range);
            }
            let propSortingNode = {
              size: rangeToDiff(prop.range),
              node: prop,
              name: name2
            };
            if (options.partitionByNewLine && lastProp && getLinesBetween(sourceCode, lastProp, propSortingNode)) {
              accumulator.push([]);
            }
            if (prop.value.type === "AssignmentPattern") {
              dependencies = extractDependencies(prop.value);
            }
            setCustomGroups(options.customGroups, name2);
            let value = {
              ...propSortingNode,
              group: getGroup(),
              dependencies,
              position
            };
            accumulator.at(-1).push(value);
            return accumulator;
          },
          [[]]
        );
        let formattedMembers = formatProperties(node.properties);
        let sortedNodes = sortNodesByDependencies(
          formattedMembers.map((nodes2) => sortNodesByGroups(nodes2, options)).flat()
        );
        let nodes = formattedMembers.flat();
        pairwise(nodes, (left, right) => {
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          if (indexOfLeft > indexOfRight) {
            let firstUnorderedNodeDependentOnRight = getFirstUnorderedNodeDependentOn(right, nodes);
            let leftNum = getGroupNumber(options.groups, left);
            let rightNum = getGroupNumber(options.groups, right);
            let messageId;
            if (firstUnorderedNodeDependentOnRight) {
              messageId = "unexpectedObjectsDependencyOrder";
            } else {
              messageId = leftNum !== rightNum ? "unexpectedObjectsGroupOrder" : "unexpectedObjectsOrder";
            }
            context.report({
              messageId,
              data: {
                left: toSingleLine(left.name),
                leftGroup: left.group,
                right: toSingleLine(right.name),
                rightGroup: right.group,
                nodeDependentOnRight: firstUnorderedNodeDependentOnRight == null ? void 0 : firstUnorderedNodeDependentOnRight.name
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    };
    return {
      ObjectExpression: sortObject,
      ObjectPattern: sortObject
    };
  }
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-enums.mjs
var sortEnums = createEslintRule({
  name: "sort-enums",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted TypeScript enums."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          sortByValue: {
            description: "Compare enum values instead of names.",
            type: "boolean"
          },
          forceNumericSort: {
            description: "Will always sort numeric enums by their value regardless of the sort type specified.",
            type: "boolean"
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the members of enums into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedEnumsOrder: 'Expected "{{right}}" to come before "{{left}}".',
      unexpectedEnumsDependencyOrder: 'Expected dependency "{{right}}" to come before "{{nodeDependentOnRight}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      sortByValue: false,
      partitionByComment: false,
      partitionByNewLine: false,
      forceNumericSort: false
    }
  ],
  create: (context) => ({
    TSEnumDeclaration: (node) => {
      let getMembers = (nodeValue) => {
        var _a;
        return (
          /* v8 ignore next 2 */
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          ((_a = node.body) == null ? void 0 : _a.members) ?? nodeValue.members ?? []
        );
      };
      let members = getMembers(node);
      if (members.length > 1 && members.every(({ initializer }) => initializer)) {
        let settings = getSettings(context.settings);
        let options = complete(context.options.at(0), settings, {
          partitionByComment: false,
          partitionByNewLine: false,
          type: "alphabetical",
          matcher: "minimatch",
          ignoreCase: true,
          specialCharacters: "keep",
          order: "asc",
          sortByValue: false,
          forceNumericSort: false
        });
        let sourceCode = getSourceCode(context);
        let partitionComment = options.partitionByComment;
        let extractDependencies = (expression, enumName) => {
          let dependencies = [];
          let checkNode = (nodeValue) => {
            if (nodeValue.type === "MemberExpression" && nodeValue.object.type === "Identifier" && nodeValue.object.name === enumName && nodeValue.property.type === "Identifier") {
              dependencies.push(nodeValue.property.name);
            } else if (nodeValue.type === "Identifier") {
              dependencies.push(nodeValue.name);
            }
            if ("left" in nodeValue) {
              checkNode(nodeValue.left);
            }
            if ("right" in nodeValue) {
              checkNode(nodeValue.right);
            }
            if ("expressions" in nodeValue) {
              nodeValue.expressions.forEach(checkNode);
            }
          };
          checkNode(expression);
          return dependencies;
        };
        let formattedMembers = members.reduce(
          (accumulator, member) => {
            var _a;
            let dependencies = [];
            if (member.initializer) {
              dependencies = extractDependencies(
                member.initializer,
                node.id.name
              );
            }
            let lastSortingNode = (_a = accumulator.at(-1)) == null ? void 0 : _a.at(-1);
            let sortingNode = {
              size: rangeToDiff(member.range),
              node: member,
              dependencies,
              name: member.id.type === "Literal" ? `${member.id.value}` : `${sourceCode.text.slice(...member.id.range)}`
            };
            if (partitionComment && hasPartitionComment(
              partitionComment,
              getCommentsBefore(member, sourceCode),
              options.matcher
            ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
              accumulator.push([]);
            }
            accumulator.at(-1).push(sortingNode);
            return accumulator;
          },
          [[]]
        );
        let isNumericEnum = members.every((member) => {
          var _a;
          return ((_a = member.initializer) == null ? void 0 : _a.type) === "Literal" && typeof member.initializer.value === "number";
        });
        let compareOptions = {
          // If the enum is numeric, and we sort by value, always use the `natural` sort type, which will correctly sort them.
          type: isNumericEnum && (options.forceNumericSort || options.sortByValue) ? "natural" : options.type,
          order: options.order,
          ignoreCase: options.ignoreCase,
          specialCharacters: options.specialCharacters,
          // Get the enum value rather than the name if needed
          nodeValueGetter: options.sortByValue || isNumericEnum && options.forceNumericSort ? (sortingNode) => {
            var _a, _b;
            if (sortingNode.node.type === "TSEnumMember" && ((_a = sortingNode.node.initializer) == null ? void 0 : _a.type) === "Literal") {
              return ((_b = sortingNode.node.initializer.value) == null ? void 0 : _b.toString()) ?? "";
            }
            return "";
          } : void 0
        };
        let sortedNodes = sortNodesByDependencies(
          formattedMembers.map((nodes2) => sortNodes(nodes2, compareOptions)).flat()
        );
        let nodes = formattedMembers.flat();
        pairwise(nodes, (left, right) => {
          let indexOfLeft = sortedNodes.indexOf(left);
          let indexOfRight = sortedNodes.indexOf(right);
          if (indexOfLeft > indexOfRight) {
            let firstUnorderedNodeDependentOnRight = getFirstUnorderedNodeDependentOn(right, nodes);
            context.report({
              messageId: firstUnorderedNodeDependentOnRight ? "unexpectedEnumsDependencyOrder" : "unexpectedEnumsOrder",
              data: {
                left: toSingleLine(left.name),
                right: toSingleLine(right.name),
                nodeDependentOnRight: firstUnorderedNodeDependentOnRight == null ? void 0 : firstUnorderedNodeDependentOnRight.name
              },
              node: right.node,
              fix: (fixer) => makeFixes(fixer, nodes, sortedNodes, sourceCode, options)
            });
          }
        });
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-maps.mjs
var sortMaps = createEslintRule({
  name: "sort-maps",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted Map elements."
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          type: {
            description: "Specifies the sorting method.",
            type: "string",
            enum: ["alphabetical", "natural", "line-length"]
          },
          order: {
            description: "Determines whether the sorted items should be in ascending or descending order.",
            type: "string",
            enum: ["asc", "desc"]
          },
          matcher: {
            description: "Specifies the string matcher.",
            type: "string",
            enum: ["minimatch", "regex"]
          },
          ignoreCase: {
            description: "Controls whether sorting should be case-sensitive or not.",
            type: "boolean"
          },
          specialCharacters: {
            description: "Controls how special characters should be handled before sorting.",
            type: "string",
            enum: ["remove", "trim", "keep"]
          },
          partitionByComment: {
            description: "Allows you to use comments to separate the maps members into logical groups.",
            anyOf: [
              {
                type: "array",
                items: {
                  type: "string"
                }
              },
              {
                type: "boolean"
              },
              {
                type: "string"
              }
            ]
          },
          partitionByNewLine: {
            description: "Allows to use spaces to separate the nodes into logical groups.",
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpectedMapElementsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      partitionByComment: false,
      partitionByNewLine: false
    }
  ],
  create: (context) => ({
    NewExpression: (node) => {
      var _a, _b;
      if (node.callee.type === "Identifier" && node.callee.name === "Map" && node.arguments.length && ((_a = node.arguments[0]) == null ? void 0 : _a.type) === "ArrayExpression") {
        let [{ elements }] = node.arguments;
        if (elements.length > 1) {
          let settings = getSettings(context.settings);
          let options = complete(context.options.at(0), settings, {
            type: "alphabetical",
            ignoreCase: true,
            specialCharacters: "keep",
            order: "asc",
            matcher: "minimatch",
            partitionByComment: false,
            partitionByNewLine: false
          });
          let sourceCode = getSourceCode(context);
          let partitionComment = options.partitionByComment;
          let parts = elements.reduce(
            (accumulator, element) => {
              if (element === null || element.type === "SpreadElement") {
                accumulator.push([]);
              } else {
                accumulator.at(-1).push(element);
              }
              return accumulator;
            },
            [[]]
          );
          for (let part of parts) {
            let formattedMembers = [[]];
            for (let element of part) {
              let name2;
              if (element.type === "ArrayExpression") {
                let [left] = element.elements;
                if (!left) {
                  name2 = `${left}`;
                } else if (left.type === "Literal") {
                  name2 = left.raw;
                } else {
                  name2 = sourceCode.text.slice(...left.range);
                }
              } else {
                name2 = sourceCode.text.slice(...element.range);
              }
              let lastSortingNode = (_b = formattedMembers.at(-1)) == null ? void 0 : _b.at(-1);
              let sortingNode = {
                size: rangeToDiff(element.range),
                node: element,
                name: name2
              };
              if (partitionComment && hasPartitionComment(
                partitionComment,
                getCommentsBefore(element, sourceCode),
                options.matcher
              ) || options.partitionByNewLine && lastSortingNode && getLinesBetween(sourceCode, lastSortingNode, sortingNode)) {
                formattedMembers.push([]);
              }
              formattedMembers.at(-1).push(sortingNode);
            }
            for (let nodes of formattedMembers) {
              pairwise(nodes, (left, right) => {
                if (isPositive(compare(left, right, options))) {
                  context.report({
                    messageId: "unexpectedMapElementsOrder",
                    data: {
                      left: toSingleLine(left.name),
                      right: toSingleLine(right.name)
                    },
                    node: right.node,
                    fix: (fixer) => makeFixes(
                      fixer,
                      nodes,
                      sortNodes(nodes, options),
                      sourceCode,
                      options
                    )
                  });
                }
              });
            }
          }
        }
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/rules/sort-sets.mjs
var sortSets = createEslintRule({
  name: "sort-sets",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce sorted sets."
    },
    fixable: "code",
    schema: [jsonSchema],
    messages: {
      unexpectedSetsOrder: 'Expected "{{right}}" to come before "{{left}}".'
    }
  },
  defaultOptions: [
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      matcher: "minimatch",
      groupKind: "literals-first"
    }
  ],
  create: (context) => ({
    NewExpression: (node) => {
      var _a, _b;
      if (node.callee.type === "Identifier" && node.callee.name === "Set" && node.arguments.length && (((_a = node.arguments[0]) == null ? void 0 : _a.type) === "ArrayExpression" || ((_b = node.arguments[0]) == null ? void 0 : _b.type) === "NewExpression" && "name" in node.arguments[0].callee && node.arguments[0].callee.name === "Array")) {
        let elements = node.arguments[0].type === "ArrayExpression" ? node.arguments[0].elements : node.arguments[0].arguments;
        sortArray(context, "unexpectedSetsOrder", elements);
      }
    }
  })
});

// node_modules/.pnpm/eslint-plugin-perfectionist@3.9.1_eslint@9.13.0_typescript@4.9.5_vue-eslint-parser@9.4.3_eslint@9.13.0_/node_modules/eslint-plugin-perfectionist/dist/index.mjs
var name = "perfectionist";
var plugin = {
  rules: {
    "sort-variable-declarations": sortVariableDeclarations,
    "sort-intersection-types": sortIntersectionTypes,
    "sort-svelte-attributes": sortSvelteAttributes,
    "sort-astro-attributes": sortAstroAttributes,
    "sort-vue-attributes": sortVueAttributes,
    "sort-array-includes": sortArrayIncludes,
    "sort-named-imports": sortNamedImports,
    "sort-named-exports": sortNamedExports,
    "sort-object-types": sortObjectTypes,
    "sort-union-types": sortUnionTypes,
    "sort-switch-case": sortSwitchCase,
    "sort-interfaces": sortInterfaces,
    "sort-jsx-props": sortJsxProps,
    "sort-classes": sortClasses,
    "sort-imports": sortImports,
    "sort-exports": sortExports,
    "sort-objects": sortObjects,
    "sort-enums": sortEnums,
    "sort-sets": sortSets,
    "sort-maps": sortMaps
  },
  name
};
var getRules = (options) => Object.fromEntries(
  Object.entries(plugin.rules).reduce(
    (accumulator, [ruleName, ruleValue]) => ruleValue.meta.deprecated ? accumulator : [...accumulator, [`${name}/${ruleName}`, ["error", options]]],
    []
  )
);
var createConfig = (options) => ({
  plugins: {
    [name]: plugin
  },
  rules: getRules(options)
});
var createLegacyConfig = (options) => ({
  rules: getRules(options),
  plugins: [name]
});
var index = {
  ...plugin,
  configs: {
    "recommended-alphabetical-legacy": createLegacyConfig({
      type: "alphabetical",
      order: "asc"
    }),
    "recommended-line-length-legacy": createLegacyConfig({
      type: "line-length",
      order: "desc"
    }),
    "recommended-natural-legacy": createLegacyConfig({
      type: "natural",
      order: "asc"
    }),
    "recommended-alphabetical": createConfig({
      type: "alphabetical",
      order: "asc"
    }),
    "recommended-line-length": createConfig({
      type: "line-length",
      order: "desc"
    }),
    "recommended-natural": createConfig({
      type: "natural",
      order: "asc"
    })
  }
};

// src/base-rule.ts
import pluginPromise from "eslint-plugin-promise";
var nodeRecommended = nodePlugin.configs["flat/mixed-esm-and-cjs"];
nodeRecommended.forEach((config) => {
  var _a;
  return (_a = config.languageOptions) == null ? true : delete _a.sourceType;
});
var base_rule_default = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs["flat/recommended"],
  nodePlugin.configs["flat/recommended-script"],
  stylistic.configs.customize({
    indent: 2,
    quotes: "single",
    semi: false,
    jsx: true
  }),
  {
    plugins: {
      stylistic: stylisticPluginJs
    },
    // files: ['**/*mjs', '**/*js', '**/*cjs', '**/*jsx', '**/*tsx', '**/*.ts'],
    rules: {
      // import
      "import/order": "error",
      "import/first": "error",
      "import/no-mutable-exports": "error",
      "import/no-unresolved": "off",
      "import/no-absolute-path": "off",
      "space-infix-ops": ["error"],
      "space-before-blocks": ["error"],
      "keyword-spacing": ["error"],
      // 'space-before-function-paren': ['error'],
      "space-in-parens": ["error", "never"],
      // Common
      // 'semi': ['error', 'never'],
      "curly": ["error", "multi-or-nest", "consistent"],
      // 'quotes': ['error', 'single'],
      "quote-props": ["error", "consistent-as-needed"],
      "no-unused-vars": "error",
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
      // 'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
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
      "n/no-unpublished-import": "off",
      "n/no-extraneous-import": "off",
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false
        }
      ],
      "stylistic/linebreak-style": ["error", "unix"]
    }
  },
  {
    name: "liou/perfectionist/setup",
    plugins: {
      perfectionist: index
    },
    rules: {
      "perfectionist/sort-exports": ["error", { order: "asc", type: "natural" }],
      "perfectionist/sort-imports": ["error", {
        groups: [
          "type",
          ["parent-type", "sibling-type", "index-type"],
          "builtin",
          "external",
          ["internal", "internal-type"],
          ["parent", "sibling", "index"],
          "side-effect",
          "object",
          "unknown"
        ],
        newlinesBetween: "ignore",
        order: "asc",
        type: "natural"
      }],
      "perfectionist/sort-named-exports": ["error", { order: "asc", type: "natural" }],
      "perfectionist/sort-named-imports": ["error", { order: "asc", type: "natural" }]
    }
  },
  {
    files: ["*.test.ts", "*.test.js", "*.spec.ts", "*.spec.js"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
];

// src/json-rule.ts
import eslintPluginJsonc from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
var json_rule_default = [
  {
    name: "liou/jsonc/setup",
    plugins: {
      jsonc: eslintPluginJsonc
    }
  },
  {
    files: ["**/*.json", "**/*.json5"],
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

// src/markdown-rule.ts
import markdown from "@eslint/markdown";
var markdown_rule_default = [
  {
    plugin: {
      markdown
    },
    files: ["**/*.md"],
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

// src/react-rule.ts
import react from "eslint-plugin-react";
import ReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
var react_rule_default = [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": ReactHooks
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
      // 'jsx-quotes': ['error', 'prefer-single'],
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
      "react/void-dom-elements-no-children": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];

// src/ts-rule.ts
import tseslint from "typescript-eslint";
var ts_rule_default = [
  // ts
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
      "@typescript-eslint/ban-ts-comment": ["off"],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: false }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-ts-expect-error": "error",
      // Override JS
      // 'indent': 'off',
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
  },
  {
    files: ["*.d.ts"],
    rules: {
      "import/no-duplicates": "off"
    }
  }
];

// src/yml-rule.ts
import eslintPluginYml from "eslint-plugin-yml";
var yml_rule_default = [
  ...eslintPluginYml.configs["flat/standard"],
  {
    files: ["**/*.yml", "**/*.yaml"],
    rules: {
      "yml/spaced-comment": "off"
    }
  }
];

// src/index.ts
async function src_default(liou_config, ...rest) {
  const default_config = {
    ts: true,
    react: true,
    markdown: true,
    json: true,
    yml: true,
    ignores: [],
    plugins: [],
    rules: {}
  };
  const config = { ...default_config, ...liou_config };
  const eslint_config = [];
  eslint_config.push({
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "*.min.*",
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
  console.log("config", config);
  if (config == null ? void 0 : config.ts)
    eslint_config.push(...ts_rule_default);
  if (config == null ? void 0 : config.json)
    eslint_config.push(...json_rule_default);
  if (config == null ? void 0 : config.markdown)
    eslint_config.push(...markdown_rule_default);
  if (config == null ? void 0 : config.react)
    eslint_config.push(...react_rule_default);
  if (config == null ? void 0 : config.yml)
    eslint_config.push(...yml_rule_default);
  if (config == null ? void 0 : config.rules)
    eslint_config.push({ rules: config.rules });
  if (rest.length > 0)
    eslint_config.push(...rest);
  console.log("eslint_config", eslint_config);
  return eslint_config;
}
export {
  src_default as default
};
/*! Bundled license information:

natural-compare-lite/index.js:
  (*
   * @version    1.4.0
   * @date       2015-10-26
   * @stability  3 - Stable
   * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
   * @license    MIT License
   *)
*/
