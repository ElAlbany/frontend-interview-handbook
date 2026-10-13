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
