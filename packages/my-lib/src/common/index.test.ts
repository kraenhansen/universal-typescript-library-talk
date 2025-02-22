import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { greet } from "./index";

describe("my-lib common code", () => {
  it("should greet", () => {
    assert.equal(greet(), "Hello from somewhere!");
  });
});
