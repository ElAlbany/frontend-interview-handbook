# A34 — Implement a Trie (prefix tree)

## The problem

Build a Trie with `insert`, `search` (exact word), and `startsWith` (prefix). This is the data structure behind autocomplete.

## Examples

- insert('apple'); search('apple') -> true; search('app') -> false; startsWith('app') -> true
- search on an empty trie -> false

## Approach

Each node holds a map of children plus an end-of-word flag. Insert walks character by character, creating nodes as needed; search walks and requires the flag; startsWith walks and only requires the path to exist. The search/startsWith distinction (flag vs path) is the detail interviewers probe. This structure is also the backend of the autocomplete system-design question.

## Complexity

insert/search/startsWith O(word length), space O(total characters).

## Run

```bash
node code.ts
```
