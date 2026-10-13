/**
 * Problem 9 — Debounce (TypeScript, fully typed with Parameters<F>)
 * Run: node code.ts
 */
function debounce<F extends (...args: never[]) => void>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Demo: 5 rapid calls -> fn runs ONCE, with the LAST arguments
const log = debounce((msg: string) => console.log("fired with:", msg), 300);
log("call 1");
log("call 2");
log("call 3");
log("call 4");
log("call 5");
// Expected: a single line 'fired with: call 5' after ~300ms
