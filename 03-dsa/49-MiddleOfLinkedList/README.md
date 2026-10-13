# 49. Middle of a linked list

**Frequency in interviews:** medium

## The problem

Return the middle node of a linked list in one pass: slow moves one step while fast moves two; when fast reaches the end, slow sits at the middle. For even lengths, state out loud which middle you return.

## Examples

- Valid: `1→2→3→4→5` → node `3`
- Invalid: even count `1→2→3→4` → returns `3` (second middle — state your convention out loud)

## Approach and explanation

Same tortoise/hare family: when fast hits the end, slow is at the middle. One pattern solves two famous problems — say that.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
