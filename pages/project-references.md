---
layout: section
transition: null
---

# TypeScript Project References

Structure your TypeScript programs into smaller pieces.

<!--
Next up - I want to talk about a TypeScript feature called "project references".

Show of hands, who here has heard about them?

Who has used them?

They're a way to "Structure your TypeScript programs into smaller pieces."

Available since TypeScript 3.0 (July, 2018 ~ 7 years)

https://www.typescriptlang.org/docs/handbook/project-references.html

-->

---
layout: cover
transition: null
---

<style>
marker {
  transform: scale(2);
}
</style>

```mermaid { 'themeVariables': { 'fontFamily': 'Lexend Deca', 'fontSize': '28px', 'primaryColor': '#BB2528', 'primaryTextColor': '#fff', 'primaryBorderColor': '#00ed64', 'lineColor': '#00ed64', 'secondaryColor': '#00684a', 'tertiaryColor': '#023430', 'clusterBkg': '#001e2b', 'edgeLabelBackground': '#001e2b', 'nodeBorder': '#00ed64' } }
flowchart LR
  linkStyle default stroke-width:4px;
  subgraph projects[Projects]
    root("tsconfig.json<br><code>files: []</code>")
    common("tsconfig.common.json<p style='white-space:nowrap;'><code>include: [#quot;src/common#quot;],</code></p><p style='white-space:nowrap;'><code>exclude: [#quot;src/common/**.test.ts#quot;]</code></p>")
    common-tests("tsconfig.tests.json<p style='white-space:nowrap;'><code>include: [#quot;src/common/**.test.ts#quot;]</code></p>")
    browser("tsconfig.browser.json<p style='white-space:nowrap;'><code>include: [#quot;src/browser#quot;]</code></p>")
    node("tsconfig.node.json<p style='white-space:nowrap;'><code>include: [#quot;src/node#quot;]</code></p>")

    root --> common-tests
    root --> browser
    root --> node
    browser --> common
    node --> common
    common-tests --> common
  end

  browser -- "./dist/browser" --> browser-export
  node -- ./dist/node --> node-export
  common -- ./dist/common --> common-export

  subgraph exports[Exports]
    browser-export(#quot;browser#quot; condition)
    node-export(#quot;node#quot; condition)
    common-export(#quot;./common#quot; subpath)
  end
```

<!--

-->

---

# Root `tsconfig.json`

<<< @/packages/my-lib/tsconfig.json {2|3-7|4|5|6}

---

# `tsconfig.common.json`

For common, runtime independent code

<<< @/packages/my-lib/tsconfig.common.json {|13|14|2|4|5-6|7-8|9|10|11}

---

# `tsconfig.tests.json`

For unit tests of common, runtime independent code

<<< @/packages/my-lib/tsconfig.tests.json {|2|8|9|10|4|5|6}

---

# `tsconfig.browser.json`

For browser dependent code

<<< @/packages/my-lib/tsconfig.browser.json {|12|13|2|4|5-6|7-8|9|10}

<!-- Technically, we could use "bundler" for `moduleResolution` here -->

---

# `tsconfig.node.json`

For Node.js dependent code

<<< @/packages/my-lib/tsconfig.node.json {|13|14|2|4|5-6|7-8|9|10}

---

# Building with project references

<v-clicks>

- `tsc --build`
- `tsc --build --clean`
- `tsc --build --force`
- `tsc --build --verbose`
- `tsc --build --watch`
- `tsc --project tsconfig.tests.json`
- ⚠️ Make sure `include` and `outDir` paths don't overlap across projects.
</v-clicks>
