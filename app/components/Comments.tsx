"use client";

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  slug: string;
  content: string;
  approved: boolean;
  createdAt: string;
  moderatedAt?: string;
}

const CommentForm = ({ slug, onCommentPosted }: { 
  slug: string; 
  onCommentPosted?: () => void;
}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, content: comment }),
      });

      if (response.ok) {
        setComment('');
        setMessage('Comment submitted for review!');
        if (onCommentPosted) onCommentPosted();
      } else {
        setMessage('Error posting comment. Please try again.');
      }
    } catch (error) {
      setMessage('Error posting comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
          rows={4}
          placeholder="Share your thoughts..."
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border rounded-md border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 dark:disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {message && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{message}</p>
        )}
      </form>
    </div>
  );
};

const Comments = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border rounded-md dark:border-neutral-700"
            >
              <p className="text-neutral-800 dark:text-neutral-200">{comment.content}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">No comments yet.</p>
      )}
      <CommentForm slug={slug} onCommentPosted={fetchComments} />
    </div>
  );
};

export default Comments;