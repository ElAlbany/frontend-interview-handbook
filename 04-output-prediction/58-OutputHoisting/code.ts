/**
 * Problem 58 — Hoisting trap. Predict each line, then run: node code.ts
 */
// @ts-nocheck would be needed for a strict compile — this file intentionally
// references variables before declaration to demonstrate hoisting behavior.
console.log(a); // undefined (var hoisted, assignment is not)
var a = 5;
try {
  // @ts-expect-error - temporal dead zone demonstration
  console.log(b);
} catch (e) {
  console.log("b throws:", (e as Error).constructor.name);
}
let b = 10;
sayHi(); // 'hi' — function declarations hoist completely
function sayHi(): void {
  console.log("hi");
}
