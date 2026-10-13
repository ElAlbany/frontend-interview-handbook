# 16. Deep clone an object

**Frequency in interviews:** high

## The problem

Write a function that deep-copies a nested object so mutations to the copy never affect the original. Say `structuredClone` first (the modern built-in), then write the recursive version. Know exactly why `JSON.parse(JSON.stringify())` is wrong — it loses `Date`, `undefined`, functions, and throws on circular references.

## Examples

- Valid: `{ a: { b: 1 } }` → fully independent copy (mutating it doesn't touch the original)
- Invalid: `JSON.parse(JSON.stringify())` on `{ d: new Date() }` → Date silently becomes a string

## Approach and explanation

Why not `JSON.parse(JSON.stringify(obj))`? It **loses** `undefined`, functions, `Date` (becomes string), `Map`/`Set`, and throws on circular refs. `structuredClone` handles all of those.

## Solution

`code.js`

```js
/**
 * Problem 16 — Deep clone (structuredClone + from scratch)
 * Run: node code.js
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(deepClone);
  const out = {};
  for (const key in obj) out[key] = deepClone(obj[key]);
  return out;
}

const original = { user: { name: "Alice" }, tags: ["a"], when: new Date(0) };

const copy1 = structuredClone(original);
copy1.user.name = "Changed";
console.log(original.user.name); // 'Alice' — original untouched

const copy2 = deepClone(original);
copy2.tags.push("b");
console.log(original.tags);      // ['a']

// Why JSON.parse(JSON.stringify()) is wrong:
console.log(JSON.parse(JSON.stringify(original)).when); // string '1970-01-01...' — Date lost!
```

`code.ts`

```ts
/**
 * Problem 16 — Deep clone (TypeScript)
 * Run: node code.ts
 */
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj) as T;
  if (Array.isArray(obj)) return obj.map(deepClone) as T;
  const out: Record<string, unknown> = {};
  for (const key in obj as Record<string, unknown>) {
    out[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return out as T;
}

const original = { user: { name: "Alice" }, tags: ["a"], when: new Date(0) };

const copy = deepClone(original);
copy.user.name = "Changed";
console.log(original.user.name);              // 'Alice' — untouched
console.log(copy.when instanceof Date);       // true — Date preserved

const builtin = structuredClone(original);
builtin.tags.push("b");
console.log(original.tags);                   // ['a']
```
