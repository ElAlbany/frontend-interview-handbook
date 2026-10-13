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
