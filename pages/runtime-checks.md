# Single entrypoint with runtime checks? 🤔

```mermaid { 'themeVariables': { 'fontFamily': 'Lexend Deca', 'fontSize': '28px', 'primaryColor': '#BB2528', 'primaryTextColor': '#fff', 'primaryBorderColor': '#00ed64', 'lineColor': '#00ed64', 'secondaryColor': '#00684a', 'tertiaryColor': '#023430', 'clusterBkg': '#001e2b', 'edgeLabelBackground': '#001e2b', 'nodeBorder': '#00ed64' } }
flowchart LR
  linkStyle default stroke-width:4px;

  subgraph exports[Exports]
    main-export(#quot;main#quot; field)
  end

  main-export --> common-source

  subgraph projects[JavaScript]
    browser-source(./dist/browser/index.js)
    node-source(./dist/node/index.js)
    common-source(./dist/common/index.js)
  end

  common-source -- imports --> node-source
  common-source -- imports --> browser-source
```

---

# Runtime checks 😬

<v-clicks at="0">

```typescript
if (window) {
  // Probably in a browser 😬
} else if (process.release.name === "node") {
  // Probably in Node.js 😬
}
```

```
Uncaught ReferenceError: window is not defined
```

```typescript
if (typeof window !== "undefined") {
  // Probably in a browser 🙏
} else if (
  typeof process !== "undefined" &&
  typeof process.release !== "undefined" &&
  process.release.name === "node"
) {
  // Probably in Node.js 🙏
}
```

- 💥 Some dependency brought a global polyfill of some `window` API
- They're really hard to test, because they break on "the other" platform

</v-clicks>

<!--
One way you might do this, is through an pattern typically referred to as "runtime checks".

Can someone tell me why this code is a bad idea?

[click] On Node.js this is a reference error, because the window global is not defined.
[click] Let's try to fix that. The RHS of the `typeof` operator is allowed to be completely missing from the scope. Can someone tell my who this can go wrong?
[click] Some misbehaving dependency might have patched the global with a polyfill. And ultimately these are really hard to test.
-->

---

# Runtime checks 😬

<v-clicks at="0">
```typescript
if (isNode) {
  const fs = require("fs");
  // ...
}
```

```
[UNRESOLVED_IMPORT] Warning: Could not resolve "fs" in my-lib.js
```

```typescript
// Renaming `require` to avoid bundling 😬
if (isNode) {
  const nodeRequire = require;
  const fs = nodeRequire("fs");
}
```
</v-clicks>

<!--
Even if you manage to define some constant, the "isNode" constant here.
Importing platform specific code from common code has issues. Does anyone have an idea on how this can go wrong?
[click] require calls mess with bundlers.
[click] you can do ugly workarounds, but this doesn't even work on Rspack, because it's smarter.
-->
