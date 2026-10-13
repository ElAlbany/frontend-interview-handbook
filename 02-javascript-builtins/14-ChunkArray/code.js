/**
 * Problem 14 — Chunk an array into groups of `size`
 * Run: node code.js
 */
function chunk(arr, size) {
  if (size < 1) throw new Error("size must be >= 1"); // guard: size 0 = infinite loop
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]
console.log(chunk([1, 2, 3], 5));       // [[1,2,3]]
console.log(chunk([], 3));              // []
try { chunk([1], 0); } catch (e) { console.log(e.message); } // 'size must be >= 1'
