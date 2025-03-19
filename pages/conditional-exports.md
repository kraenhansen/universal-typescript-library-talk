---
layout: section
transition: null
---

# Conditional exports 💙

Statically declare exported files, based on conditions of the runtime environment

https://nodejs.org/api/packages.html#conditional-exports

<!--
Instead, you want to turn the import around and have runtime specific entrypoints which import and use common code.

Show of hands, who already knows about conditional exports?
-->

---
layout: section
transition: null
---

# Conditional exports 💙

```mermaid { 'themeVariables': { 'fontFamily': 'Lexend Deca', 'fontSize': '28px', 'primaryColor': '#BB2528', 'primaryTextColor': '#fff', 'primaryBorderColor': '#00ed64', 'lineColor': '#00ed64', 'secondaryColor': '#00684a', 'tertiaryColor': '#023430', 'clusterBkg': '#001e2b', 'edgeLabelBackground': '#001e2b', 'nodeBorder': '#00ed64' } }
flowchart LR
  linkStyle default stroke-width:4px;

  subgraph exports[Exports]
    browser-export(#quot;browser#quot; condition)
    node-export(#quot;node#quot; condition)
  end

  browser-export --> browser-source
  node-export --> node-source

  subgraph projects[JavaScript]
    browser-source(./dist/browser/index.js)
    node-source(./dist/node/index.js)
    common-source(./dist/common/index.js)
  end

  browser-source -- imports --> common-source
  node-source -- imports --> common-source
```

<!--
Instead of single shared entrypoint, you want to statically declare the files you export, based on conditions of the runtime environment.
-->

---

# Conditional exports 💙

<<< @/packages/my-lib/package.json {7|8,2|9|10|11} json

<!--
You can use "conditional exports" via the "exports" key in your "package.json".

[click] Using a dot, we declare the exports for the package root - this takes precedence over any "main" field.
[click] We can tell TypeScript where the types for this package is located.
[click] We can tell Node.js what file it's supposed to load.
[click] We can tell a bundler, what file it's supposed to include when bundling for the web.

-->

---

# Conditional exports 💙

"Runtime Keys" proposal by Winter CG defines a list of keys that represent various runtime environments:

https://runtime-keys.proposal.wintercg.org/

---

# Consuming conditional exports

From TypeScript

```json {4} 
// tsconfig.json
{
  "compilerOptions": {
    "customConditions": ["browser"]
  }
}
```

<!-- See https://www.typescriptlang.org/tsconfig/#customConditions -->

- Can be used to declare experimental APIs.
- Often not needed, since it's only used when resolving types.

---

# Consuming conditional exports

From Node.js

```bash
node --conditions=development index.js
```

Defaults to `"node", "node-addons", "default", "import", "require"`

<!-- See https://nodejs.org/api/packages.html#resolving-user-conditions -->

---

# Bundling conditional exports

From Vite / Rolldown

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

# Bundling conditional exports

From Rspack

```javascript
// rspack.config.mjs
export default {
  resolve: {
    conditionNames: ["browser"]
  }
}
```

---

<!-- See https://rspack.dev/config/resolve#resolveconditionnames -->

# Bundling conditional exports

From Metro (for React Native)

- Used to be experimental (enabled via `unstable_enablePackageExports`)
- Enabled by default as of React Native 0.79.0 🎉

<!-- See https://metrobundler.dev/docs/package-exports/ -->
