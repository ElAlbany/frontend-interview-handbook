/**
 * Problem 3 — Palindrome check
 * Run: node code.js
 */
const isPalindrome = (s) => s === [...s].reverse().join("");

// two pointers: O(n) time, O(1) space
function isPalindrome2p(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++; r--;
  }
  return true;
}

console.log(isPalindrome("racecar"));   // true
console.log(isPalindrome("hello"));     // false
console.log(isPalindrome2p("racecar")); // true
console.log(isPalindrome2p("ab"));      // false
console.log(isPalindrome2p(""));        // true (empty string reads the same)
