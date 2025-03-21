# Should I publish bundles?

<v-clicks>

- Single bundle makes it impossible to selectively import files → harder to shake unused code.
- I've never seen this work with declaration maps.
- Works well to isolate a platform-dependent dependency.
  - Consider using Rolldown or Rspack.
- Remember, your users will likely bundle themselves.

</v-clicks>

<!--
This is a bit more controversial.
-->
