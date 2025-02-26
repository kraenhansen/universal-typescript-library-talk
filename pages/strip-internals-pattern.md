# Internal APIs

`src/common/internal.ts`

<<< @/packages/my-lib/src/common/internal.ts

---

# Without internals stripped

`dist/common/internal.d.ts`

<<< @/packages/my-lib/dist/common/internal.d.ts

---

# With internals stripped

```bash {|2|3|4|5}
tsc
  --project tsconfig.common.json
  --stripInternal
  --emitDeclarationOnly
  --outDir dist/public-types
```

`dist/public-types/internal.d.ts`

<<< @/packages/my-lib/dist/public-types/internal.d.ts

---

# You'll need a separate type-check script ⚠️

> This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid.

```bash {|2|3}
tsc
  --noEmit
  dist/public-types/**/*.ts
```

See https://api-extractor.com/ - results may vary ...
