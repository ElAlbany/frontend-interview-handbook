/**
 * Problem 49 — Middle of a linked list (TypeScript)
 * Run: node code.ts
 */
interface ListNode {
  val: number;
  next: ListNode | null;
}

const build = (arr: number[]): ListNode | null =>
  arr.reduceRight<ListNode | null>((next, val) => ({ val, next }), null);

function middleNode(head: ListNode | null): ListNode | null {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}

console.log(middleNode(build([1, 2, 3, 4, 5]))?.val); // 3
console.log(middleNode(build([1, 2, 3, 4]))?.val);    // 3 (second middle)
