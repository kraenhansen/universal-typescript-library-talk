# What module system should I publish with?

CommonJS (CJS) or EcmaScript Modules (ESM)?

<v-clicks>

- ESM is more expressible (dynamic `import` vs static `import`).
  - Enables static analysis of the dependency tree for tooling to visualize and tree-shake.
- Tools supporting CJS has to rely on heuristics (global `require` function) to support bundling.
  - Tree shaking is still possible, but potentially less accurate.
- ESM is the future ✨

</v-clicks>

<!--
Try ESM and see if you get push back: I would rather we work out the problems than stick with two systems.
-->

---

# What module system should I publish with?

Also ...

<v-clicks depth="2">

- CommonJS advantage: Avoiding `.js` extensions.
- Polyfill for CJS from ESM is easier than ESM from CJS.
  - Node.js only recently added support for the latter (v23 the experimental flag was removed)
- You could do both? (if you really need to)
  - Be aware of duplicate code (causing potential runtime issues)
  - Use the `require` and `import` export conditions (perhaps a `main` field as fallback?)
  - The `"module-sync"` export condition (introduced in Node.js v22.10.0, until all LTS support `require(ESM)`)

</v-clicks>

<!--
https://www.totaltypescript.com/relative-import-paths-need-explicit-file-extensions-in-ecmascript-imports
-->
