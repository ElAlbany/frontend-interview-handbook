# 28. Flatten a nested object

**Frequency in interviews:** high

## The problem

Convert a nested object into a flat one with dot-path keys: `{ a: { b: { c: 1 } } }` → `{ 'a.b.c': 1 }`. The constraint that trips people: arrays are treated as values, not recursed into.

## Examples

- Valid: `{ a: { b: { c: 1 } } }` → `{ 'a.b.c': 1 }`
- Invalid: arrays like `{ list: [1,2] }` must NOT become `'list.0'` keys — kept as-is

## Approach and explanation

Real use: flattening API responses into form-field names, feature-flag maps, i18n dictionaries.

## Solution

`code.js`

```js
/**
 * Problem 28 — Flatten nested object into dot-path keys
 * Run: node code.js
 */
function flattenObject(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, path, out);
    } else {
      out[path] = value; // arrays and primitives stay as-is
    }
  }
  return out;
}

console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));
// { 'a.b.c': 1, d: 2 }
console.log(flattenObject({ user: { name: "Alice", roles: ["admin"] } }));
// { 'user.name': 'Alice', 'user.roles': ['admin'] } — array NOT flattened
```

`code.ts`

```ts
/**
 * Problem 28 — Flatten nested object to dot-path keys (TypeScript)
 * Run: node code.ts
 */
function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
  out: Record<string, unknown> = {}
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value as Record<string, unknown>, path, out);
    } else {
      out[path] = value;
    }
  }
  return out;
}

console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));
// { 'a.b.c': 1, d: 2 }
console.log(flattenObject({ user: { name: "Alice", roles: ["admin"] } }));
// { 'user.name': 'Alice', 'user.roles': ['admin'] } — arrays stay as-is
```
