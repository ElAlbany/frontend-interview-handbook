/**
 * Problem 74 — Pagination (controlled component)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

export default function Pagination({ total, perPage, page, onChange }) {
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

// Usage (parent owns the page state — controlled component):
//   const [page, setPage] = useState(1);
//   <Pagination total={95} perPage={10} page={page} onChange={setPage} />
