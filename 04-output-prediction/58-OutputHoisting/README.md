# 58. Hoisting trap

**Frequency in interviews:** high

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `undefined`, then `ReferenceError`
- Common wrong guess: `5` for `a`, or `undefined` (instead of an error) for `b`

`var` declarations hoist without values; `let/const` hoist into the TDZ where touching them throws; function declarations hoist completely.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
