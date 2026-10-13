# A09 — EventEmitter with once() and listenerCount

## The problem

Extend a basic event emitter with `once(event, listener)` (fires the listener a single time, then removes it) and `listenerCount(event)`.

## Examples

- `once('x', fn)` then emit twice -> fn fires exactly once
- `listenerCount` reflects on/off/once registrations accurately

## Approach

Implement `once` by wrapping the listener in a function that unsubscribes itself before delegating. Self-removal before calling the listener prevents double-fires if the listener itself emits the same event. Store listeners in a Map of Sets for O(1) removal.

## Complexity

on/off O(1), emit O(listeners).

## Run

```bash
node code.ts
```
