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
