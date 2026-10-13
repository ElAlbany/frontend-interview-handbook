/**
 * Problem 8 — Flatten a nested array (built-in, recursive, to-depth)
 * Run: node code.js
 */
const flat = (arr) => arr.flat(Infinity);

function flatten(arr) {
  const out = [];
  for (const item of arr) {
    Array.isArray(item) ? out.push(...flatten(item)) : out.push(item);
  }
  return out;
}

function flattenDepth(arr, depth = 1) {
  if (depth === 0) return arr.slice();
  return arr.reduce(
    (out, item) => out.concat(Array.isArray(item) ? flattenDepth(item, depth - 1) : item),
    []
  );
}

console.log(flat([1, [2, [3, [4]]]]));        // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4]]]]));     // [1, 2, 3, 4]
console.log(flatten([[]]));                   // []
console.log(flattenDepth([1, [2, [3]]], 1));  // [1, 2, [3]]
