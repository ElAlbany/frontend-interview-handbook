/**
 * Problem 43 — Intersection of two arrays (unique / with-duplicates variants)
 * Run: node code.js
 */
function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a.filter((x) => setB.has(x)))];
}

// variant: duplicates counted (Intersection II)
function intersectionWithDuplicates(a, b) {
  const count = new Map();
  for (const x of b) count.set(x, (count.get(x) || 0) + 1);
  const out = [];
  for (const x of a) {
    if (count.get(x) > 0) { out.push(x); count.set(x, count.get(x) - 1); }
  }
  return out;
}

console.log(intersection([1, 2, 2, 1], [2, 2]));                  // [2]
console.log(intersection([1, 2], [3, 4]));                        // []
console.log(intersectionWithDuplicates([1, 2, 2, 1], [2, 2]));    // [2, 2]
