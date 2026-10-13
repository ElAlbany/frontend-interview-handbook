/**
 * Problem 2 — Reverse a string
 * Run: node code.js
 */
const reverse = (s) => [...s].reverse().join(""); // [...s] handles emoji/Unicode

function reverseManual(s) {
  let out = "";
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}

console.log(reverse("hello"));        // 'olleh'
console.log(reverse(""));             // ''
console.log(reverse("a b 🚗"));        // '🚗 b a' (spread keeps the emoji intact)
console.log(reverseManual("world"));  // 'dlrow'
