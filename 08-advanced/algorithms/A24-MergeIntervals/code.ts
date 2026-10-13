/**
 * A24 — Merge intervals (TypeScript)
 * Run: node code.ts
 */
function merge(intervals: number[][]): number[][] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]); // sort by start!
  const out: number[][] = [];
  for (const [start, end] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end); // extend the previous interval
    } else {
      out.push([start, end]);
    }
  }
  return out;
}

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]]));                    // [[1,5]]
console.log(merge([[1, 4], [2, 3]]));                    // [[1,4]] (fully contained)
