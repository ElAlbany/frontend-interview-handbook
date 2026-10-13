/**
 * Problem 59 — this binding (TypeScript). Predict, then run: node code.ts
 */
interface User {
  name: string;
  greet(): void;
  greetArrow: () => void;
}

const user: User = {
  name: "Alice",
  greet(this: User) {
    console.log("method:", this?.name);
  },
  greetArrow: () => console.log("arrow:", (globalThis as Record<string, unknown>).name),
};

user.greet();      // 'method: Alice'
const f = user.greet;
f.call(undefined); // 'method: undefined' — plain call, this is lost
user.greetArrow(); // 'arrow: undefined' — arrows capture outer this
