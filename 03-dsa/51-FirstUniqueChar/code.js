/**
 * Problem 51 — First unique character in a string. Two passes, O(n).
 * Run: node code.js
 */
function firstUniqChar(s) {
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar("leetcode"));     // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
console.log(firstUniqChar("aabb"));         // -1
