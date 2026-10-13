/**
 * A09 — EventEmitter with once() and listenerCount (TypeScript)
 * Run: node code.ts
 */
type Listener = (...args: unknown[]) => void;

class EventEmitter {
  private events = new Map<string, Set<Listener>>();

  on(event: string, listener: Listener): () => void {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event)!.add(listener);
    return () => this.off(event, listener);
  }

  once(event: string, listener: Listener): () => void {
    const wrapper: Listener = (...args) => {
      this.off(event, wrapper); // self-remove BEFORE delegating (no double-fire)
      listener(...args);
    };
    return this.on(event, wrapper);
  }

  off(event: string, listener: Listener): void {
    this.events.get(event)?.delete(listener);
  }

  emit(event: string, ...args: unknown[]): void {
    this.events.get(event)?.forEach((l) => l(...args));
  }

  listenerCount(event: string): number {
    return this.events.get(event)?.size ?? 0;
  }
}

const emitter = new EventEmitter();
emitter.once("boot", () => console.log("booted once"));
emitter.on("tick", (n) => console.log("tick", n));

emitter.emit("boot");
emitter.emit("boot"); // silence — once removed itself
emitter.emit("tick", 1);
console.log("tick listeners:", emitter.listenerCount("tick")); // 1
console.log("boot listeners:", emitter.listenerCount("boot")); // 0
