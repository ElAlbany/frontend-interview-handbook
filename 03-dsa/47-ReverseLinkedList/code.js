/**
 * Problem 47 — Reverse a linked list (three pointers). O(n), O(1).
 * Run: node code.js
 */
const build = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };

function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// recursive follow-up
function reverseListRec(head) {
  if (!head || !head.next) return head;
  const rest = reverseListRec(head.next);
  head.next.next = head;
  head.next = null;
  return rest;
}

console.log(toArray(reverseList(build([1, 2, 3]))));    // [3, 2, 1]
console.log(toArray(reverseList(build([1]))));          // [1]
console.log(toArray(reverseList(null)));                // []
console.log(toArray(reverseListRec(build([1, 2, 3])))); // [3, 2, 1]
