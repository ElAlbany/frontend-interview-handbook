# A32 — Course schedule (cycle detection in a graph)

## The problem

Given courses and prerequisites pairs, decide whether all courses can be finished — i.e., whether the dependency graph has no cycle. numCourses=2, prerequisites [[1,0]] -> true; [[1,0],[0,1]] -> false.

## Examples

- [[1,0]] with 2 courses -> true
- [[1,0],[0,1]] -> false (circular dependency)

## Approach

This is topological sorting. Kahn's BFS algorithm: compute each node's indegree, repeatedly remove zero-indegree nodes (nothing left to take first), and decrement their neighbors. If every node gets removed, no cycle exists. Recognizing 'can I finish all courses' as cycle detection is the leap the question tests.

## Complexity

Time O(V + E), space O(V + E).

## Run

```bash
node code.ts
```
