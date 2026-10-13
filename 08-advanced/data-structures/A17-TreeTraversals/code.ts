/**
 * A17 — Pre/in/post-order traversals, recursive + iterative inorder (TypeScript)
 * Run: node code.ts
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const preOrder = (n: TreeNode | null, out: number[] = []): number[] => {
  if (!n) return out;
  out.push(n.val); preOrder(n.left, out); preOrder(n.right, out);
  return out;
};
const inOrder = (n: TreeNode | null, out: number[] = []): number[] => {
  if (!n) return out;
  inOrder(n.left, out); out.push(n.val); inOrder(n.right, out);
  return out;
};
const postOrder = (n: TreeNode | null, out: number[] = []): number[] => {
  if (!n) return out;
  postOrder(n.left, out); postOrder(n.right, out); out.push(n.val);
  return out;
};

// iterative inorder: an explicit stack replaces the call stack
function inOrderIterative(root: TreeNode | null): number[] {
  const out: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; } // push the left spine
    cur = stack.pop()!;
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}

const tree: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: null },
  right: { val: 3, left: null, right: null },
};

console.log(preOrder(tree));         // [1, 2, 3]
console.log(inOrder(tree));          // [2, 1, 3]
console.log(postOrder(tree));        // [2, 3, 1]
console.log(inOrderIterative(tree)); // [2, 1, 3]
