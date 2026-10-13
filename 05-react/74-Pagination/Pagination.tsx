/**
 * Problem 74 — Pagination (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

interface PaginationProps {
  total: number;
  perPage: number;
  page: number;
  onChange: (page: number) => void;
}

export default function Pagination({ total, perPage, page, onChange }: PaginationProps) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button key={n}
                aria-current={n === page ? "page" : undefined}
                style={{ fontWeight: n === page ? "bold" : "normal" }}
                onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      <button disabled={page === pages} onClick={() => onChange(page + 1)}>Next</button>
    </nav>
  );
}
