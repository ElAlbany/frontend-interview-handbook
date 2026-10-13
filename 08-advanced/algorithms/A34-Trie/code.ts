/**
 * A34 — Trie / prefix tree (TypeScript)
 * Run: node code.ts
 */
class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isWord = true;
  }

  private walk(word: string): TrieNode | null {
    let node = this.root;
    for (const ch of word) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  search(word: string): boolean {
    return this.walk(word)?.isWord ?? false; // exact word needs the flag
  }

  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null; // prefix only needs the path
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true
