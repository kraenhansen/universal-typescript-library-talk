# Example package

<v-clicks at="0" depth="2">

- `my-lib` - A library package with Node.js and browser dependent code:
  - Uses conditional exports.
  - Uses subpath export of "common" / platform independent code.
  - Uses TypeScript "Project References".
- `my-app` - A Vite + React app consuming `my-lib`.

</v-clicks>

---

# Root `tsconfig.json`

```json {2|3-7|4|5|6}
{
  "files": [],
  "references": [
    { "path": "./src/browser" },
    { "path": "./src/node" },
    { "path": "./src/common/tsconfig.tests.json" }
  ]
}
```

---

# `src/common/tsconfig.json`

For common, runtime independent code

<v-clicks>

- `"types": []`
- `"lib": ["ES2022"]`
- `"noResolve": true`
- `"include": ["."]`
- `"exclude": ["**/*.test.ts"]`

</v-clicks>

---

# `src/common/tsconfig.tests.json`

- For unit tests of common, runtime independent code
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"noResolve": false`
- `"include": ["**/*.test.ts"]`
- `"exclude": []`
- `"references": [{ "path": "." }]`

---

# `src/browser/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/browser"`
- `"types": []`
- `"lib": ["ES2022", "DOM"]`
- `"include": ["."]`
- `"references": [{ "path": "../common" }]`

---

# `src/node/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/node"`
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"include": ["."]`
- `"references": [{ "path": "../common" }]`
