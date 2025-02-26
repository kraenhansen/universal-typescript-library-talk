# Module augmentation through subpath export 💡

A pattern to export experimental APIs.

<<< @/packages/my-lib/src/common/experimental-yell.ts {1|3|4|5|9-11} ts

---

# Module augmentation through subpath export 💡

<<< @/packages/my-lib/package.json {14} json

<!-- See https://github.com/realm/realm-js/blob/main/packages/realm/src/experimental/base-url.ts -->
---

# Module augmentation through subpath export 💡

```typescript
import { Greeter } from "my-lib";
// import "my-lib/experimental-yell";

const greeter = new Greeter();
greeter.yell();
// 💥 Property 'yell' does not exist on type 'Greeter'.
```

---

# Module augmentation through subpath export 💡

```typescript
import { Greeter } from "my-lib";
import "my-lib/experimental-yell";

const greeter = new Greeter();
greeter.yell();
```

<!-- See https://github.com/realm/realm-js/blob/main/packages/realm/src/experimental/base-url.ts -->
