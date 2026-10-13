/**
 * Problem 50 — Longest substring without repeating characters (TypeScript)
 * Run: node code.ts
 */
function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0,
    best = 0;
  for (let right = 0; right < s.length; right++) {
    const last = seen.get(s[right]);
    if (last !== undefined && last >= left) left = last + 1;
    seen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring(""));         // 0
