/**
 * Problem 59 — this binding. Predict, then run: node code.js
 */
"use strict";
const user = {
  name: "Alice",
  greet() { console.log("method:", this?.name); },
  greetArrow: () => console.log("arrow:", this?.name),
};
user.greet();       // 'method: Alice' — this = user
const f = user.greet;
f();                // 'method: undefined' — plain call, this is lost
user.greetArrow();  // 'arrow: undefined' — arrows capture outer this
