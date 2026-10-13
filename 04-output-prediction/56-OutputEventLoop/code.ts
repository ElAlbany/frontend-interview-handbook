/**
 * Problem 56 — Predict the output BEFORE running, then run: node code.ts
 * Expected: 1, 4, 3, 2 (sync -> all microtasks -> one macrotask)
 */
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
