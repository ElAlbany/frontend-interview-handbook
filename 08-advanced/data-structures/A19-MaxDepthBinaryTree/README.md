# A19 — Maximum depth of a binary tree

## The problem

Find the longest root-to-leaf path length. Simple on the surface — the discussion of recursion vs BFS is where the depth is.

## Examples

- balanced tree of 3 levels -> 3
- empty tree -> 0
- a skewed tree (a chain) -> its length

## Approach

Recursive DFS: `1 + max(depth(left), depth(right))`. The follow-up 'when would you prefer BFS?' has a real answer: for very deep or skewed trees, recursion can overflow the call stack while an iterative queue cannot.

## Complexity

Time O(n), space O(h) recursion (O(n) worst case for a skewed tree).

## Run

```bash
node code.ts
```
