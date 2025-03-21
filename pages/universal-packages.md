# Universal package

<v-clicks>

- Write once, run everywhere.
- AKA an isomorphic package:
  - `isomorphic-fetch`
  - `isomorphic-ws`
- Helps building
  - Reusable apps (across Web, Electron, React Native, server-side Node.js, server-less functions)
  - Testable apps (use on Web - test using Node.js)

</v-clicks>

<!--
Enough about me - this is a talk about universal typescript libraries.
But - what is a universal library / package?
[click] Enables "Write once, run everywhere." apps.
[click] These are sometimes referred to as "isomorphic".
[click] They can help you build reusable and testable apps. Reusable across different runtime environments and testable because your app can target one environment and run tests on another.
-->

---

# Trivial universal package

Simple when not depending runtime APIs or other runtime specific packages.

### `package.json`

```json
{
  "name": "my-lib",
  "type": "module",
  "main": "./index.js"
}
```

### `index.js`

```javascript
export function greet() {
  return "hi there";
}
```

<!--
As long as you're writing only JavaScript and you're not using APIs from the runtime environment, you're good!
-->

---

# What is a runtime environment?

Runtime environment != JS Engine

<v-clicks>

- Sometimes called "platform", "runtime" or "environment".
- Entails but <em>is not</em> a JavaScript engine:
  - V8
  - JavaScript Core
  - Hermes
  - SpiderMonkey
  - Chakra
  - ...

</v-clicks>

<!--
What do I mean by "runtime environment"?
[click] Sometimes called "platform" or simply "runtime" or "environment".
[click] A runtime environment brings, but is not the same as a JS engine:
- V8 *(used by Chrome, Node.js, Electron, ...)*
- JavaScript Core *(used by Safari, WebKit browsers and some React Native apps)*
- Hermes *(used by most React Native apps)*
- SpiderMonkey *(used by Firefox)*
- Chakra *(used by Internet Explorer)*

All of which support execution of JavaScript (in some version)
-->

---

# Runtime specific APIs

## Globals

<v-clicks>

- `window`
- `navigator`
- `fetch`
- `console.log`
- `process`
- `Bun.file("foo.txt")`
- `Deno.readFileSync("hello.txt")`

</v-clicks>

<v-click>

## Packages / built-ins

</v-click>

<v-clicks>

- `import fs from "node:fs"`
- `import { Platform } from "react-native"`

</v-clicks>

---
layout: center
---

🥇 Goal of the universal library author

# Separate runtime agnostic <em>(i.e. common)</em> code from<br>runtime specific code
