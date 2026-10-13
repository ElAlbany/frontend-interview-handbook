/**
 * Problem 50 — Longest substring without repeating characters (sliding window). O(n).
 * Run: node code.js
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // char -> last index
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1; // shrink window past the repeat
    }
    seen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ('abc')
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ('wke')
console.log(lengthOfLongestSubstring(""));         // 0
