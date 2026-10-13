/**
 * Problem 61 — typeof quirks. Predict each, then run: node code.js
 */
console.log(typeof null);         // 'object'  (famous historical bug)
console.log(typeof undefined);    // 'undefined'
console.log(typeof []);           // 'object'  -> use Array.isArray
console.log(typeof NaN);          // 'number'  (yes, really)
console.log(typeof function(){}); // 'function'
console.log(Array.isArray([]));   // true — the reliable array check
