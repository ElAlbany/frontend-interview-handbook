/**
 * Problem 25 — Array.prototype.map from scratch
 * Run: node code.js
 */
Array.prototype.myMap = function (callback, thisArg) {
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) out[i] = callback.call(thisArg, this[i], i, this); // skip holes
  }
  return out;
};

console.log([1, 2, 3].myMap((x) => x * 2));          // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => `${i}:${x}`)); // ['0:1','1:2','2:3']
// eslint-disable-next-line no-sparse-arrays
console.log([1, , 3].myMap((x) => x * 10).length);   // 3 — hole preserved, not visited
