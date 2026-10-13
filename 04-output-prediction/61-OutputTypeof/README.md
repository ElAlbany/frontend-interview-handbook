# 61. `typeof` quirks

**Frequency in interviews:** medium

## The problem



## Approach and explanation

**Predict first:**
- Correct answer: `typeof null` is `'object'`, `typeof NaN` is `'number'`
- Common wrong guess: `'null'` and `'NaN'` (neither exists as a type string)

Know the first three cold — they're asked constantly.

## Solution

`code.js`

```js
/**
 * Problem 61 — typeof quirks. Predict each, then run: node code.js
 */
console.log(typeof null);         // 'object'  (famous historical bug)
console.log(typeof undefined);    // 'undefined'
console.log(typeof []);           // 'object'  -> use Array.isArray
console.log(typeof NaN);          // 'number'  (yes, really)
console.log(typeof function(){}); // 'function'
console.log(Array.isArray([]));   // true — the reliable array check
```

`code.ts`

```ts
/**
 * Problem 61 — typeof quirks. Predict each, then run: node code.ts
 */
console.log(typeof null);          // 'object'  (famous historical bug)
console.log(typeof undefined);     // 'undefined'
console.log(typeof []);            // 'object'  -> use Array.isArray
console.log(typeof NaN);           // 'number'
console.log(typeof function (): void {}); // 'function'
console.log(Array.isArray([]));    // true
```
