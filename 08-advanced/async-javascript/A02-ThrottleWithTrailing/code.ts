/**
 * A02 — Throttle with a trailing call (TypeScript)
 * Run: node code.ts
 */
function throttle<F extends (...args: never[]) => void>(
  fn: F,
  interval: number
): (...args: Parameters<F>) => void {
  let lastTime = 0;
  let trailingTimer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<F> | undefined;

  return function (...args: Parameters<F>) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);
    lastArgs = args;
    if (remaining <= 0) {
      clearTimeout(trailingTimer);
      trailingTimer = undefined;
      lastTime = now;
      fn(...args);
    } else if (!trailingTimer) {
      trailingTimer = setTimeout(() => {
        lastTime = Date.now();
        trailingTimer = undefined;
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  };
}

const log = throttle((m: string) => console.log("fired:", m, Date.now() % 100000), 300);
log("1"); log("2"); log("3"); // '1' immediately; '3' as the trailing call ~300ms later
setTimeout(() => log("4"), 600); // fires immediately — window expired
