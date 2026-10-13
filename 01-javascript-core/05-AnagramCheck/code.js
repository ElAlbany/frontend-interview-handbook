/**
 * Problem 5 — Anagram check via frequency counter. O(n).
 * Run: node code.js
 */
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = {};
  for (const ch of a) count[ch] = (count[ch] || 0) + 1;
  for (const ch of b) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("ab", "abc"));        // false (length mismatch)
console.log(isAnagram("aab", "aba"));       // true
