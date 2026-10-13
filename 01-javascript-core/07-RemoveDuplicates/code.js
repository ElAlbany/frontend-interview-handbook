/**
 * Problem 7 — Remove duplicates (Set one-liner, manual loop, objects by key)
 * Run: node code.js
 */
const unique = (arr) => [...new Set(arr)];

function uniqueManual(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    if (!seen.has(item)) { seen.add(item); out.push(item); }
  }
  return out;
}

function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter((item) => !seen.has(item[key]) && seen.add(item[key]));
}

console.log(unique([1, 2, 2, 3, 1]));       // [1, 2, 3]
console.log(unique([]));                    // []
console.log(unique(["a", "b", "a"]));       // ['a', 'b']
console.log(uniqueManual([1, 2, 2, 3, 1])); // [1, 2, 3]
console.log(uniqueManual([5, 5, 5]));       // [5]

const cars = [
  { id: 1, brand: "Toyota" },
  { id: 2, brand: "BMW" },
  { id: 1, brand: "Toyota" }, // duplicate id
];
console.log(uniqueBy(cars, "id")); // [{ id: 1, ... }, { id: 2, ... }]
