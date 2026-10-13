/**
 * Problem 48 — Cycle detection (Floyd's tortoise & hare). O(n), O(1).
 * Run: node code.js
 */
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

const a = { val: 1 }, b = { val: 2 }, c = { val: 3 };
a.next = b; b.next = c; c.next = b;   // cycle: ... -> c -> b
console.log(hasCycle(a));             // true

const x = { val: 1, next: { val: 2, next: null } };
console.log(hasCycle(x));             // false
console.log(hasCycle(null));          // false
