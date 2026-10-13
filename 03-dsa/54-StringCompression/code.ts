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
