---
layout: two-cols-header
transition: null
---

# Runtime-specific injection

A pattern for injecting implementation into common code


`src/common/index.ts`

<<< @/packages/my-lib/src/common/index.ts ts {|2}

::left::

`src/browser/index.ts`

<<< @/packages/my-lib/src/browser/index.ts ts {none|1|3|5}

::right::

`src/node/index.ts`

<<< @/packages/my-lib/src/node/index.ts ts {none|1|3|5}
