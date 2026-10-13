/**
 * Problem 42 — Merge two sorted arrays. O(n+m). This is merge sort's merge step.
 * Run: node code.js
 */
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
console.log(mergeSorted([], [1]));              // [1]
console.log(mergeSorted([1, 2], []));           // [1,2]
