import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const fetchComments = async (storyId) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${storyId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

const Comment = ({ comment }) => (
  <div className="border-l-2 border-gray-200 pl-4 mb-4">
    <p className="text-sm text-gray-600 mb-2">{comment.author}</p>
    <div className="text-sm" dangerouslySetInnerHTML={{ __html: comment.text }} />
    {comment.children && (
      <div className="ml-4 mt-2">
        {comment.children.map((childComment) => (
          <Comment key={childComment.id} comment={childComment} />
        ))}
      </div>
    )}
  </div>
);

const CommentList = ({ storyId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', storyId],
    queryFn: () => fetchComments(storyId),
  });

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading comments</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {data.children.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;