/**
 * Problem 24 — call/apply mechanics as typed functions (TypeScript)
 * Run: node code.ts
 */
function myCall<F extends (...args: never[]) => unknown>(
  fn: F,
  context: unknown,
  ...args: unknown[]
): unknown {
  const target = Object(context ?? globalThis) as Record<symbol, F>;
  const key = Symbol();
  target[key] = fn;
  const result = target[key](...args); // called as a method -> this = target
  delete target[key];
  return result;
}

const myApply = <F extends (...args: never[]) => unknown>(
  fn: F,
  context: unknown,
  argsArray: unknown[] = []
): unknown => myCall(fn, context, ...argsArray);

function introduce(this: { name: string }, age: number): string {
  return `${this.name}, ${age}`;
}

console.log(myCall(introduce, { name: "Alice" }, 23));   // 'Alice, 23'
console.log(myApply(introduce, { name: "Sara" }, [25])); // 'Sara, 25'
