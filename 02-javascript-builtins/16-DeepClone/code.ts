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
