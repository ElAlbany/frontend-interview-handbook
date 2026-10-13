/**
 * Problem 57 — Predict BEFORE running: node code.ts
 * var loop: 3, 3, 3 | let loop: 0, 1, 2
 */
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var:", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let:", j));
