/**
 * Problem 33 — Array.prototype.reduce from scratch
 * Run: node code.js
 */
Array.prototype.myReduce = function (callback, initial) {
  let i = 0;
  let acc = initial;
  if (acc === undefined) {
    if (this.length === 0) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[0];
    i = 1;
  }
  for (; i < this.length; i++) acc = callback(acc, this[i], i, this);
  return acc;
};

console.log([1, 2, 3].myReduce((a, b) => a + b, 0)); // 6
console.log([1, 2, 3].myReduce((a, b) => a + b));    // 6 (acc starts as 1)
try {
  [].myReduce((a, b) => a + b);
} catch (e) {
  console.log(e.constructor.name + ": " + e.message); // TypeError: Reduce of empty array...
}
