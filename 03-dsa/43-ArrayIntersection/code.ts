/**
 * Problem 43 — Array intersection, unique and counted variants (TypeScript)
 * Run: node code.ts
 */
function intersection(a: number[], b: number[]): number[] {
  const setB = new Set(b);
  return [...new Set(a.filter((x) => setB.has(x)))];
}

function intersectionWithDuplicates(a: number[], b: number[]): number[] {
  const count = new Map<number, number>();
  for (const x of b) count.set(x, (count.get(x) ?? 0) + 1);
  const out: number[] = [];
  for (const x of a) {
    if ((count.get(x) ?? 0) > 0) {
      out.push(x);
      count.set(x, count.get(x)! - 1);
    }
  }
  return out;
}

console.log(intersection([1, 2, 2, 1], [2, 2]));               // [2]
console.log(intersection([1, 2], [3, 4]));                     // []
console.log(intersectionWithDuplicates([1, 2, 2, 1], [2, 2])); // [2, 2]
