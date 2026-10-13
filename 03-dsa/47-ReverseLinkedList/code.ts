/**
 * Problem 47 — Reverse a linked list (TypeScript, ListNode interface)
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
  while (head) {
    out.push(head.val);
    head = head.next;
  }
  return out;
};

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null,
    curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

console.log(toArray(reverseList(build([1, 2, 3])))); // [3, 2, 1]
console.log(toArray(reverseList(build([1]))));       // [1]
console.log(toArray(reverseList(null)));             // []
