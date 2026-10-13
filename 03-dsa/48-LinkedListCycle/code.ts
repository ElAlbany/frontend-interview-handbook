/**
 * Problem 48 — Cycle detection, Floyd's tortoise & hare (TypeScript)
 * Run: node code.ts
 */
interface ListNode {
  val: number;
  next: ListNode | null;
}

function hasCycle(head: ListNode | null): boolean {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

const a: ListNode = { val: 1, next: null };
const b: ListNode = { val: 2, next: null };
const c: ListNode = { val: 3, next: null };
a.next = b; b.next = c; c.next = b; // cycle
console.log(hasCycle(a));           // true

const x: ListNode = { val: 1, next: { val: 2, next: null } };
console.log(hasCycle(x));           // false
console.log(hasCycle(null));        // false
