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
