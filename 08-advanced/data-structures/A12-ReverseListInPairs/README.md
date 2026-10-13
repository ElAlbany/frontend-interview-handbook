# A12 — Swap linked list nodes in pairs

## The problem

Swap every two adjacent nodes of a linked list by rewiring pointers (not by swapping values): 1->2->3->4 becomes 2->1->4->3.

## Examples

- [1,2,3,4] -> [2,1,4,3]
- odd length [1,2,3] -> [2,1,3] (last node stays)
- empty or single node -> unchanged

## Approach

Use a dummy head node. Walk a pointer two nodes at a time: given prev -> a -> b -> rest, rewire to prev -> b -> a -> rest, then advance prev to a. The dummy node removes the head special case — the same trick simplifies most list-surgery problems.

## Complexity

Time O(n), space O(1).

## Run

```bash
node code.ts
```
