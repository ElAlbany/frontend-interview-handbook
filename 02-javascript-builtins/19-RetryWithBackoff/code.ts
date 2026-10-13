/**
 * Problem 19 — Retry with exponential backoff (TypeScript)
 * Run: node code.ts
 */
async function retry<T>(fn: () => Promise<T>, attempts = 3, delay = 500): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (attempts <= 1) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, attempts - 1, delay * 2);
  }
}

let tries = 0;
const flaky = async (): Promise<string> => {
  tries++;
  if (tries < 3) throw new Error("fail " + tries);
  return "success on try " + tries;
};

retry(flaky, 3, 100).then(console.log); // 'success on try 3'
retry(async () => Promise.reject(new Error("always fails")), 2, 50)
  .catch((e: Error) => console.log("gave up:", e.message)); // 'gave up: always fails'
