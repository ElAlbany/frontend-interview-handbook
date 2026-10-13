# A33 — Number of islands

## The problem

Count islands (connected '1' regions, 4-directional) in a 2D grid of '1's and '0's.

## Examples

- a grid with one block -> 1
- diagonal-only contact does NOT count as connected -> 2

## Approach

Flood fill: scan every cell; on finding unvisited land, increment the count and DFS/BFS from it, sinking the whole island (mark visited or flip to '0'). Every new flood fill equals one island. The same pattern answers 'largest island', 'flood fill an image', and 'surrounded regions'.

## Complexity

Time O(rows * cols), space O(rows * cols) worst case for the recursion/queue.

## Run

```bash
node code.ts
```
