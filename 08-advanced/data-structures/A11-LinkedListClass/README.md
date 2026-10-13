# A11 — LinkedList class

## The problem

Implement a singly linked list class with `append`, `prepend`, `delete(value)`, `find(value)`, and `toArray`. The follow-ups are usually: reverse it (problem 47 in the core set) and detect a cycle.

## Examples

- append 1, 2, 3 then toArray -> [1, 2, 3]
- prepend 0 -> [0, 1, 2, 3]
- delete(2) -> true, list becomes [0, 1, 3]; delete(99) -> false

## Approach

Keep a `head` pointer. Append walks to the tail; prepend is O(1) at the head. Delete tracks previous and current, relinking `prev.next = curr.next` on a match, with a special case for deleting the head. Storing a `tail` pointer would make append O(1) — mention it as the upgrade.

## Complexity

append O(n) without a tail pointer, prepend/find/delete O(n) worst case, toArray O(n).

## Run

```bash
node code.ts
```
