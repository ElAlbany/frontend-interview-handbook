/**
 * Problem 73 — Star rating (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useState } from "react";

export default function StarRating({ max = 5 }: { max?: number }) {
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
