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
