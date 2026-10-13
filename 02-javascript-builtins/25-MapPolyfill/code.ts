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
