# 48. Linked list cycle detection (Floyd's)

**Frequency in interviews:** high

## The problem

Detect whether a linked list contains a cycle, in O(1) space. Floyd's tortoise and hare: a slow pointer and a fast pointer — if they ever meet, there's a cycle.

## Examples

- Valid: tail links back to an earlier node → `true`
- Invalid: straight list → `false` (loop must check `fast && fast.next` or it crashes)

## Approach and explanation

Tortoise and hare: if there's a cycle, fast eventually laps slow. O(n) time, O(1) space — beats the Set-of-visited-nodes answer.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
