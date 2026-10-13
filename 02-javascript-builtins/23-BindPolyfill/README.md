# 23. `Function.prototype.bind` from scratch

**Frequency in interviews:** high

## The problem

Reimplement `Function.prototype.bind`: return a **new function** with `this` permanently set to the given context, supporting partial application of arguments. It must not call the function — that's the difference from `call`/`apply`.

## Examples

- Valid: `fn.myBind(obj, 1)(2)` → `this === obj`, args `[1, 2]`
- Invalid: calling the bound function with a different context → `this` stays locked to `obj`

## Approach and explanation

`bind` doesn't call — it returns a new function with `this` locked and optionally some arguments pre-filled (partial application). The polyfill shows you understand closures + `apply`.

## Solution

`code.js`

```js
/**
 * Problem 23 — Function.prototype.bind from scratch
 * Run: node code.js
 */
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};

const user = { name: "Alice" };
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}

const bound = greet.myBind(user, "Hello");
console.log(bound("!")); // 'Hello, Alice!'

// this stays locked even if called differently:
const detached = bound;
console.log(detached("?")); // 'Hello, Alice?'
```

`code.ts`

```ts
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
```
