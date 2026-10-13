/**
 * Problem 72 — Modal with portal, Escape, backdrop, scroll-lock
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // scroll-lock
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                  display: "grid", placeItems: "center" }}
         onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title}
           style={{ background: "white", padding: 24, borderRadius: 12 }}
           onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

// Usage:
//   const [open, setOpen] = useState(false);
//   <button onClick={() => setOpen(true)}>Open</button>
//   <Modal open={open} onClose={() => setOpen(false)} title="Confirm">Are you sure?</Modal>
