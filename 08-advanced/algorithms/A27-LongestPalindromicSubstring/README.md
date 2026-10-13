# A27 — Longest palindromic substring

## The problem

Find the longest substring that reads the same both ways: 'babad' -> 'bab' (or 'aba').

## Examples

- 'babad' -> 'bab' or 'aba'
- 'cbbd' -> 'bb'
- 'a' -> 'a'

## Approach

Expand around centers. Every palindrome has a center — a single character (odd length) or a gap between two (even length) — giving 2n-1 centers. Expand each outward while characters match and track the longest. O(n^2) time, O(1) space, and far easier to get right under pressure than dynamic programming or Manacher's algorithm (knowing Manacher's exists is enough).

## Complexity

Time O(n^2), space O(1).

## Run

```bash
node code.ts
```
