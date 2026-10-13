/**
 * Problem 73 — Star rating with hover preview
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function StarRating({ max = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>
          {star <= (hover || rating) ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
