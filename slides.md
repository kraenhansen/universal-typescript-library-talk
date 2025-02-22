---
marp: true
theme: default
class: invert
footer: `@kraenhansen.dk` on 🦋
---

<style>
/* See https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css */

:root {
  --spring-green: #00ed64;
  --forest-green: #00684a;
  --evergreen: #023430;
  --slate-blue: #001e2b;
  --bgColor-default: var(--slate-blue);
}

h1, h2, h3, h4 {
  font-family: "Source Serif 4", serif;
  color: white;
}

p, li {
  font-family: "Lexend Deca", sans-serif;
  font-weight: lighter;
}

a {
  color: var(--spring-green);
}
</style>

# Building a universal TypeScript library

Kræn Hansen

<!--
Not a library developer?
- Many of your solutions could be generalized and published.
- You're evaluating libraries, which might use some of these patterns.
-->

---

<!-- paginate: true -->

# Why Universal?

...

---

# Kræn Hansen

![bg 80% left](./my-face.jpg)

Senior Software Engineer @ MongoDB

Building developer tools
(Compass, mongosh, ...)

Maintaining the Atlas Device SDK
(formerly Realm JS)

`@kraenhansen.dk` on Bluesky 🦋

<!-- _footer: "" -->

---

# What is a runtime?

Sometimes called "platform" or "environment", entails a JavaScript engine:

- V8
- JavaScript Core
- Hermes
- SpiderMonkey
- Chakra
- ...

<!--
- V8 *(used by Chrome, Node.js, Electron, ...)*
- JavaScript Core *(used by Safari, WebKit browsers and some React Native apps)*
- Hermes *(used by most React Native apps)*
- SpiderMonkey *(used by Firefox)*
- Chakra *(used by Internet Explorer)*
-->

---

# Runtime specific globals

- `window`
- `navigator`
- `fetch`
- `console.log`
- `process`
- `Bun.file("foo.txt")`
- `Deno.readFileSync("hello.txt")`

---

# Runtime specific packages

- `import fs from "node:fs"`
- `import { Platform } from "react-native"`

---

# Universal package

- AKA an isomorphic package:
  - `isomorphic-fetch`
  - `isomorphic-ws`
- Helps building
  - Testable apps
  - Reusable apps (across Web, Server-side Node.js, Electron, React Native)
- Simple when not depending runtime APIs or other runtime specific packages.

---

# Simple universal package

```json
// package.json
{
  "name": "my-lib",
  "type": "module",
  "main": "./index.js"
}
```

```javascript
// index.js
export function greet() {
  return "hi there";
}
```

---

# Don't do "runtime checks" 💔 (1/3)

```typescript
if (typeof window !== "undefined") {
  // Probably in a browser
}
```

<pre style="visibility: hidden;">
💥
</pre>

---

# Don't do "runtime checks" 💔 (2/3)

```typescript
if (process.release.name === "node") {
  // Probably in Node.js
}
```

---

# Don't do "runtime checks" 💔 (2/3)

```typescript
if (process.release.name === "node") {
  // Probably in Node.js
}
```

---

# Don't do "runtime checks" 💔 (2/3)

```typescript
if (typeof process !== "undefined" &&
    typeof process.release !== "undefined" &&
    process.release.name === "node") {
  // Probably in Node.js
}
```

```typescript
// Renaming `require` to avoid bundling
const nodeRequire = require;
const fetch = nodeRequire("node-fetch");
```

---

# Declaring conditional exports 💙

```json
{
  // ...
  "exports": {
    ".": {
      "types": "./dist/common/index.d.ts",
      "node": "./dist/node/index.js",
      "browser": "./dist/browser/index.js"
    },
  }
  // ...
}
```

<!-- See https://nodejs.org/api/packages.html#conditional-exports -->

---

# Consuming conditional exports (from TypeScript)

```json
// tsconfig.json
{
  "compilerOptions": {
    "customConditions": ["browser"]
  }
}
```

<!-- See https://www.typescriptlang.org/tsconfig/#customConditions -->

Can be used to declare experimental APIs.

---

# Consuming conditional exports (from Node.js)

```bash
node --conditions=development index.js
```

Defaults to `"node", "node-addons", "default", "import", "require"`

<!-- See https://nodejs.org/api/packages.html#resolving-user-conditions -->

---

# Bundling conditional exports (from Vite / Rolldown)

```javascript
// vite.config.ts
export default defineConfig({
  resolve: {
    conditions: ["browser"]
  }
})
```

<!-- See https://v3.vitejs.dev/config/shared-options.html#resolve-conditions -->

---

# Bundling conditional exports (from Rspack)

```javascript
// rspack.config.mjs
export default {
  resolve: {
    conditionNames: ['browser'],
  },
};
```

<!-- See https://rspack.dev/config/resolve#resolveconditionnames -->

---

# Subpath exports 💙

```typescript
import * from "my-lib/common";
```

```json
{
  // ...
  "exports": {
    "./common": {
      "types": "./dist/common/index.d.ts",
      "default": "./dist/common/index.js"
    }
  }
  // ...
}
```

<!-- See https://nodejs.org/api/packages.html#subpath-exports -->

---

# Example package

- `my-lib` - A library package with Node.js and browser dependent code:
  - Uses conditional exports.
  - Uses subpath export of "common" / platform independent code.
  - Uses TypeScript "Project References".
  - Leverages specific tsconfig.json locations (for VS Code support).
- `my-app` - A Vite + React app consuming `my-lib`.

---

# Root `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./src/browser" },
    { "path": "./src/node" },
    { "path": "./src/common/tsconfig.tests.json" }
  ]
}
```

---

# `src/common/tsconfig.json`

- For common, runtime independent code
- `"types": []`
- `"lib": ["ES2022"]`
- `"noResolve": true`
- `"include": ["."]`
- `"exclude": ["**/*.test.ts"]`

---

# `src/common/tsconfig.tests.json`

- For unit tests of common, runtime independent code
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"noResolve": false`
- `"include": ["**/*.test.ts"]`
- `"exclude": []`
- `"references": [{ "path": "." }]`

---

# `src/browser/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/browser"`
- `"types": []`
- `"lib": ["ES2022", "DOM"]`
- `"include": ["."]`
- `"references": [{ "path": "../common" }]`

---

# `src/node/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/node"`
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"include": ["."]`
- `"references": [{ "path": "../common" }]`
