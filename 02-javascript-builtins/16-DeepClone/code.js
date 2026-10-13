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
