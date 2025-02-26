import { Greeter } from "../common/index.js";

Greeter.where = "browser " + navigator.userAgent;

export * from "../common/index.js";
