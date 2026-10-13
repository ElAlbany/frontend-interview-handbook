/**
 * Problem 61 — typeof quirks. Predict each, then run: node code.ts
 */
console.log(typeof null);          // 'object'  (famous historical bug)
console.log(typeof undefined);     // 'undefined'
console.log(typeof []);            // 'object'  -> use Array.isArray
console.log(typeof NaN);           // 'number'
console.log(typeof function (): void {}); // 'function'
console.log(Array.isArray([]));    // true
