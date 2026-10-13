# A13 — Circular buffer (ring buffer)

## The problem

Implement a fixed-capacity circular buffer: `write` appends, overwriting the oldest value when full; `read` removes and returns the oldest value. Used in logging, streaming metrics, and embedded systems.

## Examples

- capacity 3: write 1,2,3 then read -> 1
- write 4,5 (buffer now holds 3,4,5 -> wait, holds 4,5 overwriting 1,2): read -> 3

## Approach

One array plus head index and size. `write` puts the value at `(head + size) % capacity` when there is room, otherwise overwrites at `head` and advances it. `read` takes from `head`, advances it modulo capacity, and shrinks size. The modulo wraparound is the whole idea — no shifting ever.

## Complexity

write/read O(1), space O(capacity).

## Run

```bash
node code.ts
```
