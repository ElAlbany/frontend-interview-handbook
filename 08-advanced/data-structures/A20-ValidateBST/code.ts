/**
 * A20 — Validate a BST via ancestor ranges (TypeScript)
 * Run: node code.ts
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isValidBST(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false; // violates an ANCESTOR's bound
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

const node = (val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode =>
  ({ val, left, right });

const valid = node(5, node(3), node(7, node(6), node(8)));
console.log(isValidBST(valid)); // true

// the trap: 3 is in 5's RIGHT subtree but smaller than 5
const invalid = node(5, node(1), node(4, node(3), node(6)));
console.log(isValidBST(invalid)); // false — a naive parent-only check would wrongly say true
