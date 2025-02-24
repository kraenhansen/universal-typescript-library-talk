# Don't do "runtime checks" 💔

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

💥 Some dependency brought a global polyfill of some `window` API
</v-clicks>

<!-- They're really hard to test, because they break on "the other" platform -->

---

# Don't do "runtime checks" 💔

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
