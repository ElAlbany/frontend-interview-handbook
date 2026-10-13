/*
 * A48 - Deep freeze an object
 * Run with: node code.ts
 */

function deepFreeze<T>(obj: T): T {
  if (obj !== null && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj); // freeze FIRST: a cycle that reaches us again sees a frozen node and stops
    const record = obj as Record<string, unknown>;
    for (const key of Object.getOwnPropertyNames(record)) {
      deepFreeze(record[key]);
    }
  }
  return obj;
}

const config = deepFreeze({ server: { host: "localhost", ports: [80, 443] } });

config.server.host = "hacked"; // silently ignored outside strict mode
console.log("host unchanged:", config.server.host); // localhost

try {
  (config.server.ports as number[]).push(8080); // frozen array: throws anywhere
} catch (e) {
  console.log("push blocked:", (e as Error).message);
}
console.log("ports unchanged:", config.server.ports); // [ 80, 443 ]

// Circular references must not loop forever.
const a: Record<string, unknown> = { name: "a" };
const b: Record<string, unknown> = { name: "b" };
a.friend = b;
b.friend = a;
deepFreeze(a);
console.log("circular frozen:", Object.isFrozen(a) && Object.isFrozen(b)); // true
