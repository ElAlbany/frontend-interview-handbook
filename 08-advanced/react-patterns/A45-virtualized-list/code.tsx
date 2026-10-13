/*
 * A45 - Virtualized list (windowing)
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useState, type ReactNode, type UIEvent } from "react";

interface VirtualizedListProps<T> {
  items: T[];
  rowHeight: number;
  height: number; // viewport height in px
  renderRow: (item: T, index: number) => ReactNode;
  overscan?: number; // extra rows rendered above/below the viewport
}

export function VirtualizedList<T>({
  items,
  rowHeight,
  height,
  renderRow,
  overscan = 5,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(
    items.length,
    Math.ceil((scrollTop + height) / rowHeight) + overscan
  );

  const onScroll = (e: UIEvent<HTMLDivElement>) =>
    setScrollTop(e.currentTarget.scrollTop);

  return (
    <div onScroll={onScroll} style={{ height, overflowY: "auto" }}>
      {/* Spacer: gives the scrollbar the full-list height */}
      <div style={{ height: items.length * rowHeight, position: "relative" }}>
        {items.slice(start, end).map((item, i) => {
          const index = start + i;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: index * rowHeight,
                height: rowHeight,
                width: "100%",
              }}
            >
              {renderRow(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
