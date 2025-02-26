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

```typescript
import { somethingRuntimeIndependent } from "my-lib/common";
```

<<< @/packages/my-lib/package.json {7|13} json

<!--
Useful to 

See https://nodejs.org/api/packages.html#subpath-exports
-->
