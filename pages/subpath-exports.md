# Subpath exports 💙

```typescript
import * from "my-lib/common";
```

```json
{
  // ...
  "exports": {
    "./common": {
      "types": "./dist/common/index.d.ts",
      "default": "./dist/common/index.js"
    }
  }
  // ...
}
```

<!-- See https://nodejs.org/api/packages.html#subpath-exports -->
