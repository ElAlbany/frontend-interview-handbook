/**
 * A03 — Cancellable promise wrapper (TypeScript)
 * Run: node code.ts
 */
interface Cancellable<T> {
  promise: Promise<T>;
  cancel: () => void;
}

function makeCancellable<T>(promise: Promise<T>): Cancellable<T> {
  let cancelled = false;
  const wrapped = new Promise<T>((resolve, reject) => {
    promise
      .then((v) => { if (!cancelled) resolve(v); })
      .catch((e) => { if (!cancelled) reject(e); });
  });
  return { promise: wrapped, cancel: () => { cancelled = true; } };
}

const slow = new Promise<string>((r) => setTimeout(() => r("done"), 200));
const c = makeCancellable(slow);
c.cancel();

// after 400ms the wrapper still has not settled:
setTimeout(() => console.log("wrapper settled? no output above means cancel worked"), 400);

const ok = makeCancellable(slow);
ok.promise.then(console.log); // 'done' — not cancelled, passes through
