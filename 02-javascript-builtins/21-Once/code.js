/**
 * Problem 21 — once(): run a function only the first time
 * Run: node code.js
 */
function once(fn) {
  let called = false, result;
  return function (...args) {
    if (called) return result;
    called = true;
    return (result = fn.apply(this, args));
  };
}

let runs = 0;
const init = once(() => { runs++; return "initialized"; });

console.log(init()); // 'initialized'
console.log(init()); // 'initialized' — cached, fn NOT re-run
console.log(init()); // 'initialized'
console.log("fn ran", runs, "time(s)"); // 1
