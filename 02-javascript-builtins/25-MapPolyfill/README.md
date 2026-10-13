# 25. `Array.prototype.map` polyfill

**Frequency in interviews:** high

## The problem

Reimplement `Array.prototype.map`: return a new array with the callback applied to every element; the callback receives `(value, index, array)`. Details that score: skip holes in sparse arrays, support `thisArg`.

## Examples

- Valid: `[1,2,3].myMap(x => x*2)` → `[2,4,6]`
- Invalid: sparse array `[1, ,3]` → holes must be skipped (that's what `i in this` is for)

## Approach and explanation

Interviewers check: callback receives `(value, index, array)`, the result is a **new** array, and `thisArg` support. `myFilter`/`myReduce` are the same shape — practice them too.

## Solution

`code.js`

```js
/**
 * Problem 25 — Array.prototype.map from scratch
 * Run: node code.js
 */
Array.prototype.myMap = function (callback, thisArg) {
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) out[i] = callback.call(thisArg, this[i], i, this); // skip holes
  }
  return out;
};

console.log([1, 2, 3].myMap((x) => x * 2));          // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => `${i}:${x}`)); // ['0:1','1:2','2:3']
// eslint-disable-next-line no-sparse-arrays
console.log([1, , 3].myMap((x) => x * 10).length);   // 3 — hole preserved, not visited
```

`code.ts`

```ts
/**
 * Problem 25 — Array.prototype.map as a typed function (TypeScript)
 * Run: node code.ts
 */
function myMap<T, U>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => U
): U[] {
  const out: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) out[i] = callback(arr[i], i, arr); // skip holes
  }
  return out;
}

console.log(myMap([1, 2, 3], (x) => x * 2));           // [2, 4, 6]
console.log(myMap(["a", "b"], (s, i) => `${i}:${s}`)); // ['0:a', '1:b']
```
