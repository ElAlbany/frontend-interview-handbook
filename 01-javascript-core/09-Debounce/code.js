/**
 * Problem 9 — Debounce: run only after calls stop for `delay` ms.
 * Run: node code.js
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Demo: 5 rapid calls -> fn runs ONCE, with the LAST arguments
const log = debounce((msg) => console.log("fired with:", msg), 300);
log("call 1");
log("call 2");
log("call 3");
log("call 4");
log("call 5"); // only this one survives the 300ms quiet window
// Expected: a single line 'fired with: call 5' after ~300ms
