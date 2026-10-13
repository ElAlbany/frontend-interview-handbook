# Frontend Coding Interview Problems

A collection of coding interview problems for JavaScript, TypeScript, React, Next.js, and HTML/CSS, ordered by how often they appear in real interviews. Every problem ships with a runnable solution in both JavaScript and TypeScript, plus a written explanation.

Built for junior and entry-level frontend / full-stack candidates preparing for live coding rounds.

## Repository layout

```
01-javascript-core/       Problems 1-12   Language fundamentals: FizzBuzz, Two Sum, debounce, currying
02-javascript-builtins/   Problems 13-33  Rebuild the built-ins: Promise.all, memoize, EventEmitter, LRU cache
03-dsa/                   Problems 34-55  Data structures and algorithms: stacks, linked lists, sliding window
04-output-prediction/     Problems 56-62  Read the snippet, predict the output
05-react/                 Problems 63-81  Live-coding components: todo list, autocomplete, modal, hooks
06-html-css/              Problems 82-88  Layout and CSS tasks: centering, holy grail, skeleton loader
07-nextjs/                Problems 89-95  App Router tasks: server components, server actions, streaming
08-advanced/              50 problems     Harder follow-ups: async patterns, DP, trees, React patterns
```

Each problem folder contains:

| File                              | Purpose                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `README.md`                       | The problem statement, example inputs/outputs, approach, and complexity |
| `code.js`                         | JavaScript solution, runnable with Node, with demo calls                |
| `code.ts`                         | TypeScript solution with full type annotations                          |
| `Component.jsx` / `Component.tsx` | React problems: both flavors of the component                           |
| `index.html` + `style.css`        | HTML/CSS problems: open the HTML file in a browser                      |
| `practice.js` / `practice.ts`     | (a few folders) personal practice attempts — not reference solutions    |

## Running the solutions

**JavaScript and TypeScript (problems 1-62, advanced section):**

```bash
cd 01-javascript-core/04-TwoSum
node code.js
node code.ts
```

**React (problems 63-81):**

```bash
npm create vite@latest my-app -- --template react-ts
# copy the component into src/, render it from App.tsx
```

**HTML/CSS (problems 82-88):** open `index.html` in a browser. `index.html` and `style.css` belong together.

**Next.js (problems 89-95):** create a project with `npx create-next-app@latest` and copy each file to the path stated in its first comment. Some problems span two files (for example a server page plus a client control) — each file header tells you where it goes.

## How to study with this repo

1. Read the problem's `README.md` — the statement and the examples.
2. Attempt the solution yourself before opening the code.
3. Compare against both the JS and TS versions; the TS version shows the typing patterns interviewers ask about (generics, `keyof`, discriminated unions, `Parameters<F>`).
4. For output-prediction problems (56-62), commit to an answer out loud before running the file.
5. Move to `08-advanced/` once the core set feels comfortable.

## Conventions

- Problems are numbered by interview frequency within each category; the per-problem README carries a frequency label (very high / high / medium).
- Solutions favor clarity over cleverness and include the edge cases interviewers probe for.
- No frameworks for the vanilla JS problems; no state libraries for the React problems. The point is demonstrating fundamentals.

## Contributing

Issues and pull requests are welcome: new problems, alternative solutions, corrections, or translations of the explanations. Keep the same structure: a folder per problem, a `README.md`, and runnable `code.js` / `code.ts` files.
