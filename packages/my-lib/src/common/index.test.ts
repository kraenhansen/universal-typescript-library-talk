import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Greeter } from "./index.js";

describe("my-lib common code", () => {
  it("should greet", () => {
    const greeter = new Greeter();
    assert.equal(greeter.greet(), "Hello from somewhere!");
  });
});
