/**
 * A19 — Maximum depth of a binary tree (TypeScript)
 * Run: node code.ts
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BFS alternative — safer for very deep/skewed trees (no call-stack overflow)
function maxDepthBfs(root: TreeNode | null): number {
  if (!root) return 0;
  let depth = 0;
  let queue: TreeNode[] = [root];
  while (queue.length) {
    depth++;
    const next: TreeNode[] = [];
    for (const node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
  }
  return depth;
}

const tree: TreeNode = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: { val: 20, left: { val: 15, left: null, right: null }, right: null },
};

console.log(maxDepth(tree));    // 3
console.log(maxDepth(null));    // 0
console.log(maxDepthBfs(tree)); // 3
