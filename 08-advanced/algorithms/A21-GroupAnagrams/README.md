# A21 — Group anagrams

## The problem

Group strings that are anagrams of each other: ['eat','tea','tan','ate','nat','bat'] -> [['eat','tea','ate'],['tan','nat'],['bat']].

## Examples

- ['eat','tea','tan','ate','nat','bat'] -> 3 groups
- [''] -> [['']]
- ['a'] -> [['a']]

## Approach

The key insight: anagrams share a canonical form. Sort each word's characters ('eat' and 'tea' both become 'aet') and use that as a Map key, collecting originals into groups. The alternative key — a 26-element character-count signature — avoids the sort and is worth mentioning as the O(n*k) version.

## Complexity

Time O(n * k log k) with sorted keys (n words, k = max length), space O(n * k).

## Run

```bash
node code.ts
```
