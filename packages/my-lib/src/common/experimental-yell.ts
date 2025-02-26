import { Greeter } from "./index.js";

declare module "./index.js" {
  export interface Greeter {
    yell(): string;
  }
}

Greeter.prototype.yell = function () {
  return this.greet().toUpperCase();
};
