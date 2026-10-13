/**
 * Problem 15 — Group array of objects by a key (string or function)
 * Run: node code.js
 */
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

const orders = [
  { id: 1, status: "pending" },
  { id: 2, status: "paid" },
  { id: 3, status: "pending" },
];

console.log(groupBy(orders, "status"));
// { pending: [{id:1...},{id:3...}], paid: [{id:2...}] }
console.log(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even")));
// { odd: [1,3], even: [2,4] }
