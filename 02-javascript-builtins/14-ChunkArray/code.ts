/**
 * Problem 14 — Chunk an array (TypeScript, generic)
 * Run: node code.ts
 */
function chunk<T>(arr: T[], size: number): T[][] {
  if (size < 1) throw new Error("size must be >= 1");
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

console.log(chunk([1, 2, 3, 4, 5], 2));       // [[1,2],[3,4],[5]]
console.log(chunk(["a", "b", "c"], 5));       // [['a','b','c']]
console.log(chunk<number>([], 3));            // []
try {
  chunk([1], 0);
} catch (e) {
  console.log((e as Error).message); // 'size must be >= 1'
}
