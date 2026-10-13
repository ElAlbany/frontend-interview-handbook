/**
 * A16 — Binary search tree: insert / contains / inOrder (TypeScript)
 * Run: node code.ts
 */
class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) {
    this.val = val;
  }
}

class BST {
  root: TreeNode | null = null;

  insert(val: number): void {
    const insertInto = (node: TreeNode | null): TreeNode => {
      if (!node) return new TreeNode(val);
      if (val < node.val) node.left = insertInto(node.left);
      else node.right = insertInto(node.right);
      return node;
    };
    this.root = insertInto(this.root);
  }

  contains(val: number): boolean {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return true;
      cur = val < cur.val ? cur.left : cur.right; // discard half the tree each step
    }
    return false;
  }

  inOrder(): number[] {
    const out: number[] = [];
    const walk = (node: TreeNode | null): void => {
      if (!node) return;
      walk(node.left);
      out.push(node.val); // left, node, right -> ascending order
      walk(node.right);
    };
    walk(this.root);
    return out;
  }
}

const bst = new BST();
[5, 3, 7, 1, 4].forEach((v) => bst.insert(v));
console.log(bst.inOrder());    // [1, 3, 4, 5, 7] — sorted, by definition of a BST
console.log(bst.contains(7));  // true
console.log(bst.contains(6));  // false
