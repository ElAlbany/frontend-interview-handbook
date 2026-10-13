/**
 * Problem 49 — Middle of a linked list (slow/fast pointers, one pass)
 * Run: node code.js
 */
const build = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);

function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

console.log(middleNode(build([1, 2, 3, 4, 5])).val); // 3
console.log(middleNode(build([1, 2, 3, 4])).val);    // 3 (second middle — state the convention)
