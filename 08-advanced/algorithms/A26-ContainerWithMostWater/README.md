# A26 — Container with most water

## The problem

Given heights, find two lines forming a container holding the most water: [1,8,6,2,5,4,8,3,7] -> 49.

## Examples

- [1,8,6,2,5,4,8,3,7] -> 49
- [1,1] -> 1

## Approach

Two pointers at both ends. Area = width * min(heights). The greedy move: always advance the pointer at the SHORTER line — moving the taller one can only shrink the area, since width decreases and the height cap is already the shorter line. Being able to justify that move is the whole interview.

## Complexity

Time O(n), space O(1).

## Run

```bash
node code.ts
```
