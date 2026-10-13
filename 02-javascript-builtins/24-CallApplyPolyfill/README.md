# 24. `call` / `apply` from scratch

**Frequency in interviews:** medium

## The problem

Reimplement `call` (and `apply`): invoke a function immediately with an explicit `this` and arguments (individually for `call`, as an array for `apply`). The trick to discover: `this` is whatever a function is called **on**, so temporarily attach it to the target object.

## Examples

- Valid: `greet.myCall(user)` → `this === user`
- Invalid: `null` context → falls back to `globalThis` (non-strict) — guard with `Object(context ?? globalThis)`

## Approach and explanation

The trick: `this` inside a function equals the object it was called **on** — so temporarily attach the function to the target object and call it as a method. `apply` = same but args as an array.

## Solution

`code.js`

```js
/**
 * Problem 24 — call/apply from scratch
 * Run: node code.js
 */
Function.prototype.myCall = function (context, ...args) {
  context = Object(context ?? globalThis);
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args); // called as a method -> this = context
  delete context[key];
  return result;
};

Function.prototype.myApply = function (context, argsArray) {
  return this.myCall(context, ...(argsArray ?? []));
};

function introduce(age) {
  return `${this.name}, ${age}`;
}

console.log(introduce.myCall({ name: "Alice" }, 23));    // 'Alice, 23'
console.log(introduce.myApply({ name: "Sara" }, [25])); // 'Sara, 25'
```

`code.ts`

```ts
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
```
