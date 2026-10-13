/**
 * A01 — Debounce with leading/trailing options (TypeScript)
 * Run: node code.ts
 */
interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

function debounce<F extends (...args: never[]) => void>(
  fn: F,
  wait: number,
  options: DebounceOptions = {}
): (...args: Parameters<F>) => void {
  const { leading = false, trailing = true } = options;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<F> | undefined;

  return function (...args: Parameters<F>) {
    lastArgs = args;
    const callNow = leading && timer === undefined;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      if (trailing && lastArgs) fn(...lastArgs);
      lastArgs = undefined;
    }, wait);
    if (callNow) {
      fn(...args);
      lastArgs = undefined; // don't let the trailing edge repeat this call
    }
  };
}

const trailing = debounce((m: string) => console.log("trailing:", m), 200);
trailing("a"); trailing("b"); trailing("c"); // one line: 'trailing: c'

const leading = debounce((m: string) => console.log("leading:", m), 200, { leading: true, trailing: false });
leading("x"); leading("y"); // one line immediately: 'leading: x'
