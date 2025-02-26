export class Greeter {
  static where = "somewhere";

  greet(): string {
    return `Hello from ${Greeter.where}!`;
  }
}
