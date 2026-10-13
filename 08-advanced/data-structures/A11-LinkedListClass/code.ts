/**
 * A11 — LinkedList class (TypeScript)
 * Run: node code.ts
 */
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;

  append(value: T): void {
    if (!this.head) {
      this.head = new ListNode(value);
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = new ListNode(value);
  }

  prepend(value: T): void {
    this.head = new ListNode(value, this.head); // O(1)
  }

  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next; // head special case
      return true;
    }
    let cur = this.head;
    while (cur.next) {
      if (cur.next.value === value) {
        cur.next = cur.next.next;
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  find(value: T): ListNode<T> | null {
    let cur = this.head;
    while (cur) {
      if (cur.value === value) return cur;
      cur = cur.next;
    }
    return null;
  }

  toArray(): T[] {
    const out: T[] = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}

const list = new LinkedList<number>();
list.append(1); list.append(2); list.append(3);
list.prepend(0);
console.log(list.toArray());        // [0, 1, 2, 3]
console.log(list.delete(2));        // true
console.log(list.toArray());        // [0, 1, 3]
console.log(list.delete(99));       // false
console.log(list.find(3)?.value);   // 3
