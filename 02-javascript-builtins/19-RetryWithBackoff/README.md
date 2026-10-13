# 19. Retry with exponential backoff

**Frequency in interviews:** high

## The problem

Write `retry(fn, attempts)`: call an async function and, on failure, retry with exponentially growing delays (500ms → 1s → 2s…). After the last attempt, throw the final error. Mention why you'd never retry a 400-class client error.

## Examples

- Valid: fails twice then succeeds → resolves (waits 500ms, then 1s)
- Invalid: fails every time → throws the **last** error after attempts run out

## Approach and explanation

Each failure waits twice as long — gives a struggling server room to recover. Mention **jitter** (adding randomness) as the production upgrade, and that you'd use this around flaky network calls, not around 400-type client errors.

## Solution

`code.js`

```js
/**
 * Problem 19 — Retry with exponential backoff
 * Run: node code.js
 */
async function retry(fn, attempts = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (attempts <= 1) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, attempts - 1, delay * 2);
  }
}

// Demo: flaky function succeeds on the 3rd try
let tries = 0;
const flaky = async () => {
  tries++;
  if (tries < 3) throw new Error("fail " + tries);
  return "success on try " + tries;
};

retry(flaky, 3, 100).then(console.log); // 'success on try 3'
retry(async () => { throw new Error("always fails"); }, 2, 50)
  .catch((e) => console.log("gave up:", e.message)); // 'gave up: always fails'
```

`code.ts`

```ts
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
```
