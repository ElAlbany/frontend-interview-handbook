# A18 — Level-order traversal (BFS)

## The problem

Return a tree's values level by level: [[3],[9,20],[15,7]]. The nested-array-per-level output is what separates this from plain BFS.

## Examples

- balanced 3-level tree -> [[3],[9,20],[15,7]]
- empty tree -> []

## Approach

BFS with a queue, processing one level per outer iteration: snapshot the queue length at the start of each level, dequeue exactly that many nodes, and enqueue their children. The length snapshot is the trick that groups nodes by level.

## Complexity

Time O(n), space O(n) for the queue.

## Run

```bash
node code.ts
```
