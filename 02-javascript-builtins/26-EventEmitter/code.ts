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
