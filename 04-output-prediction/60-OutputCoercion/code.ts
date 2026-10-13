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
