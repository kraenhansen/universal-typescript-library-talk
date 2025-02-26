import { describe, expect, it } from "vitest";
import { Greeter } from "my-lib";
// import "my-lib/experimental-yell";

describe("my-lib", () => {
  it("works", () => {
    const greeter = new Greeter();
    expect(greeter.greet()).toContain("Hello from Node");
  });
});
