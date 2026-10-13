/**
 * A12 — Swap linked list nodes in pairs (TypeScript)
 * Run: node code.ts
 */
interface ListNode {
  val: number;
  next: ListNode | null;
}

const build = (arr: number[]): ListNode | null =>
  arr.reduceRight<ListNode | null>((next, val) => ({ val, next }), null);
const toArray = (head: ListNode | null): number[] => {
  const out: number[] = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
};

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy: ListNode = { val: 0, next: head }; // removes the head special case
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next;
    const b = prev.next.next;
    a.next = b.next;
    b.next = a;
    prev.next = b; // prev -> b -> a -> rest
    prev = a;
  }
  return dummy.next;
}

console.log(toArray(swapPairs(build([1, 2, 3, 4])))); // [2, 1, 4, 3]
console.log(toArray(swapPairs(build([1, 2, 3]))));    // [2, 1, 3]
console.log(toArray(swapPairs(build([]))));           // []
