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

# Runtime specific APIs

## Globals

- `window`
- `navigator`
- `fetch`
- `console.log`
- `process`
- `Bun.file("foo.txt")`
- `Deno.readFileSync("hello.txt")`

## Packages / built-ins

- `import fs from "node:fs"`
- `import { Platform } from "react-native"`

---
layout: center
---

🥇 Goal of the universal library author:

# Separate runtime agnostic <em>(i.e. common)</em> code from<br>runtime specific code.
