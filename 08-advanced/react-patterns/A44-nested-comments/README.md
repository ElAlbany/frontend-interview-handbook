# A44. Nested comments tree

Difficulty: Medium

## Problem

Render a comment tree of arbitrary depth: every comment can have `replies`,
which can have their own replies, and so on. Each comment shows author, text,
and a Reply button that opens an inline input; posting adds the reply to the
correct place in the tree.

The state update is the real question: adding a reply deep inside the tree
must be done immutably.

## Example

```tsx
const data = [
  { id: 1, author: "sam", text: "Great post", replies: [
    { id: 2, author: "lee", text: "Agreed", replies: [] },
  ]},
];
<CommentTree initialComments={data} />
```

## Approach

- A recursive component renders itself for `replies` - the cleanest way to express arbitrary depth in React.
- Indent with a `depth` prop (`marginLeft: depth * 24`) rather than nested CSS so depth is explicit.
- Insertion: recursively `map` the tree; when the id matches, return a *new* object with the reply appended, otherwise recurse into `replies`. Never mutate.
- Keep the draft reply text in local state inside each node - one `useState` per node is fine and simpler than a global map of drafts.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
/*
 * A44 - Nested comments tree
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useState } from "react";

export interface Comment {
  id: number;
  author: string;
  text: string;
  replies: Comment[];
}

interface CommentNodeProps {
  comment: Comment;
  onReply: (parentId: number, text: string) => void;
  depth?: number;
}

function CommentNode({ comment, onReply, depth = 0 }: CommentNodeProps) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (!draft.trim()) return;
    onReply(comment.id, draft.trim());
    setDraft("");
    setReplying(false);
  };

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 24 }}>
      <strong>{comment.author}</strong>
      <p>{comment.text}</p>
      <button onClick={() => setReplying((r) => !r)}>Reply</button>
      {replying && (
        <div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a reply"
          />
          <button onClick={submit}>Post</button>
        </div>
      )}
      {comment.replies.map((reply) => (
        <CommentNode key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentTree({ initialComments }: { initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Immutably insert a reply at any depth.
  const addReply = (parentId: number, text: string) => {
    const insert = (list: Comment[]): Comment[] =>
      list.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...c.replies, { id: Date.now(), author: "you", text, replies: [] }] }
          : { ...c, replies: insert(c.replies) }
      );
    setComments((prev) => insert(prev));
  };

  return (
    <div>
      {comments.map((c) => (
        <CommentNode key={c.id} comment={c} onReply={addReply} />
      ))}
    </div>
  );
}
```
