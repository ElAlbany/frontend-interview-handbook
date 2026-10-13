/**
 * Problem 8 — Flatten a nested array (TypeScript, recursive type)
 * Run: node code.ts
 */
type NestedArray<T> = (T | NestedArray<T>)[];

function flatten<T>(arr: NestedArray<T>): T[] {
  const out: T[] = [];
  for (const item of arr) {
    Array.isArray(item) ? out.push(...flatten(item)) : out.push(item);
  }
  return out;
}

function flattenDepth<T>(arr: NestedArray<T>, depth = 1): unknown[] {
  if (depth === 0) return arr.slice();
  return arr.reduce<unknown[]>(
    (out, item) => out.concat(Array.isArray(item) ? flattenDepth(item, depth - 1) : item),
    []
  );
}

console.log(flatten([1, [2, [3, [4]]]]));       // [1, 2, 3, 4]
console.log(flatten([[]]));                     // []
console.log(flattenDepth([1, [2, [3]]], 1));    // [1, 2, [3]]
