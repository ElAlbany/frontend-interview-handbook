# A16 — Binary search tree: insert, contains, in-order

## The problem

Implement a BST with `insert`, `contains`, and `inOrder` traversal (which returns values sorted — state why).

## Examples

- insert 5, 3, 7, 1 -> inOrder gives [1, 3, 5, 7]
- contains(7) -> true; contains(4) -> false

## Approach

Insert and search both walk left/right by comparison — each step discards half the remaining tree when the tree is balanced. In-order traversal (left, node, right) visits keys in ascending order, which is the defining property of a BST. Mention that a degenerate (sorted-input) tree degrades to a linked list — that is what self-balancing trees (AVL, red-black) fix.

## Complexity

insert/contains O(h) where h = height (O(log n) balanced, O(n) degenerate).

## Run

```bash
node code.ts
```
