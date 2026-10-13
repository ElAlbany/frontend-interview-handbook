# A47. Implement JSON.stringify

Difficulty: Medium-Hard

## Problem

Write `jsonStringify(value)` that reproduces the core behavior of
`JSON.stringify` for plain JSON-compatible data, without calling it (except
for escaping individual strings, which you may delegate).

Rules to reproduce:

- `null`, finite numbers, booleans, and strings serialize directly.
- Arrays serialize recursively; `undefined`, functions, and symbols inside an
  array become `null` (the slot is preserved).
- In plain objects those same values cause the key to be dropped entirely.
- Non-finite numbers (`NaN`, `Infinity`) become `null`.
- `BigInt` throws a TypeError.
- A circular reference throws `TypeError: Converting circular structure to JSON`.

## Example

```ts
jsonStringify({ a: 1, b: "x", c: [1, null, true], d: undefined, e() {} });
// '{"a":1,"b":"x","c":[1,null,true]}'

jsonStringify([1, undefined, () => {}, 2]);
// '[1,null,null,2]'
```

## Approach

- Recurse with a helper that returns `string | undefined`; `undefined` means "not serializable" so callers decide: arrays substitute `"null"`, objects skip the key, the top level returns `undefined`.
- Branch on `typeof`. Objects split into arrays (`Array.isArray`) and everything else.
- Track in-progress objects in a `Set` before recursing and delete after - presence in the set means circular.
- Escaping arbitrary strings correctly is genuinely tricky; delegating to the native `JSON.stringify` for individual string primitives is a legitimate shortcut to name in the interview.

Run with: node code.ts (Node 24+ recommended, runs TypeScript directly).

## Solution

The full implementation lives in `code.ts` in this folder:

```ts
/*
 * A47 - Implement JSON.stringify
 * Run with: node code.ts
 */

function jsonStringify(value: unknown): string | undefined {
  const inProgress = new Set<object>();

  const serialize = (val: unknown): string | undefined => {
    if (val === null) return "null";

    switch (typeof val) {
      case "number":
        return Number.isFinite(val) ? String(val) : "null"; // NaN / Infinity -> null
      case "boolean":
        return String(val);
      case "bigint":
        throw new TypeError("Do not know how to serialize a BigInt");
      case "string":
        return JSON.stringify(val); // delegate escaping of string primitives
      case "undefined":
      case "function":
      case "symbol":
        return undefined; // caller decides: array -> null, object -> drop key
      case "object": {
        const obj = val as object;
        if (inProgress.has(obj)) {
          throw new TypeError("Converting circular structure to JSON");
        }
        inProgress.add(obj);

        let out: string;
        if (Array.isArray(val)) {
          out = "[" + val.map((item) => serialize(item) ?? "null").join(",") + "]";
        } else {
          const parts: string[] = [];
          for (const [key, v] of Object.entries(val as Record<string, unknown>)) {
            const s = serialize(v);
            if (s !== undefined) parts.push(JSON.stringify(key) + ":" + s);
          }
          out = "{" + parts.join(",") + "}";
        }

        inProgress.delete(obj);
        return out;
      }
    }
  };

  return serialize(value);
}

console.log(jsonStringify({ a: 1, b: "x", c: [1, null, true], d: undefined, e: () => {} }));
// {"a":1,"b":"x","c":[1,null,true]}
console.log(jsonStringify([1, undefined, () => {}, 2])); // [1,null,null,2]
console.log(jsonStringify({ bad: NaN, worse: Infinity })); // {"bad":null,"worse":null}

const circular: Record<string, unknown> = {};
circular.self = circular;
try {
  jsonStringify(circular);
} catch (e) {
  console.log("circular throws:", (e as Error).message);
}
```
