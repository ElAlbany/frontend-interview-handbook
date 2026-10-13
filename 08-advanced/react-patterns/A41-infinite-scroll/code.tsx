/*
 * A41 - Infinite scroll component
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, useRef, type ReactNode } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: ReactNode;
}

export function InfiniteScroll({ onLoadMore, hasMore, loading, children }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "200px" } // start fetching before the bottom is visible
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, loading]);

  return (
    <div>
      {children}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {loading && <p>Loading...</p>}
    </div>
  );
}
