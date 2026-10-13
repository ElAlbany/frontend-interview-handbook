/**
 * Problem 58 — Hoisting trap. Predict each line, then run: node code.js
 */
console.log(a); // undefined (var hoisted, assignment is not)
var a = 5;
try {
  console.log(b); // ReferenceError — temporal dead zone
} catch (e) {
  console.log("b throws:", e.constructor.name);
}
let b = 10;
sayHi(); // 'hi' — function declarations hoist completely
function sayHi() { console.log("hi"); }
