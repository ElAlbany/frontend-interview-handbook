/**
 * A18 — Level-order traversal (BFS by levels) (TypeScript)
 * Run: node code.ts
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function levelOrder(root: TreeNode | null): number[][] {
  const out: number[][] = [];
  if (!root) return out;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const levelSize = queue.length; // snapshot — this groups nodes by level
    const level: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    out.push(level);
  }
  return out;
}

const tree: TreeNode = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
};

console.log(levelOrder(tree)); // [[3], [9, 20], [15, 7]]
console.log(levelOrder(null)); // []
