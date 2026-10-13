# 60. `==` coercion classics

**Frequency in interviews:** high

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `'53'`, `2`, `true`, `false`, `true`, `false`
- Invalid: Common wrong guesses: `8` for `'5' + 3`, or `true` for `NaN == NaN`

Rule to say: "`==` coerces types first, `===` doesn't — always use `===` except the deliberate `x == null` check that catches both null and undefined."

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
/**
 * Problem 60 — == coercion classics (TypeScript).
 * Note: strict TS flags some of these comparisons; @ts-expect-error marks them.
 * Predict each, then run: node code.ts
 */
console.log("5" + 3); // '53'
// @ts-expect-error - intentional coercion demo
console.log("5" - 3); // 2
// @ts-expect-error - intentional coercion demo
console.log("5" == 5); // true
// @ts-expect-error - intentional coercion demo
console.log("5" === 5); // false
console.log(null == undefined); // true
console.log(NaN == (NaN as unknown)); // false
```
