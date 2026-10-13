# 54. String compression

**Frequency in interviews:** medium

## The problem

Compress a string with run-length counts: `'aabcccccaaa'` → `'a2b1c5a3'`. If compression wouldn't shorten the string, return the original — that condition is what juniors forget.

## Examples

- Valid: `'aabcccccaaa'` → `'a2b1c5a3'`
- Invalid: `'abc'` → `'abc'` (compressed would be longer — return the original)

## Approach and explanation

O(n). The "return original if not shorter" detail is the part juniors forget.

## Solution

`code.js`

```js
/**
 * Problem 54 — Run-length string compression
 * Run: node code.js
 */
function compress(s) {
  let out = "", count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) count++;
    else { out += s[i - 1] + count; count = 1; }
  }
  return out.length < s.length ? out : s; // return original if not shorter
}

console.log(compress("aabcccccaaa")); // 'a2b1c5a3'
console.log(compress("abc"));         // 'abc' (a1b1c1 would be longer)
console.log(compress("aaaa"));        // 'a4'
```

`code.ts`

```ts
/**
 * Problem 54 — Run-length string compression (TypeScript)
 * Run: node code.ts
 */
function compress(s: string): string {
  let out = "",
    count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) count++;
    else {
      out += s[i - 1] + count;
      count = 1;
    }
  }
  return out.length < s.length ? out : s;
}

console.log(compress("aabcccccaaa")); // 'a2b1c5a3'
console.log(compress("abc"));         // 'abc'
console.log(compress("aaaa"));        // 'a4'
```
