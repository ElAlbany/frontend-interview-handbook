# 22. Compose and pipe

**Frequency in interviews:** high

## The problem

Implement `compose(...fns)` and `pipe(...fns)`: each returns a function that feeds a value through the given functions — `pipe` left-to-right, `compose` right-to-left. `pipe(add1, double)(3)` → `8`. This is the foundation of middleware thinking.

## Examples

- Valid: `pipe(add1, double)(3)` → `8` (left to right)
- Invalid: `compose(add1, double)(3)` → `7` (right to left — don't mix them up)

## Approach and explanation

`pipe` runs left→right, `compose` right→left. This is the foundation of functional programming and how Redux middleware / Express middleware chain conceptually.

## Solution

`code.js`

```js
/**
 * Problem 22 — compose and pipe
 * Run: node code.js
 */
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const add1 = (x) => x + 1;
const double = (x) => x * 2;

console.log(pipe(add1, double)(3));    // 8  — add1 first, then double
console.log(compose(add1, double)(3)); // 7  — double first, then add1
```

`code.ts`

```ts
/**
 * Problem 22 — compose and pipe (TypeScript)
 * Run: node code.ts
 */
const compose = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduce((acc, fn) => fn(acc), x);

const add1 = (x: number): number => x + 1;
const double = (x: number): number => x * 2;

console.log(pipe(add1, double)(3));    // 8
console.log(compose(add1, double)(3)); // 7
```
