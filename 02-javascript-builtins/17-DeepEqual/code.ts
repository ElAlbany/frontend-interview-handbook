/**
 * Problem 17 — Deep equality (TypeScript, unknown + type guards)
 * Run: node code.ts
 */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));               // true
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }));                     // false
console.log(deepEqual([1, [2]], [1, [2]]));                           // true
