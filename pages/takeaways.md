---
layout: section
transition: null
---

# Takeaways

---

# 👎 Don't <v-click>(unless you have good reasons to)</v-click>

<v-clicks>

- Runtime checks
- Publish bundles
- Publish TypeScript source-code
- CommonJS (`require` calls)

</v-clicks>

<!-- My personal opinion: Form your own ... -->

---

# 👍 Do use

<v-clicks depth="2">

- TypeScript project references
- Conditional exports
- Subpath exports
  - For common code
  - For experimental features
- EcmaScript modules
- Source maps
- TypeScript declarations maps (if in mono-repos or when publishing source-code)

</v-clicks>
