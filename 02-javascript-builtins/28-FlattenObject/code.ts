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
