/**
 * Problem 17 — Deep equality check
 * Run: node code.js
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));               // true (key order irrelevant)
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }));                     // false
console.log({} === {});                                               // false — why this problem exists
