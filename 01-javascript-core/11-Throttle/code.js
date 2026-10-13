/**
 * Problem 11 — Throttle: at most one run per `interval` ms.
 * Run: node code.js
 */
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

const log = throttle((msg) => console.log("fired:", msg), 500);
log("a"); // fires (first call always runs)
log("b"); // dropped — inside the 500ms window
log("c"); // dropped
setTimeout(() => log("d"), 600); // fires — window expired
// Expected output: 'fired: a' then 'fired: d'
