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
