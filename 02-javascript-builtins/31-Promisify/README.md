# 31. Promisify a callback function

**Frequency in interviews:** medium

## The problem

Write `promisify(fn)`: convert a Node-style callback function — `fn(...args, (err, data) => …)` — into one returning a Promise. It tests your grip on the error-first callback convention.

## Examples

- Valid: callback `(null, data)` → promise resolves with `data`
- Invalid: callback `(err)` → promise **rejects** with the error

## Approach and explanation

Bridges old Node-style `(err, data)` callbacks into async/await world. Shows you understand the callback convention.

## Solution

`code.js`

```js
/**
 * Problem 31 — Promisify a Node-style callback function
 * Run: node code.js
 */
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
  };
}

// a fake old-style API: callback receives (err, data)
function oldFetchUser(id, callback) {
  setTimeout(() => {
    if (id > 0) callback(null, { id, name: "Alice" });
    else callback(new Error("invalid id"));
  }, 100);
}

const fetchUser = promisify(oldFetchUser);

fetchUser(1).then(console.log);                       // { id: 1, name: 'Alice' }
fetchUser(-1).catch((e) => console.log("err:", e.message)); // 'err: invalid id'
```

`code.ts`

```ts
/**
 * Problem 31 — Promisify a Node-style callback function (TypeScript)
 * Run: node code.ts
 */
type NodeCallback<T> = (err: Error | null, result?: T) => void;

function promisify<A extends unknown[], T>(
  fn: (...args: [...A, NodeCallback<T>]) => void
): (...args: A) => Promise<T> {
  return (...args: A) =>
    new Promise<T>((resolve, reject) => {
      fn(...args, (err: Error | null, result?: T) =>
        err ? reject(err) : resolve(result as T)
      );
    });
}

// a fake old-style API
function oldFetchUser(id: number, callback: NodeCallback<{ id: number; name: string }>): void {
  setTimeout(() => {
    if (id > 0) callback(null, { id, name: "Alice" });
    else callback(new Error("invalid id"));
  }, 100);
}

const fetchUser = promisify(oldFetchUser);

fetchUser(1).then(console.log);                              // { id: 1, name: 'Alice' }
fetchUser(-1).catch((e: Error) => console.log("err:", e.message)); // 'err: invalid id'
```
