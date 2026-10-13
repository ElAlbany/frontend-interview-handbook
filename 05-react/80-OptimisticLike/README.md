# 80. Optimistic like button

**Frequency in interviews:** medium

## The problem

Build an optimistic like button: update the UI instantly, send the request inside a transition, and roll back both the count and the liked state if the request fails.

## Approach and explanation

Update UI instantly, reconcile with the server, roll back on error. In Next.js 16 you'd pair this with a Server Action and `useOptimistic` — say that as the follow-up.

## Solution

`LikeButton.jsx`

```jsx
/**
 * Problem 80 — Optimistic like button with rollback
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState, useTransition } from "react";

export default function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [pending, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      const next = !liked;
      setLiked(next);                       // optimistic UI
      setLikes((l) => l + (next ? 1 : -1));
      try {
        const res = await fetch(`/api/posts/${postId}/like`, {
          method: next ? "POST" : "DELETE",
        });
        if (!res.ok) throw new Error();
      } catch {
        setLiked(!next);                    // roll back on failure
        setLikes((l) => l - (next ? 1 : -1));
      }
    });

  return (
    <button onClick={toggle} disabled={pending} aria-pressed={liked}>
      {liked ? "♥" : "♡"} {likes}
    </button>
  );
}
// Usage: <LikeButton postId={42} initialLikes={7} />
// Next.js 16 note: pair with a Server Action + useOptimistic (Problem 95).
```

`LikeButton.tsx`

```tsx
/**
 * Problem 80 — Optimistic like button (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useState, useTransition } from "react";

interface LikeButtonProps {
  postId: number;
  initialLikes?: number;
}

export default function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [pending, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      const next = !liked;
      setLiked(next);
      setLikes((l) => l + (next ? 1 : -1));
      try {
        const res = await fetch(`/api/posts/${postId}/like`, {
          method: next ? "POST" : "DELETE",
        });
        if (!res.ok) throw new Error("request failed");
      } catch {
        setLiked(!next); // roll back on failure
        setLikes((l) => l - (next ? 1 : -1));
      }
    });

  return (
    <button onClick={toggle} disabled={pending} aria-pressed={liked}>
      {liked ? "Liked" : "Like"} ({likes})
    </button>
  );
}
```
