# 33. `Array.prototype.reduce` polyfill

**Frequency in interviews:** medium

## The problem

Reimplement `Array.prototype.reduce`. The edge cases are the question: with no initial value the accumulator starts as the first element, and reducing an empty array without an initial value must throw a `TypeError`.

## Examples

- Valid: `[1,2,3].myReduce((a,b)=>a+b, 0)` → `6`
- Invalid: `[].myReduce(fn)` with no initial value → must throw `TypeError`

## Approach and explanation

The subtle part is the missing-initial-value case: accumulator starts as the first element, and reducing an empty array without an initial value throws.

## Solution

`code.js`

```js
/**
 * Problem 33 — Array.prototype.reduce from scratch
 * Run: node code.js
 */
Array.prototype.myReduce = function (callback, initial) {
  let i = 0;
  let acc = initial;
  if (acc === undefined) {
    if (this.length === 0) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[0];
    i = 1;
  }
  for (; i < this.length; i++) acc = callback(acc, this[i], i, this);
  return acc;
};

console.log([1, 2, 3].myReduce((a, b) => a + b, 0)); // 6
console.log([1, 2, 3].myReduce((a, b) => a + b));    // 6 (acc starts as 1)
try {
  [].myReduce((a, b) => a + b);
} catch (e) {
  console.log(e.constructor.name + ": " + e.message); // TypeError: Reduce of empty array...
}
```

`code.ts`

```ts
/**
 * Problem 33 — Array.prototype.reduce as a typed function (TypeScript)
 * Run: node code.ts
 */
function myReduce<T, U>(
  arr: T[],
  callback: (acc: U, current: T, index: number, array: T[]) => U,
  initial: U
): U;
function myReduce<T>(
  arr: T[],
  callback: (acc: T, current: T, index: number, array: T[]) => T
): T;
function myReduce<T>(
  arr: T[],
  callback: (acc: T, current: T, index: number, array: T[]) => T,
  initial?: T
): T {
  let i = 0;
  let acc = initial as T;
  if (acc === undefined) {
    if (arr.length === 0) throw new TypeError("Reduce of empty array with no initial value");
    acc = arr[0];
    i = 1;
  }
  for (; i < arr.length; i++) acc = callback(acc, arr[i], i, arr);
  return acc;
}

console.log(myReduce([1, 2, 3], (a, b) => a + b, 0));  // 6
console.log(myReduce([1, 2, 3], (a, b) => a + b));     // 6
console.log(myReduce(["a", "b"], (a, b) => a + b, "")); // 'ab'
try {
  myReduce<number>([], (a, b) => a + b);
} catch (e) {
  console.log((e as Error).constructor.name); // TypeError
}
```
