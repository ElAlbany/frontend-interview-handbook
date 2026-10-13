/**
 * Problem 23 — bind, written as a typed utility function (TypeScript)
 * (Augmenting Function.prototype in TS needs declaration merging;
 *  a standalone function is cleaner and shows the same mechanics.)
 * Run: node code.ts
 */
function myBind<F extends (...args: never[]) => unknown>(
  fn: F,
  context: unknown,
  ...boundArgs: unknown[]
): (...callArgs: unknown[]) => unknown {
  return (...callArgs) => fn.apply(context, [...boundArgs, ...callArgs]);
}

const user = { name: "Alice" };
function greet(this: { name: string }, greeting: string, punct: string): string {
  return `${greeting}, ${this.name}${punct}`;
}

const bound = myBind(greet, user, "Hello");
console.log(bound("!")); // 'Hello, Alice!'
console.log(bound("?")); // 'Hello, Alice?' — this stays locked
