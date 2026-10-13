/**
 * Problem 60 — == coercion classics. Predict each, then run: node code.js
 */
console.log("5" + 3);          // '53'   (string concat wins)
console.log("5" - 3);          // 2      (- forces numbers)
console.log("5" == 5);         // true   (coercion)
console.log("5" === 5);        // false  (no coercion)
console.log(null == undefined);// true   (the one special pair)
console.log(NaN == NaN);       // false  (NaN equals nothing)
console.log([] == ![]);        // true   (edge case — just use ===)
