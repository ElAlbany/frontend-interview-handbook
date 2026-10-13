# A48. Deep freeze an object

Difficulty: Easy-Medium

## Problem

`Object.freeze` is shallow: it freezes only the object's own direct
properties, so nested objects and arrays stay mutable. Implement
`deepFreeze(obj)` that freezes an object and every object reachable from it,
at any depth. It must not crash (or loop forever) on circular references.

## Example

```ts
const config = deepFreeze({ server: { host: "localhost", ports: [80, 443] } });

config.server.host = "hacked";   // silently ignored (throws in strict mode)
config.server.ports.push(8080);  // TypeError: object is not extensible
console.log(config.server.host); // "localhost"
```

## Approach

- Freeze the object FIRST, then recurse into every own property value that is itself an object. Freezing first is what makes cycles safe: when the recursion comes back around, `Object.isFrozen` is already true and the cycle stops.
- `Object.getOwnPropertyNames` covers non-enumerable keys too, which plain `for...in` would miss.
- Follow-ups worth knowing: frozen arrays throw on `push` even in sloppy mode; property assignment only throws in strict mode; `Object.seal` allows value changes but not adding/removing keys.

Run with: node code.ts (Node 24+ recommended, runs TypeScript directly).

## Solution

The full implementation lives in `code.ts` in this folder:

```ts
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
```
