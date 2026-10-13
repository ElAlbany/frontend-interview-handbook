# 47. Reverse a linked list

**Frequency in interviews:** very high

## The problem

Reverse a singly linked list and return the new head. Use three pointers (prev, curr, next) and flip one arrow per step. Draw it on the board before coding — this is the most-asked linked list question there is.

## Examples

- Valid: `1→2→3` → `3→2→1`, returned head is `3`
- Invalid: single node or `null` → returned unchanged (loop body never runs)

## Approach and explanation

Three pointers, three lines in the loop. Draw it on the whiteboard: prev → curr → next, flip the arrow, advance. The most-asked linked list question, period. Follow-up: recursive version.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
