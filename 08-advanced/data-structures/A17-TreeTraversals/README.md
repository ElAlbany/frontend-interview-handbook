# A17 — Binary tree traversals, recursive and iterative

## The problem

Implement preorder, inorder, and postorder traversal. Then implement inorder iteratively with an explicit stack — the recursive-to-iterative conversion is the actual test.

## Examples

- tree 1(2,3) -> preorder [1,2,3], inorder [2,1,3], postorder [2,3,1]
- empty tree -> [] for all three

## Approach

Recursive versions are three lines each; only the position of the 'visit' line changes. Iterative inorder: push left spine onto a stack, then repeatedly pop, visit, and descend into the right child. The stack replaces the call stack — that sentence is the answer to 'how did you convert it?'

## Complexity

Time O(n), space O(h) for the stack/recursion.

## Run

```bash
node code.ts
```
