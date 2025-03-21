# Should I export TypeScript source-code?

Why would you do that?

<v-clicks depth="2">

- To allow apps to "build from source" via NPM?
  - Well ... TypeScript code is coupled to its configuration and compiler version
  - A composite project needs manual configuration from the app
  - And ... how about your other dev-dependencies?
- To enable "go to definition":
  - TypeScript Declarations maps are great for this.
  - Especially useful in a mono-repo.

</v-clicks>

<!--
Technically, you could ship a composite project and accurate peer dependency on the compiler.
But this is not how it's done.
-->
