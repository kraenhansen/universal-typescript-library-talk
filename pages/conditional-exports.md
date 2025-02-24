# Declaring conditional exports 💙

```json {3|4|5-7}
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
- Often not needed, since it's only used for types resolving types.

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
    conditionNames: ["browser"]
  }
}
```

<!-- See https://rspack.dev/config/resolve#resolveconditionnames -->
