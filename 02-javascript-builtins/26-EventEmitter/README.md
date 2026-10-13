# 26. EventEmitter (pub/sub)

**Frequency in interviews:** high

## The problem

Build an `EventEmitter` class with `on(event, listener)`, `off(event, listener)`, and `emit(event, ...args)` — the publish/subscribe pattern. Returning an unsubscribe function from `on()` is the detail that separates good answers.

## Examples

- Valid: `on('x', fn); emit('x')` → `fn` fires
- Invalid: `emit('x')` after `off('x', fn)` → `fn` must NOT fire

## Approach and explanation

This pattern is everywhere: Node's events, DOM `addEventListener`, Zustand subscriptions, WebSocket handlers. Returning an unsubscribe function from `on()` is the detail that separates good answers.

## Solution

`code.js`

```js
/**
 * Problem 26 — EventEmitter (pub/sub) with on/off/emit
 * Run: node code.js
 */
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) {
    (this.events[event] ??= []).push(listener);
    return () => this.off(event, listener); // returns an unsubscribe function
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter((l) => l !== listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach((l) => l(...args));
  }
}

const emitter = new EventEmitter();
const unsubscribe = emitter.on("login", (user) => console.log("welcome", user));

emitter.emit("login", "Alice"); // 'welcome Alice'
unsubscribe();
emitter.emit("login", "Sara"); // (nothing — listener removed)
```

`code.ts`

```ts
/**
 * Problem 26 — EventEmitter (TypeScript)
 * Run: node code.ts
 */
type Listener = (...args: unknown[]) => void;

class EventEmitter {
  private events: Record<string, Listener[]> = {};

  on(event: string, listener: Listener): () => void {
    (this.events[event] ??= []).push(listener);
    return () => this.off(event, listener); // unsubscribe
  }

  off(event: string, listener: Listener): void {
    this.events[event] = (this.events[event] ?? []).filter((l) => l !== listener);
  }

  emit(event: string, ...args: unknown[]): void {
    (this.events[event] ?? []).forEach((l) => l(...args));
  }
}

const emitter = new EventEmitter();
const unsubscribe = emitter.on("login", (user) => console.log("welcome", user));

emitter.emit("login", "Alice"); // 'welcome Alice'
unsubscribe();
emitter.emit("login", "Sara");  // (nothing — listener removed)
```
