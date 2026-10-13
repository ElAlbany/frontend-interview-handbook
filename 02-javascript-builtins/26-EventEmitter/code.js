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
