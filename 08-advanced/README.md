# Advanced Problems (A01 - A50)

Fifty problems one level above the core set: the follow-up questions
interviewers ask after you solve the basic version. Each folder contains a
`README.md` with the problem statement, examples, and approach, plus a full
solution file.

## Categories

| Folder | Problems | Topics |
| --- | --- | --- |
| `async-javascript/` | A01 - A10 | Promises, event loop, concurrency control, retry/timeout, pub-sub |
| `data-structures/` | A11 - A20 | Linked lists, stacks/queues, trees, heaps, graphs, LRU/LFU |
| `algorithms/` | A21 - A35 | Hashing patterns, intervals, sliding window, DP, graph traversal, tries |
| `react-patterns/` | A36 - A45 | Custom hooks, infinite scroll, multi-step forms, OTP inputs, recursion, virtualization |
| `javascript-internals/` | A46 - A50 | Coercion hooks, JSON.stringify, deep freeze, polyfills, caching/dedupe |

## How to run

Files ending in `.ts` are runnable directly with Node 24 or later
(which executes TypeScript natively):

```
node code.ts
```

Files ending in `.tsx` are React reference implementations. They are meant to
be read and copied into a React + TypeScript project (Vite, Next.js, ...), not
executed with plain node.

## Suggested order

If the core set is fresh, go category by category in the table order above.
Inside `algorithms/`, the problems are sequenced so earlier patterns (hashing,
two pointers) are reused by later ones (DP, graphs).
