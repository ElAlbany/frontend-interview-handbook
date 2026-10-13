/**
 * Problem 72 — Modal with portal (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
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
