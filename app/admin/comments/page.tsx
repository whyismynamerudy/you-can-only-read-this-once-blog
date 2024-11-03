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

const AdminDashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchPendingComments = async () => {
    try {
      const response = await fetch('/api/admin/comments');
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

  const handleApproval = async (commentId: string, approve: boolean) => {
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, approved: approve }),
      });

      if (response.ok) {
        setMessage(`Comment ${approve ? 'approved' : 'rejected'} successfully`);
        fetchPendingComments();
      } else {
        setMessage('Error updating comment status');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      setMessage('Error updating comment status');
    }
  };

  useEffect(() => {
    fetchPendingComments();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Comment Moderation Dashboard</h1>
      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border rounded-lg dark:border-neutral-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Post: {comment.slug}
                  </p>
                  <p className="mt-2">{comment.content}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    Submitted: {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproval(comment._id, true)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(comment._id, false)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments pending review.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;