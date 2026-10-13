/**
 * Problem 11 — Throttle (TypeScript)
 * Run: node code.ts
 */
function throttle<F extends (...args: never[]) => void>(
  fn: F,
  interval: number
): (...args: Parameters<F>) => void {
  let lastTime = 0;
  return function (this: unknown, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

const log = throttle((msg: string) => console.log("fired:", msg), 500);
log("a"); // fires
log("b"); // dropped
log("c"); // dropped
setTimeout(() => log("d"), 600); // fires
