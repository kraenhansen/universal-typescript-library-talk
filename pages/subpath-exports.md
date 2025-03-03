---
layout: section
transition: null
---

# Subpath exports 💙

Declaring multiple entrypoints into your package.

```typescript
import { somethingRuntimeIndependent } from "my-lib/common";
```

<!--
Before subpath exports, importing from a file inside a package could easily break.
-->

---

# Subpath exports 💙

```mermaid { 'themeVariables': { 'fontFamily': 'Lexend Deca', 'fontSize': '28px', 'primaryColor': '#BB2528', 'primaryTextColor': '#fff', 'primaryBorderColor': '#00ed64', 'lineColor': '#00ed64', 'secondaryColor': '#00684a', 'tertiaryColor': '#023430', 'clusterBkg': '#001e2b', 'edgeLabelBackground': '#001e2b', 'nodeBorder': '#00ed64' } }
flowchart LR
  linkStyle default stroke-width:4px;

  subgraph exports[Exports]
    browser-export(#quot;browser#quot; condition)
    node-export(#quot;node#quot; condition)
    common-export(#quot;./common#quot; subpath)
  end

  browser-export --> browser-source
  node-export --> node-source
  common-export --> common-source

  subgraph projects[JavaScript]
    browser-source(./dist/browser/index.js)
    node-source(./dist/node/index.js)
    common-source(./dist/common/index.js)
  end

  browser-source -- imports --> common-source
  node-source -- imports --> common-source
```

---

# Subpath exports 💙

```typescript
import { somethingRuntimeIndependent } from "my-lib/common";
```

<<< @/packages/my-lib/package.json {7|13} json

<!--
Useful to 

See https://nodejs.org/api/packages.html#subpath-exports
-->
