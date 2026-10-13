# A20 — Validate a binary search tree

## The problem

Check whether a tree is a valid BST. The naive check (left child < node < right child) is wrong — that is the trap this question exists to catch.

## Examples

- 5(3, 7(6, 8)) -> true
- 5(1, 4(3, 6)) -> false: the 3 sits in 5's right subtree but is smaller than 5

## Approach

Carry an allowed (min, max) range down the recursion: the left child must be in (min, node.val), the right child in (node.val, max). A node must respect not just its parent but every ancestor's constraint — the range threading expresses exactly that. An in-order traversal that checks values are strictly increasing works too.

## Complexity

Time O(n), space O(h).

## Run

```bash
node code.ts
```
