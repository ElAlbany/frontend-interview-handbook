# A49. Polyfill Array.flat and Array.flatMap

Difficulty: Easy-Medium

## Problem

Without using the native methods, implement:

- `flat(arr, depth = 1)` - returns a new array with sub-arrays concatenated
  recursively up to `depth` levels (`Infinity` flattens fully).
- `flatMap(arr, fn)` - maps each element with `fn`, then flattens the result
  by exactly one level.

Both must return new arrays and never mutate the input.

## Example

```ts
flat([1, [2, [3, [4]]]], 1);        // [1, 2, [3, [4]]]
flat([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
flatMap([1, 2, 3], (n) => [n, n * 10]); // [1, 10, 2, 20, 3, 30]
flatMap(["a b", "c"], (s) => s.split(" ")); // ["a", "b", "c"]
```

## Approach

- `flat`: iterate; if the item is an array and `depth > 0`, spread the recursive result with `depth - 1`, otherwise push the item as-is. `Infinity` never decrements to zero, so it flattens fully for free.
- Use spread (`out.push(...children)`) instead of a manual inner loop.
- `flatMap` is exactly `map` followed by `flat(1)`, but do it in one pass: push or spread depending on whether the mapped value is an array.
- Polyfill framing (good to mention): the real thing would guard with `if (!Array.prototype.flat)` and attach to the prototype; writing standalone functions keeps the same logic testable.

Run with: node code.ts (Node 24+ recommended, runs TypeScript directly).

## Solution

The full implementation lives in `code.ts` in this folder:

```ts
/*
 * A49 - Polyfill Array.flat and Array.flatMap
 * Run with: node code.ts
 */

function flat(arr: unknown[], depth: number = 1): unknown[] {
  const out: unknown[] = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      out.push(...flat(item, depth - 1)); // Infinity - 1 is still Infinity
    } else {
      out.push(item);
    }
  }
  return out;
}

function flatMap<T, U>(arr: T[], fn: (item: T, index: number) => U | U[]): U[] {
  const out: U[] = [];
  arr.forEach((item, index) => {
    const mapped = fn(item, index);
    if (Array.isArray(mapped)) out.push(...(mapped as U[]));
    else out.push(mapped as U);
  });
  return out;
}

const nested = [1, [2, [3, [4]]]];
console.log(flat(nested, 1));        // [ 1, 2, [ 3, [ 4 ] ] ]
console.log(flat(nested, Infinity)); // [ 1, 2, 3, 4 ]
console.log("input untouched:", JSON.stringify(nested)); // [1,[2,[3,[4]]]]

console.log(flatMap([1, 2, 3], (n) => [n, n * 10]));          // [ 1, 10, 2, 20, 3, 30 ]
console.log(flatMap(["a b", "c"], (s) => s.split(" ")));      // [ 'a', 'b', 'c' ]
console.log(flatMap([1, 2], (n) => (n % 2 ? n : [n, n])));    // [ 1, 2, 2 ]
```
